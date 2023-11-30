import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { BG_SECONDARY, BRAND_PRIMARY } from '../theme/colors';

const windowWidth = Dimensions.get('window').width;
const size = windowWidth * 0.6;
const strokeWidth = 10;
const radius = (size - strokeWidth * 2) / 2;
const circumference = radius * 2 * Math.PI;

const AnimatedCircle = () => {
  const progress = useSharedValue(27);

  useEffect(() => {
    const interval = setInterval(() => {
      progress.value = withTiming((progress.value + 1) % 100, {
        duration: 5000,
        easing: Easing.linear,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference - (circumference * progress.value) / 100,
  }));

  const percentageText = useDerivedValue(() => {
    return `${Math.round(progress.value)}%`;
  });

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value > 0 ? 1 : 0,
  }));

  const AnimatedCircleComponent = Animated.createAnimatedComponent(Circle);
  const AnimatedText = Animated.createAnimatedComponent(Text);

  const rotation = `rotate(-90 ${size / 2} ${size / 2})`;

  return (
    <View style={styles.container}>
      <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Progress Bg Circle (off-white) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={BG_SECONDARY}
          strokeWidth={strokeWidth}
          fill="none"
          transform={rotation}
        />
        {/* Progress Circle (green) */}
        <AnimatedCircleComponent
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={BRAND_PRIMARY}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          transform={rotation}
        />
        {/* Inner Circle */}
        <Circle
          stroke="none"
          fill={BRAND_PRIMARY}
          cx={size / 2}
          cy={size / 2}
          r={radius - strokeWidth - 10}
        />
      </Svg>
      <AnimatedText
        style={[styles.text, textAnimatedStyle]}
        text={percentageText}>
        {percentageText.value}
      </AnimatedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AnimatedCircle;
