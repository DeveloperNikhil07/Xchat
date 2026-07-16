import Colors from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./MessageInput.style";

interface MessageInputProps {
    onSend?: (message: string) => void;
    onEmojiPress?: () => void;
    onAttachmentPress?: () => void;
    onCameraPress?: () => void;
    onVoicePress?: () => void;
}

export default function MessageInput({
    onSend,
    onEmojiPress,
    onAttachmentPress,
    onCameraPress,
    onVoicePress,
}: MessageInputProps) {

    const [message, setMessage] = useState("");

    const handleSend = () => {
        const text = message.trim();

        if (!text) return;

        onSend?.(text);

        setMessage("");
    };

    return (
        <View style={styles.container}>

            <View style={styles.inputContainer}>

                {/* Emoji */}

                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={onEmojiPress}
                >
                    <Ionicons
                        name="happy-outline"
                        size={24}
                        color={Colors.textSecondary}
                    />
                </TouchableOpacity>

                {/* Input */}

                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type a message..."
                    placeholderTextColor="#999"
                    multiline
                    scrollEnabled
                    textAlignVertical="top"
                    style={styles.input}
                />

                {/* Attachment */}

                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={onAttachmentPress}
                >
                    <Ionicons
                        name="attach"
                        size={22}
                        color={Colors.textSecondary}
                    />
                </TouchableOpacity>

                {/* Camera / Send */}

                {message.trim().length === 0 ? (
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={onCameraPress}
                    >
                        <Ionicons
                            name="camera-outline"
                            size={24}
                            color={Colors.textSecondary}
                        />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={handleSend}
                    >
                        <Ionicons
                            name="send"
                            size={20}
                            color="#FFF"
                        />
                    </TouchableOpacity>
                )}

            </View>

            {/* Voice Button */}

            {message.trim().length === 0 && (
                <TouchableOpacity
                    style={styles.voiceButton}
                    onPress={onVoicePress}
                >
                    <Ionicons
                        name="mic"
                        size={22}
                        color="#FFF"
                    />
                </TouchableOpacity>
            )}

        </View>
    );
}