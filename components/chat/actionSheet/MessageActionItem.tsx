import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text } from "react-native";

import styles from "./MessageActionItem.style";

interface Props {
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    color?: string;
    onPress: () => void;
}

export default function MessageActionItem({
    title,
    icon,
    color = "#FFF",
    onPress,
}: Props) {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
                {
                    backgroundColor: pressed
                        ? "rgba(255,255,255,0.08)"
                        : "transparent",
                },
            ]}
            onPress={onPress}
        >
            <Ionicons
                name={icon}
                size={22}
                color={color}
            />

            <Text style={styles.text}>
                {title}
            </Text>
        </Pressable>
    );
}