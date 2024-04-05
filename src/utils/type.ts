import type { TextStyle, ViewStyle } from 'react-native';

export enum PanDirectionsEnum {
  'UP' = 'up',
  'DOWN' = 'down',
  'LEFT' = 'left',
  'RIGHT' = 'right',
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
  isHorizontalSwipeable?: boolean;
};

export type ToastPreset = 'success' | 'error' | 'default';

export type ToastPosition = 'top' | 'bottom';
