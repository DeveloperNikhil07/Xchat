import Colors from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./ChatHeader.style";

interface ChatHeaderProps {
    name: string;
    image: any;
    online?: boolean;
    lastSeen?: string;
    allowSearch?: boolean;
    isSearching?: boolean;
    searchText?: string;
    onSearchChange?: (text: string) => void;
    onCloseSearch?: () => void;
    onBack: () => void;
    onVoiceCall: () => void;
    onVideoCall: () => void;
    onSearch?: () => void;
    onMenu: () => void;
    onProfilePress: () => void;
}

export default function ChatHeader({
    name,
    image,
    online = false,
    lastSeen,
    allowSearch = false,
    isSearching = false,
    searchText = "",
    onSearchChange,
    onCloseSearch,
    onBack,
    onVoiceCall,
    onVideoCall,
    onSearch,
    onMenu,
    onProfilePress,
}: ChatHeaderProps) {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <TouchableOpacity
                    onPress={isSearching ? onCloseSearch : onBack}
                    style={styles.iconButton}
                >
                    <Ionicons
                        name={isSearching ? "close" : "arrow-back"}
                        size={24}
                        color={Colors.textOnDark}
                    />
                </TouchableOpacity>

                {isSearching ? (
                    <TextInput
                        autoFocus
                        value={searchText}
                        onChangeText={onSearchChange}
                        placeholder="Search messages..."
                        placeholderTextColor="rgba(255,255,255,0.45)"
                        style={styles.searchInput}
                    />
                ) : (
                    <TouchableOpacity
                        style={styles.wrapper}
                        onPress={onProfilePress}
                    >
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
                                {online ? "Online" : lastSeen || "Offline"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>

            {!isSearching && (
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

                    {allowSearch && (
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={onSearch}
                        >
                            <Ionicons
                                name="search"
                                size={22}
                                color={Colors.textOnDark}
                            />
                        </TouchableOpacity>
                    )}

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
            )}
        </View>
    );
}