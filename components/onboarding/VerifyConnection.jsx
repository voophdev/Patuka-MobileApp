import { Text, View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function VerifyConnection() {
  const router = useRouter();

  // const completeSetup = () => {
  //   router.replace("/(tab)/index");
  // };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Verify Connection</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Look at the LCD screen on your Patuka device.
        </Text>
        <Text style={styles.text}>
          It should show that it is connected to the internet. If you see this,
          press <Text style={{ fontWeight: "bold" }}>'Verified'</Text> below.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => router.push("/end")}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </Pressable>
      </View>
      <View style={styles.promptContainer}>
        <Text style={styles.promptText}>Not connected?</Text>
        <Pressable onPress={() => router.push("/connect")}>
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
    gap: 20,
    width: "100%",
  },
  text: {
    color: "white",
    fontSize: 14,
    width: 300,
    textAlign: "left",
  },
  buttonContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    marginTop: 10,
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
  promptContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    width: 280,
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
