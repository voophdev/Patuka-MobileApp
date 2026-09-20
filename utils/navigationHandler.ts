import { useRouter } from "expo-router";

export const navigateToOnboarding = (router: any) => {
  router.replace("(onboarding)");
};

export const navigateToHome = (router: any) => {
  router.replace("(tabs)");
};
