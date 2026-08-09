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

    // Tap quoted reply
    onReplyPress?: (messageId: string) => void;

    // Swipe message to reply
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
    onReplyPress,

    onImagePress,
    onDocumentPress,
    onLongPress,
    onVideoPress,
    onLocationPress,
    onContactPress,
}: MessageBubbleProps) {
    const hasText = message.trim().length > 0;

    /**
     * Message horizontal position during swipe.
     *
     * Negative value = move message to LEFT.
     */
    const translateX = useSharedValue(0);

    /**
     * Right -> Left reply gesture
     *
     * User swipes:
     *
     *  finger
     *    ← ← ←
     *
     * Message moves left.
     */
    const replyGesture = Gesture.Pan()
        /**
         * Start gesture when horizontal movement
         * is at least 20px toward LEFT.
         */
        .activeOffsetX([-20, 0])

        /**
         * If user moves vertically more than 15px,
         * let FlatList handle the scroll instead.
         */
        .failOffsetY([-15, 15])

        .onUpdate((event) => {
            /**
             * Only allow RIGHT -> LEFT swipe.
             *
             * translationX < 0 means LEFT.
             */
            if (event.translationX < 0) {
                /**
                 * Maximum movement = -90px
                 */
                translateX.value = Math.max(
                    event.translationX,
                    -90
                );
            }
        })

        .onEnd(() => {
            /**
             * If user swiped more than 55px LEFT,
             * trigger reply.
             */
            if (
                translateX.value < -55 &&
                onReplySwipe
            ) {
                runOnJS(onReplySwipe)();
            }

            /**
             * Always return message to original position.
             */
            translateX.value = withSpring(0, {
                damping: 18,
                stiffness: 180,
            });
        });

    /**
     * Apply shared value to Animated.View.
     */
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
            ],
        };
    });

    return (
        <View
            style={[
                styles.container,
                isSender
                    ? styles.senderContainer
                    : styles.receiverContainer,
            ]}
        >
            <GestureDetector gesture={replyGesture}>
                <Animated.View
                    style={[
                        animatedStyle,
                        {
                            maxWidth: "80%",
                        },
                    ]}
                >
                    <Pressable
                        delayLongPress={250}
                        onLongPress={onLongPress}
                    >
                        <View
                            style={[
                                styles.bubble,
                                isSender
                                    ? styles.senderBubble
                                    : styles.receiverBubble,
                            ]}
                        >
                            {/* ========================= */}
                            {/* DELETED MESSAGE */}
                            {/* ========================= */}

                            {deletedForEveryone ||
                            isDeletedForMe ? (
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
                                    {/* ========================= */}
                                    {/* REPLY */}
                                    {/* ========================= */}

                                    {reply && (
                                        <ReplyBubble
                                            replySender={
                                                reply.sender
                                            }
                                            replyText={
                                                reply.message
                                            }
                                            isSender={
                                                isSender
                                            }
                                            onPress={() =>
                                                onReplyPress?.(
                                                    reply.messageId
                                                )
                                            }
                                        />
                                    )}

                                    {/* ========================= */}
                                    {/* AUDIO */}
                                    {/* ========================= */}

                                    {audio && (
                                        <AudioMessage
                                            uri={audio.uri}
                                            name={audio.name}
                                            size={audio.size}
                                        />
                                    )}

                                    {/* ========================= */}
                                    {/* DOCUMENT */}
                                    {/* ========================= */}

                                    {document && (
                                        <DocumentMessage
                                            name={
                                                document.name
                                            }
                                            size={
                                                document.size
                                            }
                                            onPress={
                                                onDocumentPress
                                            }
                                        />
                                    )}

                                    {/* ========================= */}
                                    {/* IMAGE */}
                                    {/* ========================= */}

                                    {image && (
                                        <ImageMessage
                                            uri={image}
                                            onPress={
                                                onImagePress ??
                                                (() => {})
                                            }
                                        />
                                    )}

                                    {/* ========================= */}
                                    {/* VIDEO */}
                                    {/* ========================= */}

                                    {video && (
                                        <VideoMessage
                                            uri={video.uri}
                                            size={video.size}
                                            onPress={
                                                onVideoPress
                                            }
                                        />
                                    )}

                                    {/* ========================= */}
                                    {/* LOCATION */}
                                    {/* ========================= */}

                                    {location && (
                                        <LocationMessage
                                            latitude={
                                                location.latitude
                                            }
                                            longitude={
                                                location.longitude
                                            }
                                            address={
                                                location.address
                                            }
                                            isLive={
                                                location.isLive
                                            }
                                            liveUntil={
                                                location.liveUntil
                                            }
                                            onPress={
                                                onLocationPress
                                            }
                                        />
                                    )}

                                    {/* ========================= */}
                                    {/* CONTACT */}
                                    {/* ========================= */}

                                    {contact && (
                                        <ContactMessage
                                            name={
                                                contact.name
                                            }
                                            phoneNumbers={
                                                contact.phoneNumbers
                                            }
                                            imageUri={
                                                contact.imageUri
                                            }
                                            onPress={
                                                onContactPress
                                            }
                                        />
                                    )}

                                    {/* ========================= */}
                                    {/* TEXT */}
                                    {/* ========================= */}

                                    {!document &&
                                        hasText && (
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

                            {/* ========================= */}
                            {/* FOOTER */}
                            {/* ========================= */}

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
                                        deliveredTo={
                                            deliveredTo
                                        }
                                        seenBy={seenBy}
                                        color="rgba(255,255,255,.8)"
                                        size={15}
                                    />
                                )}
                            </View>

                            {/* ========================= */}
                            {/* REACTION */}
                            {/* ========================= */}

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
                                        style={
                                            styles.reactionText
                                        }
                                    >
                                        {reaction}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </Pressable>
                </Animated.View>
            </GestureDetector>
        </View>
    );
}