import { db } from "@/config/firebase";
import {
    doc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";

export const startTyping = async (
    chatId: string,
    uid: string,
    name: string
) => {
    console.log("START TYPING");
    console.log(chatId);
    console.log(uid);

    await updateDoc(
        doc(db, "chats", chatId),
        {
            typing: {
                uid,
                name,
                isTyping: true,
            },
        }
    );

    console.log("UPDATED");
};

export const stopTyping = async (
    chatId: string
) => {
    try {
        await updateDoc(doc(db, "chats", chatId), {
            typing: {
                uid: "",
                name: "",
                isTyping: false,
            },
        });
    } catch (error) {
        console.log("Stop Typing Error:", error);
    }
};

export const listenTyping = (
  chatId: string,
  callback: (typing: any) => void
) => {
  return onSnapshot(doc(db, "chats", chatId), (snapshot) => {

    console.log("Snapshot Exists:", snapshot.exists());

    if (!snapshot.exists()) return;

    console.log("Typing Data:", snapshot.data().typing);

    callback(snapshot.data().typing);
  });
};