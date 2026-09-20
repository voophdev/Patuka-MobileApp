import { StyleSheet, Text, View } from 'react-native'
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const DailyIcon = ({ averageFeedLastSevenDays }) => {
  return (
    <View style={styles.dailyFeedConsumptionIconContainer}>
      <View style={styles.iconContainer}>
        <FontAwesome5 name='weight-hanging' size={234} color='#FF9635' />
        <Text style={styles.kgText}>{averageFeedLastSevenDays.toFixed(1)}kg</Text>
      </View>
    </View>
  );
};

export default DailyIcon

const styles = StyleSheet.create({
  dailyFeedConsumptionIconContainer: {
    marginTop: 15,
  },
  iconContainer: {
    position: "relative",
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  kgText: {
    position: "absolute",
    color: "#FFFFFF",
    fontSize: 35,
    fontWeight: "bold",
    paddingTop: 50,
  },
});