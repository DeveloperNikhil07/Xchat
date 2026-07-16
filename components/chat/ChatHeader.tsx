import Colors from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./ChatHeader.style";

interface ChatHeaderProps {
    name: string;
    image: any;
    online?: boolean;
    lastSeen?: string;

    onBack: () => void;
    onVoiceCall: () => void;
    onVideoCall: () => void;
    onMenu: () => void;
}

export default function ChatHeader({
    name,
    image,
    online = false,
    lastSeen,
    onBack,
    onVoiceCall,
    onVideoCall,
    onMenu,
}: ChatHeaderProps) {
    return (
        <View style={styles.container}>

            {/* Left */}

            <View style={styles.leftContainer}>

                <TouchableOpacity
                    onPress={onBack}
                    style={styles.iconButton}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={Colors.textOnDark}
                    />
                </TouchableOpacity>

                <Image
                    source={image}
                    style={styles.avatar}
                />

                <View style={styles.userInfo}>
                    <Text
                        numberOfLines={1}
                        style={styles.name}
                    >
                        {name}
                    </Text>

                    <Text style={styles.status}>
                        {online
                            ? "Online"
                            : lastSeen || "Offline"}
                    </Text>
                </View>

            </View>

            {/* Right */}

            <View style={styles.actions}>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={onVoiceCall}
                >
                    <Ionicons
                        name="call-outline"
                        size={22}
                        color={Colors.textOnDark}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={onVideoCall}
                >
                    <Ionicons
                        name="videocam-outline"
                        size={24}
                        color={Colors.textOnDark}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={onMenu}
                >
                    <Ionicons
                        name="ellipsis-vertical"
                        size={22}
                        color={Colors.textOnDark}
                    />
                </TouchableOpacity>

            </View>

        </View>
    );
}