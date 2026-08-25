import { db } from "@/config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

interface PushPayload {
    toUserId: string;
    senderId: string;
    title: string;
    body: string;
    data?: Record<string, any>;
    chatId?: string;
}

/**
 * Send push notification to a user using Expo Push API (works on Firebase Spark Plan)
 */
export const sendPushNotification = async ({
    toUserId,
    senderId,
    title,
    body,
    data = {},
    chatId,
}: PushPayload): Promise<void> => {
    try {
        if (!toUserId || toUserId === senderId) return;

        // 1. Check if chat is muted or blocked
        if (chatId) {
            const chatSnap = await getDoc(doc(db, "chats", chatId));
            if (chatSnap.exists()) {
                const chatData = chatSnap.data();
                const mutedBy: string[] = chatData.mutedBy || [];
                const blockedBy: string[] = chatData.blockedBy || [];

                // If recipient has muted the chat, don't send push notification
                if (mutedBy.includes(toUserId)) {
                    console.log("🔕 Notification skipped: Chat is muted by recipient");
                    return;
                }

                // If either user is blocked, don't send notification
                if (blockedBy.length > 0) {
                    console.log("🚫 Notification skipped: Chat is blocked");
                    return;
                }
            }
        }

        // 2. Fetch recipient's push token from Firestore
        const userSnap = await getDoc(doc(db, "users", toUserId));
        if (!userSnap.exists()) return;

        const userData = userSnap.data();
        const pushToken = userData.pushToken;

        if (!pushToken || typeof pushToken !== "string" || !pushToken.startsWith("ExponentPushToken")) {
            return;
        }

        // 3. Dispatch to Expo Push Gateway
        const message = {
            to: pushToken,
            sound: "default",
            title: title || "New Message",
            body: body || "You received a new message",
            data: {
                ...data,
                chatId,
                senderId,
            },
            priority: "high",
            channelId: "default",
        };

        const response = await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Accept-encoding": "gzip, deflate",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
        });

        const result = await response.json();
        console.log("📲 Push notification sent:", result);
    } catch (error) {
        console.log("❌ Send push notification error:", error);
    }
};

/**
 * Save / update push token for the current user in Firestore
 */
export const updateUserPushToken = async (uid: string, token: string): Promise<void> => {
    try {
        if (!uid || !token) return;
        await updateDoc(doc(db, "users", uid), {
            pushToken: token,
        });
        console.log("✅ Push token registered for user:", uid);
    } catch (error) {
        console.log("❌ Update push token error:", error);
    }
};
