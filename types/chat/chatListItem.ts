import { ImageSourcePropType } from "react-native";

export type ChatType = "personal" | "group";

export interface ChatListItem {
    id: string;
    name: string;
    message: string;
    time: string;
    unread: number;
    online?: boolean;
    typing?: boolean;
    voice?: boolean;
    image: ImageSourcePropType | string;
    type: ChatType;
    archived: boolean;
}