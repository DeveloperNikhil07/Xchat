import Colors from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from './ChatCard.style';

interface Props {
    image: string;
    name: string;
    message: string;
    time: string;
    unread?: number;
    online?: boolean;
    typing?: boolean;
    voice?: boolean;
    muted?: boolean;
    onPress?: () => void;
}

export default function ChatCard({
    image,
    name,
    message,
    time,
    unread = 0,
    online = false,
    typing = false,
    voice = false,
    muted = false,
    onPress,
}: Props) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.container}
            onPress={onPress}
        >
            {/* Avatar */}

            <View style={styles.avatarContainer}>
                <Image
                    source={
                        image
                            ? { uri: image }
                            : require("@/assets/images/man.png")
                    }
                    style={styles.avatar}
                />

                {online && <View style={styles.onlineDot} />}
            </View>

            {/* Center */}

            <View style={styles.content}>
                <Text
                    numberOfLines={1}
                    style={styles.name}
                >
                    {name}
                </Text>

                <View style={styles.messageRow}>
                    {voice && (
                        <Ionicons
                            name="mic"
                            size={15}
                            color={Colors.brandPrimary}
                        />
                    )}

                    <Text
                        numberOfLines={1}
                        style={[
                            styles.message,
                            typing && styles.typing,
                        ]}
                    >
                        {typing ? "Typing..." : message}
                    </Text>
                </View>
            </View>

            {/* Right */}

            <View style={styles.right}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    {muted && (
                        <Ionicons
                            name="notifications-off-outline"
                            size={14}
                            color="#8696A0"
                        />
                    )}
                    <Text style={styles.time}>
                        {time}
                    </Text>
                </View>

                {unread > 0 ? (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {unread}
                        </Text>
                    </View>
                ) : (
                    !typing && (
                        <Ionicons
                            name="checkmark-done"
                            size={18}
                            color={Colors.brandPrimary}
                        />
                    )
                )}
            </View>
        </TouchableOpacity>
    );
}