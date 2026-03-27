import { useEffect } from 'react';
import styles from './Toast.module.scss';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

const Toast = ({ message, onClose, duration = 4000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.toast} onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default Toast;