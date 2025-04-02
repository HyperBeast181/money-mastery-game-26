
import { useState, useEffect, useRef } from 'react';
import { ReactNode } from 'react';

interface ToastProps {
  title: string;
  description: string;
  variant?: 'default' | 'destructive';
  duration?: number;
  action?: ReactNode;
}

export function useToast() {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: string }>>([]);
  const toastIdCounterRef = useRef(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    toasts.forEach(toast => {
      const timer = setTimeout(() => {
        setToasts(current => current.filter(t => t.id !== toast.id));
      }, toast.duration || 5000);

      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [toasts]);

  const toast = (props: ToastProps) => {
    const id = `toast-${toastIdCounterRef.current++}`;
    setToasts(current => [...current, { ...props, id }]);
  };

  // Добавим слушатель для глобальных тостов
  useEffect(() => {
    const handleToast = (event: CustomEvent<ToastProps>) => {
      toast(event.detail);
    };

    document.addEventListener('toast' as any, handleToast as any);

    return () => {
      document.removeEventListener('toast' as any, handleToast as any);
    };
  }, []);

  return { toast, toasts };
}

export const toast = (props: ToastProps) => {
  const toastEvent = new CustomEvent('toast', { detail: props });
  document.dispatchEvent(toastEvent);
};
