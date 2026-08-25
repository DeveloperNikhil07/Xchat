import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

import styles from "./MessageReactionBar.style";

const REACTIONS = ["❤️", "👍", "😂", "😮", "😢", "🙏"];

interface Props {
    onSelect?: (emoji: string) => void;
    onOpenEmojiPicker?: () => void;
}

export default function MessageReactionBar({ onSelect, onOpenEmojiPicker }: Props) {
    return (
        <View style={styles.container}>
            {REACTIONS.map((emoji) => (
                <Pressable
                    key={emoji}
                    style={({ pressed }) => [
                        styles.reactionButton,
                        pressed && { transform: [{ scale: 0.92 }] },
                    ]}
                    onPress={() => onSelect?.(emoji)}
                >
                    <Text style={styles.emoji}>{emoji}</Text>
                </Pressable>
            ))}

            <Pressable
                style={({ pressed }) => [
                    styles.reactionButton,
                    styles.plusButton,
                    pressed && { transform: [{ scale: 0.92 }] },
                ]}
                onPress={onOpenEmojiPicker}
            >
                <Ionicons name="add" size={20} color="#8696A0" />
            </Pressable>
        </View>
    );
}
