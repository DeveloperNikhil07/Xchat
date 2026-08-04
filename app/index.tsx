import { useAuth } from "@/hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
import Splash from "./spalsh";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const router = useRouter();
  const { loading, currentUser } = useAuth();

  const [checkingOnboarding, setCheckingOnboarding] = useState(true);
  const [onboardingShown, setOnboardingShown] = useState(false);

  const hasNavigated = useRef(false);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem("onboardingShown");
        setOnboardingShown(!!value);
      } catch (error) {
        console.log("Onboarding check error:", error);
        setOnboardingShown(false);
      } finally {
        setCheckingOnboarding(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (hasNavigated.current) return;
    if (checkingOnboarding) return;
    if (loading) return; // Firebase persisted session abhi resolve ho raha hai

    hasNavigated.current = true;

    // Agar user already logged in hai, onboarding dobara mat dikhao —
    // login hone ka matlab hi hai ki wo onboarding pehle dekh chuka hai
    if (currentUser) {
      router.replace("/(tabs)/home");
      return;
    }

    if (!onboardingShown) {
      router.replace("/onboarding");
      return;
    }

    router.replace("/(auth)/login");
  }, [checkingOnboarding, loading, onboardingShown, currentUser]);

  return <Splash />;
}