import React from "react";
import { Text, View } from "react-native";
import styles from "./ReplyBubble.style";

interface ReplyBubbleProps {
    replySender: string;
    replyText: string;
}

export default function ReplyBubble({
    replySender,
    replyText,
}: ReplyBubbleProps) {
    return (
        <View style={styles.container}>
            <Text
                style={styles.sender}
                numberOfLines={1}
            >
                {replySender}
            </Text>

            <Text
                style={styles.message}
                numberOfLines={2}
            >
                {replyText}
            </Text>
        </View>
    );
}