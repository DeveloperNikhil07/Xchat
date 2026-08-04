export interface ChatListItem {
    id: string;
    name: string;
    image: string;
    message: string;
    time: string;
    unread: number;
    online: boolean;
    typing: boolean;
    archived: boolean;
    voice: boolean;
    type: "private" | "group" | "request";
    photoURL?: string;
}