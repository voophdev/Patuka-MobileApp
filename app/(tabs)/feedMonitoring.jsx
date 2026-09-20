import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import MainContainerAndTitle from "../../components/layout/MainContainerAndTitle";
import LevelContainer from "../../components/tabs/LevelContainer";
import StatusContainer from "../../components/tabs/StatusContainer";
import liveSensorMonitoring from "../../firebase/liveSensorMonitoring";
import levelMonitor from '../../firebase/levelMonitor'

export default function FeedMonitoring() {
  const { feedLevel } = levelMonitor();
  const { moistureLive, feedTempLive } = liveSensorMonitoring();
  const [feedLevelStatus, setFeedLevelStatus] = useState("");

  useEffect(() => {
    const status = feedLevel >= 90 ? "Feed level is full. No need to refill."
      : feedLevel >= 70 ? "Feed level is good. No refill needed yet."
      : feedLevel >= 50 ? "Feed level is moderate. Monitor for potential refill soon."
      : feedLevel >= 30 ? "Feed level is getting low. Consider refilling soon."
      : feedLevel >= 10 ? "Feed level is low. Please refill soon."
      : "Feed level is critical. Refill immediately!";

    setFeedLevelStatus(status);
  }, [feedLevel]);

  const feedColors = ['#FF4C4C', '#F9F871', '#1DB954']; // Color range for feed level

  return (
    <Layout>
      <MainContainerAndTitle title='FEED'>
        <LevelContainer
          level={feedLevel}
          maxLevel={100}
          colors={feedColors}
          label='FEED'
          secondaryMetrics={[
            { label: "Humidity", value: `${moistureLive}%` },
            { label: "Temperature", value: `${feedTempLive}°C` },
          ]}
        />
        <StatusContainer
          status={feedLevelStatus}
          metrics={[
            { label: "Humidity", value: `${moistureLive}%` },
            { label: "Temperature", value: `${feedTempLive}°C` },
          ]}
        />
      </MainContainerAndTitle>
    </Layout>
  );
}