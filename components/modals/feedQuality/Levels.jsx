import { StyleSheet, View } from "react-native";
import MinMaxLevel from "./MinMaxLevel";
import CurrentLevel from "./CurrentLevel";

const guidelines = {
  "Humidity Level": [
    {
      title: "Safe",
      range: "60% to 75%",
      description:
        "Maintains feed quality and reduces mold risk under tropical conditions.",
    },
    {
      title: "Warning",
      range: "76% to 85%",
      description:
        "Monitor closely; higher humidity can encourage mold growth.",
    },
    {
      title: "Unsafe",
      range: "Above 85%",
      description: "High risk of spoilage and mold formation.",
    },
  ],
  "Feed Temperature": [
    {
      title: "Safe",
      range: "20°C to 30°C",
      description:
        "Within the normal ambient temperature range in the Philippines.",
    },
    {
      title: "Warning",
      range: "31°C to 34°C",
      description: "Monitor feed closely; spoilage can occur.",
    },
    {
      title: "Unsafe",
      range: "Above 34°C",
      description: "Increased risk of mold growth and nutrient degradation.",
    },
  ],
  "pH Level": [
    {
      title: "Safe",
      range: "6.5 to 8.0",
      description: "Optimal pH level for chicken drinking water.",
    },
    {
      title: "Warning",
      range: "6.0 to 6.4 or 8.1 to 8.5",
      description: "Monitor for imbalances that could stress chickens.",
    },
    {
      title: "Unsafe",
      range: "Below 6.0 or Above 8.5",
      description: "Water outside this range can harm chickens.",
    },
  ],
  "Water Temperature": [
    {
      title: "Safe",
      range: "20°C to 28°C",
      description: "Ideal range to encourage healthy water intake.",
    },
    {
      title: "Warning",
      range: "29°C to 32°C",
      description: "Monitor closely; warmer water may reduce drinking.",
    },
    {
      title: "Unsafe",
      range: "Above 32°C",
      description:
        "High temperature promotes bacterial growth and can affect chicken health.",
    },
  ],
};

const Levels = ({ currentValue, minValue, maxValue, label, color }) => {
  const convertedCurrentValue = parseFloat(currentValue);
  return (
    <View style={styles.levelsContainer}>
      <View style={styles.upperSection}>
        <MinMaxLevel title={`Min ${label}`} value={minValue} color={color} />
        <MinMaxLevel title={`Max ${label}`} value={maxValue} color={color} />
      </View>
      <View style={styles.lowerSection}>
        <CurrentLevel
          title={`Current ${label}`}
          currentValue={currentValue}
          convertedCurrentValue={convertedCurrentValue}
          label={label}
          guidelines={guidelines}
          color={color}
        />
      </View>
    </View>
  );
};

export default Levels;

const styles = StyleSheet.create({
  levelsContainer: {
    marginTop: 30,
    height: 380,
  },
  upperSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "50%",
  },
  lowerSection: {
    height: "50%",
  },
});
