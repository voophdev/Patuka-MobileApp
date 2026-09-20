import { StyleSheet, Text, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import BoxComponent from "./BoxComponent";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const AutomaticFeeding = ({ isEnabled, toggleSwitch }) => {

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(isEnabled ? 26 : 2, { duration: 300 }) }, // Smooth transition
    ],
  }));

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(isEnabled ? "#4CD964" : "#E5E5EA", {
      duration: 300,
    }), 
  }));

  return (
    <BoxComponent
      title='Automatic Feeding'
      icon={
        <FontAwesome
          name='power-off'
          size={20}
          color={isEnabled ? "#4CD964" : "#FF4C4C"}
        />
      }
    >
      <Pressable onPress={toggleSwitch}>
        <Animated.View style={[styles.toggleContainer, containerStyle]}>
          <Animated.View style={[styles.knob, animatedStyle]} />
        </Animated.View>
      </Pressable>
      <Text style={styles.statusText}>{isEnabled ? "ON" : "OFF"}</Text>
    </BoxComponent>
  );
};

export default AutomaticFeeding;

const styles = StyleSheet.create({
  toggleContainer: {
    width: 45,
    height: 25,
    borderRadius: 30 / 2, // Fully rounded
    padding: 2,
    justifyContent: "center",
  },
  knob: {
    width: 25,
    height: 25,
    borderRadius: 26 / 2,
    backgroundColor: "white", 
    elevation: 2,
  },
  statusText: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
});
