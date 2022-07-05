import React from 'react';
import clsx from 'clsx';

interface Props {
  text?: string;
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  colorScheme?: 'blue' | '';
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

const Button = ({ className, children, colorScheme, disabled, onClick, text, type }: Props) => {
  const color = colorScheme === 'blue' ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-700 dark:bg-gray-300 hover:bg-gray-800 dark:hover:bg-gray-200';
  const cx = clsx(
    'text-white font-medium rounded-lg text-sm focus:cursor-pointer',
    className, color
  );

  return (
    <button type={type} onClick={onClick} className={cx} disabled={disabled}>
      {text}
      {children}
    </button>
  );
};

export default Button;
