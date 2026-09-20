import { Text, StyleSheet } from "react-native";
import Headers from "../Headers";
import DailyConsumptionIcon from "./DailyConsumptionIcon";
import ConsumptionChart from "./ConsumptionChart";

const DailyConsumptionSection = ({ monthlyFeedData }) => {
  
  //Converted to Philippine Time
  const today = new Date()
  today.setHours(today.getHours() + 8);
  // Get the last 7 days of data, including today

  const lastSevenDaysData = [];
  for (let i = 0; i < 7; i++) {
    const dateToCheck = new Date(today);
    dateToCheck.setDate(today.getDate() - i); // Get the date for the last 7 days

    const dateToCheckString = dateToCheck.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
    const foundData = monthlyFeedData.find(data => data.date === dateToCheckString);

    if (foundData) {
      lastSevenDaysData.push(foundData);
    } else {
      // If no data for that day, create a placeholder object
      lastSevenDaysData.push({
        date: dateToCheckString,
        feedSessions: [{ feedDispensed: 0 }],
      });
    }
  }

  // Reverse the order to arrange from past to now
  lastSevenDaysData.reverse();

  // Compute the total feed dispensed in the last seven days
  const totalFeedLastSevenDays = lastSevenDaysData.reduce(
    (total, currentDay) => {
      const dailyTotal = currentDay.feedSessions.reduce((dayTotal, session) => {
        return dayTotal + session.feedDispensed;
      }, 0);
      return total + dailyTotal; // Sum of feed dispensed for each day
    },
    0
  );

  // Calculate average if there are any days in the last seven days
  const averageFeedLastSevenDays =
    lastSevenDaysData.length > 0
      ? totalFeedLastSevenDays / lastSevenDaysData.length
      : 0;

  // Function to aggregate feed data
const aggregateFeedData = (data) => {
  return data.map((day) => {
    const totalFeedDispensed = day.feedSessions.reduce((total, session) => {
      return total + (session.feedDispensed ?? 0); // Handle undefined values
    }, 0);

    return {
      date: day.date,
      feedDispensed: totalFeedDispensed,
    };
  });
};

  // Aggregate the last seven days data
  const dailyTotals = aggregateFeedData(lastSevenDaysData);

  if (!dailyTotals || dailyTotals.length === 0) {
    return (
      <Text style={styles.noDataText}>
        No data available for this period.
      </Text>
    );
  }

  return (
    <>
      <Headers
        upperTitle={"Average Daily"}
        upperColor={"#FF9635"}
        lowerTitle={"Feed Consumption"}
        lowerColor={"#FFFFFF"}
        description={"Shows the average feed consumed per day for the past 7 days."}
      />
      <DailyConsumptionIcon
        averageFeedLastSevenDays={averageFeedLastSevenDays}
      />
      <Text style={styles.graphDescription}>
        Check the bar graph to track daily feed dispensed over the last 7 days.
      </Text>
      <ConsumptionChart 
        data={dailyTotals} 
        xKey='date' 
        yKeys={["feedDispensed"]} 
        title="Daily Feed Consumption" 
        minHeight={5} 
        frequency="daily" 
      />
    </>
  );
};

export default DailyConsumptionSection;

const styles = StyleSheet.create({
  graphDescription: {
    color: "#CBB2FE",
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    width: "100%",
  },
});
