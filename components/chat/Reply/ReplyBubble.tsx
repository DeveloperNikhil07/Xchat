import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./ReplyBubble.style";

interface ReplyBubbleProps {
    replySender: string;
    replyText: string;
    isSender?: boolean;
    onPress?: () => void;
}

export default function ReplyBubble({
    replySender,
    replyText,
    isSender = false,
    onPress,
}: ReplyBubbleProps) {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <View
                style={[
                    styles.accentBar,
                    !isSender && styles.accentBarReceiver,
                ]}
            />
            <View style={styles.content}>
                <Text
                    style={[
                        styles.sender,
                        !isSender && styles.senderReceiver,
                    ]}
                    numberOfLines={1}
                >
                    {replySender}
                </Text>

                <Text style={styles.message} numberOfLines={2} ellipsizeMode="tail">
                    {replyText}
                </Text>
            </View>
        </Pressable>
    );
}