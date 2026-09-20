import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Linking,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function ConnectToNetwork() {
  const router = useRouter();

  const openConfigPage = () => {
    const url = "http://192.168.4.1";
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Error", "Cannot open the configuration page.");
        }
      })
      .catch((err) => Alert.alert("Error", "An error occurred: " + err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Connect Patuka to Wifi</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Please go to the following link to configure your Patuka device's
          Wi-Fi:
        </Text>
        <Pressable onPress={openConfigPage}>
          <Text style={styles.link}>http://192.168.4.1</Text>
        </Pressable>
        <Text style={styles.text}>
          After configuring the Wi-Fi on the webpage, return here to continue.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => router.push("/verify")}>
          <Text style={styles.buttonText}>Done</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#141414",
    gap: 40,
  },
  headerContainer: {
    flex: 0.5 / 3,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 80,
  },
  header: {
    color: "white",
    fontWeight: "bold",
    fontSize: 32,
    textAlign: "center",
    width: 280,
  },
  textContainer: {
    gap: 30,
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  text: {
    color: "white",
    fontSize: 14,
    width: "75%",
    textAlign: "center",
    marginTop: 15,
  },
  link: {
    color: "#1E90FF",
    textDecorationLine: "underline",
    fontSize: 16,
    textAlign: "center",
    marginTop: 5,
  },
  buttonContainer: {
    flex: 1 / 3,
    width: "100%",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    paddingTop: 15,
    paddingBottom: 15,
    width: 280,
    backgroundColor: "#2C2C2C",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
});
