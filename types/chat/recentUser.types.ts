export interface RecentUser {
    uid: string;
    chatId: string;
    displayName: string;
    username: string;
    photoURL: string;
    isOnline: boolean;
    lastSeen: number;

    lastMessageTime?: number;
}