import { StyleSheet, Text, View } from "react-native";
import BoxComponent from "./BoxComponent";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const FeedingSchedule = ({ isEnabled }) => {
  return (
    <BoxComponent
      title='Feeding Schedule'
      icon={
        <FontAwesome name="clock-o" size={22}
          color={isEnabled ? "#4CD964" : "#FF4C4C"} />
      }
    >
      <View style={styles.timeContainer}>
        <Text style={styles.time}>7:00 AM</Text>
        <View style={styles.separator} />
        <Text style={styles.time}>3:00 PM</Text>
        <View style={styles.separator} />
        <Text style={styles.time}>6:00 PM</Text>
      </View>
    </BoxComponent>
  );
};

export default FeedingSchedule;

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: "100%",
    padding: 20,
    gap: 10, // Adds space between items
  },
  time: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },
  separator: {
    width: "80%",
    height: 1,
    backgroundColor: "#ffffff", // Light gray separator
  },
});
