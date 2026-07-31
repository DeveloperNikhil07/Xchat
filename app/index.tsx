import { useAuth } from "@/hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
import Splash from "./spalsh";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const router = useRouter();
  const { loading, currentUser } = useAuth(); // loading = Firebase auth + user doc load ho raha hai

  const [checkingOnboarding, setCheckingOnboarding] = useState(true);
  const [onboardingShown, setOnboardingShown] = useState(false);

  const hasNavigated = useRef(false);

  // Native splash hata do, custom animated Splash le lega
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  // Onboarding flag check — ye Firebase se independent hai
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

  // Jab tak onboarding check + firebase auth dono ready na ho, kuch mat karo
  useEffect(() => {
    if (hasNavigated.current) return;
    if (checkingOnboarding) return;
    if (loading) return; // Firebase abhi user resolve kar raha hai

    hasNavigated.current = true;

    if (!onboardingShown) {
      router.replace("/onboarding");
      return;
    }

    if (currentUser) {
      router.replace("/(tabs)/home");
      return;
    }

    router.replace("/(auth)/login");
  }, [checkingOnboarding, loading, onboardingShown, currentUser]);

  return <Splash />;
}