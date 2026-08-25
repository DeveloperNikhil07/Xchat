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

import { safeToMillis } from "@/utils/firestoreDate";

import {
    FirestoreMessage,
    MessageType,
    ReplyMessage,
} from "@/types/chat/message/message";


const MESSAGES_COLLECTION = "messages";


// ------------------------------------------------------------------
// 🔧 FIX: Firestore ka addDoc()/setDoc() "undefined" field allow nahi
// karta (sirf "null" allow hota hai). Jab hum image bhejte hain to
// payload mein "video: undefined", "document: undefined" waghera
// chale jaate hain (kyunki ChatScreen mein optional fields undefined
// set hote hain) — isi wajah se crash aa raha tha:
// "Unsupported field value: undefined (found in field video ...)"
//
// Ye helper recursively har "undefined" key/value ko object se hata
// deta hai (nested objects ke andar bhi) send karne se pehle.
//
// ⚠️ IMPORTANT: Ye sirf "plain" objects ({ ... }) ke andar recurse
// karta hai. Firestore ke special sentinel values — serverTimestamp(),
// increment(), arrayUnion(), arrayRemove(), Timestamp instances —
// asal mein internally special class-instances hote hain, plain
// object nahi. Agar hum unke andar bhi recurse karke naya plain
// object bana dete, to wo apni special "FieldValue" identity kho
// dete aur Firestore unhe sahi tarah se process nahi kar paata
// (isi wajah se "createdAt.toDate is not a function" wala bug aaya
// tha — serverTimestamp() ka sentinel object todh diya gaya tha).
// Isliye plain object check karke hi recurse karte hain, baaki sab
// (Timestamp, FieldValue, Date, string, number, etc.) ko as-is
// chhod dete hain.
// ------------------------------------------------------------------
function isPlainObject(value: unknown): value is Record<string, any> {
    if (value === null || typeof value !== "object") return false;
    const proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
}

function removeUndefined<T>(value: T): T {
    if (Array.isArray(value)) {
        return value
            .map((item) => removeUndefined(item))
            .filter((item) => item !== undefined) as unknown as T;
    }

    if (isPlainObject(value)) {
        const cleaned: Record<string, any> = {};

        Object.entries(value).forEach(([key, val]) => {
            if (val === undefined) return; // 👈 undefined field drop
            cleaned[key] = removeUndefined(val);
        });

        return cleaned as T;
    }

    // Timestamp, FieldValue (serverTimestamp/increment/arrayUnion/...),
    // Date, string, number, boolean, null — sab as-is return karo.
    return value;
}


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
    callback: (messages: (FirestoreMessage & { isStarred: boolean })[]) => void,
    disappearingDuration?: "24h" | "7days" | "90days" | null
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

                // ⌛ Disappearing Messages Filter
                if (disappearingDuration && data.createdAt) {
                    const msgTime = safeToMillis(data.createdAt);
                    if (msgTime > 0) {
                        const now = Date.now();
                        const durationMs =
                            disappearingDuration === "24h"
                                ? 24 * 60 * 60 * 1000
                                : disappearingDuration === "7days"
                                    ? 7 * 24 * 60 * 60 * 1000
                                    : disappearingDuration === "90days"
                                        ? 90 * 24 * 60 * 60 * 1000
                                        : 0;

                        if (durationMs > 0 && now - msgTime > durationMs) {
                            continue;
                        }
                    }
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
                        }
                    );
                }
            }

            callback(messages);

        },
        (error) => {
            if (error?.code === "permission-denied" || error?.message?.includes("permission-denied")) {
                return;
            }
            console.log(
                "Message listener error:",
                error.message
            );
        }
    );

    return unsubscribe;
};



import { sendPushNotification } from "@/services/notification.service";

// SEND MESSAGE

export const sendMessage = async (
    chatId: string,
    data: SendMessagePayload
) => {

    const messageRef = collection(
        db,
        "chats",
        chatId,
        "messages"
    );

    // 🔧 FIX: addDoc se pehle undefined fields clean karo
    const cleanData = removeUndefined({
        ...data,
        createdAt: serverTimestamp(),
        status: "sent",
        deliveredTo: [],
        seenBy: [],
    });

    await addDoc(messageRef, cleanData);


    const chatRef = doc(db, "chats", chatId);

    const chatSnap = await getDoc(chatRef);

    if (!chatSnap.exists()) return;

    const chatData = chatSnap.data();

    const receiverId = chatData.participants?.find(
        (id: string) => id !== data.senderId
    );
    console.log("SEND MESSAGE CHAT:", chatId);

    // 🔧 FIX: lastMessage.text bhi undefined ho sakta hai
    let lastMessageText = data.text || "";
    if (data.type === "image") lastMessageText = "📷 Photo";
    else if (data.type === "audio") lastMessageText = "🎤 Voice message";
    else if (data.type === "video") lastMessageText = "🎥 Video";
    else if (data.type === "document") lastMessageText = `📄 ${data.document?.name || "Document"}`;
    else if (data.type === "location") lastMessageText = "📍 Location";
    else if (data.type === "contact") lastMessageText = `👤 Contact: ${data.contact?.name || ""}`;

    const lastMessagePayload = removeUndefined({
        text: lastMessageText,
        senderId: data.senderId,
        createdAt: serverTimestamp(),
    });

    await updateDoc(chatRef, {
        lastMessage: lastMessagePayload,

        lastMessageTime: serverTimestamp(),

        [`unreadCount.${receiverId}`]: increment(1)
    });

    // 📲 Trigger push notification in background
    if (receiverId) {
        getDoc(doc(db, "users", data.senderId)).then((senderSnap) => {
            const senderName = senderSnap.exists()
                ? (senderSnap.data().displayName || senderSnap.data().username || "New Message")
                : "New Message";

            sendPushNotification({
                toUserId: receiverId,
                senderId: data.senderId,
                title: senderName,
                body: lastMessageText,
                chatId,
            }).catch((e) => console.log("Push send err:", e));
        }).catch(() => {});
    }

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

/**
 * Clear / Delete all messages in a chat for the current user
 */
export const clearAllChatMessages = async (chatId: string, uid: string): Promise<void> => {
    try {
        if (!chatId || !uid) return;
        const q = query(collection(db, "chats", chatId, "messages"));
        const snap = await getDocs(q);

        const promises = snap.docs.map((docSnap) => {
            return updateDoc(docSnap.ref, {
                deletedFor: arrayUnion(uid),
            });
        });

        await Promise.all(promises);
        console.log("🧹 All chat messages cleared for user:", uid);
    } catch (error) {
        console.log("❌ clearAllChatMessages error:", error);
        throw error;
    }
};