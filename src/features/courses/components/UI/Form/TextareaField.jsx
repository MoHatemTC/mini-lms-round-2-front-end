import React, { useRef, useEffect } from 'react';

const TextareaField = ({ label, id, error, value, onChange, placeholder, minLength, maxLength, ...props }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-1 mb-4 w-full">
      <div className="flex justify-between items-center">
        {label && (
          <label htmlFor={id} className="text-sm font-semibold text-gray-700">
            {label} {props.required && <span className="text-red-500">*</span>}
          </label>
        )}
        {(minLength || maxLength) && (
          <span className={`text-xs font-medium ${value?.length < minLength ? 'text-red-500' : 'text-gray-500'}`}>
            {value?.length || 0}{maxLength ? `/${maxLength}` : minLength ? ` (min: ${minLength})` : ''}
          </span>
        )}
      </div>
      <textarea
        ref={textareaRef}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        className={`border p-2.5 rounded-lg focus:ring-2 focus-visible:outline-none transition-all shadow-sm resize-none overflow-hidden min-h-[100px] ${
          error 
            ? 'border-red-500 focus:ring-red-500 focus-visible:ring-red-500 bg-red-50/30' 
            : 'border-gray-300 focus:border-primary focus:ring-primary focus-visible:ring-primary hover:border-gray-400'
        } disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <span id={`${id}-error`} className="text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium" role="alert">
           <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
};

export default TextareaField;
