import { Ionicons } from "@expo/vector-icons";
import React from "react";
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

import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

import {
    Gesture,
    GestureDetector,
} from "react-native-gesture-handler";

interface MessageBubbleProps {
    message: string;
    time: string;
    isSender: boolean;

    status?: "sending" | "sent" | "delivered" | "seen";
    deliveredTo?: string[];
    seenBy?: string[];

    deletedForEveryone?: boolean;
    isDeletedForMe?: boolean;

    image?: string | null;
    edited?: boolean;

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

    onReplyPress?: (messageId: string) => void;

    onReplySwipe?: () => void;
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
    deletedForEveryone,
    isDeletedForMe,
    edited,
    onReplySwipe,
    onImagePress,
    onDocumentPress,
    onLongPress,
    onVideoPress,
    onLocationPress,
    onContactPress,
    onReplyPress,
}: MessageBubbleProps) {

    const hasText = message.trim().length > 0;

    const translateX = useSharedValue(0);

    /**
     * ---------------------------------------------------------
     * LONG PRESS
     * ---------------------------------------------------------
     */

    const longPressGesture = Gesture.LongPress()
        .minDuration(250)
        .maxDistance(35)
        .onStart(() => {
            console.log("🔥🔥 MESSAGE LONG PRESS GESTURE TRIGGERED");
            if (onLongPress) {
                runOnJS(onLongPress)();
            }
        });

    /**
     * ---------------------------------------------------------
     * SWIPE TO REPLY
     * ---------------------------------------------------------
     */

    const replyGesture = Gesture.Pan()
        .activeOffsetX([20, 999])   // ✅ sirf right swipe
        .failOffsetY([-10, 10])     // vertical scroll ko priority
        .maxPointers(1)

        .onUpdate((event) => {
            const x = event.translationX;
            const y = event.translationY;

            if (Math.abs(y) > Math.abs(x)) {
                return;
            }

            if (x > 0) {
                translateX.value = Math.min(x, 90);
            }
        })

        .onEnd(() => {
            if (translateX.value >= 30) {
                if (onReplySwipe) {
                    runOnJS(onReplySwipe)();
                }
            }

            translateX.value = withSpring(0, {
                damping: 18,
                stiffness: 180,
            });
        })

        .onFinalize(() => {
            translateX.value = withSpring(0, {
                damping: 18,
                stiffness: 180,
            });
        });

    /**
     * ---------------------------------------------------------
     * COMBINE GESTURES
     * ---------------------------------------------------------
     */

    const messageGesture = Gesture.Simultaneous(
        replyGesture,
        longPressGesture
    );

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: translateX.value,
            },
        ],
    }));

    return (
        <View
            style={[
                styles.container,
                isSender
                    ? styles.senderContainer
                    : styles.receiverContainer,
            ]}
        >

            <GestureDetector gesture={messageGesture}>
                <Animated.View
                    style={[
                        animatedStyle,
                        {
                            maxWidth: "80%",
                        },
                    ]}
                >
                    <View
                        style={[
                            styles.bubble,
                            isSender
                                ? styles.senderBubble
                                : styles.receiverBubble,
                        ]}
                    >

                            {deletedForEveryone || isDeletedForMe ? (

                                <View
                                    style={
                                        styles.deletedMessageContainer
                                    }
                                >

                                    <Ionicons
                                        name="ban-outline"
                                        size={16}
                                        color={
                                            isSender
                                                ? "rgba(255,255,255,0.65)"
                                                : "#888"
                                        }
                                    />

                                    <Text
                                        style={[
                                            styles.deletedMessageText,
                                            isSender &&
                                            styles.deletedMessageTextSender,
                                        ]}
                                    >
                                        {deletedForEveryone
                                            ? "This message was deleted"
                                            : "You deleted this message"}
                                    </Text>

                                </View>

                            ) : (

                                <>

                                    {reply && (
                                        <ReplyBubble
                                            replySender={reply.sender}
                                            replyText={reply.message}
                                            isSender={isSender}
                                            onPress={() =>
                                                onReplyPress?.(
                                                    reply.messageId
                                                )
                                            }
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
                                            onPress={
                                                onImagePress ??
                                                (() => { })
                                            }
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
                                            phoneNumbers={
                                                contact.phoneNumbers
                                            }
                                            imageUri={contact.imageUri}
                                            onPress={onContactPress}
                                        />
                                    )}

                                    {!document && hasText && (
                                        <Text
                                            style={[
                                                styles.message,
                                                isSender &&
                                                styles.senderMessage,
                                            ]}
                                        >
                                            {message}
                                        </Text>
                                    )}

                                </>

                            )}

                            <View style={styles.footer}>

                                {isStarred && (
                                    <Ionicons
                                        name="star"
                                        size={12}
                                        color="#FFD700"
                                        style={{
                                            marginRight: 4,
                                        }}
                                    />
                                )}

                                {edited && (
                                    <Text
                                        style={[
                                            styles.time,
                                            isSender &&
                                            styles.senderTime,
                                            {
                                                marginRight: 5,
                                            },
                                        ]}
                                    >
                                        edited
                                    </Text>
                                )}

                                <Text
                                    style={[
                                        styles.time,
                                        isSender &&
                                        styles.senderTime,
                                    ]}
                                >
                                    {time}
                                </Text>

                                {isSender && (
                                    <MessageStatus
                                        status={status}
                                        deliveredTo={deliveredTo}
                                        seenBy={seenBy}
                                    />
                                )}

                            </View>

                            {reaction && (
                                <View
                                    style={[
                                        styles.reactionContainer,
                                        isSender
                                            ? styles.senderReaction
                                            : styles.receiverReaction,
                                    ]}
                                >
                                    <Text
                                        style={styles.reactionText}
                                    >
                                        {reaction}
                                    </Text>
                                </View>
                            )}

                        </View>

                </Animated.View>
            </GestureDetector>

        </View>
    );
}