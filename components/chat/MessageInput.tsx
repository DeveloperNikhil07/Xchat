import Colors from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import EmojiPicker from "@/components/Emoji/EmojiPicker";
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
  editingMessage,
  onCancelEdit,
  showEmoji,
  setShowEmoji,
  onEdit,

  isRecording = false,
  recordingDuration = 0,
  onCancelRecording,
  onStopAndSendRecording,
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  // 👇 Edit button dabane ke baad old message input me aa jayega
  useEffect(() => {
    if (editingMessage) {
      setMessage(editingMessage.message);
      setReplyMessage(null);
    }
  }, [editingMessage]);

  const handleTyping = (text: string) => {
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

    // Stop typing
    onStopTyping?.();

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
      typingTimeout.current = null;
    }

    // ================================
    // EDIT MODE
    // ================================

    if (editingMessage) {
      onEdit?.(editingMessage.id, text);
      setMessage("");
      onCancelEdit?.();
      return;
    }

    // ================================
    // NORMAL SEND - Optimistic (Instant Clear)
    // ================================

    setMessage("");
    onSend?.(text);
  };

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {replyMessage && !isRecording && (
          <ReplyPreview
            senderName={replyMessage.sender}
            message={replyMessage.message}
            onClose={() => setReplyMessage(null)}
          />
        )}

        {isRecording ? (
          /* Voice Recording Mode */
          <View style={styles.recordingRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancelRecording}
              hitSlop={8}
            >
              <Ionicons
                name="trash-outline"
                size={20}
                color="#FF3B30"
              />
            </TouchableOpacity>

            <View style={styles.recordingInfo}>
              <View style={styles.recordingDot} />
              <Text style={styles.recordingTimer}>
                {formatDuration(recordingDuration)}
              </Text>
              <Text style={styles.recordingLabel}>
                Recording audio...
              </Text>
            </View>

            <TouchableOpacity
              style={styles.sendButton}
              onPress={onStopAndSendRecording}
            >
              <Ionicons
                name="send"
                size={20}
                color="#FFF"
              />
            </TouchableOpacity>
          </View>
        ) : (
          /* Normal Text Input Mode */
          <View style={styles.inputRow}>
            {/* Emoji */}
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                Keyboard.dismiss();
                setShowEmoji((prev) => !prev);
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
              placeholder="message..."
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
        )}
      </View>

      {/* Voice Button */}
      {!isRecording && message.trim().length === 0 && (
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

      {/* Input Emoji Picker */}
      <EmojiPicker
        visible={showEmoji}
        onClose={() => setShowEmoji(false)}
        onSelect={(emoji) => {
          setMessage((prev) => prev + emoji);
        }}
      />
    </View>
  );
}