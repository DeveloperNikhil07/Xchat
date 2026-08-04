import { db } from "@/config/firebase";
import { AppUser } from "@/types/auth/auth.types";
import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
    updateDoc,
} from "firebase/firestore";

// ---------------- Create ----------------

export const createUserDocument = async (
    userData: AppUser
): Promise<void> => {
    try {
        await setDoc(doc(db, "users", userData.uid), {
            ...userData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.log("createUserDocument Error:", error);
        throw error;
    }
};

// ---------------- Read ----------------

export const getUserDocument = async (
    uid: string
): Promise<AppUser | null> => {
    try {
        const snap = await getDoc(doc(db, "users", uid));

        if (!snap.exists()) return null;

        return snap.data() as AppUser;
    } catch (error) {
        console.log("getUserDocument Error:", error);
        throw error;
    }
};

// ---------------- Update ----------------

export interface UpdateUserPayload {
    displayName?: string;
    username?: string;
    bio?: string;
    phone?: string;
    email?: string;
    photoURL?: string;
}

export const updateUserDocument = async (
    uid: string,
    data: UpdateUserPayload
): Promise<void> => {
    try {
        const payload = { ...data };

        // Username hamesha lowercase save karo, taaki search consistent rahe
        if (payload.username) {
            payload.username = payload.username.trim().toLowerCase();
        }

        await updateDoc(doc(db, "users", uid), {
            ...payload,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.log("updateUserDocument Error:", error);
        throw error;
    }
};