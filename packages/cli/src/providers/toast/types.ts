export type toastVariant = 'success' | 'error' | 'info';

export type ToastOptions = {
  message: string;
  variant?: toastVariant;
  duration?: number;
}

export const DEFAULT_DURATION = 3000;
