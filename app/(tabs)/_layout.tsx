import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Tabs, useSegments } from "expo-router";
import NetInfo from "@react-native-community/netinfo";

import TabBar from "../../components/navigation/TabBar";
import { AutomationProvider } from "../../context/AutomationProvider";

export default function TabsLayout() {
  const [isConnected, setIsConnected] = useState(true);
  const [checkingConnection, setCheckingConnection] = useState(true);

  const segments = useSegments();
  const currentSegment = segments[segments.length - 1];

  const modalRoutes = ["feedConsumption", "feedQuality", "waterQuality"];
  const shouldHideTabBar = modalRoutes.includes(currentSegment);

  // Monitor network status
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected); // Update connection status
      setCheckingConnection(false); // Initial check complete
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Show a loader while checking connection or when disconnected
  if (checkingConnection || !isConnected) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#FF9635' />
        <Text style={styles.loadingText}>
          {checkingConnection
            ? "Checking Connection..."
            : "No Internet Connection"}
        </Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AutomationProvider>
        <Tabs
          screenOptions={{ headerShown: false }}
          tabBar={(props) => (
            <TabBar {...props} shouldHideTabBar={shouldHideTabBar} />
          )}
        >
          <Tabs.Screen name='index' options={{ title: "Home" }} />
          <Tabs.Screen name='feedMonitoring' options={{ title: "Feed" }} />
          <Tabs.Screen name='waterMonitoring' options={{ title: "Water" }} />
          {/* <Tabs.Screen name='automation' options={{ title: "Automation" }} /> */}
          <Tabs.Screen name='insights' options={{ title: "Insights" }} />
          <Tabs.Screen name='reset' options={{ title: "Reset" }} />
        </Tabs>
      </AutomationProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#FF9635",
  },
});
