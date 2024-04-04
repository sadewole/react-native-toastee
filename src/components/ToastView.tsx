import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import React from 'react';
import {
  useSafeAreaInsets,
  SafeAreaView,
} from 'react-native-safe-area-context';
import GesturePanView, { type GesturePanViewRefProps } from './GesturePanView';
import { PanDirectionsEnum, type ToastProps } from '../utils/type';
import { useTimer } from '../helpers/useTimer';
import { colors } from '../utils/styles';

const ToastView = (props: ToastProps) => {
  const {
    position,
    onDismiss,
    visible,
    message,
    preset,
    style,
    textStyle,
    autoDismiss,
    zIndex,
  } = props;
  const { top, bottom } = useSafeAreaInsets();
  const isTop = position === 'top';

  // STATEs
  const [toastHeight, setToastHeight] = React.useState<number>(500);
  // REFs
  const gesturePanViewRef = React.useRef<GesturePanViewRefProps>(null);
  const toastAnimatedValue = React.useRef(new Animated.Value(0));

  const direction = React.useMemo(
    () =>
      props.position === 'bottom'
        ? PanDirectionsEnum.DOWN
        : PanDirectionsEnum.UP,
    [props.position]
  );

  const { clearTimer, setTimer } = useTimer({ onDismiss, autoDismiss });
  const presetColor = colors[preset];

  const onLayout = React.useCallback(
    (event: LayoutChangeEvent) => {
      const height = event.nativeEvent.layout.height;
      if (height !== toastHeight) {
        const addon = isTop ? top : bottom;
        setToastHeight(height + addon);
      }
    },
    [bottom, isTop, toastHeight, top]
  );

  const toggleToast = React.useCallback(
    (show = false) => {
      Animated.timing(toastAnimatedValue.current, {
        toValue: Number(show),
        duration: 300,
        delay: 100,
        easing: Easing.bezier(0.215, 0.61, 0.355, 1),
        useNativeDriver: true,
      }).start(() => {
        if (visible) {
          setTimer();
        }
      });
    },
    [setTimer, visible]
  );

  const positionMultiplier = isTop ? -1 : 1;
  const startOutputRange = React.useMemo(
    () => positionMultiplier * toastHeight,
    [positionMultiplier, toastHeight]
  );
  const toastTranslateY = toastAnimatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [startOutputRange, 0],
  });
  const opacity = toastAnimatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const toastContainerStyle = React.useMemo(
    () => ({
      zIndex,
      [position]: 0,
      transform: [
        {
          translateY: toastTranslateY,
        },
      ],
      opacity,
    }),
    [zIndex, position, toastTranslateY, opacity]
  );

  React.useEffect(() => {
    toggleToast(visible);
    return () => clearTimer();
  }, [clearTimer, toggleToast, visible]);

  React.useEffect(() => {
    toastTranslateY.addListener(({ value }) => {
      if (value === startOutputRange) {
        gesturePanViewRef.current?.returnToOrigin();
      }
    });
  }, [startOutputRange, toastTranslateY]);

  const renderMessage = () => {
    return (
      <View style={styles.messageContainer}>
        <Text style={[styles.message, textStyle]}>{message}</Text>
      </View>
    );
  };
  const renderIcon = () => {
    return (
      <View style={[styles.presetBar, { backgroundColor: presetColor }]} />
    );
  };

  return (
    <Animated.View
      style={[styles.wrapper, toastContainerStyle]}
      pointerEvents={'box-none'}
    >
      <SafeAreaView>
        <Animated.View
          onLayout={onLayout}
          pointerEvents={props.visible ? 'box-none' : 'none'}
        >
          <GesturePanView
            ref={gesturePanViewRef}
            onDismiss={onDismiss}
            clearTimer={clearTimer}
            direction={direction}
            backgroundColor={`${presetColor}30`}
            style={style}
          >
            {renderIcon()}
            {renderMessage()}
          </GesturePanView>
        </Animated.View>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: { position: 'absolute', left: 0, right: 0 },
  messageContainer: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  message: {
    fontSize: 16,
    marginLeft: 8,
    marginRight: 20,
    textAlign: 'left',
  },
  presetBar: {
    width: 5,
    height: '100%',
    borderRadius: 12,
  },
});

export default ToastView;
