import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { MessageType } from "@/types/chat/message/message";
import AudioMessage from "./AudioMessage";
import DocumentMessage from "./DocumentMessage";
import ImageMessage from "./ImageMessage";
import { styles } from "./MessageBubble.style";
import MessageStatus from "./MessageStatus";
import ReplyBubble from "./Reply/ReplyBubble";
import VideoMessage from "./VideoMessage";
import ContactMessage from "./contact/ContactMessage";
import LocationMessage from "./locations/LocationMessage";

interface MessageBubbleProps {
    message: string;
    time: string;
    isSender: boolean;

    status?: "sending" | "sent" | "delivered" | "seen";
    deliveredTo?: string[];
    seenBy?: string[];

    image?: string | null;
    document?: {
        name: string;
        uri: string;
        size?: number;
        mimeType?: string;
    };
    audio?: {
        uri: string;
        name: string;
        size?: number;
    };

    // 👇 messageId add kiya — reply tap karke original message tak jump karne ke liye
    reply?: {
        sender: string;
        message: string;
        messageId: string;
    };

    isStarred?: boolean;
    reaction?: string;
    type: MessageType;
    video?: {
        uri: string;
        size?: number;
    };

    location?: {
        latitude: number;
        longitude: number;
        address?: string;
        isLive?: boolean;
        liveUntil?: number;
    };
    contact?: {
        name: string;
        phoneNumbers: string[];
        emails?: string[];
        imageUri?: string | null;
    };
    onLongPress?: () => void;
    onImagePress?: () => void;
    onDocumentPress?: () => void;
    onVideoPress?: () => void;
    onLocationPress?: () => void;
    onContactPress?: () => void;
    onReplyPress?: (messageId: string) => void; // 👈 naya prop
}

export default function MessageBubble({
    message,
    time,
    isSender,
    status = "sent",
    deliveredTo = [],
    seenBy = [],
    image,
    document,
    audio,
    video,
    reply,
    isStarred,
    reaction,
    location,
    contact,
    onImagePress,
    onDocumentPress,
    onLongPress,
    onVideoPress,
    onLocationPress,
    onContactPress,
    onReplyPress,
}: MessageBubbleProps) {
    const messageStatus =
        seenBy.length > 0
            ? "seen"
            : deliveredTo.length > 0
                ? "delivered"
                : status;

    const hasText = message.trim().length > 0;

    return (
        <View
            style={[
                styles.container,
                isSender ? styles.senderContainer : styles.receiverContainer,
            ]}
        >
            <Pressable
                delayLongPress={250}
                onLongPress={onLongPress}
                style={{ maxWidth: "80%" }}
            >
                <View
                    style={[
                        styles.bubble,
                        isSender ? styles.senderBubble : styles.receiverBubble,
                    ]}
                >
                    {/* Reply */}
                    {reply && (
                        <ReplyBubble
                            replySender={reply.sender}
                            replyText={reply.message}
                            isSender={isSender}
                            onPress={() => onReplyPress?.(reply.messageId)}
                        />
                    )}

                    {audio && (
                        <AudioMessage
                            uri={audio.uri}
                            name={audio.name}
                            size={audio.size}
                        />
                    )}

                    {document && (
                        <DocumentMessage
                            name={document.name}
                            size={document.size}
                            onPress={onDocumentPress}
                        />
                    )}

                    {image && (
                        <ImageMessage
                            uri={image}
                            onPress={onImagePress ?? (() => {})}
                        />
                    )}

                    {video && (
                        <VideoMessage
                            uri={video.uri}
                            size={video.size}
                            onPress={onVideoPress}
                        />
                    )}

                    {location && (
                        <LocationMessage
                            latitude={location.latitude}
                            longitude={location.longitude}
                            address={location.address}
                            isLive={location.isLive}
                            liveUntil={location.liveUntil}
                            onPress={onLocationPress}
                        />
                    )}

                    {contact && (
                        <ContactMessage
                            name={contact.name}
                            phoneNumbers={contact.phoneNumbers}
                            imageUri={contact.imageUri}
                            onPress={onContactPress}
                        />
                    )}

                    {/* Text message */}
                    {!document && hasText && (
                        <Text
                            style={[styles.message, isSender && styles.senderMessage]}
                        >
                            {message}
                        </Text>
                    )}

                    {/* Footer */}
                    <View style={styles.footer}>
                        {isStarred && (
                            <Ionicons
                                name="star"
                                size={12}
                                color="#FFD700"
                                style={{ marginRight: 4 }}
                            />
                        )}

                        <Text
                            style={[styles.time, isSender && styles.senderTime]}
                        >
                            {time}
                        </Text>

                        {isSender && (
                            <MessageStatus
                                status={status}
                                deliveredTo={deliveredTo}
                                seenBy={seenBy}
                                color="rgba(255,255,255,.8)"
                                size={15}
                            />
                        )}
                    </View>

                    {/* Reaction */}
                    {reaction && (
                        <View
                            style={[
                                styles.reactionContainer,
                                isSender
                                    ? styles.senderReaction
                                    : styles.receiverReaction,
                            ]}
                        >
                            <Text style={styles.reactionText}>{reaction}</Text>
                        </View>
                    )}
                </View>
            </Pressable>
        </View>
    );
}