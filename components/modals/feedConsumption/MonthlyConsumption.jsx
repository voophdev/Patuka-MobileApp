import { Text } from "react-native";
import Headers from "../Headers";
import ConsumptionChart from "./ConsumptionChart";

const MonthlyConsumption = ({ monthlyFeedData }) => {
  const today = new Date();
  today.setHours(today.getHours() + 8);
  
  // Filter data for the last 5 months
  const lastFiveMonthsData = monthlyFeedData.filter((data) => {
    const date = new Date(data.date);
    return date >= new Date(today.getFullYear(), today.getMonth() - 5, 1);
  });

  // Group data by month
  const groupedByMonth = {};
  lastFiveMonthsData.forEach((data) => {
    const date = new Date(data.date);
    const monthKey = date.toISOString().slice(0, 7); // YYYY-MM format

    if (!groupedByMonth[monthKey]) {
      groupedByMonth[monthKey] = [];
    }

    // Aggregate the feedDispensed for each session in the current day's feedSessions
    const totalFeedForDay = data.feedSessions.reduce(
      (total, session) => total + (session.feedDispensed || 0),
      0
    );

    groupedByMonth[monthKey].push(totalFeedForDay); // Store the daily total
  });

  // Compute total feed consumption for each month
  const monthlyTotals = Object.keys(groupedByMonth).map((month) => {
    const totalFeedForMonth = groupedByMonth[month].reduce(
      (total, dailyFeed) => total + dailyFeed,
      0
    );

    return {
      month: month,
      feedDispensed: totalFeedForMonth,
    };
  });

  const sortedMonthlyTotals = monthlyTotals.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  )

  const recentMonthlyTotals = sortedMonthlyTotals.slice(-5);
  return (
    <>
      <Headers
        upperTitle={"Monthly"}
        upperColor={"#FF9635"}
        lowerTitle={"Feed Consumption"}
        lowerColor={"#FFFFFF"}
        description={
          <Text>Total feed consumption over the past 5 months.</Text>
        }
      />
      <ConsumptionChart 
        data={recentMonthlyTotals} 
        xKey='month' 
        yKeys={["feedDispensed"]} 
        title="Monthly Feed Consumption" 
        minHeight={20} 
        frequency="monthly" 
      />
    </>
  );
};

export default MonthlyConsumption;
