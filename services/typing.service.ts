import { db } from "@/config/firebase";
import {
    doc,
    getDoc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";

export const startTyping = async (
    chatId: string,
    uid: string,
    name: string
) => {
    try {
        console.log("START TYPING");
        console.log("Chat ID:", chatId);
        console.log("UID:", uid);
        console.log("Name:", name);

        const chatRef = doc(db, "chats", chatId);

        const snapshot = await getDoc(chatRef);

        console.log("Chat Exists:", snapshot.exists());

        if (!snapshot.exists()) {
            console.log(
                "❌ Typing skipped: Chat document does not exist:",
                chatId
            );
            return;
        }

        await updateDoc(chatRef, {
            typing: {
                uid,
                name,
                isTyping: true,
            },
        });

        console.log("✅ START TYPING UPDATED");

    } catch (error) {
        console.log("❌ Start Typing Error:", error);
    }
};


export const stopTyping = async (
    chatId: string
) => {

    try {

        console.log("STOP TYPING");
        console.log("Chat ID:", chatId);

        const chatRef = doc(db, "chats", chatId);

        const snapshot = await getDoc(chatRef);

        if (!snapshot.exists()) {
            console.log(
                "❌ Stop typing skipped: Chat document does not exist:",
                chatId
            );
            return;
        }

        await updateDoc(chatRef, {
            typing: {
                uid: "",
                name: "",
                isTyping: false,
            },
        });

        console.log("✅ STOP TYPING UPDATED");

    } catch (error) {

        console.log(
            "❌ Stop Typing Error:",
            error
        );

    }
};


export const listenTyping = (
    chatId: string,
    callback: (typing: any) => void
) => {

    const chatRef = doc(db, "chats", chatId);

    return onSnapshot(chatRef, (snapshot) => {

        console.log(
            "Typing Chat:",
            chatId
        );

        console.log(
            "Snapshot Exists:",
            snapshot.exists()
        );

        if (!snapshot.exists()) {
            console.log(
                "❌ Typing listener: chat does not exist"
            );

            callback({
                uid: "",
                name: "",
                isTyping: false,
            });

            return;
        }

        const typing = snapshot.data()?.typing;

        console.log(
            "Typing Data:",
            typing
        );

        callback(
            typing ?? {
                uid: "",
                name: "",
                isTyping: false,
            }
        );

    }, (error) => {
        if (error?.code === "permission-denied" || error?.message?.includes("permission-denied")) {
            return;
        }
        console.log("Typing listener error:", error.message);
    });

};