import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const guidelines = {
  "Humidity Level": [
    {
      title: "Safe",
      range: "60% to 75%",
      description:
        "Maintains feed quality and reduces mold risk.",
      min: 60,
      max: 75,
    },
    {
      title: "Warning",
      range: "76% to 85%",
      description:
        "Monitor closely; higher humidity can encourage mold growth.",
      min: 76,
      max: 85,
    },
    {
      title: "Unsafe",
      range: "Above 85%",
      description: "High risk of spoilage and mold formation.",
      min: 86,
    },
  ],
  "Feed Temperature": [
    {
      title: "Safe",
      range: "20°C to 30°C",
      description:
        "Within the normal ambient temperature range in the Philippines.",
      min: 20,
      max: 30,
    },
    {
      title: "Warning",
      range: "31°C to 34°C",
      description: "Monitor feed closely; spoilage can occur.",
      min: 31,
      max: 34,
    },
    {
      title: "Unsafe",
      range: "Above 34°C",
      description: "Increased risk of mold and nutrient degradation.",
      min: 35,
    },
  ],
  "pH Level": [
    {
      title: "Safe",
      range: "6.5 to 8.0",
      description: "Optimal pH range for chicken drinking water.",
      min: 6.5,
      max: 8.0,
    },
    {
      title: "Warning",
      range: "6.0 to 6.4 or 8.1 to 8.5",
      description: "Monitor for imbalances that could stress chickens.",
      min: 6.0,
      max: 8.5,
    },
    {
      title: "Unsafe",
      range: "Below 6.0 or Above 8.5",
      description: "Water outside this range can harm chickens.",
      min: 8.6,
    },
  ],
  "Water Temperature": [
    {
      title: "Safe",
      range: "20°C to 28°C",
      description: "Ideal range to encourage healthy water intake.",
      min: 20,
      max: 28,
    },
    {
      title: "Warning",
      range: "29°C to 32°C",
      description: "Monitor closely; warmer water may reduce drinking.",
      min: 29,
      max: 32,
    },
    {
      title: "Unsafe",
      range: "Above 32°C",
      description: "Risk of bacterial growth and reduced water intake.",
      min: 33,
    },
  ],
};


const getIndicatorColor = (indicator) => {
  switch (indicator) {
    case "SAFE":
      return "#27FB15";
    case "WARNING":
      return "#FBE415";
    case "UNSAFE":
      return "#FB1515";
    default:
      return "white"; // Default color if indicator is not set
  }
};

// CurrentLevel Component
const CurrentLevel = ({ title, currentValue, convertedCurrentValue, label, color }) => {
  const [indicator, setIndicator] = useState("");
  const currentGuidelines = guidelines[label] || [];
  useEffect(() => {

    if (currentGuidelines.length > 0) {
      // Check against the ranges
      if (
        convertedCurrentValue >= currentGuidelines[0].min &&
        convertedCurrentValue <= currentGuidelines[0].max
      ) {
        setIndicator("SAFE");
      } else if (
        convertedCurrentValue >= currentGuidelines[1].min &&
        convertedCurrentValue <= currentGuidelines[1].max
      ) {
        setIndicator("WARNING");
      } else if (convertedCurrentValue > currentGuidelines[2].min) {
        setIndicator("UNSAFE");
      } else {
        setIndicator("UNSAFE"); // For values below the safe range
      }
    }
  }, [currentValue, label]);

  return (
    <View style={[{ borderColor: color }, styles.currentLevel]}>
      <View style={[{backgroundColor: color}, styles.currentTitleBox]}>
        <Text style={styles.currentLevelTitle}>{title}</Text>
      </View>
      <View style={styles.currentLevelBox}>
        <View style={styles.valueContainer}>
          <Text style={styles.currentLevelText}>{currentValue}</Text>
          <Text
            style={{
              fontFamily: "Roboto",
              fontWeight: "bold",
              fontSize: 14,
              color: getIndicatorColor(indicator),
            }}
          >
            {indicator}
          </Text>
        </View>
        <View style={styles.levelGuidelines}>
          {currentGuidelines.map((guideline, index) => (
            <View key={index}>
              <Text style={[{ fontWeight: "bold" }, styles.guidelineText]}>
                {`${guideline.title}: `}
                <Text style={styles.guidelineText}>
                  {`${guideline.range} ${guideline.description}`}
                </Text>
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default CurrentLevel;

const styles = StyleSheet.create({
  currentLevel: {
    backgroundColor: "#242424",
    height: 175,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 12,
  },
  currentTitleBox: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  currentLevelTitle: {
    color: "white",
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 16,
  },
  currentLevelBox: {
    justifyContent: "center",
    alignItems: "center",
    height: "74%",
    flexDirection: "row",
    width: "100%",
  },
  valueContainer: {
    height: "100%",
    width: "38%",
    alignItems: "center",
    justifyContent: "center",
  },
  currentLevelText: {
    color: "white",
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 28,
  },
  levelGuidelines: {
    height: "100%",
    width: "62%",
    alignItems: "left",
    justifyContent: "center",
    gap: 5,
    padding: 5,
  },
  guidelineText: {
    color: "white",
    fontFamily: "Roboto",
    fontSize: 11,
  },
});
