import Colors from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

interface MessageStatusProps {
    status?: "sending" | "sent" | "delivered" | "seen";
    color?: string;
    size?: number;
}

export default function MessageStatus({
    status = "sent",
    color = "#FFFFFF",
    size = 15,
}: MessageStatusProps) {
    switch (status) {
        case "sending":
            return (
                <Ionicons
                    name="time-outline"
                    size={size}
                    color={color}
                />
            );

        case "sent":
            return (
                <Ionicons
                    name="checkmark"
                    size={size}
                    color={color}
                />
            );

        case "delivered":
            return (
                <Ionicons
                    name="checkmark-done"
                    size={size}
                    color={color}
                />
            );

        case "seen":
            return (
                <Ionicons
                    name="checkmark-done"
                    size={size}
                    color={Colors.info || "#4FC3F7"}
                />
            );

        default:
            return null;
    }
}