import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import ModalContainer from "../../../../components/layout/ModalContainer";
import ModalLayout from "../../../../components/layout/ModalLayout";
import DailyConsumptionSection from "../../../../components/modals/feedConsumption/DailyConsumption";
import VideoSection from "../../../../components/modals/VideoSection";
import WeeklyConsumption from "../../../../components/modals/feedConsumption/WeeklyConsumption";
import MonthlyConsumption from "../../../../components/modals/feedConsumption/MonthlyConsumption";

import { db, ref, onValue } from "../../../../firebase/firebase";

const FeedConsumption = () => {
  const router = useRouter();
  const videoURL = require("../../../../assets/feedingChicken.mp4");

  const [firebaseFeedData, setFirebaseFeedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  // Retrieve data from Firebase
  useEffect(() => {
    const feedDataRef = ref(db, "monthlyFeedData");

    const unsubscribe = onValue(feedDataRef, (snapshot) => {
      const data = snapshot.val();

      const parsedData = Object.entries(data || {}).map(([dateKey, value]) => ({
        date: dateKey,
        feedSessions: (value.feedSessions || []).map((session) => ({
          time: session.time,
          feedDispensed: session.feedDispensed ?? 0, // Fallback to 0 if undefined
        })),
      }));

      setFirebaseFeedData(parsedData);
      setIsLoading(false); // Set loading to false once data is ready
    });

    return () => unsubscribe();
  }, []);

  // Show a loading spinner until everything is ready
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#FF9635' />
      </View>
    );
  }

  return (
    <ModalContainer>
      <VideoSection
        title={"Feed Consumption"}
        router={router}
        videoURL={videoURL}
        background={"#FF9635"}
      />
      <ModalLayout>
        <DailyConsumptionSection monthlyFeedData={firebaseFeedData} />
        <WeeklyConsumption monthlyFeedData={firebaseFeedData} />
        <MonthlyConsumption monthlyFeedData={firebaseFeedData} />
      </ModalLayout>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default FeedConsumption;
