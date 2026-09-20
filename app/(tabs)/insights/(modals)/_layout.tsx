import { Stack } from "expo-router";

export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='feedConsumption'
        options={{
          title: "Feed Consumption",
          presentation: "modal", 
        }}
      />
      <Stack.Screen
        name='feedQuality'
        options={{
          title: "Feed Quality",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name='waterQuality'
        options={{
          title: "Water Quality",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
