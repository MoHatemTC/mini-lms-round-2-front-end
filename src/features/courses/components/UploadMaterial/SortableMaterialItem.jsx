import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, File as FileIcon } from 'lucide-react';

export function SortableMaterialItem({ id, material, disabled }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.9 : disabled ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`relative flex items-center gap-4 p-4 bg-white rounded-xl transition-all duration-200 ${
        isDragging 
          ? 'shadow-xl ring-2 ring-primary/50 scale-[1.02] border-transparent cursor-grabbing' 
          : disabled
            ? 'shadow-sm border border-gray-100 pointer-events-none'
            : 'shadow-sm border border-gray-200 hover:border-primary/30 hover:shadow-md hover:bg-gray-50/50 group'
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-roledescription="sortable"
        aria-label={`Drag to reorder ${material.name || material.title || `Material ${id}`}`}
        aria-disabled={disabled}
        className={`p-1.5 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          disabled 
            ? 'text-gray-300 pointer-events-none' 
            : 'cursor-grab active:cursor-grabbing text-gray-400 hover:text-primary hover:bg-primary/5'
        }`}
      >
        <GripVertical className="w-5 h-5" aria-hidden="true" />
      </div>

      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
        <FileIcon className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">
          {material.name || material.title || `Material ${id}`}
        </p>
        <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
          {material.materialType && (
            <span className="font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              {material.materialType}
            </span>
          )}
          {material.size && (
            <span>
              {typeof material.size === 'number' 
                ? `${(material.size / 1024 / 1024).toFixed(2)} MB`
                : material.size}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}
