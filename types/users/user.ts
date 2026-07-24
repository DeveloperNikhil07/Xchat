export interface UserProfile {
    uid: string;
    name: string;
    username: string;
    bio: string;
    phone: string;
    email: string;
    avatarUri: string | null;
}

// Firebase se update karte waqt sirf ye fields bhejni hongi (uid alag rahega)
export type UpdatableUserProfile = Omit<UserProfile, "uid">;