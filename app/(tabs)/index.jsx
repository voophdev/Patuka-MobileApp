import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useAutomation } from "../../context/AutomationProvider";
import Layout from "../../components/layout/Layout";
import ManualFeedingBox from "../../components/tabs/home/ManualFeedingBox";
import ManualWaterBox from "../../components/tabs/home/ManualWaterBox";
import WaterLevelBox from "../../components/tabs/home/WaterLevelBox";
import FeedLevelBox from "../../components/tabs/home/FeedLevelBox";
import levelMonitor from "../../firebase/levelMonitor";
import AutomationSection from "../../components/tabs/home/AutomationSection";
import AutomaticFeeding from "../../components/tabs/home/AutomaticFeeding";
import FeedingSchedule from "../../components/tabs/home/FeedingSchedule";
import SMSNotification from "../../components/tabs/home/SMSNotification";
import usePhoneNumber from "../../firebase/usePhoneNumber";

export default function Home() {
  const { isEnabled, toggleSwitch } = useAutomation();
  const { waterLevel, feedLevel } = levelMonitor();
  const [isLoading, setIsLoading] = useState(true);

  // Use the custom hook to fetch the phone number
  const { phoneNumber, loading, error, updatePhoneNumber } = usePhoneNumber(); // Use custom hook
  // Simulate data loading (optional) and ensure Firebase/context data are ready
  useEffect(() => {
    if (
      isEnabled !== undefined &&
      waterLevel !== undefined &&
      feedLevel !== undefined
    ) {
      setIsLoading(false); // Set loading to false once all data is available
    }
  }, [isEnabled, waterLevel, feedLevel]);

  // Show loading spinner while waiting for data
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#FF9635' />
      </View>
    );
  }

  return (
    <Layout>
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>PATUKA</Text>
        </View>
        <View style={styles.sectionContainer}>
          <SMSNotification
            phoneNumber={phoneNumber}
            setPhoneNumber={updatePhoneNumber}
          />
          <ManualFeedingBox />
          <FeedLevelBox feedLevel={feedLevel} />
          <ManualWaterBox />
          <WaterLevelBox waterLevel={waterLevel} />
        </View>
        <AutomationSection>
          <View style={styles.boxesContainer}>
            <AutomaticFeeding
              isEnabled={isEnabled}
              toggleSwitch={toggleSwitch}
            />
            <FeedingSchedule isEnabled={isEnabled} />
          </View>
        </AutomationSection>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
  },
  titleContainer: {
    width: "100%",
    height: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    color: "#7A5C58",
    width: "90%",
    fontWeight: "bold",
    fontSize: 28,
  },
  sectionContainer: {
    marginTop: 20,
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 18,
    borderRadius: 6,
  },
  boxesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
