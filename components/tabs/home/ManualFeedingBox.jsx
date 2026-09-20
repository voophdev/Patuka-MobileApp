import BoxComponent from "./BoxComponent";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { db, ref, onValue, set } from "../../../firebase/firebase"; // Import Firebase methods

const FirstBoxContainer = () => {
  const [manualFeedButtonText, setManualFeedButtonText] = useState("Start");
  const [manualFeed, setManualFeed] = useState(false);
  const [buttonColor, setButtonColor] = useState("#1DB954");

  // Reference to the manualFeed state in Firebase
  const manualFeedRef = ref(db, "manualFeed/feed");

  // Listen for manual feed state changes from Firebase
  useEffect(() => {
    const unsubscribe = onValue(manualFeedRef, (snapshot) => {
      const data = snapshot.val();
      setManualFeed(data); // Update the local state based on Firebase value
      setManualFeedButtonText(data ? "Feeding" : "Start");
      setButtonColor(data ? "#FF4C4C" : "#1DB954"); // Red when feeding, green otherwise
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  // Handles Manual Feeding when button is pressed
  const handleManualFeed = () => {
    if (!manualFeed) {
      set(manualFeedRef, true); // Set feeding state to true in Firebase

      // Reset the button to 'Start' and green after feeding is done
      setTimeout(() => {
        set(manualFeedRef, false); // Reset the state in Firebase
      }, 10000); // Feeding duration is 3 seconds
    }
  };

  return (
    <BoxComponent title='Manual Feed'>
      <View style={styles.firstBoxContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.manualFeedButton,
            {
              backgroundColor: pressed ? "#15803D" : buttonColor,
            },
          ]}
          onPressIn={() => setButtonColor("#15803D")} // Temporary darker green when pressed
          onPress={handleManualFeed}
          disabled={manualFeed}
        >
          <Text style={styles.manualFeedButtonText}>
            {manualFeedButtonText}
          </Text>
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
  manualFeedButton: {
    width: "60%",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 100,
    elevation: 5,
  },
  manualFeedButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});
