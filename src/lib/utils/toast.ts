import toast from 'react-hot-toast';

// Success toast
export const showSuccess = (message: string, duration?: number) => {
  return toast.success(message, {
    duration: duration || 3000,
  });
};

// Error toast
export const showError = (message: string, duration?: number) => {
  return toast.error(message, {
    duration: duration || 5000,
  });
};

// Info toast
export const showInfo = (message: string, duration?: number) => {
  return toast(message, {
    duration: duration || 4000,
    icon: 'ℹ️',
    style: {
      background: '#eff6ff',
      color: '#1e40af',
      border: '1px solid #93c5fd',
    },
  });
};

// Warning toast
export const showWarning = (message: string, duration?: number) => {
  return toast(message, {
    duration: duration || 4000,
    icon: '⚠️',
    style: {
      background: '#fef3c7',
      color: '#92400e',
      border: '1px solid #fcd34d',
    },
  });
};

// Loading toast
export const showLoading = (message: string) => {
  return toast.loading(message);
};

// Promise toast (for async operations)
export const showPromise = <T,>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string;
    error: string;
  }
) => {
  return toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: messages.error,
  });
};

// Custom toast with action button
export const showCustom = (
  message: string,
  action?: {
    label: string;
    onClick: () => void;
  }
) => {
  return toast(message, {
    duration: 6000,
    style: {
      background: '#fff',
      color: '#334155',
      padding: '16px',
      borderRadius: '12px',
      fontSize: '14px',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    },
  });
};

// Dismiss specific toast
export const dismissToast = (toastId: string) => {
  toast.dismiss(toastId);
};

// Dismiss all toasts
export const dismissAllToasts = () => {
  toast.dismiss();
};
