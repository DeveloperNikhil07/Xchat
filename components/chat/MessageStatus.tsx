import Colors from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

interface MessageStatusProps {
    status?: "sending" | "sent" | "delivered" | "seen";

    deliveredTo?: string[];
    seenBy?: string[];

    color?: string;
    size?: number;
}

export default function MessageStatus({
    status = "sent",
    deliveredTo = [],
    seenBy = [],
    color = "#fff",
    size = 15,
}: MessageStatusProps) {

    // Sending
    if (status === "sending") {
        return (
            <Ionicons
                name="time-outline"
                size={size}
                color={color}
            />
        );
    }

    // Seen (Green Double Tick)
    if (seenBy.length > 0 || status === "seen") {
        return (
            <Ionicons
                name="checkmark-done"
                size={size}
                color={Colors.info}
            />
        );
    }

    // Delivered (Grey Double Tick)
    if (deliveredTo.length > 0 || status === "delivered") {
        return (
            <Ionicons
                name="checkmark-done"
                size={size}
                color={color}
            />
        );
    }

    // Sent (Single Tick)
    return (
        <Ionicons
            name="checkmark"
            size={size}
            color={color}
        />
    );
}