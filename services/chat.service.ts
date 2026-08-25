// import {
//     collection,
//     doc,
//     getDoc,
//     getDocs,
//     onSnapshot,
//     query,
//     serverTimestamp,
//     setDoc,
//     where,
// } from "firebase/firestore";

// import { auth, db } from "@/config/firebase";

// import { ChatListItem } from "@/types/chat/chatListItem";
// import { RecentUser } from "@/types/chat/recentUser.types";

// const USERS = "users";
// const CHATS = "chats";


// // ------------------------------------------------------
// // Create Chat
// // ------------------------------------------------------

// export const createChat = async (
//     currentUid: string,
//     otherUid: string
// ) => {
//     try {
//         console.log("CREATE CHAT START");

//         // Duplicate check
//         const exist = await getChatByParticipants(
//             currentUid,
//             otherUid
//         );

//         if (exist) {
//             console.log("Chat already exists");
//             return exist.id;
//         }

//         const ref = doc(collection(db, CHATS));

//         await setDoc(ref, {
//             participants: [
//                 currentUid,
//                 otherUid
//             ],

//             isGroup: false,

//             lastMessage: {
//                 text: "",
//                 senderId: "",
//                 createdAt: null,
//             },

//             unreadCount: {
//                 [currentUid]: 0,
//                 [otherUid]: 0,
//             },

//             lastMessageTime: serverTimestamp(),

//             createdAt: serverTimestamp(),
//         });

//         console.log("Chat Created :", ref.id);

//         return ref.id;
//     } catch (error) {
//         console.log(
//             "createChat Error =>",
//             error
//         );
//         throw error;
//     }
// };



// // ------------------------------------------------------
// // Get Existing Chat
// // ------------------------------------------------------

// export const getChatByParticipants = async (
//     uid1: string,
//     uid2: string
// ) => {
//     try {
//         console.log("Checking existing chat...");

//         const q = query(
//             collection(db, CHATS),
//             where("participants", "array-contains", uid1)
//         );

//         const snapshot = await getDocs(q);

//         for (const item of snapshot.docs) {
//             const data = item.data();

//             const participants: string[] =
//                 data.participants || [];

//             if (participants.includes(uid2)) {
//                 return {
//                     id: item.id,
//                     ...data,
//                 };
//             }
//         }

//         return null;
//     } catch (error) {
//         console.log(
//             "getChatByParticipants Error =>",
//             error
//         );

//         // Agar permission issue hai to naya chat create hone do
//         return null;
//     }
// };




// // ------------------------------------------------------
// // Fetch Recent Users
// // ------------------------------------------------------

// export const fetchRecentUsers =
//     async (): Promise<RecentUser[]> => {

//         const uid =
//             auth.currentUser?.uid;

//         if (!uid) return [];

//         const q = query(
//             collection(db, CHATS),
//             where(
//                 "participants",
//                 "array-contains",
//                 uid
//             )
//         );

//         const snapshot =
//             await getDocs(q);

//         const users: RecentUser[] = [];

//         for (const item of snapshot.docs) {

//             const chat = item.data();

//             // ❌ Message nahi hua to Recent me mat dikhao
//             if (!chat.lastMessage?.createdAt) {
//                 continue;
//             }

//             const otherUserId = chat.participants.find(
//                 (id: string) => id !== uid
//             );

//             if (!otherUserId)
//                 continue;

//             const userSnap =
//                 await getDoc(
//                     doc(
//                         db,
//                         USERS,
//                         otherUserId
//                     )
//                 );

//             if (!userSnap.exists())
//                 continue;

//             const user =
//                 userSnap.data();

//             users.push({
//                 uid: user.uid,
//                 chatId: item.id,
//                 displayName: user.displayName,
//                 username: user.username,
//                 photoURL: user.photoURL,
//                 isOnline: user.isOnline,
//                 lastSeen: user.lastSeen,

//                 lastMessageTime:
//                     chat.lastMessage.createdAt.toMillis(),
//             });

//         }
//         users.sort(
//             (a, b) =>
//                 (b.lastMessageTime ?? 0) -
//                 (a.lastMessageTime ?? 0)
//         );
//         return users;

//     };




// // ------------------------------------------------------
// // Fetch Chat List
// // ------------------------------------------------------

// export const fetchChats =
//     async (): Promise<
//         ChatListItem[]
//     > => {

//         const uid =
//             auth.currentUser?.uid;

//         if (!uid) return [];

//         const q = query(
//             collection(db, CHATS),
//             where(
//                 "participants",
//                 "array-contains",
//                 uid
//             )
//         );

//         const snapshot =
//             await getDocs(q);

//         const chats: ChatListItem[] =
//             [];

//         for (const item of snapshot.docs) {

//             const data =
//                 item.data();

//             const otherUid =
//                 data.participants.find(
//                     (
//                         id: string
//                     ) =>
//                         id !== uid
//                 );

//             if (!otherUid)
//                 continue;

//             const userSnap =
//                 await getDoc(
//                     doc(
//                         db,
//                         USERS,
//                         otherUid
//                     )
//                 );

//             if (!userSnap.exists())
//                 continue;

//             const user =
//                 userSnap.data();

//             chats.push({

//                 id: item.id,

//                 name:
//                     user.displayName,

//                 image:
//                     user.photoURL,

//                 online:
//                     user.isOnline,

//                 message: data.lastMessage?.text || "Start chatting",

//                 unread: 0,

//                 typing: data.typing?.isTyping && data.typing?.uid !== uid ? data.typing.name : "",

//                 voice: false,

//                 archived: false,

//                 type: "personal",

//                 time: "",

//             });

//         }

//         chats.sort((a, b) => 0);

//         return chats;

//     };

// // ------------------------------------------------------
// // Listen Chats (Realtime)
// // ------------------------------------------------------

// export const listenChats = (
//     callback: (chats: ChatListItem[]) => void
// ) => {
//     const uid = auth.currentUser?.uid;

//     if (!uid) {
//         callback([]);
//         return () => { };
//     }

//     const q = query(
//         collection(db, CHATS),
//         where("participants", "array-contains", uid)
//     );

//     return onSnapshot(q, async (snapshot) => {
//         const chats = await Promise.all(
//             snapshot.docs.map(async (item) => {
//                 const data = item.data();

//                 const otherUid = data.participants.find(
//                     (id: string) => id !== uid
//                 );

//                 if (!otherUid) return null;

//                 const userSnap = await getDoc(
//                     doc(db, USERS, otherUid)
//                 );

//                 if (!userSnap.exists()) return null;

//                 const user = userSnap.data();

//                 const isTyping =
//                     data.typing?.isTyping &&
//                     data.typing?.uid !== uid;

//                 return {
//                     id: item.id,
//                     name: user.displayName,
//                     image: user.photoURL,
//                     online: user.isOnline,

//                     message: isTyping
//                         ? "Typing..."
//                         : data.unreadCount?.[uid] > 0
//                             ? `${data.unreadCount[uid]} new messages`
//                             : data.lastMessage?.text || "Start chatting",

//                     unread: data.unreadCount?.[uid] || 0,

//                     typing: isTyping,

//                     voice: false,
//                     archived: false,
//                     type: "private",
//                     time: "",
//                     lastMessageTime:
//                         data.lastMessage?.createdAt?.toMillis?.() ??
//                         data.createdAt?.toMillis?.() ??
//                         0,
//                 };
//             })
//         );

//         callback(
//             chats
//                 .filter(Boolean)
//                 .sort(
//                     (a: any, b: any) =>
//                         b.lastMessageTime - a.lastMessageTime
//                 ) as ChatListItem[]
//         );
//     });
// };

// // ------------------------------------------------------
// // Listen Recent Users (Realtime)
// // ------------------------------------------------------

// export const listenRecentUsers = (
//     callback: (users: RecentUser[]) => void
// ) => {
//     const uid = auth.currentUser?.uid;

//     if (!uid) {
//         callback([]);
//         return () => { };
//     }

//     const q = query(
//         collection(db, CHATS),
//         where("participants", "array-contains", uid)
//     );

//     return onSnapshot(q, async (snapshot) => {
//         const users = await Promise.all(
//             snapshot.docs.map(async (item) => {
//                 const chat = item.data();

//                 // Message nahi hua to Recent me mat dikhao
//                 if (!chat.lastMessage?.createdAt) {
//                     return null;
//                 }

//                 const otherUserId = chat.participants.find(
//                     (id: string) => id !== uid
//                 );

//                 if (!otherUserId) return null;

//                 const userSnap = await getDoc(
//                     doc(db, USERS, otherUserId)
//                 );

//                 if (!userSnap.exists()) return null;

//                 const user = userSnap.data();

//                 return {
//                     uid: user.uid,
//                     chatId: item.id,
//                     displayName: user.displayName,
//                     username: user.username,
//                     photoURL: user.photoURL,
//                     isOnline: user.isOnline,
//                     lastSeen: user.lastSeen,
//                     lastMessageTime:
//                         chat.lastMessage?.createdAt?.toMillis?.() ?? 0,
//                 } as RecentUser;
//             })
//         );

//         const filteredUsers = users
//             .filter(Boolean)
//             .sort(
//                 (a: any, b: any) =>
//                     b.lastMessageTime - a.lastMessageTime
//             ) as RecentUser[];

//         callback(filteredUsers);
//     });
// };


import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";

import { auth, db } from "@/config/firebase";

import { ChatListItem } from "@/types/chat/chatListItem";
import { RecentUser } from "@/types/chat/recentUser.types";

// 🔧 FIX: kuch purane chats mein "lastMessage.createdAt" corrupted ho
// gaya tha (buggy sanitizer ki wajah se — ab fix ho chuka hai, but
// purana data Firestore mein pada hai). Us corrupted value par seedha
// ".toMillis()" call karne se crash ho raha tha:
//   "chat.lastMessage.createdAt.toMillis is not a function"
// "safeToMillis" is corrupted/missing value ko bhi safely handle karta
// hai, crash nahi karta.
import { safeToMillis } from "@/utils/firestoreDate";

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

                // 🔧 FIX: seedha ".toMillis()" call karne ki jagah safeToMillis
                lastMessageTime: safeToMillis(chat.lastMessage.createdAt),
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

                // 🔧 FIX: pehle "data.lastMessage?.createdAt?.toMillis?.()" tha —
                // agar createdAt corrupted (par truthy) hota to ".toMillis" undefined
                // hota aur optional-call "?.()" bhi crash kar sakta hai jab beech ka
                // property khud ek non-null-lekin-invalid object ho. safeToMillis
                // in sab cases ko handle karta hai.
                const lastMessageTime = data.lastMessage?.createdAt
                    ? safeToMillis(data.lastMessage.createdAt)
                    : data.createdAt
                        ? safeToMillis(data.createdAt)
                        : 0;

                const isMuted = (data.mutedBy || []).includes(uid);
                const isBlocked = (data.blockedBy || []).length > 0;

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
                    lastMessageTime,
                    muted: isMuted,
                    isBlocked,
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
    }, (error) => {
        if (error?.code === "permission-denied" || error?.message?.includes("permission-denied")) {
            return;
        }
        console.log("listenUserChats error:", error?.message || error);
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
                    // 🔧 FIX: safeToMillis use kiya, seedha ".toMillis?.()" nahi
                    lastMessageTime: safeToMillis(chat.lastMessage?.createdAt),
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
    }, (error) => {
        if (error?.code === "permission-denied" || error?.message?.includes("permission-denied")) {
            return;
        }
        console.log("listenRecentUsers error:", error?.message || error);
    });
};

// ------------------------------------------------------
// Block / Unblock User
// ------------------------------------------------------

export const blockUserInChat = async (chatId: string, currentUid: string) => {
    try {
        const chatRef = doc(db, CHATS, chatId);
        await updateDoc(chatRef, {
            blockedBy: arrayUnion(currentUid),
        });
        console.log("🚫 User blocked in chat:", chatId);
    } catch (error) {
        console.log("❌ Block user error:", error);
        throw error;
    }
};

export const unblockUserInChat = async (chatId: string, currentUid: string) => {
    try {
        const chatRef = doc(db, CHATS, chatId);
        await updateDoc(chatRef, {
            blockedBy: arrayRemove(currentUid),
        });
        console.log("✅ User unblocked in chat:", chatId);
    } catch (error) {
        console.log("❌ Unblock user error:", error);
        throw error;
    }
};

// ------------------------------------------------------
// Mute / Unmute Chat
// ------------------------------------------------------

export const toggleMuteChat = async (chatId: string, currentUid: string): Promise<boolean> => {
    try {
        const chatRef = doc(db, CHATS, chatId);
        const snap = await getDoc(chatRef);
        if (!snap.exists()) return false;

        const data = snap.data();
        const mutedBy: string[] = data.mutedBy || [];
        const isMuted = mutedBy.includes(currentUid);

        await updateDoc(chatRef, {
            mutedBy: isMuted ? arrayRemove(currentUid) : arrayUnion(currentUid),
        });

        console.log(isMuted ? "🔔 Chat unmuted" : "🔕 Chat muted");
        return !isMuted;
    } catch (error) {
        console.log("❌ Toggle mute error:", error);
        throw error;
    }
};

// ------------------------------------------------------
// Listen Chat Details (Realtime for blockedBy, mutedBy)
// ------------------------------------------------------

export interface ChatDetails {
    id: string;
    participants: string[];
    blockedBy: string[];
    mutedBy: string[];
    isGroup?: boolean;
    disappearing?: "24h" | "7days" | "90days" | null;
}

export const listenChatDetails = (
    chatId: string,
    callback: (details: ChatDetails | null) => void
) => {
    if (!chatId) {
        callback(null);
        return () => {};
    }

    const chatRef = doc(db, CHATS, chatId);
    return onSnapshot(
        chatRef,
        (snap) => {
            if (!snap.exists()) {
                callback(null);
                return;
            }
            const data = snap.data();
            callback({
                id: snap.id,
                participants: data.participants || [],
                blockedBy: data.blockedBy || [],
                mutedBy: data.mutedBy || [],
                isGroup: data.isGroup || false,
                disappearing: data.disappearing ?? null,
            });
        },
        (error) => {
            if (error?.code === "permission-denied" || error?.message?.includes("permission-denied")) {
                return;
            }
            console.log("Chat details listener error:", error.message);
        }
    );
};

// ------------------------------------------------------
// Set Disappearing Messages Duration
// ------------------------------------------------------

export const setDisappearingMessages = async (
    chatId: string,
    duration: "24h" | "7days" | "90days" | null
): Promise<void> => {
    try {
        if (!chatId) return;
        const chatRef = doc(db, CHATS, chatId);
        await updateDoc(chatRef, {
            disappearing: duration,
        });
        console.log("⏳ Disappearing messages set to:", duration ?? "Off");
    } catch (error) {
        console.log("❌ setDisappearingMessages error:", error);
        throw error;
    }
};