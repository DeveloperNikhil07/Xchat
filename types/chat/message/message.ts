import { Timestamp } from "firebase/firestore";

export interface ReplyMessage {
    sender: string;
    message: string;
    messageId: string;
}

export type MessageType =
    | "text"
    | "image"
    | "document"
    | "audio"
    | "video"
    | "contact"
    | "location";

export interface Message {
    id: string;
    type: MessageType;

    message: string;
    time: string;
    isSender: boolean;

    status?: "sending" | "sent" | "delivered" | "seen";
    deliveredTo?: string[];
    seenBy?: string[];
    date?: string;

    reply?: ReplyMessage;

    isStarred: boolean;

    deletedFor?: string[];

    deletedForEveryone?: boolean;
    isDeletedForMe?: boolean;

    edited?: boolean;
    editedAt?: string;  

    reaction?: string;

    reactedBy?: string;

    reactions?: Record<string, string[]>;

    image?: string | null;

    document?: {
        name: string;
        uri: string;
        size?: number;
        mimeType?: string;
    };
    audio?: {
        uri: string;
        name: string;
        size: number | undefined;
        duration?: number;
        source?: "recording" | "file";
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
        isLive?: boolean;
        liveUntil?: number;
    };
    contact?: {
        name: string;
        phoneNumbers: string[];
        emails?: string[];
        imageUri?: string | null;
    };
}

export interface ReplyPreviewProps {
    senderName: string;
    message: string;
    onClose: () => void;
}

export interface FirestoreMessage {

    id: string;

    senderId: string;

    text?: string;

    type: MessageType;

    createdAt: Timestamp;
    starredBy?: string[];
    deletedFor?: string[];
    deletedForEveryone?: boolean;
    deletedAt?: Timestamp;
    edited?: boolean;
    editedAt?: Timestamp;

    status?:
    | "sending"
    | "sent"
    | "delivered"
    | "seen";

    deliveredTo?: string[];
    seenBy?: string[];

    reply?: ReplyMessage;

    // 👇 naya
    reaction?: string;
    reactedBy?: string;

    reactions?: Record<string, string[]>;

    image?: string | null;


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