import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LevelAnimation from "./LevelAnimation"; // Still using FeedLevelAnimation for both

const LevelContainer = ({ 
  level,                // Level (e.g., 80, 50)
  maxLevel,             // Maximum level for animation (100)
  colors,               // Color range for animation (e.g., ['#FF4C4C', '#F9F871', '#1DB954'])
  label,                // Label text for the type (e.g., 'FEED', 'WATER')
}) => {
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    // Adjust this logic as needed for feed level or water level
    const status = level >= 90 ? `${label} level is full. No need to refill.`
      : level >= 70 ? `${label} level is good. No refill needed yet.`
      : level >= 50 ? `${label} level is moderate. Monitor for potential refill soon.`
      : level >= 30 ? `${label} level is getting low. Consider refilling soon.`
      : level >= 10 ? `${label} level is low. Please refill soon.`
      : `${label} level is critical. Refill immediately!`;
    
    setStatusText(status);
  }, [level]);

  return (
    <View style={styles.topSection}>
      <View style={styles.levelContainer}>
        <LevelAnimation 
          level={level} 
          maxLevel={maxLevel} 
          colors={colors} 
        />
      </View>
      <View style={styles.levelIndicator}>
        <Text style={styles.levelIndicatorText}>100</Text>
        <Text style={styles.levelIndicatorText}>50</Text>
        <Text style={styles.levelIndicatorText}>0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topSection: {
    display: 'flex',
    height: "70%",
    width: "83%",
    flexDirection: 'row',
    gap: 1,
    marginLeft: 5,
  },
  levelContainer: {
    padding: 20,
    height: "100%",
    width: "98%",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 18,
    paddingRight: 18,
    backgroundColor: 'black',
    borderRadius: 15,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "white",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  levelIndicator: {
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 13,
    paddingBottom: 13,
  },
  levelIndicatorText: {
    fontSize: 12,
    color: "#D1D1D1",
  },
  statusText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  miniContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  level: {
    fontSize: 12,
    color: '#D1D1D1',
  },
  levelName: {
    fontSize: 14,
    color: '#fff',
  },
});

export default LevelContainer;
