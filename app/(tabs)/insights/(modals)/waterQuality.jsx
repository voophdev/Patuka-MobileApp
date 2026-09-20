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

const WaterQuality = () => {
  const router = useRouter();
  const videoURL = require("../../../../assets/waterMonitoring.mp4");

  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [pHLevel, setPHLevel] = useState([]);
  const [waterTemp, setWaterTemp] = useState([]);
  const { sensorData } = sensorReading(); // Fetch sensor data
  const { pHLive, waterTempLive } = liveSensorMonitoring(); // Fetch live data

useEffect(() => {
  const timer = setTimeout(() => {
    if (sensorData) {
      try {
        // Prepare data when sensor data is available
        const preparedPH = prepareData(sensorData, "pHLevel");
        const preparedWaterTemp = prepareData(sensorData, "waterTemp");

        setPHLevel(preparedPH);
        setWaterTemp(preparedWaterTemp);
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

  return () => clearTimeout(timer); // Cleanup the timer
}, [sensorData]);

  // Calculate min and max values with fallbacks
  const pHValues = pHLevel.map((item) => item.metricValue);
  const minPH = Math.min(...pHValues);
  const maxPH = Math.max(...pHValues, 0);

  const waterTempValues = waterTemp.map((item) => item.metricValue);
  const minWaterTemp = Math.min(...waterTempValues);
  const maxWaterTemp = Math.max(...waterTempValues, 0);

  const color = "#6EB8FB";

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
          title={"Water Quality"}
          router={router}
          videoURL={videoURL}
          background={color}
        />
        <ModalLayout>
          <ModalStats
            title={"pH Level"}
            description={
              "The right pH balance in water is essential for keeping your chickens healthy and hydrated. Use the graph below to track the water’s pH level over the last 2 hours."
            }
            color={color}
            data={pHLevel}
            label='pH Level'
            currentValue={`${pHLive ?? 0} pH`} // Fallback to 0 if undefined
            minValue={`${minPH} pH`}
            maxValue={`${maxPH} pH`}
          />
          <ModalStats
            title={"Water Temperature"}
            description={
              "Water temperature directly affects your chickens’ hydration and health. The graph below shows fluctuations in water temperature over the past 2 hours."
            }
            color={color}
            data={waterTemp}
            label='Water Temperature'
            currentValue={`${waterTempLive ?? 0}°C`} // Fallback to 0 if undefined
            minValue={`${minWaterTemp}°C`}
            maxValue={`${maxWaterTemp}°C`}
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

export default WaterQuality;
