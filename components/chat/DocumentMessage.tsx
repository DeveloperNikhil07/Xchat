import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

import { formatSize } from "@/hooks/fileFormatSize";
import { getFileInfo } from "@/hooks/getDocumentIcon";
import styles from "./DocumentMessage.style";

interface Props {
    name: string;
    size?: number;
    onPress?: () => void;
}

export default function DocumentMessage({
    name,
    size,
    onPress,
}: Props) {
    const file = getFileInfo(name);

    return (
        <Pressable
            style={styles.container}
            onPress={onPress}
        >
            <View
                style={[
                    styles.iconContainer,
                    { backgroundColor: file.bg },
                ]}
            >
                <Ionicons
                    name={file.icon as any}
                    size={28}
                    color={file.color}
                />
            </View>

            <View style={styles.content}>
                <Text
                    numberOfLines={1}
                    style={styles.name}
                >
                    {name}
                </Text>

                <View style={styles.footer}>
                    <View
                        style={[
                            styles.badge,
                            { backgroundColor: file.color },
                        ]}
                    >
                        <Text style={styles.badgeText}>
                            {file.badge}
                        </Text>
                    </View>

                    {!!size && (
                        <Text style={styles.size}>
                            {formatSize(size)}
                        </Text>
                    )}
                </View>
            </View>
        </Pressable>
    );
}