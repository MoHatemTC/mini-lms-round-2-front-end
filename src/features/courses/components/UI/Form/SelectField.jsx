import React from 'react';

const SelectField = ({ label, id, error, value, onChange, options, ...props }) => {
  return (
    <div className="flex flex-col gap-1 mb-4 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-gray-700">
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`appearance-none w-full border p-2.5 rounded-lg bg-white focus:ring-2 focus-visible:outline-none transition-all shadow-sm ${
            error 
              ? 'border-red-500 focus:ring-red-500 focus-visible:ring-red-500 bg-red-50/30' 
              : 'border-gray-300 focus:border-primary focus:ring-primary focus-visible:ring-primary hover:border-gray-400'
          } disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        >
          <option value="" disabled>
            Select {label}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
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

export default SelectField;
