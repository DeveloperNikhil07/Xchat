import Colors from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { MessageInputProps } from "@/types/chat/MessageInputs/MessageInput";
import { styles } from "./MessageInput.style";
import ReplyPreview from "./Reply/ReplyPreview";

export default function MessageInput({
  onSend,
  onEmojiPress,
  onAttachmentPress,
  onCameraPress,
  onVoicePress,

  onTyping,
  onStopTyping,

  replyMessage,
  setReplyMessage,

  showEmoji,
  setShowEmoji,
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTyping = (text: string) => {
    console.log("handleTyping called with text:", text);
    setMessage(text);

    if (text.trim().length > 0) {
      onTyping?.();

      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }

      typingTimeout.current = setTimeout(() => {
        onStopTyping?.();
      }, 1500);
    } else {
      onStopTyping?.();
    }
  };

  const handleSend = () => {
    const text = message.trim();

    if (!text) return;

    onSend?.(text);

    setMessage("");

    // Message send hote hi typing stop
    onStopTyping?.();

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {replyMessage && (
          <ReplyPreview
            senderName={replyMessage.sender}
            message={replyMessage.message}
            onClose={() => setReplyMessage(null)}
          />
        )}

        <View style={styles.inputRow}>
          {/* Emoji */}

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              setShowEmoji(!showEmoji);
              onEmojiPress?.();
            }}
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
            onChangeText={handleTyping}
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
      </View>

      {/* Voice */}

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