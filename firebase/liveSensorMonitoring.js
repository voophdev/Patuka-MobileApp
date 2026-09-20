import { useState, useEffect } from "react";
import { db, ref, onValue } from "./firebase";

const liveSensorMonitoring = () => {
  const [feedTempLive, setFeedTempLive] = useState(0);
  const [waterTempLive, setWaterTempLive] = useState(0);
  const [moistureLive, setMoistureLive] = useState(0);
  const [pHLive, setPHLive] = useState(0);

  useEffect(() => {
    const dataRef = ref(db, "liveSensorMonitoring");

    // Create a listener and store the unsubscribe function
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setFeedTempLive(data.feedTempLive);
      setWaterTempLive(data.waterTempLive);
      setMoistureLive(data.moistureLive);
      setPHLive(data.pHLive);
    });

    // Return the unsubscribe function to cleanup the listener
    return () => unsubscribe();
  }, [db]);

  return { feedTempLive, waterTempLive, moistureLive, pHLive };
};

export default liveSensorMonitoring;
