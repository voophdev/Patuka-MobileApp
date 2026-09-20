import { StyleSheet, View, Text } from "react-native";
import {
  Circle,
  LinearGradient,
  useFont,
  vec,
  Text as SKText
} from "@shopify/react-native-skia";
import { Area, CartesianChart, Line, useChartPressState } from "victory-native";
import { useDerivedValue } from "react-native-reanimated";

const Roboto = require("../../../assets/fonts/Roboto-Regular.ttf");

const LineChart = ({ data, label, title, color }) => {

  const font = useFont(Roboto, 9);
  const tooltipFont = useFont(Roboto, 16);

  // Calculate min and max for yKeys
  const yValues = data.map((entry) => entry.metricValue);
  const minY = Math.min(...yValues)-1;
  const maxY = Math.max(...yValues)+1.2;

  // Calculate the range and determine tickCount
  const range = maxY - minY;
  const tickCount = Math.min(10, Math.ceil(range / (range / 10))); // Ensures tickCount does not exceed 10
  const formatXLabel = (dateTimeString) => {
    const date = new Date(dateTimeString); // Create Date object from string
    let hours = date.getHours(); // Get hours
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Get minutes

    const ampm = hours >= 12 ? "PM" : "AM"; // Determine AM or PM
    hours = hours % 12 || 12; // Convert to 12-hour format (0 -> 12)

    return `${hours}:${minutes}${ampm}`; // Return formatted time as HH:mm AM/PM
  };

  const formatYLabel = (label) => {
    return (value) => {
      switch (label) {
        case "Moisture Level":
          return `${value}%`; // Format for moisture content
        case "Water Temperature":
        case "Feed Temperature":
          return `${value}°C`; // Format for feed temperature
        case "pH Level":
          return `${value} pH`; // Format for pH level
        default:
          return value.toString(); // Default format
      }
    };
  };

  const { state, isActive } = useChartPressState({ x: 0, y: { metricValue: 0 } });

  const value = useDerivedValue(() => {
    const formattedX = state.x.value.value;
    const formattedY = state.y.metricValue.value.value.toFixed(1);

    return 'Value: ' + formattedY
  }, [state])
  
  return (
    <View style={styles.chartContainer}>
      <Text style={styles.instructionText}>{title}</Text>
      <CartesianChart
        data={data}
        xKey='dateTime'
        yKeys={["metricValue"]}
        domain={{ y: [minY, maxY] }}
        chartPressState={state}
        domainPadding={{ top: 20 }}
        axisOptions={{
          font,
          labelColor: "black",
          lineColor: "#6D6D6D",
          tickCount: 4, // Set dynamic tickCount
          formatYLabel: formatYLabel(label),
          formatXLabel: formatXLabel,
        }}
      >
        {({ points, chartBounds }) => {
          return (
            <>
              <SKText
                x={chartBounds.left + 5}
                y={25}
                font={tooltipFont}
                text={value}
                color={"black"}
                style={"fill"}
              />
              <Line
                points={points.metricValue}
                color={color}
                strokeWidth={3}
                animate={{ type: "timing", duration: 500 }}
                interpolation='monotoneX'
              />
              <Area
                points={points.metricValue}
                y0={chartBounds.bottom}
                animate={{ type: "timing", duration: 500 }}
              >
                <LinearGradient
                  start={vec(chartBounds.bottom, 220)}
                  end={vec(chartBounds.bottom, chartBounds.bottom)}
                  colors={[color, `${color}50`]}
                />
              </Area>
              {isActive && (
                <Circle
                  cx={state.x.position}
                  cy={state.y.metricValue.position}
                  r={4}
                  color={"gray"}
                  opacity={0.8}
                />
              )}
            </>
          );
        }}
      </CartesianChart>
    </View>
  );
};

export default LineChart;

const styles = StyleSheet.create({
  chartContainer: {
    width: "100%",
    height: 400,
    borderRadius: 10,
    marginTop: 30,
    padding: 8,
    paddingRight: 10,
    backgroundColor: "white",
  },
  instructionText: {
    color: "gray",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 14,
  },
});
