import { UpdatableUserProfile, UserProfile } from "@/types/users/user";

// ---- Mock in-memory store (Firebase aane tak) ----
let mockProfile: UserProfile = {
    uid: "local-user-1",
    name: "Akhil Sharma",
    username: "akhil.dev",
    bio: "Building cool stuff 🚀 | Chatting round the clock ✌️",
    phone: "+91 98765 43210",
    email: "akhil.sharma@email.com",
    avatarUri: null,
};

/**
 * Current logged-in user ka profile fetch karta hai.
 * FIREBASE INTEGRATION: isko Firestore `doc(db, "users", uid)` getDoc se replace karna.
 */
export async function fetchUserProfile(): Promise<UserProfile> {
    // simulate network delay
    await new Promise((res) => setTimeout(res, 300));
    return mockProfile;
}

/**
 * Profile update karta hai (name, bio, phone, email, avatar).
 * FIREBASE INTEGRATION: isko `updateDoc(doc(db, "users", uid), data)` se replace karna.
 */
export async function updateUserProfile(
    updates: Partial<UpdatableUserProfile>
): Promise<UserProfile> {
    await new Promise((res) => setTimeout(res, 300));
    mockProfile = { ...mockProfile, ...updates };
    return mockProfile;
}

/**
 * Avatar image upload karta hai aur uska URL return karta hai.
 * FIREBASE INTEGRATION: isko Firebase Storage `uploadBytes` + `getDownloadURL` se replace karna.
 * Abhi ke liye ye seedha local URI hi return kar deta hai (UI turant update ho jaye).
 */
export async function uploadAvatar(localUri: string): Promise<string> {
    await new Promise((res) => setTimeout(res, 500));
    return localUri;
}