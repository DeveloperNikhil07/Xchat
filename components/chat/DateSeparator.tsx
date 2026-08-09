import { Text, View } from "react-native";
import { styles } from "./DateSeparator.style";

interface DateSeparatorProps {
    date?: string | null;
}

const getDateLabel = (dateValue?: string | null): string => {
    if (!dateValue) {
        return "";
    }

    const date = new Date(dateValue);

    if (isNaN(date.getTime())) {
        return dateValue;
    }

    const today = new Date();

    const isSameDay = (a: Date, b: Date) => {
        return (
            a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate()
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

    // Older date
    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

export default function DateSeparator({
    date,
}: DateSeparatorProps) {
    const label = getDateLabel(date);

    if (!label) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.line} />

            <View style={styles.badge}>
                <Text style={styles.text}>
                    {label}
                </Text>
            </View>

            <View style={styles.line} />
        </View>
    );
}