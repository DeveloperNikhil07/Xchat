import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    where,
} from "firebase/firestore";

import { auth, db } from "@/config/firebase";

export interface SearchUser {
    uid: string;
    displayName: string;
    username: string;
    email: string;
    phone: string;
    photoURL: string;
    bio: string;
    isOnline: boolean;
}

const USERS = "users";

// Phone number jaisa text hai ya nahi check karta hai
const isPhoneLike = (text: string) => /^[0-9+]{6,15}$/.test(text);

export const searchUsers = async (
    keyword: string
): Promise<SearchUser[]> => {
    const raw = keyword.trim();

    if (!raw) return [];

    const currentUid = auth.currentUser?.uid;
    const results: Record<string, SearchUser> = {};

    // 1. Username prefix search (case-insensitive)
    const text = raw.toLowerCase();

    const usernameQuery = query(
        collection(db, USERS),
        orderBy("username"),
        where("username", ">=", text),
        where("username", "<=", text + "\uf8ff"),
        limit(10)
    );

    const usernameSnap = await getDocs(usernameQuery);

    usernameSnap.docs.forEach((doc) => {
        const user = doc.data() as SearchUser;

        if (user.uid !== currentUid) {
            results[user.uid] = user;
        }
    });

    // 2. Agar keyword phone number jaisa lage, phone se bhi match karo
    if (isPhoneLike(raw)) {
        const phoneQuery = query(
            collection(db, USERS),
            where("phone", "==", raw),
            limit(5)
        );

        const phoneSnap = await getDocs(phoneQuery);

        phoneSnap.docs.forEach((doc) => {
            const user = doc.data() as SearchUser;

            if (user.uid !== currentUid) {
                results[user.uid] = user;
            }
        });
    }

    return Object.values(results);
};

export const isSearchTextPhoneNumber = isPhoneLike;