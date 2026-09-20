import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";

import ModalContainer from "../../../../components/layout/ModalContainer";
import VideoSection from "../../../../components/modals/VideoSection";
import ModalLayout from "../../../../components/layout/ModalLayout";
import ModalStats from "../../../../components/modals/feedQuality/ModalStats";

import sensorReading from "../../../../firebase/sensorReading";
import liveSensorMonitoring from "../../../../firebase/liveSensorMonitoring";

const prepareData = (sensorData, label) => {
  return (sensorData || []).map(({ dateTime, [label]: metricValue }) => ({
    dateTime,
    metricValue: metricValue ?? 0, // Fallback to 0 if undefined
  }));
};

const FeedQuality = () => {
  const router = useRouter();
  const videoURL = require("../../../../assets/feedQuality.mp4");

  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [moistureContent, setMoistureContent] = useState([]);
  const [feedTemp, setFeedTemp] = useState([]);
  const { sensorData } = sensorReading(); // Fetch sensor data
  const { moistureLive, feedTempLive } = liveSensorMonitoring(); // Fetch live data

useEffect(() => {
  const timer = setTimeout(() => {
    if (Array.isArray(sensorData) && sensorData.length > 0) {
      try {
        // Prepare data if sensorData is valid
        const preparedMoisture = prepareData(sensorData, "moistureContent");
        const preparedFeedTemp = prepareData(sensorData, "feedTemp");

        setMoistureContent(preparedMoisture);
        setFeedTemp(preparedFeedTemp);
      } catch (error) {
        console.error("Error preparing sensor data:", error);
      } finally {
        setIsLoading(false); // Stop loading regardless of success or failure
      }
    } else {
      console.warn("No valid sensor data available.");
      setIsLoading(false); // Stop loading even if data is empty
    }
  }, 1000); // 1-second delay

  return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
}, [sensorData]);


  // Calculate min and max values with fallbacks
  const moistureValues = moistureContent.map((item) => item.metricValue);
  const minMoisture = Math.min(...moistureValues);
  const maxMoisture = Math.max(...moistureValues, 0);

  const feedTempValues = feedTemp.map((item) => item.metricValue);
  const minFeedTemp = Math.min(...feedTempValues);
  const maxFeedTemp = Math.max(...feedTempValues, 0);

  const color = "#FF6948";

  // Show loading spinner until data is ready
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color={color} />
      </View>
    );
  }

  return (
    <View>
      <ModalContainer>
        <VideoSection
          title={"Feed Quality"}
          router={router}
          videoURL={videoURL}
          background={color}
        />
        <ModalLayout>
          <ModalStats
            title={"Humidity"}
            description={
              "Monitoring the humidity around your feed is crucial for maintaining quality and preventing mold growth. The graph below provides a real-time view of humidity levels over the past 2 hours."
            }
            color={color}
            data={moistureContent}
            label='Humidity Level'
            currentValue={`${moistureLive ?? 0}%`} // Fallback to 0
            minValue={`${minMoisture}%`}
            maxValue={`${maxMoisture}%`}
          />
          <ModalStats
            title={"Feed Temperature"}
            description={
              "Maintaining the right temperature is crucial for preserving the quality of your chicken feed. The graph below shows temperature changes over the past 2 hours."
            }
            color={color}
            data={feedTemp}
            label='Feed Temperature'
            currentValue={`${feedTempLive ?? 0}°C`} // Fallback to 0
            minValue={`${minFeedTemp}°C`}
            maxValue={`${maxFeedTemp}°C`}
          />
        </ModalLayout>
      </ModalContainer>
    </View>
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

export default FeedQuality;
