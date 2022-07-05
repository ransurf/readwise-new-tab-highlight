import * as React from 'react';
import clsx from 'clsx';

interface TextAreaProps {
  register?: any;
  error?: any;
  label: string;
  name: string;
  className?: {
    input?: string;
    label?: string;
  };
  placeholder?: string;
//   required?: any;
//   validation?: any;
  value?: any;
  handleRef : any;
  onChange?: () => any;
  onBlur?: () => any;
}

export const TextArea: React.FC<TextAreaProps> = (props: TextAreaProps) => {
  const { label, className, handleRef, name, placeholder, error, onChange, onBlur } = props;

  const cxInput = clsx(className?.input, 'text-lg w-full h-96 block p-2.5 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500')
  const cxLabel = clsx(className?.label, 'text-white text-2xl')

  return (
    <div className="cui-form-field flex flex-col grow gap-4">
      <label className={cxLabel}>{label}</label>
      <textarea
        className={cxInput}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={handleRef}
      />
      {error}
    </div>
  );
};
