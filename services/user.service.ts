import { db } from "@/config/firebase";
import { AppUser } from "@/types/auth/auth.types";
import {
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

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
        await updateDoc(doc(db, "users", uid), {
            ...data,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.log("updateUserDocument Error:", error);
        throw error;
    }
};