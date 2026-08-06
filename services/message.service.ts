import {
    addDoc,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    increment,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    updateDoc
} from "firebase/firestore";


import { auth, db } from "@/config/firebase";

import {
    FirestoreMessage,
    MessageType,
    ReplyMessage,
} from "@/types/chat/message/message";


const MESSAGES_COLLECTION = "messages";


// SEND MESSAGE PAYLOAD

export interface SendMessagePayload {
    senderId: string;

    text?: string;

    type: MessageType;

    image?: string | null;

    reply?: ReplyMessage | null;

    document?: {
        name: string;
        uri: string;
        size?: number;
        mimeType?: string;
    };

    audio?: {
        uri: string;
        name: string;
        size?: number;
        duration?: number;
    };

    video?: {
        uri: string;
        size?: number;
        duration?: number;
    };

    location?: {
        latitude: number;
        longitude: number;
        address?: string;
    };

    contact?: {
        name: string;
        phoneNumbers: string[];
        emails?: string[];
        imageUri?: string | null;
    };
}


// LISTEN REALTIME MESSAGES

export const listenMessages = (
    chatId: string,
    callback: (messages: FirestoreMessage[]) => void
) => {

    const uid = auth.currentUser?.uid;

    const q = query(
        collection(
            db,
            "chats",
            chatId,
            MESSAGES_COLLECTION
        ),
        orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(
        q,
        async (snapshot) => {

            const messages: FirestoreMessage[] = [];

            for (const item of snapshot.docs) {

                const data = item.data() as FirestoreMessage;

                const { id, ...rest } = data;

                messages.push({
                    id: item.id,
                    ...rest,
                });

                // -------------------------
                // Delivered Update
                // -------------------------
                if (
                    uid &&
                    data.senderId !== uid &&
                    !(data.deliveredTo ?? []).includes(uid)
                ) {
                    await updateDoc(
                        doc(
                            db,
                            "chats",
                            chatId,
                            MESSAGES_COLLECTION,
                            item.id
                        ),
                        {
                            deliveredTo: arrayUnion(uid),
                            status: "delivered",
                        }
                    );
                }
            }

            callback(messages);

        },
        (error) => {
            console.log(
                "Message listener error:",
                error.message
            );
        }
    );

    return unsubscribe;
};



// SEND MESSAGE

export const sendMessage = async (
    chatId: string,
    data: any
) => {

    const messageRef = collection(
        db,
        "chats",
        chatId,
        "messages"
    );


    await addDoc(messageRef, {
        ...data,
        createdAt: serverTimestamp(),
        status: "sent",
        deliveredTo: [],
        seenBy: [],
    });


    const chatRef = doc(db, "chats", chatId);

    const chatSnap = await getDoc(chatRef);

    if (!chatSnap.exists()) return;

    const chatData = chatSnap.data();

    const receiverId = chatData.participants.find(
        (id: string) => id !== data.senderId
    );
    console.log("SEND MESSAGE CHAT:", chatId);
    await updateDoc(chatRef, {
        lastMessage: {
            text: data.text,
            senderId: data.senderId,
            createdAt: serverTimestamp(),
        },

        lastMessageTime: serverTimestamp(),

        [`unreadCount.${receiverId}`]: increment(1)
    })

};



// DELETE MESSAGE

export const deleteMessage = async (
    chatId: string,
    messageId: string
) => {

    await deleteDoc(
        doc(
            db,
            "chats",
            chatId,
            MESSAGES_COLLECTION,
            messageId
        )
    );

};



// EDIT MESSAGE

export const editMessage = async (
    chatId: string,
    messageId: string,
    text: string
) => {

    await updateDoc(
        doc(
            db,
            "chats",
            chatId,
            MESSAGES_COLLECTION,
            messageId
        ),
        {
            text,

            edited: true,

            editedAt:
                serverTimestamp(),
        }
    );

};

export const markMessagesDelivered = async (
    chatId: string,
    currentUid: string
) => {

    const q = query(
        collection(db, "chats", chatId, "messages")
    );

    const snap = await getDocs(q);

    for (const item of snap.docs) {

        const data = item.data();

        if (
            data.senderId !== currentUid &&
            !(data.deliveredTo || []).includes(currentUid)
        ) {

            await updateDoc(item.ref, {

                deliveredTo: arrayUnion(currentUid),

                status: "delivered",

            });

        }

    }

};

export const markMessagesSeen = async (
    chatId: string,
    currentUid: string
) => {

    const q = query(
        collection(db, "chats", chatId, "messages")
    );

    const snap = await getDocs(q);

    for (const item of snap.docs) {

        const data = item.data();

        if (
            data.senderId !== currentUid &&
            !(data.seenBy || []).includes(currentUid)
        ) {

            await updateDoc(item.ref, {

                seenBy: arrayUnion(currentUid),

                status: "seen",

            });

        }

    }

};
export const markMessagesAsSeen = async (
    chatId: string,
    uid: string
) => {

    const snap = await getDocs(
        collection(
            db,
            "chats",
            chatId,
            "messages"
        )
    );

    for (const item of snap.docs) {

        const data = item.data();

        if (
            data.senderId !== uid &&
            !(data.seenBy ?? []).includes(uid)
        ) {
            await updateDoc(item.ref, {
                seenBy: arrayUnion(uid),
                status: "seen",
            });
        }
    }

    // unread reset
    await updateDoc(
        doc(db, "chats", chatId),
        {
            [`unreadCount.${uid}`]: 0,
        }
    );
};