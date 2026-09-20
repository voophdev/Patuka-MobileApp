import { Text, View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { setItem } from '../../utils/asyncStorage';

export default function Success() {
  
  const router = useRouter();

  const handleGoToHome = async () => {
      await setItem("onboarded", "1");
      router.replace("(tabs)");
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Success!</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Successfully Connected Patuka to WiFi.</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={handleGoToHome}
        >
          <Text style={styles.buttonText}>Go to Home</Text>
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
