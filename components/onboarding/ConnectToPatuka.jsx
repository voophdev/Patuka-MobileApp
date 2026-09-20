import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Linking,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import * as IntentLauncher from "expo-intent-launcher";

export default function ConnectToPatuka() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const openWifiSettings = async () => {
    if (Platform.OS === "android") {
      try {
        IntentLauncher.startActivityAsync(
          IntentLauncher.ActivityAction.WIFI_SETTINGS
        );
      } catch (error) {
        Alert.alert("Error", "Could not open Wi-Fi settings.");
      }
    } else {
      try {
        await Linking.openURL("app-settings:");
      } catch (error) {
        Alert.alert("Error", "Could not open settings.");
      }
    }
  };

  const navigateToConnectNetwork = () => {
    if (!isNavigating) {
      setIsNavigating(true);
      router.push("/connectNetwork");
      // Re-enable after a short delay to ensure smooth navigation
      setTimeout(() => setIsNavigating(false), 500);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Connect to Patuka Network</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Please connect your phone to the Wi-Fi network named ‘Patuka-AP’ and
          the password should be on the back of the Patuka device.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={openWifiSettings}>
          <Text style={styles.buttonText}>Open Wifi Settings</Text>
        </Pressable>
      </View>
      <View style={styles.promptContainer}>
        <Text style={styles.promptText}>Already Connected?</Text>
        <Pressable onPress={navigateToConnectNetwork} disabled={isNavigating}>
          <Text style={styles.promptPressable}>Tap Here</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#141414",
  },
  headerContainer: {
    flex: 1 / 3,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 100,
  },
  header: {
    color: "white",
    fontWeight: "bold",
    fontSize: 32,
    textAlign: "center",
    width: 280,
  },
  textContainer: {
    flex: 1 / 3,
    alignItems: "center",
    width: "80%",
  },
  text: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
  },
  button: {
    paddingTop: 15,
    paddingBottom: 15,
    width: "70%",
    backgroundColor: "#2C2C2C",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  promptContainer: {
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
    width: "70%",
    gap: 3,
  },
  promptText: {
    color: "white",
  },
  promptPressable: {
    color: "white",
    fontWeight: "bold",
  },
});
