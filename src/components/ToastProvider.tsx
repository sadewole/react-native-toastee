import React, { useEffect, useState } from 'react';
import ToastView from './ToastView';
import { toastManager } from '../helpers/toastManager';
import type { ToastProps, ToastPreset } from '../utils/type';

type Props = Omit<ToastProps, 'visible' | 'message' | 'preset' | 'onDismiss'>;

const ToastProvider = (props: Partial<Props>) => {
  const { position = 'top', autoDismiss = 3000, ...rest } = props;
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<ToastPreset>('success');

  useEffect(() => {
    const setToastFunction = (message: string, type: ToastPreset) => {
      setToastMessage(message);
      setToastType(type);
    };
    toastManager.setToastFunction(setToastFunction);
    return () => {
      toastManager.setToastFunction(() => {});
    };
  }, []);

  const reset = () => {
    setToastMessage('');
  };

  return (
    <ToastView
      position={position}
      message={toastMessage}
      onDismiss={reset}
      autoDismiss={autoDismiss}
      preset={toastType}
      zIndex={1500}
      visible={!!toastMessage}
      {...rest}
    />
  );
};

export default ToastProvider;
