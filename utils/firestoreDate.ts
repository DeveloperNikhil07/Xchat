// utils/firestoreDate.ts
//
// 🔧 FIX: Kuch purane messages/chats mein "createdAt" field corrupted
// ho gaya tha (ek buggy sanitizer ki wajah se jo pehle serverTimestamp()
// ko todh raha tha). Us corrupted data mein "createdAt" ek proper
// Firestore Timestamp nahi hai, isliye ".toDate()" ya ".toMillis()"
// call karne par crash ho raha tha:
//   "createdAt.toDate is not a function"
//   "createdAt.toMillis is not a function"
//
// Ye helper HAR tarah ke createdAt value ko safely handle karta hai:
//  - Proper Firestore Timestamp (has .toDate())
//  - Corrupted plain object jaisa { seconds, nanoseconds }
//  - null / undefined (pending write ka case)
//  - Already a JS Date
//  - Kuch bhi aur — to bas "abhi" (now) fallback kar deta hai, crash
//    nahi karta.

export function safeToDate(value: any): Date {
    if (!value) {
        // pending server write (local optimistic update) — abhi ke liye "now"
        return new Date();
    }

    // Proper Firestore Timestamp instance
    if (typeof value?.toDate === "function") {
        try {
            return value.toDate();
        } catch {
            return new Date();
        }
    }

    // Corrupted / serialized shape: { seconds, nanoseconds }
    if (typeof value?.seconds === "number") {
        return new Date(value.seconds * 1000);
    }

    // Already a JS Date
    if (value instanceof Date) {
        return value;
    }

    // String / number timestamp
    if (typeof value === "string" || typeof value === "number") {
        const d = new Date(value);
        if (!isNaN(d.getTime())) return d;
    }

    // Kuch bhi samajh na aaye — crash mat hone do
    return new Date();
}

export function safeToMillis(value: any): number {
    return safeToDate(value).getTime();
}