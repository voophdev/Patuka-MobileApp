import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { clearStorage } from "../../utils/asyncStorage";
import { useRouter } from "expo-router";
import { navigateToOnboarding } from "../../utils/navigationHandler";
import Layout from "../../components/layout/Layout";

export default function Reset() {
  const router = useRouter();

  const handleClearStorage = async () => {
    await clearStorage();
    navigateToOnboarding(router);
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Pressable style={styles.button} onPress={handleClearStorage}>
          <Text style={styles.buttonText}>Clear AsyncStorage</Text>
        </Pressable>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  button: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
