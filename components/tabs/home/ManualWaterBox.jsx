import BoxComponent from "./BoxComponent";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState } from "react";
import { db, ref, set } from "../../../firebase/firebase"; // Import Firebase methods

const FirstBoxContainer = () => {
  const [manualWater, setManualWater] = useState(false);
  const [buttonColor, setButtonColor] = useState("#1DB954"); // Original green

  // Firebase reference for water manual feed
  const manualWaterRef = ref(db, "manualFeed/water");

  // Handle button press (start hydration)
  const handlePressIn = () => {
    setButtonColor("#15803D"); // Dark green when pressed
    setManualWater(true); // Update local state
    set(manualWaterRef, true); // Set Firebase value to true
  };

  // Handle button release (stop hydration)
  const handlePressOut = () => {
    setButtonColor("#1DB954"); // Revert to original green
    setManualWater(false); // Update local state
    set(manualWaterRef, false); // Set Firebase value to false
  };

  return (
    <BoxComponent title='Manual Hydrate'>
      <View style={styles.firstBoxContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.manualWaterButton,
            { backgroundColor: pressed ? "#15803D" : buttonColor },
          ]}
          onPressIn={handlePressIn} // Set to true when pressed
          onPressOut={handlePressOut} // Set to false when released
        >
          <Text style={styles.manualDispenseButtonText}>Hydrate</Text>
        </Pressable>
      </View>
    </BoxComponent>
  );
};

export default FirstBoxContainer;

const styles = StyleSheet.create({
  firstBoxContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  manualWaterButton: {
    width: "60%",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 100,
    elevation: 5,
  },
  manualDispenseButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});
