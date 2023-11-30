import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { BG_PRIMARY } from '../theme/colors';

const windowHeight = Dimensions.get('window').height;
const modalHeight = 400;

interface SlideUpModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SlideUpModal: React.FC<SlideUpModalProps> = ({
  isVisible,
  onClose,
  children,
}) => {
  const translateY = useSharedValue(windowHeight);

  useEffect(() => {
    translateY.value = withTiming(
      isVisible ? windowHeight - modalHeight : windowHeight,
      {
        duration: 500,
        easing: Easing.out(Easing.exp),
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: isVisible ? 1 : 0,
      display: isVisible ? 'flex' : 'none',
    };
  });

  return (
    <Animated.View style={[styles.container, overlayStyle]}>
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        activeOpacity={1}>
        <Animated.View style={[styles.modal, animatedStyle]}>
          {children}
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modal: {
    height: modalHeight,
    backgroundColor: BG_PRIMARY,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default SlideUpModal;
