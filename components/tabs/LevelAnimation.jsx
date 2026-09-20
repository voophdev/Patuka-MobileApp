import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";

const LevelAnimation = ({ level, maxLevel, colors }) => {
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const animatedText = useRef(new Animated.Value(0)).current;
  const [displayedValue, setDisplayedValue] = useState(0);

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: level,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    Animated.timing(animatedText, {
      toValue: level,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    animatedText.addListener(({ value }) => {
      setDisplayedValue(Math.round(value));
    });

    return () => {
      animatedText.removeAllListeners();
    };
  }, [level]);

  const height = animatedHeight.interpolate({
    inputRange: [0, maxLevel],
    outputRange: ["0%", "100%"],
  });

  const backgroundColor = animatedHeight.interpolate({
    inputRange: [0, maxLevel / 2, maxLevel], // 3 input values
    outputRange: colors, // 3 corresponding colors
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.levelIndicator,
          {
            height,
            backgroundColor,
          },
        ]}
      />
      <Animated.View style={styles.textContainer}>
        <Animated.Text style={styles.levelText}>
          {displayedValue}%
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  },
  levelIndicator: {
    width: "100%",
    borderRadius: 5,
    position: "absolute",
    bottom: 0,
  },
  textContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  levelText: {
    color: "white",
    fontSize: 29,
    fontWeight: "bold",
  },
});

export default LevelAnimation;
