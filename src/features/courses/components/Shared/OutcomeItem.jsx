import React from 'react';

const OutcomeItem = ({ outcome, index, onRemove, onEdit, onBlur, draggedIndex, isDraggable, minItems = 1, onDragStart, onDragOver, onDrop, onDragEnd }) => {
  return (
    <li 
      draggable={isDraggable}
      onDragStart={(e) => onDragStart && onDragStart(e, index)}
      onDragOver={(e) => onDragOver && onDragOver(e, index)}
      onDrop={(e) => onDrop && onDrop(e, index)}
      onDragEnd={onDragEnd}
      className={`flex items-center gap-3 bg-white p-2.5 rounded-lg border shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all group hover:shadow-md ${draggedIndex === index ? 'opacity-50 border-dashed border-primary bg-primary/5' : 'border-gray-200'}`}
    >
      <div 
        className="text-gray-300 cursor-grab hover:text-gray-500 px-1 active:cursor-grabbing flex-shrink-0 transition-colors" 
        title="Drag to reorder"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
        </svg>
      </div>
      <span className="text-green-500 font-bold flex-shrink-0" aria-hidden="true">✓</span>
      <input
        type="text"
        value={outcome}
        onChange={(e) => onEdit && onEdit(index, e.target.value)}
        onBlur={(e) => onBlur && onBlur(index, e.target.value)}
        className="flex-1 bg-transparent border-none focus:ring-0 p-1 text-sm outline-none w-full text-gray-800 font-medium placeholder-red-300"
        aria-label={`Edit outcome ${index + 1}`}
        placeholder="Outcome cannot be empty"
      />
      <button
        type="button"
        onClick={() => onRemove && onRemove(index)}
        disabled={onRemove && !onRemove} // Logic will be handled by parent
        className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        aria-label="Remove outcome"
        title="Remove outcome"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </li>
  );
};

export default OutcomeItem;
