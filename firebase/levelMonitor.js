import { useState, useEffect } from "react";
import { db, ref, onValue } from "./firebase";

const levelMonitor = () => {
  const [feedLevel, setFeedLevel] = useState(0);
  const [waterLevel, setWaterLevel] = useState(0);

  useEffect(() => {
    const dataRef = ref(db, "levelMonitor");

    // Create a listener and store the unsubscribe function
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setFeedLevel(data.feedLevel);
      setWaterLevel(data.waterLevel);
    });

    // Return the unsubscribe function to cleanup the listener
    return () => unsubscribe();
  }, [db]);

  return { feedLevel, waterLevel };
};

export default levelMonitor;
