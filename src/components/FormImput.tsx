import React from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styles from './FormInput.module.scss';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register?: UseFormRegisterReturn;
  error?: FieldError | string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  register,
  error,
  ...props
}) => {
  const errorMessage = typeof error === 'string' ? error : error?.message;

  return (
    <div className={styles.field}>
      <label>{label}</label>
      <input {...register} {...props} />
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
};

export default FormInput;