import { Text } from "react-native";
import Headers from "../Headers";
import ConsumptionChart from "./ConsumptionChart";

const WeeklyConsumption = ({ monthlyFeedData = [] }) => {
  const today = new Date();
  today.setHours(today.getHours() + 8);

  const currentWeekStart = new Date(today);
  currentWeekStart.setDate(today.getDate() - today.getDay()); // Start of the current week (Sunday)

  // Filter data for the last 28 days
  const lastFourWeeksData = monthlyFeedData.filter((data) => {
    const date = new Date(data.date);
    const diffTime = today - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < 28 && diffDays >= 0;
  });

  // Group data by week
  const groupedByWeek = {};
  lastFourWeeksData.forEach((data) => {
    const date = new Date(data.date);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay()); // Get the most recent Sunday

    const weekKey = weekStart.toISOString().split("T")[0];

    if (!groupedByWeek[weekKey]) {
      groupedByWeek[weekKey] = [];
    }

    groupedByWeek[weekKey].push(data);
  });

  // Compute total feed consumption for each week
  const weeklyTotals = [];

  for (const week in groupedByWeek) {
    const totalFeedForWeek = groupedByWeek[week].reduce((total, currentDay) => {
      const dailyTotal = (currentDay.feedSessions || []).reduce(
        (dayTotal, session) => dayTotal + (session.feedDispensed ?? 0), // Fallback to 0
        0
      );
      return total + dailyTotal;
    }, 0);

    const weekStartDate = new Date(week);
    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekStartDate.getDate() + 6);

    weeklyTotals.push({
      date: weekStartDate.toISOString().split("T")[0],
      weekRange:
        `${weekStartDate.toLocaleString("default", {
          month: "2-digit",
          day: "2-digit",
        })} - ${weekEndDate.toLocaleString("default", {
          month: "2-digit",
          day: "2-digit",
        })}` || "Unknown Week Range", // Fallback for week range
      feedDispensed: totalFeedForWeek,
    });
  }

  const newWeeklyTotals = weeklyTotals.slice(-4);

  // Calculate average feed consumption per week
  const totalFeedConsumption = weeklyTotals.reduce(
    (sum, week) => sum + week.feedDispensed,
    0
  );

  const averageFeedConsumptionPerWeek =
    weeklyTotals.length > 0
      ? (totalFeedConsumption / weeklyTotals.length).toFixed(2)
      : 0;

  if (newWeeklyTotals.length === 0) {
    return (
      <Text style={{ textAlign: "center", marginTop: 20 }}>
        No data available for the last 4 weeks.
      </Text>
    );
  }

  return (
    <>
      <Headers
        upperTitle='Weekly'
        upperColor='#FF9635'
        lowerTitle='Feed Consumption'
        lowerColor='#FFFFFF'
        description={
          <>
            Weekly feed consumption average is:{" "}
            <Text style={{ fontWeight: "bold", color: "white" }}>
              {`${averageFeedConsumptionPerWeek} kg`}
            </Text>
            .
          </>
        }
      />
      <ConsumptionChart
        data={newWeeklyTotals}
        xKey='weekRange'
        yKeys={["feedDispensed"]}
        title='Weekly Feed Consumption'
        minHeight={5}
        frequency='weekly'
      />
    </>
  );
};

export default WeeklyConsumption;
