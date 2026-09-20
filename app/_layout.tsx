import { Stack } from "expo-router";
import { OnboardingProvider } from "../context/OnboardingContext";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  //Load downloaded fonts
  const [loaded, error] = useFonts({
    'RobotoMono-Bold': require('../assets/fonts/RobotoMono-Bold.ttf'),
    'RobotoMono-Light': require('../assets/fonts/RobotoMono-Light.ttf'),
    'RobotoMono-Regular': require('../assets/fonts/RobotoMono-Regular.ttf'),
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
    'Roboto' : require('../assets/fonts/Roboto-Regular.ttf'),
  })

  useEffect(() => {
    if(loaded||error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error])

  if(!loaded && !error) {
    return null;
  }

  return (
    <OnboardingProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='(onboarding)' />
        <Stack.Screen name='(tabs)' />
      </Stack>
    </OnboardingProvider>
  );
}
