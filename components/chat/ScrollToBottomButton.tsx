import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";

import Colors from "@/constants/theme";
import styles from "./ScrollToBottomButton.style";

interface Props {
    visible: boolean;
    onPress: () => void;
}

export default function ScrollToBottomButton({
    visible,
    onPress,
}: Props) {

    if (!visible) return null;

    return (
        <Pressable
            style={styles.container}
            onPress={onPress}
        >
            <Ionicons
                name="chevron-down"
                size={24}
                color={Colors.textPrimary}
            />
        </Pressable>
    );
}