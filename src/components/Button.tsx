import React from 'react';
import styles from './Button.module.scss';

type ButtonVariant = 'edit' | 'archive' | 'hide' | 'activate' | 'save' | 'back' | 'primary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;