import type { ToastPreset } from '../utils/type';

class ToastManager {
  private static instance: ToastManager | null = null;
  private static toastSetter:
    | ((message: string, type: ToastPreset) => void)
    | null = null;

  private constructor() {}

  static getInstance() {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  setToastFunction(setter: (message: string, type: ToastPreset) => void) {
    ToastManager.toastSetter = setter;
  }

  showToast(message: string, type: ToastPreset = 'success') {
    if (ToastManager.toastSetter) {
      ToastManager.toastSetter(message, type);
    }
  }
}

export const toastManager = ToastManager.getInstance();

export const toast = toastManager.showToast;
