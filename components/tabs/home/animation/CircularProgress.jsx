import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
import Svg, { Circle } from "react-native-svg";

// Wrap the Circle with `Animated.createAnimatedComponent`
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = ({ progress, size, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const animatedNumber = useRef(new Animated.Value(0)).current;
  const [displayedValue, setDisplayedValue] = useState(0);

  useEffect(() => {
    // Animate the circular progress
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 1000, // Duration of the animation in milliseconds
      useNativeDriver: false,
    }).start();

    // Animate the number change
    Animated.timing(animatedNumber, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    // Listener to update the displayed value as the number animates
    animatedNumber.addListener(({ value }) => {
      setDisplayedValue(Math.round(value));
    });

    // Clean up the listener on component unmount
    return () => {
      animatedNumber.removeAllListeners();
    };
  }, [progress]);

  // Interpolate the strokeDashoffset based on animated progress
  const strokeDashoffset = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          stroke='#E6E6E6'
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill='none'
        />
        {/* Animated Progress Circle */}
        <AnimatedCircle
          stroke='#1DB954'
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill='none'
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
      {/* Animated Number in the Middle */}
      <Text style={[styles.number, { fontSize: size / 4 }]}>
        {displayedValue}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: '100%',
    width: '100%',
  },
  number: {
    position: "absolute", // Centering the number inside the circle
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default CircularProgress;