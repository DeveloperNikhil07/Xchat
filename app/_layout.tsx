import AppProvider from "@/providers/AppProvider";
import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none",
          contentStyle: {
            backgroundColor: "transparent",
          },
        }}
      />
    </AppProvider>
  );
}