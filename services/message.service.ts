import {
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    increment,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    Timestamp,
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
    callback: (messages: (FirestoreMessage & { isStarred: boolean })[]) => void
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

            const messages: (FirestoreMessage & { isStarred: boolean })[] = [];

            for (const item of snapshot.docs) {

                const data = item.data() as FirestoreMessage;

                const { id, ...rest } = data;
                if (
                    uid &&
                    (data.deletedFor ?? []).includes(uid)
                ) {
                    continue;
                }
                messages.push({
                    id: item.id,
                    ...rest,
                    isStarred: uid
                        ? (data.starredBy ?? []).includes(uid)
                        : false,
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

export const deleteMessageForMe = async (
    chatId: string,
    messageId: string,
    uid: string
) => {
    try {
        const messageRef = doc(
            db,
            "chats",
            chatId,
            MESSAGES_COLLECTION,
            messageId
        );

        await updateDoc(messageRef, {
            deletedFor: arrayUnion(uid),
        });

        console.log("🗑️ Deleted for me");
    } catch (error) {
        console.log("Delete for me error:", error);
        throw error;
    }
};

export const deleteMessageForEveryone = async (
    chatId: string,
    messageId: string
) => {
    const messageRef = doc(
        db,
        "chats",
        chatId,
        "messages",
        messageId
    );

    await updateDoc(messageRef, {
        deletedForEveryone: true,
        deletedAt: Timestamp.now(),

        // original content hide
        text: "",
        image: null,
        document: null,
        audio: null,
        video: null,
        location: null,
        contact: null,

        reaction: null,
        reactions: {},
    });
};

// EDIT MESSAGE

export const editMessage = async (
    chatId: string,
    messageId: string,
    text: string
) => {
    try {
        const messageRef = doc(
            db,
            "chats",
            chatId,
            MESSAGES_COLLECTION,
            messageId
        );

        await updateDoc(messageRef, {
            text: text.trim(),
            edited: true,
            editedAt: serverTimestamp(),
        });

        console.log("✏️ Firestore message edited");

    } catch (error) {
        console.log(
            "❌ Edit message error:",
            error
        );

        throw error;
    }
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

// message.service.ts mein baaki functions ke saath add karo
// (upar wahi imports use karo jo already file mein hain: db, doc, updateDoc, etc.)
export const updateMessageReaction = async (
    chatId: string,
    messageId: string,
    emoji: string | null, // null bhejo agar reaction hatana ho (toggle-off)
    uid: string
) => {
    try {
        if (!chatId || !messageId) return;

        const messageRef = doc(
            db,
            "chats",
            chatId,
            "messages",
            messageId
        );

        await updateDoc(messageRef, {
            reaction: emoji,
            reactedBy: emoji ? uid : null,
        });

        console.log("✅ Reaction updated:", emoji);
    } catch (error) {
        console.log("❌ Update Reaction Error:", error);
    }
};

// TOGGLE MESSAGE STAR
export const toggleMessageStar = async (
    chatId: string,
    messageId: string,
    uid: string
) => {
    try {
        const messageRef = doc(
            db,
            "chats",
            chatId,
            MESSAGES_COLLECTION,
            messageId
        );

        const messageSnap = await getDoc(messageRef);

        if (!messageSnap.exists()) {
            console.log("Star Error: Message not found");
            return;
        }

        const data = messageSnap.data();

        const starredBy: string[] =
            data.starredBy ?? [];

        const alreadyStarred =
            starredBy.includes(uid);

        if (alreadyStarred) {
            // ⭐ Remove star

            await updateDoc(messageRef, {
                starredBy: arrayRemove(uid),
            });

            console.log("⭐ Star removed");

        } else {
            // ⭐ Add star

            await updateDoc(messageRef, {
                starredBy: arrayUnion(uid),
            });

            console.log("⭐ Star added");
        }

    } catch (error) {
        console.log(
            "Toggle Message Star Error:",
            error
        );
    }
};