import { StyleSheet, Text, View } from "react-native";
import { CartesianChart, Bar, useChartPressState } from "victory-native";
import {
  LinearGradient,
  Text as SKText,
  Circle,
  useFont,
  vec,
} from "@shopify/react-native-skia";
import { useDerivedValue } from "react-native-reanimated";

const ConsumptionChart = ({ data, xKey, yKeys, title, minHeight, frequency }) => {
  const Roboto = require("../../../assets/fonts/Roboto-Regular.ttf");
  const tooltipFont = useFont(Roboto, 11);
  const { state, isActive } = useChartPressState({
    x: 0,
    y: { feedDispensed: 0 },
  });

  const value = useDerivedValue(() => {
    return state.y.feedDispensed.value.value
      ? state.y.feedDispensed.value.value.toFixed(1) + " kg"
      : "";
  }, [state]);

  const textYPosition = useDerivedValue(() => {
    return state.y.feedDispensed.position.value - 15; // Adjust tooltip position
  }, [state]);

  const textXPosition = useDerivedValue(() => {
    if (!tooltipFont) {
      return 0;
    }
    return (
      state.x.position.value - tooltipFont.measureText(value.value).width / 2
    );
  }, [state, tooltipFont]);

  // Check if data is available
  if (!data || data.length === 0) {
    return <Text style={styles.noDataText}>No data available for this period.</Text>;
  }

  // Dynamic Y domain calculation
  const maxFeedDispensed = Math.max(
    ...data.map((item) => item.feedDispensed || 0),
    minHeight // Fallback if no data is found
  );

  // Determine tick count, bar width, and domain padding based on frequency
  let tickCount = 0;
  let formatXLabel = (value) => value; // Default format
  let barWidth = 0;
  let domainPadding = {};

  switch (frequency) {
    case "daily":
      tickCount = 7;
      formatXLabel = (value) => {
        const date = new Date(value);
        return date.toLocaleString("default", {
          month: "short",
          day: "2-digit",
        });
      };
      barWidth = 32;
      domainPadding = { left: 35, right: 35, top: 20 };
      break;

    case "weekly":
      tickCount = 4;
      formatXLabel = (value) => {
        // Parse week ranges as a string instead of a Date
        return value || ""; // Provide fallback for undefined values
      };
      barWidth = 65;
      domainPadding = { left: 50, right: 50, top: 20 };
      break;

    case "monthly":
      tickCount = 5;
      formatXLabel = (month) => {
        const date = new Date(month); // Convert month string/number to Date
        return date.toLocaleString("default", {
          month: "short",
          year: "numeric",
        });
      };
      barWidth = 50;
      domainPadding = { left: 50, right: 50, top: 20 };
      break;

    default:
      break;
  }

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.instructionText}>{title}</Text>
      <CartesianChart
        data={data}
        xKey={xKey}
        yKeys={yKeys}
        chartPressState={state}
        padding={2}
        domain={{ y: [0, maxFeedDispensed] }} // Use dynamic max
        domainPadding={domainPadding} // Custom domain padding
        axisOptions={{
          font: tooltipFont,
          labelColor: "black",
          lineColor: "#6D6D6D",
          tickCount: tickCount,
          formatYLabel: (value) => `${value} kg`, // Format Y-axis labels
          formatXLabel: formatXLabel, // Custom format for X-axis labels
        }}
      >
        {({ points, chartBounds }) => (
          <>
            <Bar
              points={points.feedDispensed}
              chartBounds={chartBounds}
              animate={{ type: "timing", duration: 1000 }}
              roundedCorners={{ topLeft: 4, topRight: 4 }} // Rounded corners for aesthetics
              barWidth={barWidth} // Custom bar width
            >
              <LinearGradient
                start={vec(0, 0)}
                end={vec(0, 400)}
                colors={["#7E3285", "#CBB2FE69"]} // Gradient colors for bars
              />
            </Bar>
            {isActive && ( // Show tooltip and circle when bar is pressed
              <>
                <SKText
                  font={tooltipFont}
                  color={"black"}
                  x={textXPosition}
                  y={textYPosition}
                  text={value}
                />
                <Circle
                  cx={state.x.position}
                  cy={state.y.feedDispensed.position}
                  r={4}
                  color='black'
                  opacity={0.6}
                />
              </>
            )}
          </>
        )}
      </CartesianChart>
    </View>
  );
};

export default ConsumptionChart;

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
  noDataText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});
