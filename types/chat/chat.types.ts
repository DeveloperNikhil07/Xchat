export interface Chat {
    id: string;

    participants: string[];

    isGroup: boolean;

    lastMessage: string;

    lastMessageSender: string;

    lastMessageTime: number;

    createdAt: number;
}