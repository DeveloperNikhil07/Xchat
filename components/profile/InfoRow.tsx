import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import { styles } from "./InfoRow.style";

interface Props {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    rightText?: string;
    showChevron?: boolean;
    danger?: boolean;
    showDivider?: boolean;
    onPress?: () => void;
}

export default function InfoRow({
    icon,
    label,
    rightText,
    showChevron = true,
    danger,
    showDivider = true,
    onPress,
}: Props) {
    return (
        <Pressable
            style={[styles.row, showDivider && styles.divider]}
            onPress={onPress}
        >
            <View
                style={[
                    styles.iconBox,
                    { backgroundColor: danger ? "rgba(240,74,76,0.12)" : "rgba(63,217,184,0.12)" },
                ]}
            >
                <Ionicons name={icon} size={16} color={danger ? Colors.danger : "#3FD9B8"} />
            </View>

            <Text style={[styles.label, danger && { color: Colors.danger }]} numberOfLines={1}>
                {label}
            </Text>

            {!!rightText && <Text style={styles.rightText}>{rightText}</Text>}

            {showChevron && (
                <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.3)" />
            )}
        </Pressable>
    );
}