import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, View } from "react-native";

import { Colors } from "@/constants/theme";
import { styles } from "./ProfileAvatar.style";

interface Props {
    imageUri?: string | null;
    size?: number;
    editable?: boolean;
    onEditPress?: () => void;
}

export default function ProfileAvatar({
    imageUri,
    size = 112,
    editable,
    onEditPress,
}: Props) {
    return (
        <View style={{ width: size, height: size }}>
            <View
                style={[
                    styles.circle,
                    { width: size, height: size, borderRadius: size / 2 },
                ]}
            >
                {imageUri ? (
                    <Image
                        source={{ uri: imageUri }}
                        style={{ width: size, height: size, borderRadius: size / 2 }}
                    />
                ) : (
                    <Ionicons name="person" size={size * 0.42} color="rgba(255,255,255,0.9)" />
                )}
            </View>

            {editable && (
                <Pressable style={styles.editBadge} onPress={onEditPress} hitSlop={6}>
                    <Ionicons name="camera" size={14} color={Colors.textOnBrand} />
                </Pressable>
            )}
        </View>
    );
}