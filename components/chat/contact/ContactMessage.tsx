import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import styles from "./ContactMessage.style";

interface Props {
    name: string;
    phoneNumbers: string[];
    imageUri?: string | null;
    onPress?: () => void;
}

function getInitials(name: string) {
    const parts = name.trim().split(" ").filter(Boolean);
    if (parts.length === 0) return "?";
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function ContactMessage({ name, phoneNumbers, imageUri, onPress }: Props) {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.avatar} />
            ) : (
                <View style={styles.avatarFallback}>
                    <Text style={styles.avatarInitials}>{getInitials(name)}</Text>
                </View>
            )}

            <View style={styles.content}>
                <Text style={styles.name} numberOfLines={1}>
                    {name}
                </Text>
                <Text style={styles.subtitle} numberOfLines={1}>
                    {phoneNumbers[0] || "No number"}
                </Text>
            </View>

            <View style={styles.chevronBox}>
                <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
            </View>
        </Pressable>
    );
}