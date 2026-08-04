import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { styles } from "./QuickActionButton.style";

interface Props {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress?: () => void;
}

export default function QuickActionButton({ icon, label, onPress }: Props) {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <View style={styles.iconBox}>
                <Ionicons name={icon} size={20} color="#fff" />
            </View>
            <Text style={styles.label}>{label}</Text>
        </Pressable>
    );
}