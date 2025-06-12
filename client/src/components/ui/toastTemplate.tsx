import { toast } from 'sonner';

type NotifyType = 'success' | 'error';

const toastSuccess = (message: string, duration: number = 5000) => {
  toast.success(message, { duration });
};

const toastError = (message: string, duration: number = 5000) => {
  toast.error(message, { duration });
};

export const showToast = (type: NotifyType, message: string) => {
  if (type === 'success') {
    toastSuccess(message);
  } else if (type === 'error') {
    toastError(message);
  }
};
