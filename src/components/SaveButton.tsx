import React from 'react';
import styles from './SaveButton.module.scss';

interface SaveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const SaveButton: React.FC<SaveButtonProps> = ({
   children = 'Сохранить',
    className, disabled = false, ...props }) => {
  return (
    <button 
    type="submit" 
    disabled={disabled}
    className={`${styles.saveButton}
     ${className || ''}`} 
     {...props}>
      {children}
    </button>
  );
};

export default SaveButton;
