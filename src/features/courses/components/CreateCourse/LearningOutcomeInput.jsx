import React, { useState, useRef } from 'react';

const LearningOutcomeInput = ({ outcomes, onChange, error }) => {
  const [inputValue, setInputValue] = useState('');
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [localError, setLocalError] = useState('');
  
  const MAX_ITEMS = 20;
  
  const handleAdd = (e) => {
    e.preventDefault();
    setLocalError('');
    const val = inputValue.trim();
    if (!val) return;
    
    if (outcomes.length >= MAX_ITEMS) {
      setLocalError(`Maximum of ${MAX_ITEMS} learning outcomes allowed.`);
      return;
    }
    
    if (outcomes.some(o => o.toLowerCase() === val.toLowerCase())) {
      setLocalError('This outcome already exists.');
      return;
    }
    
    onChange([...outcomes, val]);
    setInputValue('');
  };

  const handleRemove = (index) => {
    const newOutcomes = [...outcomes];
    newOutcomes.splice(index, 1);
    onChange(newOutcomes);
  };

  const handleEdit = (index, newValue) => {
    const newOutcomes = [...outcomes];
    newOutcomes[index] = newValue;
    onChange(newOutcomes);
  };

  const handleBlur = (index, value) => {
    setLocalError('');
    const trimmed = value.trim();
    const newOutcomes = [...outcomes];
    
    if (!trimmed) {
      if (outcomes.length > 1) {
        handleRemove(index);
      } else {
        setLocalError('Minimum 1 learning outcome is required.');
      }
      return;
    }
    
    const isDuplicate = outcomes.some((o, i) => i !== index && o.toLowerCase() === trimmed.toLowerCase());
    if (isDuplicate) {
      setLocalError('Duplicate outcomes are not allowed.');
    } else {
      newOutcomes[index] = trimmed;
      onChange(newOutcomes);
    }
  };

  // Drag and Drop Logic
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const newOutcomes = [...outcomes];
    const [draggedItem] = newOutcomes.splice(draggedIndex, 1);
    newOutcomes.splice(targetIndex, 0, draggedItem);
    
    onChange(newOutcomes);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="flex flex-col gap-2 mb-4 w-full">
      <div className="flex justify-between items-center">
        <label className="text-sm font-semibold text-gray-700">Learning Outcomes <span className="text-red-500">*</span></label>
        <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full">{outcomes.length}/{MAX_ITEMS}</span>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 mb-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="e.g. Build React Apps"
          disabled={outcomes.length >= MAX_ITEMS}
          aria-label="New Learning Outcome"
          aria-invalid={!!localError}
          className="flex-1 border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus-visible:outline-none transition-all shadow-sm hover:border-gray-400 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd(e);
            }
          }}
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={!inputValue.trim() || outcomes.length >= MAX_ITEMS}
          className="bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95"
        >
          Add Outcome
        </button>
      </div>

      {outcomes.length > 0 && (
        <ul className="space-y-3 mt-2">
          {outcomes.map((outcome, index) => (
            <li 
              key={index} 
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              className={`flex items-center gap-3 bg-white p-2.5 rounded-lg border shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all group hover:shadow-md ${draggedIndex === index ? 'opacity-50 border-dashed border-primary bg-primary/5' : 'border-gray-200'}`}
            >
              <div className="text-gray-300 cursor-grab hover:text-gray-500 px-1 active:cursor-grabbing flex-shrink-0 transition-colors" title="Drag to reorder">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                </svg>
              </div>
              <span className="text-green-500 font-bold flex-shrink-0">✓</span>
              <input
                type="text"
                value={outcome}
                onChange={(e) => handleEdit(index, e.target.value)}
                onBlur={(e) => handleBlur(index, e.target.value)}
                className="flex-1 bg-transparent border-none focus:ring-0 p-1 text-sm outline-none w-full text-gray-800 font-medium placeholder-red-300"
                aria-label={`Edit outcome ${index + 1}`}
                placeholder="Outcome cannot be empty"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                disabled={outcomes.length <= 1} // Minimum 1 item required
                className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed opacity-0 group-hover:opacity-100 focus:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                aria-label="Remove outcome"
                title={outcomes.length <= 1 ? "At least one outcome is required" : "Remove outcome"}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      {(error || localError) && (
        <div className="flex items-center gap-1.5 text-xs text-red-500 mt-2 font-medium" role="alert">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{localError || error}</span>
        </div>
      )}
    </div>
  );
};

export default LearningOutcomeInput;
