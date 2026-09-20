import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import MainContainerAndTitle from "../../components/layout/MainContainerAndTitle";
import LevelContainer from "../../components/tabs/LevelContainer"; 
import StatusContainer from "../../components/tabs/StatusContainer";
import liveSensorMonitoring from "../../firebase/liveSensorMonitoring";
import levelMonitor from "../../firebase/levelMonitor";
export default function WaterMonitoring() {
  const { waterLevel } = levelMonitor();
  const { pHLive, waterTempLive } = liveSensorMonitoring();
  const [waterLevelStatus, setWaterLevelStatus] = useState("");

  useEffect(() => {
    const status = waterLevel >= 90 ? "Water level is full. No need to refill."
      : waterLevel >= 70 ? "Water level is good. No refill needed yet."
      : waterLevel >= 50 ? "Water level is moderate. Monitor for potential refill soon."
      : waterLevel >= 30 ? "Water level is getting low. Consider refilling soon."
      : waterLevel >= 10 ? "Water level is low. Please refill soon."
      : "Water level is critical. Refill immediately!";

    setWaterLevelStatus(status);
  }, [waterLevel]);

  const waterColors = ['#FFFFFF', '#4A90E2', '#73CBEA']; // Color range for water level

  return (
    <Layout>
      <MainContainerAndTitle title='WATER'>
        <LevelContainer
          level={waterLevel}
          maxLevel={100}
          colors={waterColors}
          label='WATER'
          secondaryMetrics={[
            { label: "pHLive", value: `${pHLive}` },
            { label: "Temperature", value: `${waterTempLive}°C` },
          ]}
        />
        <StatusContainer
          status={waterLevelStatus}
          metrics={[
            { label: "pH Level", value: `${pHLive}` },
            { label: "Temperature", value: `${waterTempLive}°C` },
          ]}
        />
      </MainContainerAndTitle>
    </Layout>
  );
}