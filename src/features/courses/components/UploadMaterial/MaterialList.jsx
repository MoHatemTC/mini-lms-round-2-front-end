import React, { useState } from 'react';
import { Loader2, AlertCircle, File as FileIcon } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { Toast } from '../../../../components/ui/Toast';
import courseService from '../../../../services/courseService';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableMaterialItem } from './SortableMaterialItem';

export default function MaterialList({ 
  courseId, 
  materials, 
  setMaterials, 
  isLoading, 
  fetchError, 
  onRetry 
}) {
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [orderMessage, setOrderMessage] = useState({ type: '', text: '' });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over?.id && over) {
      if (isSavingOrder) return; // Prevent multiple simultaneous saves

      const oldIndex = materials.findIndex((item, idx) => (item.id || idx.toString()) === active.id);
      const newIndex = materials.findIndex((item, idx) => (item.id || idx.toString()) === over.id);
      
      const newMaterials = arrayMove(materials, oldIndex, newIndex);
      
      // Optimistically update the UI
      setMaterials(newMaterials);
      
      // Save order to backend
      setIsSavingOrder(true);
      setOrderMessage({ type: '', text: '' });
      
      try {
        const materialIds = newMaterials.map((m, idx) => m.id || idx.toString());
        await courseService.updateMaterialOrder(courseId, materialIds);
        
        setOrderMessage({ type: 'success', text: 'Material order saved!' });
        
        // Hide success message after a few seconds
        setTimeout(() => {
          setOrderMessage(prev => prev.type === 'success' ? { type: '', text: '' } : prev);
        }, 3000);
      } catch (error) {
        // Restore old order on failure
        setMaterials(materials);
        setOrderMessage({ type: 'error', text: error?.message || 'Failed to save new order. Reverting changes.' });
      } finally {
        setIsSavingOrder(false);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">
          Course Materials
        </h2>
        {isSavingOrder && (
          <div role="status" aria-live="polite" className="flex items-center gap-2 text-sm text-blue-600 font-medium animate-pulse bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            <span>Saving order...</span>
          </div>
        )}
      </div>
      
      <Toast message={orderMessage} onClose={() => setOrderMessage({ type: '', text: '' })} />
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12" aria-live="polite" aria-busy="true">
          <Loader2 className="w-8 h-8 animate-spin text-primary" aria-hidden="true" />
          <span className="sr-only">Loading materials...</span>
        </div>
      ) : fetchError ? (
        <div role="alert" aria-live="assertive" className="text-center py-10 bg-red-50/50 rounded-xl border border-red-100 flex flex-col items-center">
          <AlertCircle className="w-8 h-8 text-red-400 mb-3" aria-hidden="true" />
          <p className="text-red-700 text-sm font-medium">{fetchError}</p>
          <Button variant="outline" size="sm" onClick={onRetry} className="mt-4">
            Retry Loading
          </Button>
        </div>
      ) : materials.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200 flex flex-col items-center">
          <FileIcon className="w-10 h-10 text-gray-300 mb-3" />
          <p className="font-medium text-gray-600">No materials uploaded yet.</p>
          <p className="text-sm mt-1">Use the upload form above to add resources.</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={materials.map((m, idx) => m.id || idx.toString())}
            strategy={verticalListSortingStrategy}
          >
            <ul className="flex flex-col gap-3">
              {materials.map((material, idx) => {
                const id = material.id || idx.toString();
                return (
                  <SortableMaterialItem 
                    key={id} 
                    id={id} 
                    material={material} 
                    disabled={isSavingOrder}
                  />
                );
              })}
            </ul>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
