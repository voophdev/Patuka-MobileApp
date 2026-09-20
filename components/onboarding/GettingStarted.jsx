import { Text, View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function GettingStarted() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Welcome to Patuka!</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Ready to set up your smart feeding System? Let’s get started.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => router.push("/connect")}>
          <Text style={styles.buttonText}>Get Started</Text>
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
    width: "100%",
  },
  text: {
    color: "white",
    fontSize: 14,
    width: 300,
    textAlign: "center",
  },
  buttonContainer: {
    flex: 1 / 3,
    width: "100%",
    alignItems: "center",
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
