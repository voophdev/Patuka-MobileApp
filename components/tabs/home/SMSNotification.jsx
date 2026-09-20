import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useState } from "react";
import usePhoneNumber from "../../../firebase/usePhoneNumber";

const SMSNotification = ({ phoneNumber, setPhoneNumber }) => {
  const { phoneNumber: firebasePhoneNumber, updatePhoneNumber } =
    usePhoneNumber(); // Get data from the custom hook
  const [isEditing, setIsEditing] = useState(false); // Toggles edit mode
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber); // Temporary state for input

  // Function to handle save
  const handleSave = () => {
    // Validation for phone number
    if (newPhoneNumber.startsWith("+639") && newPhoneNumber.length === 13) {
      updatePhoneNumber(newPhoneNumber); // Save the new phone number using the custom hook
      setPhoneNumber(newPhoneNumber); // Update phone number locally too
      setIsEditing(false); // Exit edit mode
    } else {
      // Show an alert if the phone number is invalid
      Alert.alert(
        "Invalid Phone Number",
        "Phone number must start with +639 and have exactly 13 characters.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust based on platform
      style={styles.header}
    >
      <View style={styles.smsCard}>
        <Text style={styles.headerText}>SMS Notifications</Text>
        {isEditing ? (
          <TextInput
            style={[styles.phoneNumberText, styles.editingInput]} // Add a specific style for editing
            value={newPhoneNumber}
            onChangeText={setNewPhoneNumber} // Update the temporary state
            keyboardType='phone-pad'
          />
        ) : (
          <Text style={styles.phoneNumberText}>
            Phone number: <Text style={styles.phoneNumber}>{phoneNumber}</Text>
          </Text>
        )}
      </View>
      <View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
        >
          <Text style={styles.editButtonText}>
            {isEditing ? "Save" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SMSNotification;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 15,
    paddingRight: 20,
    borderRadius: 6,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 21,
    fontWeight: "bold",
  },
  phoneNumberText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 4,
    borderRadius: 4,
  },
  phoneNumber: {
    color: "white",
    fontWeight: "normal",
    textAlign: "center",
  },
  editingInput: {
    backgroundColor: "white", // White background when editing
    height: 15,
    color: 'black',
    fontWeight: 'normal',
    paddingLeft: 5,
    paddingRight: 5,
  },
  editButton: {
    backgroundColor: "#1DB954",
    fontWeight: "bold",
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 6,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
