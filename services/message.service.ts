import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    increment,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    updateDoc
} from "firebase/firestore";

import { db } from "@/config/firebase";

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

    const q = query(
        collection(
            db,
            "chats",
            chatId,
            MESSAGES_COLLECTION
        ),
        orderBy(
            "createdAt",
            "asc"
        )
    );


    const unsubscribe = onSnapshot(
        q,
        (snapshot) => {

            const messages =
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as FirestoreMessage[];


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
        createdAt: serverTimestamp()
    });


    await updateDoc(
        doc(db, "chats", chatId),
        {
            lastMessage: data.text,
            lastMessageTime: serverTimestamp(),
            unreadCount: increment(1),
        }
    );

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