import Colors from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { styles } from "./authHeader.style";

interface Props {
    showBack?: boolean;
    onBack?: () => void;
}

export default function AuthHeader({ showBack = false, onBack }: Props) {
    return (
        <>
            <View style={styles.container}>
                {showBack && (
                    <Pressable style={styles.backButton} onPress={onBack} hitSlop={12}>
                        <Ionicons name="arrow-back" size={20} color={Colors.textOnDark} />
                    </Pressable>
                )}
            </View>
        </>
    );
}