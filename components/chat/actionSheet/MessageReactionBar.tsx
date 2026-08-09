import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

import EmojiPicker from "@/components/Emoji/EmojiPicker";
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
    const [showPicker, setShowPicker] = useState(false);

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

            <Pressable
                style={({ pressed }) => [
                    styles.reactionButton,
                    styles.plusButton,
                    pressed && {
                        transform: [{ scale: 0.92 }],
                    },
                ]}
                onPress={() => setShowPicker(true)}
            >
                <Ionicons name="add" size={20} color="#8696A0" />
            </Pressable>

            <EmojiPicker
                visible={showPicker}
                onClose={() => setShowPicker(false)}
                onSelect={(emoji) => onSelect?.(emoji)}
            />
        </View>
    );
}