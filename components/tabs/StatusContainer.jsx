// components/tabs/StatusContainer.jsx
import { StyleSheet, Text, View } from "react-native";

export default function StatusContainer({ status, metrics }) {
  return (
    <View style={styles.lowerSectionContainer}>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
      <View style={styles.sensorsContainer}>
        {metrics.map((metric, index) => (
          <View key={index} style={styles.miniContainer}>
            <Text style={styles.level}>{metric.value}</Text>
            <Text style={styles.levelName}>{metric.label}</Text>
            {index < metrics.length - 1 && <View style={styles.spacer}></View>}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lowerSectionContainer: {
    display: "flex",
    height: "20%",
    width: "90%",
    padding: 10,
    marginTop: 5,
  },
  statusContainer: {
    color: "white",
    justifyContent: "center",
    minHeight: 40,
  },
  statusText: {
    fontFamily: "Roboto-Light",
    textAlign: "center",
    color: "white",
    fontSize: 14.5,
    justifyContent: "center",
  },
  sensorsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
    maxHeight: "100%",
    marginTop: 3,
  },
  miniContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 0.2,
  },
  level: {
    fontFamily: "RobotoMono-Bold",
    fontSize: 29,
    color: "white",
  },
  levelName: {
    fontFamily: "Roboto-Light",
    fontSize: 14,
    color: "white",
  },
  spacer: {
    width: 10, // Adjust as needed for spacing
  },
});
