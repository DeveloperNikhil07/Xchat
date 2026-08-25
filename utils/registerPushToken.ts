import { NativeModules, Platform } from "react-native";
import { updateUserPushToken } from "@/services/notification.service";

/**
 * Safely check if a native Expo module is actually compiled into the running app binary.
 * Prevents expo-modules-core from logging "Cannot find native module" error.
 */
function hasNativeModule(moduleName: string): boolean {
    try {
        const globalExpo = (globalThis as any).expo;
        if (globalExpo?.modules && globalExpo.modules[moduleName]) {
            return true;
        }
        if (NativeModules && (NativeModules[moduleName] || NativeModules[`Exponent${moduleName}`])) {
            return true;
        }
        return false;
    } catch {
        return false;
    }
}

/**
 * Request notification permission and register Expo push token for the user.
 * Works on Firebase Spark plan — no backend needed.
 * Completely safe against missing native modules in Expo Go / Dev Clients without re-build.
 */
export async function registerForPushNotificationsAsync(uid: string): Promise<void> {
    try {
        // 1. Guard check: Only proceed if native PushTokenManager exists in binary
        if (!hasNativeModule("ExpoPushTokenManager")) {
            return;
        }

        // 2. Safe lazy require
        let Notifications: typeof import("expo-notifications");
        try {
            Notifications = require("expo-notifications");
        } catch {
            return;
        }

        if (!Notifications || typeof Notifications.getExpoPushTokenAsync !== "function") {
            return;
        }

        // 3. Set foreground handler
        try {
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: true,
                    shouldSetBadge: true,
                    shouldShowBanner: true,
                    shouldShowList: true,
                }),
            });
        } catch {}

        // 4. Android notification channel
        if (Platform.OS === "android") {
            try {
                await Notifications.setNotificationChannelAsync("default", {
                    name: "Default",
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: "#25D366",
                    sound: "default",
                    enableVibrate: true,
                });
            } catch {}
        }

        // 5. Request permission
        const permissionRes = await Notifications.getPermissionsAsync().catch(() => null);
        let finalStatus = permissionRes?.status;

        if (finalStatus !== "granted") {
            const reqRes = await Notifications.requestPermissionsAsync().catch(() => null);
            finalStatus = reqRes?.status;
        }

        if (finalStatus !== "granted") {
            return;
        }

        // 6. Get Expo push token
        const tokenData = await Notifications.getExpoPushTokenAsync().catch(() => null);

        if (tokenData?.data && uid) {
            console.log("📲 Push token registered:", tokenData.data);
            await updateUserPushToken(uid, tokenData.data);
        }
    } catch {
        // Silent safety fallback
    }
}