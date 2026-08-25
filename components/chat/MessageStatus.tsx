
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
    status?: "sending" | "sent" | "delivered" | "seen";
    deliveredTo?: string[];
    seenBy?: string[];
    receiverId?: string;
    size?: number;
}

export default function MessageStatus({
    status = "sent",
    deliveredTo = [],
    seenBy = [],
    receiverId,
    size = 14,
}: Props) {
    const isSeen =
        status === "seen" ||
        seenBy.length > 0 ||
        (receiverId ? seenBy.includes(receiverId) : false);

    const isDelivered =
        isSeen ||
        status === "delivered" ||
        deliveredTo.length > 0 ||
        (receiverId ? deliveredTo.includes(receiverId) : false);

    if (status === "sending") {
        return (
            <View style={styles.container}>
                <Ionicons
                    name="time-outline"
                    size={size - 2}
                    color="rgba(255,255,255,0.6)"
                />
            </View>
        );
    }

    if (isSeen) {
        return (
            <View style={styles.container}>
                <Ionicons
                    name="checkmark-done"
                    size={size + 1}
                    color="#34B7F1"
                />
            </View>
        );
    }

    if (isDelivered) {
        return (
            <View style={styles.container}>
                <Ionicons
                    name="checkmark-done"
                    size={size + 1}
                    color="rgba(255,255,255,0.65)"
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Ionicons
                name="checkmark"
                size={size}
                color="rgba(255,255,255,0.65)"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 4,
    },
});