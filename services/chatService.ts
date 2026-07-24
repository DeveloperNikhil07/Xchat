import { ChatListItem } from "@/types/chat/chatListItem";

// ---- Mock data (Firebase aane tak) ----
const mockChats: ChatListItem[] = [
    {
        id: "1",
        name: "Alex",
        message: "Hey bro, what's up?",
        time: "2m",
        unread: 2,
        online: true,
        type: "personal",
        archived: false,
        image: require("@/assets/images/man.png"),
    },
    {
        id: "2",
        name: "Emma",
        message: "Typing...",
        time: "5m",
        unread: 0,
        typing: true,
        online: true,
        type: "personal",
        archived: false,
        image: require("@/assets/images/man.png"),
    },
    {
        id: "3",
        name: "John",
        message: "Voice Message",
        time: "Yesterday",
        unread: 0,
        voice: true,
        type: "personal",
        archived: false,
        image: require("@/assets/images/man.png"),
    },
    {
        id: "4",
        name: "Sarah",
        message: "See you tomorrow ❤️",
        time: "Mon",
        unread: 1,
        type: "personal",
        archived: false,
        image: require("@/assets/images/man.png"),
    },
    {
        id: "5",
        name: "Family Group",
        message: "Mom: Dinner ready",
        time: "09:15",
        unread: 0,
        type: "group",
        archived: false,
        image: require("@/assets/images/man.png"),
    },
    {
        id: "6",
        name: "Work",
        message: "Meeting at 5",
        time: "Yesterday",
        unread: 5,
        type: "group",
        archived: true,
        image: require("@/assets/images/man.png"),
    },
];

/**
 * User ki saari chats fetch karta hai.
 * FIREBASE INTEGRATION: isko Firestore query se replace karna, e.g.
 * `query(collection(db, "chats"), where("participants", "array-contains", uid), orderBy("lastMessageTime", "desc"))`
 * aur `onSnapshot`/`getDocs` se data map karke ChatListItem[] banana.
 */
export async function fetchChats(): Promise<ChatListItem[]> {
    await new Promise((res) => setTimeout(res, 300)); // simulate network
    return mockChats;
}