import {
  collection,
  doc,
  getDoc,
  getDocs,
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

    const exist = await getChatByParticipants(
        currentUid,
        otherUid
    );

    if (exist) {
        return exist.id;
    }

    const ref = doc(collection(db, CHATS));

    await setDoc(ref, {

        participants: [
            currentUid,
            otherUid,
        ],

        isGroup: false,

        lastMessage: "",

        lastMessageSender: "",

        lastMessageTime: serverTimestamp(),

        createdAt: serverTimestamp(),

    });

    return ref.id;
};



// ------------------------------------------------------
// Get Existing Chat
// ------------------------------------------------------

export const getChatByParticipants = async (
    uid1: string,
    uid2: string
) => {

    const q = query(
        collection(db, CHATS),
        where("participants", "array-contains", uid1)
    );

    const snapshot = await getDocs(q);

    for (const item of snapshot.docs) {

        const data = item.data();

        const participants =
            data.participants || [];

        if (
            participants.includes(uid2)
        ) {

            return {
                id: item.id,
                ...data,
            };

        }

    }

    return null;

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

            const chat =
                item.data();

            const otherUserId =
                chat.participants.find(
                    (id: string) =>
                        id !== uid
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

                displayName:
                    user.displayName,

                username:
                    user.username,

                photoURL:
                    user.photoURL,

                isOnline:
                    user.isOnline,

                lastSeen:
                    user.lastSeen,

            });

        }

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

                message:
                    data.lastMessage ||
                    "Start chatting",

                unread: 0,

                typing: false,

                voice: false,

                archived: false,

                type: "personal",

                time: "",

            });

        }

        chats.sort((a, b) => 0);

        return chats;

    };