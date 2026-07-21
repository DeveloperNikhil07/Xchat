import React from "react";
import { Pressable, Text, View } from "react-native";

import styles from "./MessageReactionBar.style";

const REACTIONS = [
    "❤️",
    "👍",
    "😂",
    "😮",
    "😢",
    "🙏",
];

interface Props {
    onSelect?: (emoji: string) => void;
}

export default function MessageReactionBar({
    onSelect,
}: Props) {
    return (
        <View style={styles.container}>
            {REACTIONS.map((emoji) => (
                <Pressable
                    key={emoji}
                    style={({ pressed }) => [
                        styles.reactionButton,
                        pressed && {
                            transform: [{ scale: 0.92 }],
                        },
                    ]}
                    onPress={() => onSelect?.(emoji)}
                >
                    <Text style={styles.emoji}>
                        {emoji}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
}