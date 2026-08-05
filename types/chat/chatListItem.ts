export interface ChatListItem {
    id: string;
    name: string;
    username?: string;
    image: string;
    message: string;
    time: string;
    unread: number;
    online: boolean;
    typing: boolean;
    archived: boolean;
    voice: boolean;
    requestId?: string;
    senderId?: string;
    receiverId?: string;
    unreadCount?:number;
    type: "private" | "group" | "request" | "personal";
    photoURL?: string;
}