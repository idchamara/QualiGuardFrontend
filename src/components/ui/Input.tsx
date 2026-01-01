import React, { useId } from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}
export function Input({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || useId();
  return <div className="w-full">
      {label && <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>}
      <input id={inputId} className={`
          block w-full rounded-lg border-gray-300 shadow-sm 
          focus:border-blue-500 focus:ring-blue-500 sm:text-sm
          disabled:bg-gray-50 disabled:text-gray-500
          ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
          ${className}
        `} {...props} />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
    </div>;
}