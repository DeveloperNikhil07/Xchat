export interface ProfileMedia {
    images: number;
    videos: number;
    documents: number;
}

export interface CommonGroup {
    id: string;
    name: string;
}

export interface ChatProfile {
    id: string;
    name: string;
    username: string;
    phone: string;
    about: string;
    image: string;
    online: boolean;
    lastSeen?: string;
    media: ProfileMedia;
    starredMessages: number;
    commonGroups: CommonGroup[];
    muteNotifications: boolean;
    blocked: boolean;
}