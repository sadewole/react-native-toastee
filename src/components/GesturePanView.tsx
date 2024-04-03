import { Dimensions, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import React, { useImperativeHandle } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { PanDirectionsEnum } from '../utils/type';

const Constants = {
  windowHeight: Dimensions.get('window').height,
};

const HIDDEN = {
  up: -Constants.windowHeight,
  down: Constants.windowHeight,
};

const springConfig = {
  velocity: 300,
  damping: 18,
  stiffness: 100,
  mass: 0.4,
};

export type GesturePanViewRefProps = {
  returnToOrigin(): void;
};

type GesturePanViewProps = {
  direction: PanDirectionsEnum;
  clearTimer(): void;
  onDismiss?(): void;
  style?: ViewStyle;
  backgroundColor?: string;
};

const GesturePanView = React.forwardRef<
  GesturePanViewRefProps,
  React.PropsWithChildren<GesturePanViewProps>
>(
  (
    { children, direction, clearTimer, backgroundColor, onDismiss, style },
    ref
  ) => {
    const offsetY = useSharedValue(0);
    const waitingForDismiss = useSharedValue(false);
    const translateY = useSharedValue(0);

    const handleDismiss = React.useCallback(
      (isFinished?: boolean) => {
        'worklet';

        if (isFinished && waitingForDismiss.value && onDismiss) {
          waitingForDismiss.value = false;

          runOnJS(clearTimer)();
          runOnJS(onDismiss)();
        }
      },
      [clearTimer, onDismiss, waitingForDismiss]
    );

    const returnToOrigin = React.useCallback(() => {
      'worklet';

      translateY.value = withSpring(0, springConfig);
    }, [translateY]);

    useImperativeHandle(ref, () => ({ returnToOrigin }), [returnToOrigin]);

    const gesture = Gesture.Pan()
      .onStart(() => {
        offsetY.value = translateY.value;
      })
      .onUpdate((event) => {
        if (direction === PanDirectionsEnum.UP) {
          translateY.value = Math.min(0, offsetY.value + event.translationY);
        } else if (direction === PanDirectionsEnum.DOWN) {
          translateY.value = Math.max(0, offsetY.value + event.translationY);
        }
      })
      .onEnd(() => {
        waitingForDismiss.value = true;

        if (translateY.value !== 0) {
          const toY = translateY.value > 0 ? HIDDEN.down : HIDDEN.up;
          translateY.value = withTiming(toY, { duration: 100 }, handleDismiss);
        }
      });

    const animatedStyle = useAnimatedStyle(() => {
      'worklet';

      return { transform: [{ translateY: translateY.value }] };
    }, []);

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            animatedStyle,
            styles.toastContent,
            { backgroundColor },
            style,
          ]}
        >
          {children}
        </Animated.View>
      </GestureDetector>
    );
  }
);

const styles = StyleSheet.create({
  toastContent: {
    minHeight: 48,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 12,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 2,
    shadowRadius: 3,
    elevation: 4,

    marginHorizontal: 20,
    marginVertical: 12,
    paddingVertical: 5,
    paddingLeft: 12,
  },
});

export default GesturePanView;
