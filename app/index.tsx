import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import Splash from './spalsh';

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hideAsync();
      // router.replace('/login');
    }, 2200);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Splash />
  );
}
