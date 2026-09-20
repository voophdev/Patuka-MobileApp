import { Stack } from "expo-router"

const InsightsIndex = () => {
  return (
   <Stack
   screenOptions={{ headerShown: false }}
   >
    <Stack.Screen name="index" />
   </Stack>
  )
}

export default InsightsIndex;