import {
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    serverTimestamp,
    setDoc,
    where,
} from "firebase/firestore";

import { auth, db } from "@/config/firebase";

import { ChatListItem } from "@/types/chat/chatListItem";
import { RecentUser } from "@/types/chat/recentUser.types";

const USERS = "users";
const CHATS = "chats";


// ------------------------------------------------------
// Create Chat
// ------------------------------------------------------

export const createChat = async (
    currentUid: string,
    otherUid: string
) => {
    try {
        console.log("CREATE CHAT START");

        // Duplicate check
        const exist = await getChatByParticipants(
            currentUid,
            otherUid
        );

        if (exist) {
            console.log("Chat already exists");
            return exist.id;
        }

        const ref = doc(collection(db, CHATS));

        await setDoc(ref, {
            participants: [
                currentUid,
                otherUid
            ],

            isGroup: false,

            lastMessage: {
                text: "",
                senderId: "",
                createdAt: null,
            },

            unreadCount: {
                [currentUid]: 0,
                [otherUid]: 0,
            },

            lastMessageTime: serverTimestamp(),

            createdAt: serverTimestamp(),
        });

        console.log("Chat Created :", ref.id);

        return ref.id;
    } catch (error) {
        console.log(
            "createChat Error =>",
            error
        );
        throw error;
    }
};



// ------------------------------------------------------
// Get Existing Chat
// ------------------------------------------------------

export const getChatByParticipants = async (
    uid1: string,
    uid2: string
) => {
    try {
        console.log("Checking existing chat...");

        const q = query(
            collection(db, CHATS),
            where("participants", "array-contains", uid1)
        );

        const snapshot = await getDocs(q);

        for (const item of snapshot.docs) {
            const data = item.data();

            const participants: string[] =
                data.participants || [];

            if (participants.includes(uid2)) {
                return {
                    id: item.id,
                    ...data,
                };
            }
        }

        return null;
    } catch (error) {
        console.log(
            "getChatByParticipants Error =>",
            error
        );

        // Agar permission issue hai to naya chat create hone do
        return null;
    }
};




// ------------------------------------------------------
// Fetch Recent Users
// ------------------------------------------------------

export const fetchRecentUsers =
    async (): Promise<RecentUser[]> => {

        const uid =
            auth.currentUser?.uid;

        if (!uid) return [];

        const q = query(
            collection(db, CHATS),
            where(
                "participants",
                "array-contains",
                uid
            )
        );

        const snapshot =
            await getDocs(q);

        const users: RecentUser[] = [];

        for (const item of snapshot.docs) {

            const chat = item.data();

            // ❌ Message nahi hua to Recent me mat dikhao
            if (!chat.lastMessage?.createdAt) {
                continue;
            }

            const otherUserId = chat.participants.find(
                (id: string) => id !== uid
            );

            if (!otherUserId)
                continue;

            const userSnap =
                await getDoc(
                    doc(
                        db,
                        USERS,
                        otherUserId
                    )
                );

            if (!userSnap.exists())
                continue;

            const user =
                userSnap.data();

            users.push({
                uid: user.uid,
                chatId: item.id,
                displayName: user.displayName,
                username: user.username,
                photoURL: user.photoURL,
                isOnline: user.isOnline,
                lastSeen: user.lastSeen,

                lastMessageTime:
                    chat.lastMessage.createdAt.toMillis(),
            });

        }
        users.sort(
            (a, b) =>
                (b.lastMessageTime ?? 0) -
                (a.lastMessageTime ?? 0)
        );
        return users;

    };




// ------------------------------------------------------
// Fetch Chat List
// ------------------------------------------------------

export const fetchChats =
    async (): Promise<
        ChatListItem[]
    > => {

        const uid =
            auth.currentUser?.uid;

        if (!uid) return [];

        const q = query(
            collection(db, CHATS),
            where(
                "participants",
                "array-contains",
                uid
            )
        );

        const snapshot =
            await getDocs(q);

        const chats: ChatListItem[] =
            [];

        for (const item of snapshot.docs) {

            const data =
                item.data();

            const otherUid =
                data.participants.find(
                    (
                        id: string
                    ) =>
                        id !== uid
                );

            if (!otherUid)
                continue;

            const userSnap =
                await getDoc(
                    doc(
                        db,
                        USERS,
                        otherUid
                    )
                );

            if (!userSnap.exists())
                continue;

            const user =
                userSnap.data();

            chats.push({

                id: item.id,

                name:
                    user.displayName,

                image:
                    user.photoURL,

                online:
                    user.isOnline,

                message: data.lastMessage?.text || "Start chatting",

                unread: 0,

                typing: data.typing?.isTyping && data.typing?.uid !== uid ? data.typing.name : "",

                voice: false,

                archived: false,

                type: "personal",

                time: "",

            });

        }

        chats.sort((a, b) => 0);

        return chats;

    };

// ------------------------------------------------------
// Listen Chats (Realtime)
// ------------------------------------------------------

export const listenChats = (
    callback: (chats: ChatListItem[]) => void
) => {
    const uid = auth.currentUser?.uid;

    if (!uid) {
        callback([]);
        return () => { };
    }

    const q = query(
        collection(db, CHATS),
        where("participants", "array-contains", uid)
    );

    return onSnapshot(q, async (snapshot) => {
        const chats = await Promise.all(
            snapshot.docs.map(async (item) => {
                const data = item.data();

                const otherUid = data.participants.find(
                    (id: string) => id !== uid
                );

                if (!otherUid) return null;

                const userSnap = await getDoc(
                    doc(db, USERS, otherUid)
                );

                if (!userSnap.exists()) return null;

                const user = userSnap.data();

                const isTyping =
                    data.typing?.isTyping &&
                    data.typing?.uid !== uid;

                return {
                    id: item.id,
                    name: user.displayName,
                    image: user.photoURL,
                    online: user.isOnline,

                    message: isTyping
                        ? "Typing..."
                        : data.unreadCount?.[uid] > 0
                            ? `${data.unreadCount[uid]} new messages`
                            : data.lastMessage?.text || "Start chatting",

                    unread: data.unreadCount?.[uid] || 0,

                    typing: isTyping,

                    voice: false,
                    archived: false,
                    type: "private",
                    time: "",
                    lastMessageTime:
                        data.lastMessage?.createdAt?.toMillis?.() ??
                        data.createdAt?.toMillis?.() ??
                        0,
                };
            })
        );

        callback(
            chats
                .filter(Boolean)
                .sort(
                    (a: any, b: any) =>
                        b.lastMessageTime - a.lastMessageTime
                ) as ChatListItem[]
        );
    });
};

// ------------------------------------------------------
// Listen Recent Users (Realtime)
// ------------------------------------------------------

export const listenRecentUsers = (
    callback: (users: RecentUser[]) => void
) => {
    const uid = auth.currentUser?.uid;

    if (!uid) {
        callback([]);
        return () => { };
    }

    const q = query(
        collection(db, CHATS),
        where("participants", "array-contains", uid)
    );

    return onSnapshot(q, async (snapshot) => {
        const users = await Promise.all(
            snapshot.docs.map(async (item) => {
                const chat = item.data();

                // Message nahi hua to Recent me mat dikhao
                if (!chat.lastMessage?.createdAt) {
                    return null;
                }

                const otherUserId = chat.participants.find(
                    (id: string) => id !== uid
                );

                if (!otherUserId) return null;

                const userSnap = await getDoc(
                    doc(db, USERS, otherUserId)
                );

                if (!userSnap.exists()) return null;

                const user = userSnap.data();

                return {
                    uid: user.uid,
                    chatId: item.id,
                    displayName: user.displayName,
                    username: user.username,
                    photoURL: user.photoURL,
                    isOnline: user.isOnline,
                    lastSeen: user.lastSeen,
                    lastMessageTime:
                        chat.lastMessage?.createdAt?.toMillis?.() ?? 0,
                } as RecentUser;
            })
        );

        const filteredUsers = users
            .filter(Boolean)
            .sort(
                (a: any, b: any) =>
                    b.lastMessageTime - a.lastMessageTime
            ) as RecentUser[];

        callback(filteredUsers);
    });
};
