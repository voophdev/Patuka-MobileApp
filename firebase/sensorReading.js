import { useState, useEffect } from "react";
import { db, ref, onValue } from "./firebase"; // Ensure you're importing db correctly

const useSensorReading = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchSensorData = () => {
      const sensorRef = ref(db, "sensorReading"); // Reference to the sensor reading data in Firebase

      // Use onValue to listen for changes
      const unsubscribe = onValue(sensorRef, (snapshot) => {
        const data = snapshot.val();

        // Initialize an array to hold transformed data
        const dataArray = [];

        if (data) {
          // Loop through each date key in the sensor data
          Object.entries(data).forEach(([dateKey, timeEntries]) => {
            // Loop through each time entry
            Object.entries(timeEntries).forEach(([timeKey, readings]) => {
              // Combine date and time into a single dateTime string
              const dateTime = `${dateKey} ${timeKey}`;
              // Push the formatted data into the array
              dataArray.push({
                dateTime,
                ...readings, // Spread in the rest of the readings
              });
            });
          });
        }

        // Limit to last 120 entries
        const limitedDataArray = dataArray.slice(-120);

        setSensorData(limitedDataArray);
      });

      // Clean up the subscription on unmount
      return () => unsubscribe();
    };

    fetchSensorData();
  }, []);

  return { sensorData };
};

export default useSensorReading;
