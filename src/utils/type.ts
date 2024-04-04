import type { TextStyle, ViewStyle } from 'react-native';

export enum PanDirectionsEnum {
  'UP' = 'up',
  'DOWN' = 'down',
}

export type ToastProps = {
  position: ToastPosition;
  onDismiss?: () => void;
  visible: boolean;
  message: string;
  preset: ToastPreset;
  style?: ViewStyle;
  textStyle?: TextStyle;
  autoDismiss: number;
  zIndex?: number;
};

export type ToastPreset = 'success' | 'error';

export type ToastPosition = 'top' | 'bottom';
