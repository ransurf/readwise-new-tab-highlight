import * as React from 'react';
import clsx from 'clsx';

interface InputFieldProps {
  register?: any;
  error?: any;
  label: string;
  name: string;
  className?: string;
  type: string;
  placeholder?: string;
//   required?: any;
//   validation?: any;
  value?: any;
  handleRef : any;
  onChange?: () => any;
  onBlur?: () => any;
}

export const InputField: React.FC<InputFieldProps> = (props: InputFieldProps) => {
  const { label, className, handleRef, name, type, placeholder, error, onChange, onBlur } = props;

  const cxInput = clsx(className, 'text-bw')
  const cxLabel = clsx(className, 'text-bw')

  return (
    <div className="cui-form-field flex flex-col">
      <label className={cxLabel}>{label}</label>
      <input
        className={cxInput}
        type={type}
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
