export interface ReplyMessage {
    sender: string;
    message: string;
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
    date?: string;

    reply?: ReplyMessage;

    isStarred: boolean;
    reaction?: string;

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
        liveUntil?: number; // timestamp — jab tak live rahegi
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