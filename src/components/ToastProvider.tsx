import React, { useEffect, useState } from 'react';
import ToastView from './ToastView';
import { toastManager } from '../helpers/toastManager';
import type { ToastProps, ToastPreset } from '../utils/type';

type Props = Omit<ToastProps, 'visible' | 'message' | 'preset' | 'onDismiss'>;

const ToastProvider = (props: Partial<Props>) => {
  const {
    position = 'top',
    autoDismiss = 3000,
    zIndex = 1500,
    ...rest
  } = props;
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<ToastPreset>('default');
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const setToastFunction = (message: string, type: ToastPreset) => {
      setToastMessage(message);
      setToastType(type);
      setIsVisible(true);
    };
    toastManager.setToastFunction(setToastFunction);
    return () => {
      toastManager.setToastFunction(() => {});
    };
  }, []);

  const reset = () => {
    setIsVisible(false);
  };

  return (
    <ToastView
      position={position}
      message={toastMessage}
      onDismiss={reset}
      autoDismiss={autoDismiss}
      preset={toastType}
      zIndex={zIndex}
      visible={isVisible}
      {...rest}
    />
  );
};

export default ToastProvider;
