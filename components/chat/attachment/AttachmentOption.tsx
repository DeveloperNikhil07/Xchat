import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import styles from "./AttachmentOption.style";

interface Props {
    icon: React.ReactNode;
    title: string;
    onPress: () => void;
}

export default function AttachmentOption({
    icon,
    title,
    onPress,
}: Props) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.container}
            onPress={onPress}
        >
            <View style={styles.iconContainer}>
                {icon}
            </View>

            <Text style={styles.title}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}