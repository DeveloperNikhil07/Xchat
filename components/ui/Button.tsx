import Colors from "@/constants/theme";
import { styles } from "@/styles/button.style";
import { Ionicons } from "@expo/vector-icons";
import {
    ActivityIndicator,
    Text,
    TouchableOpacity,
    ViewStyle,
} from "react-native";

interface Props {
    title: string;
    onPress: () => void;
    icon?: keyof typeof Ionicons.glyphMap;
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
}

export default function Button({
    title,
    onPress,
    icon = "arrow-forward",
    loading = false,
    disabled = false,
    style,
}: Props) {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            disabled={loading || disabled}
            onPress={onPress}
            style={[
                styles.button,
                disabled && styles.disabledButton,
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={Colors.brandPrimary} />
            ) : (
                <>
                    <Text style={styles.buttonText}>{title}</Text>

                    <Ionicons
                        name={icon}
                        size={22}
                        color={Colors.brandPrimary}
                        style={styles.icon}
                    />
                </>
            )}
        </TouchableOpacity>
    );
}