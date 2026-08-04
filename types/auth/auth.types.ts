import { User as FirebaseUser } from "firebase/auth";

export interface UserSettings {
    theme: "light" | "dark" | "system";
    notification: boolean;
}

export interface UserPrivacy {
    lastSeen: boolean;
    profilePhoto: boolean;
    about: boolean;
}

export interface AppUser {
    uid: string;

    email: string;

    displayName: string;

    username: string;

    photoURL: string;

    bio: string;

    phone: string;

    isOnline: boolean;

    lastSeen: number;

    createdAt: number;

    updatedAt: number;

    settings: UserSettings;

    privacy: UserPrivacy;
}

export interface AuthContextType {
    firebaseUser: FirebaseUser | null;

    currentUser: AppUser | null;

    loading: boolean;

    login: (
        email: string,
        password: string
    ) => Promise<void>;

    signup: (
        name: string,
        email: string,
        password: string,
        phone: string
    ) => Promise<void>;

    googleLogin: () => Promise<void>;

    logout: () => Promise<void>;

    refreshUser: () => Promise<void>;

    updateUser: (
        data: Partial<AppUser>
    ) => Promise<void>;
}