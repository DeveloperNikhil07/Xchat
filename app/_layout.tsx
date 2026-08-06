import AppProvider from "@/providers/AppProvider";
import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <KeyboardProvider>
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
    </KeyboardProvider>
  );
}