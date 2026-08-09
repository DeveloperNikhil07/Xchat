import { Timestamp } from "firebase/firestore";

export const getDateLabel = (
    createdAt: Timestamp | Date | null | undefined
): string => {
    if (!createdAt) {
        return "";
    }

    const date =
        createdAt instanceof Timestamp
            ? createdAt.toDate()
            : createdAt instanceof Date
                ? createdAt
                : new Date(createdAt);

    const today = new Date();

    const isSameDay = (date1: Date, date2: Date) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    // Today
    if (isSameDay(date, today)) {
        return "Today";
    }

    // Yesterday
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (isSameDay(date, yesterday)) {
        return "Yesterday";
    }

    // Older dates
    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};