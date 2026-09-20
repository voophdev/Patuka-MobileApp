import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useOnboarding } from "../../context/OnboardingContext";

export default function OnboardingLayout() {
  const { onboarded } = useOnboarding();
  const router = useRouter();

  useEffect(() => {
    if (onboarded) {
      router.replace("(tabs)");
    }
  }, [onboarded]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='connect' />
      <Stack.Screen name='connectNetwork' />
      <Stack.Screen name='verify' />
      <Stack.Screen name='end' />
    </Stack>
  );
}
