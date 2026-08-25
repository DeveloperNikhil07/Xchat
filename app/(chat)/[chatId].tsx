import DeleteMessageModal from "@/components/chat/actionSheet/DeleteMessageModal";
import MessageActionSheet from "@/components/chat/actionSheet/MessageActionSheet";
import AttachmentSheet from "@/components/chat/attachment/AttachmentSheet";
import useVoiceRecorder from "@/components/chat/audio/AudioRecorder";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMenuPopup from "@/components/chat/ChatMenuPopup";
import ContactShareSheet, { PickedContact } from "@/components/chat/contact/ContactShareSheet";
import ContactViewer from "@/components/chat/contact/ContactViewer";
import DocumentViewer from "@/components/chat/DocumentViewer";
import ImageViewer from "@/components/chat/ImageViewer";
import LocationShareSheet from "@/components/chat/locations/LocationShareSheet";
import LocationViewer from "@/components/chat/locations/LocationViewer";
import MessageInput from "@/components/chat/MessageInput";
import MessageList from "@/components/chat/MessageList";
import RequestActions from "@/components/chat/request/RequestActions";
import ScrollToBottomButton from "@/components/chat/ScrollToBottomButton";
import VideoViewer from "@/components/chat/VideoViewer";
import EmojiPicker from "@/components/Emoji/EmojiPicker";
import TypingIndicator from "@/components/common/TypingIndicator";
import ScreenContainer from "@/components/layout/ScreenContainer";

import { db } from "@/config/firebase";
import { useAuth } from "@/hooks/useAuth";
import { uploadToCloudinary } from "@/services/cloudinary";
import {
    blockUserInChat,
    ChatDetails,
    listenChatDetails,
    toggleMuteChat,
    unblockUserInChat
} from "@/services/chat.service";
import {
    deleteMessageForEveryone,
    deleteMessageForMe,
    editMessage,
    listenMessages,
    markMessagesDelivered,
    markMessagesSeen,
    sendMessage,
    toggleMessageStar,
    updateMessageReaction
} from "@/services/message.service";
import {
    acceptChatRequest,
    rejectChatRequest,
} from "@/services/request.service";
import {
    listenTyping,
    startTyping,
    stopTyping,
} from "@/services/typing.service";
import { styles as chatStyles } from "@/styles/ChatScreen.style";
import { Message, ReplyMessage } from "@/types/chat/message/message";
import { safeToDate } from "@/utils/firestoreDate";
import * as Clipboard from "expo-clipboard";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as ExpoLocation from "expo-location";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { doc, updateDoc } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    Alert,
    AppState,
    FlatList,
    Keyboard,
    Platform,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";


export default function ChatScreen() {
    const { currentUser } = useAuth();
    const router = useRouter();
    const listRef = useRef<FlatList<Message>>(null);
    const isChatActiveRef = useRef(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [inputHeight, setInputHeight] = useState(64);
    const [chatMessages, setChatMessages] = useState<Message[]>([]);
    const [chatDetails, setChatDetails] = useState<ChatDetails | null>(null);
    const { chatId, name, avatar, openSearch, requestId, type } = useLocalSearchParams<{
        chatId: string;
        name: string;
        avatar?: string;
        openSearch?: string;
        requestId?: string;
        type?: string;
    }>();
    const isRequest = type === "request";
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [replyMessage, setReplyMessage] = useState<ReplyMessage | null>(null);
    const [showAttachment, setShowAttachment] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showImageViewer, setShowImageViewer] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState<Message["document"] | null>(null);
    const [showDocumentViewer, setShowDocumentViewer] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [showVideoViewer, setShowVideoViewer] = useState(false);
    const [showLocationSheet, setShowLocationSheet] = useState(false);
    const [selectedLocationMessage, setSelectedLocationMessage] = useState<Message | null>(null);
    const [showLocationViewer, setShowLocationViewer] = useState(false);
    const [showContactSheet, setShowContactSheet] = useState(false);
    const [selectedContactMessage, setSelectedContactMessage] = useState<Message | null>(null);
    const [showContactViewer, setShowContactViewer] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [actionLoading, setActionLoading] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);
    const [typingUser, setTypingUser] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editingMessage, setEditingMessage] = useState<Message | null>(null);
    const [uploadingMessages, setUploadingMessages] = useState<Message[]>([]);
    const [showChatMenu, setShowChatMenu] = useState(false);
    const [showFullEmojiPicker, setShowFullEmojiPicker] = useState(false);


    // 👇 naya — keyboard ki actual height track karta hai
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const isBlockedByMe = useMemo(() => {
        return currentUser?.uid ? (chatDetails?.blockedBy || []).includes(currentUser.uid) : false;
    }, [chatDetails, currentUser?.uid]);

    const isBlockedByOther = useMemo(() => {
        return currentUser?.uid ? (chatDetails?.blockedBy || []).some((id) => id !== currentUser.uid) : false;
    }, [chatDetails, currentUser?.uid]);

    const isMuted = useMemo(() => {
        return currentUser?.uid ? (chatDetails?.mutedBy || []).includes(currentUser.uid) : false;
    }, [chatDetails, currentUser?.uid]);

    useEffect(() => {
        if (!chatId || type === "request") return;
        const unsub = listenChatDetails(chatId, (details) => {
            setChatDetails(details);
        });
        return unsub;
    }, [chatId, type]);

    useEffect(() => {
        if (openSearch === "true") {
            setIsSearching(true);
        }
    }, [openSearch]);

    const handleToggleBlock = async () => {
        if (!chatId || !currentUser) return;
        try {
            if (isBlockedByMe) {
                await unblockUserInChat(chatId, currentUser.uid);
                Alert.alert("Unblocked", "Contact has been unblocked.");
            } else {
                Alert.alert(
                    "Block Contact",
                    "Are you sure you want to block this contact? You will not receive messages from them.",
                    [
                        { text: "Cancel", style: "cancel" },
                        {
                            text: "Block",
                            style: "destructive",
                            onPress: async () => {
                                await blockUserInChat(chatId, currentUser.uid);
                                Alert.alert("Blocked", "Contact has been blocked.");
                            },
                        },
                    ]
                );
            }
        } catch (e) {
            console.log("Block toggle error:", e);
        }
    };

    const handleToggleMute = async () => {
        if (!chatId || !currentUser) return;
        try {
            const nowMuted = await toggleMuteChat(chatId, currentUser.uid);
            Alert.alert(
                nowMuted ? "Notifications Muted" : "Notifications Unmuted",
                nowMuted ? "Notifications silenced for this chat." : "Notification alerts enabled."
            );
        } catch (e) {
            console.log("Mute toggle error:", e);
        }
    };

    const handleMenu = () => {
        setShowChatMenu(true);
    };


    const liveWatchRef = useRef<ExpoLocation.LocationSubscription | null>(null);
    const liveMessageIdRef = useRef<string | null>(null);
    const liveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleAudioRecorded = async (audioData: {
        uri: string;
        name: string;
        size?: number;
        duration?: number;
    }) => {
        if (!chatId || !currentUser) return;

        let uploadingMessageId: string | null = null;
        try {
            const tempMessage = createUploadingMessage("audio", {
                uri: audioData.uri,
                fileName: audioData.name,
                fileSize: audioData.size,
                duration: audioData.duration,
            });
            uploadingMessageId = tempMessage.id;

            console.log("📤 Uploading voice recording...");
            const uploaded = await uploadToCloudinary(audioData.uri, "raw");

            console.log("☁️ Voice recording uploaded:", uploaded.secure_url);

            await sendMessage(chatId, {
                senderId: currentUser.uid,
                type: "audio",
                text: "",
                audio: {
                    uri: uploaded.secure_url,
                    name: audioData.name,
                    size: audioData.size ?? 0,
                    duration: audioData.duration,
                },
                reply: replyMessage
                    ? {
                        sender: replyMessage.sender,
                        message: replyMessage.message,
                        messageId: replyMessage.messageId,
                    }
                    : null,
            });

            if (uploadingMessageId) {
                removeUploadingMessage(uploadingMessageId);
            }
            setReplyMessage(null);
        } catch (error) {
            console.log("❌ Voice upload error:", error);
            if (uploadingMessageId) {
                removeUploadingMessage(uploadingMessageId);
            }
            Alert.alert("Upload Failed", "Unable to send voice message.");
        }
    };

    const {
        isRecording,
        recordingDuration,
        startRecording,
        stopRecording,
        cancelRecording,
    } = useVoiceRecorder({
        onRecorded: handleAudioRecorded,
    });

    const handleSend = (text: string) => {
        const message = text.trim();

        if (!chatId || !currentUser || !message) {
            return;
        }

        const tempId = `temp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        const currentReply = replyMessage;
        setReplyMessage(null);

        const optimisticMessage: Message = {
            id: tempId,
            message,
            type: "text",
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            date: new Date().toISOString(),
            isSender: true,
            status: "sending",
            isStarred: false,
            reply: currentReply
                ? {
                    sender: currentReply.sender,
                    message: currentReply.message,
                    messageId: currentReply.messageId,
                }
                : undefined,
        };

        setUploadingMessages((prev) => [...prev, optimisticMessage]);

        sendMessage(chatId, {
            senderId: currentUser.uid,
            text: message,
            type: "text",
            reply: currentReply
                ? {
                    sender: currentReply.sender,
                    message: currentReply.message,
                    messageId: currentReply.messageId,
                }
                : null,
        })
            .then(() => {
                removeUploadingMessage(tempId);
            })
            .catch((error) => {
                console.log("Send message error:", error);
                removeUploadingMessage(tempId);
                Alert.alert("Failed", "Unable to send message.");
            });
    };

    const createUploadingMessage = (
        type: Message["type"],
        asset: {
            uri: string;
            fileName?: string;
            fileSize?: number;
            mimeType?: string;
            duration?: number;
        }
    ): Message => {
        const tempId = `uploading-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

        const message: Message = {
            id: tempId,
            message: "",
            type,
            image: type === "image" ? asset.uri : null,
            audio:
                type === "audio"
                    ? {
                        uri: asset.uri,
                        name: asset.fileName || "Voice Message",
                        size: asset.fileSize,
                        duration: asset.duration,
                    }
                    : undefined,
            video:
                type === "video"
                    ? {
                        uri: asset.uri,
                        size: asset.fileSize,
                        duration: asset.duration,
                    }
                    : undefined,
            document:
                type === "document"
                    ? {
                        name: asset.fileName || "Document",
                        uri: asset.uri,
                        size: asset.fileSize,
                        mimeType: asset.mimeType,
                    }
                    : undefined,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            date: new Date().toISOString(),
            isSender: true,
            status: "sending",
            isStarred: false,
        };

        setUploadingMessages((prev) => [
            ...prev,
            message,
        ]);

        return message;
    };
    const removeUploadingMessage = (messageId: string) => {
        setUploadingMessages((prev) =>
            prev.filter(
                (message) => message.id !== messageId
            )
        );
    };

    const handleEdit = async (
        messageId: string,
        text: string
    ) => {
        if (!chatId || !messageId) return;

        const updatedText = text.trim();

        if (!updatedText) return;

        try {
            await editMessage(
                chatId,
                messageId,
                updatedText
            );

            console.log("✏️ Message edited successfully");

            setEditingMessage(null);
            setSelectedMessage(null);

        } catch (error) {
            console.log(
                "❌ Edit message failed:",
                error
            );
        }
    };

    const handleTyping = async () => {
        if (type !== "chat") {
            return;
        }

        if (!chatId || !currentUser) {
            return;
        }

        await startTyping(
            chatId,
            currentUser.uid,
            currentUser.displayName || ""
        );
    };

    const handleStopTyping = async () => {
        if (type !== "chat") {
            return;
        }

        if (!chatId) {
            return;
        }

        await stopTyping(chatId);
    };

    const markChatRead = async () => {
        if (type === "request") return;
        if (!chatId || !currentUser) return;

        console.log("MARK READ CHAT:", chatId);

        try {
            await updateDoc(
                doc(db, "chats", chatId),
                {
                    [`unreadCount.${currentUser.uid}`]: 0,
                }
            );
        } catch (e) {
            console.log("MARK READ ERROR", e);
        }
    };

    const handleToggleStar = async (messageId: string) => {
        if (!currentUser) {
            return;
        }

        if (!chatId) {
            return;
        }

        await toggleMessageStar(
            chatId,
            messageId,
            currentUser.uid
        );

        setShowActionSheet(false);
    };

    const handleReaction = async (id: string, emoji: string) => {
        if (!chatId || !currentUser) return;

        const existing = chatMessages.find((m) => m.id === id);
        const isSameReaction = existing?.reaction === emoji;
        const newEmoji = isSameReaction ? null : emoji;

        setChatMessages(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, reaction: newEmoji ?? undefined }
                    : item
            )
        );

        setShowActionSheet(false);

        try {
            await updateMessageReaction(chatId, id, newEmoji, currentUser.uid);
        } catch (error) {
            console.log("Reaction sync failed:", error);
        }
    };

    const handleScroll = (event: any) => {
        if (!event?.nativeEvent) return;
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        const distanceFromBottom =
            contentSize.height -
            contentOffset.y -
            layoutMeasurement.height;

        setShowScrollButton(distanceFromBottom > 200);
    };

    const scrollToBottom = () => {
        listRef.current?.scrollToEnd({
            animated: true,
        });
    };

    const openCamera = async () => {
        if (!chatId || !currentUser) return;

        let uploadingMessageId: string | null = null;

        try {

            const permission =
                await ImagePicker.requestCameraPermissionsAsync();

            if (!permission.granted) {
                Alert.alert(
                    "Permission Required",
                    "Camera permission is required."
                );
                return;
            }

            const result =
                await ImagePicker.launchCameraAsync({
                    mediaTypes: ["images"],
                    quality: 0.8,
                });

            if (result.canceled) return;

            const asset = result.assets[0];

            setShowAttachment(false);

            // 🔥 IMMEDIATELY SHOW IMAGE BUBBLE
            const tempMessage =
                createUploadingMessage(
                    "image",
                    {
                        uri: asset.uri,
                        fileSize: asset.fileSize,
                        mimeType: asset.mimeType,
                    }
                );

            uploadingMessageId = tempMessage.id;

            console.log("📤 Uploading camera image...");

            const uploaded =
                await uploadToCloudinary(
                    asset.uri,
                    "image"
                );

            console.log(
                "☁️ Uploaded:",
                uploaded.secure_url
            );

            await sendMessage(chatId, {
                senderId: currentUser.uid,

                type: "image",

                image: uploaded.secure_url,

                text: "",

                reply: replyMessage
                    ? {
                        sender: replyMessage.sender,
                        message: replyMessage.message,
                        messageId: replyMessage.messageId,
                    }
                    : null,
            });

            // 🔥 Remove temporary loader bubble
            if (uploadingMessageId) {
                removeUploadingMessage(
                    uploadingMessageId
                );
            }

            setReplyMessage(null);

        } catch (error) {

            console.log(
                "❌ Camera upload error:",
                error
            );

            if (uploadingMessageId) {
                removeUploadingMessage(
                    uploadingMessageId
                );
            }

            Alert.alert(
                "Upload Failed",
                "Unable to send image."
            );
        }
    };

    const openGallery = async () => {
        if (!chatId || !currentUser) return;

        let uploadingMessageId: string | null = null;

        try {

            const permission =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permission.granted) {
                Alert.alert(
                    "Permission Required",
                    "Gallery permission is required."
                );
                return;
            }

            const result =
                await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ["images", "videos"],
                    quality: 0.8,
                    allowsMultipleSelection: false,
                });

            if (result.canceled) return;

            const asset = result.assets[0];

            setShowAttachment(false);

            const isVideo =
                asset.type === "video";

            // 🔥 IMMEDIATELY SHOW TEMP BUBBLE
            const tempMessage =
                createUploadingMessage(
                    isVideo ? "video" : "image",
                    {
                        uri: asset.uri,
                        fileSize: asset.fileSize,
                        mimeType: asset.mimeType,
                        duration: asset.duration ?? undefined,
                    }
                );
            uploadingMessageId = tempMessage.id;

            console.log(
                isVideo
                    ? "📤 Uploading video..."
                    : "📤 Uploading image..."
            );

            const uploaded =
                await uploadToCloudinary(
                    asset.uri,
                    isVideo
                        ? "video"
                        : "image"
                );

            console.log(
                "☁️ Cloudinary URL:",
                uploaded.secure_url
            );

            await sendMessage(chatId, {

                senderId:
                    currentUser.uid,

                type:
                    isVideo
                        ? "video"
                        : "image",

                text: "",

                image:
                    isVideo
                        ? null
                        : uploaded.secure_url,

                video:
                    isVideo
                        ? {
                            uri:
                                uploaded.secure_url,

                            size:
                                asset.fileSize,

                            duration:
                                asset.duration ??
                                undefined,
                        }
                        : undefined,

                reply:
                    replyMessage
                        ? {
                            sender:
                                replyMessage.sender,

                            message:
                                replyMessage.message,

                            messageId:
                                replyMessage.messageId,
                        }
                        : null,
            });

            // 🔥 Remove temporary loader
            if (uploadingMessageId) {
                removeUploadingMessage(
                    uploadingMessageId
                );
            }

            setReplyMessage(null);

        } catch (error) {

            console.log(
                "❌ Gallery upload error:",
                error
            );

            if (uploadingMessageId) {
                removeUploadingMessage(
                    uploadingMessageId
                );
            }

            Alert.alert(
                "Upload Failed",
                "Unable to send media."
            );
        }
    };

    const pickDocument = async () => {
        if (!chatId || !currentUser) return;

        let uploadingMessageId: string | null = null;

        try {

            const result =
                await DocumentPicker.getDocumentAsync({
                    multiple: false,
                    copyToCacheDirectory: true,
                });

            if (result.canceled) return;

            const file = result.assets[0];

            setShowAttachment(false);

            // 🔥 SHOW DOCUMENT BUBBLE IMMEDIATELY
            const tempMessage =
                createUploadingMessage(
                    "document",
                    {
                        uri: file.uri,
                        fileName: file.name,
                        fileSize: file.size,
                        mimeType: file.mimeType,
                    }
                );

            uploadingMessageId = tempMessage.id;

            console.log(
                "📤 Uploading document..."
            );

            const uploaded =
                await uploadToCloudinary(
                    file.uri,
                    "raw"
                );

            console.log(
                "☁️ Document URL:",
                uploaded.secure_url
            );

            await sendMessage(chatId, {

                senderId:
                    currentUser.uid,

                type: "document",

                text: "",

                document: {
                    name: file.name,

                    uri:
                        uploaded.secure_url,

                    size:
                        file.size,

                    mimeType:
                        file.mimeType,
                },

                reply:
                    replyMessage
                        ? {
                            sender:
                                replyMessage.sender,

                            message:
                                replyMessage.message,

                            messageId:
                                replyMessage.messageId,
                        }
                        : null,
            });

            // 🔥 REMOVE TEMP LOADING BUBBLE
            if (uploadingMessageId) {
                removeUploadingMessage(
                    uploadingMessageId
                );
            }

            setReplyMessage(null);

        } catch (error) {

            console.log(
                "❌ Document upload error:",
                error
            );

            if (uploadingMessageId) {
                removeUploadingMessage(
                    uploadingMessageId
                );
            }

            Alert.alert(
                "Upload Failed",
                "Unable to send document."
            );
        }
    };
    const pickAudio = async () => {
        if (!chatId || !currentUser) return;

        try {
            const result =
                await DocumentPicker.getDocumentAsync({
                    type: "audio/*",
                    copyToCacheDirectory: true,
                });

            if (result.canceled) return;

            const file = result.assets[0];

            setShowAttachment(false);

            console.log("📤 Uploading audio...");

            const uploaded = await uploadToCloudinary(
                file.uri,
                "raw"
            );

            console.log(
                "☁️ Audio URL:",
                uploaded.secure_url
            );

            await sendMessage(chatId, {
                senderId: currentUser.uid,
                type: "audio",
                text: "",

                audio: {
                    uri: uploaded.secure_url,
                    name: file.name,
                    size: file.size,
                },

                reply: replyMessage
                    ? {
                        sender: replyMessage.sender,
                        message: replyMessage.message,
                        messageId: replyMessage.messageId,
                    }
                    : null,
            });

            setReplyMessage(null);

        } catch (error) {
            console.log(
                "❌ Audio upload error:",
                error
            );

            Alert.alert(
                "Upload Failed",
                "Unable to send audio."
            );
        }
    };

    const stopLiveLocation = () => {
        liveWatchRef.current?.remove();
        liveWatchRef.current = null;

        if (liveTimeoutRef.current) {
            clearTimeout(liveTimeoutRef.current);
            liveTimeoutRef.current = null;
        }

        const id = liveMessageIdRef.current;
        if (id) {
            setChatMessages((prev) =>
                prev.map((m) =>
                    m.id === id && m.location
                        ? { ...m, location: { ...m.location, isLive: false } }
                        : m
                )
            );
        }
        liveMessageIdRef.current = null;
    };

    const handleSendCurrentLocation = async (loc: { latitude: number; longitude: number }) => {
        if (!chatId || !currentUser) return;

        setShowLocationSheet(false);

        try {
            await sendMessage(chatId, {
                senderId: currentUser.uid,
                type: "location",
                text: "",
                location: {
                    latitude: loc.latitude,
                    longitude: loc.longitude,
                },
                reply: replyMessage
                    ? {
                        sender: replyMessage.sender,
                        message: replyMessage.message,
                        messageId: replyMessage.messageId,
                    }
                    : null,
            });

            setReplyMessage(null);
        } catch (error) {
            console.log("❌ Send location error:", error);
            Alert.alert("Failed", "Unable to send location.");
        }
    };

    const handleShareLiveLocation = async (
        loc: { latitude: number; longitude: number },
        durationMs: number
    ) => {
        if (!chatId || !currentUser) return;

        stopLiveLocation();
        setShowLocationSheet(false);

        const liveUntil = Date.now() + durationMs;

        try {
            // Firestore mein message create karo aur uski ID le lo
            const messageRef = await sendMessage(chatId, {
                senderId: currentUser.uid,
                type: "location",
                text: "",
                location: {
                    latitude: loc.latitude,
                    longitude: loc.longitude,
                },
                reply: replyMessage
                    ? {
                        sender: replyMessage.sender,
                        message: replyMessage.message,
                        messageId: replyMessage.messageId,
                    }
                    : null,
            });

            setReplyMessage(null);
        } catch (error) {
            console.log("❌ Live location send error:", error);
            Alert.alert("Failed", "Unable to share live location.");
        }
    };

    const handlePickContact = (contact: PickedContact) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            type: "contact",
            message: "",
            image: null,
            contact,
            time: "Now",
            isSender: true,
            status: "sent",
            date: "Today",
            isStarred: false,
        };

        setChatMessages((prev) => [...prev, newMessage]);
        setShowContactSheet(false);
    };

    const handleAccept = async () => {
        try {
            console.log("Accept clicked", requestId);

            if (!requestId) return;

            setActionLoading(true);

            const result = await acceptChatRequest(requestId);

            console.log("Accepted result:", result);
            router.replace({
                pathname: "/(chat)/[chatId]",
                params: {
                    ...result,
                    chatId: result.chatId,
                    type: "chat",
                    name: name as string,
                    avatar: avatar as string,
                },
            });
            Alert.alert(
                "Success",
                "Request accepted successfully."
            );
        } catch (error) {
            console.log(error);

            Alert.alert(
                "Error",
                "Unable to accept request."
            );
        } finally {
            setActionLoading(false);
        }
    };

    const handleBlock = async () => {
        try {
            if (!requestId) return;

            Alert.alert(
                "Decline Request",
                "Are you sure?",
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                    {
                        text: "Decline",
                        style: "destructive",
                        onPress: async () => {
                            try {
                                setActionLoading(true);

                                await rejectChatRequest(
                                    requestId
                                );

                                Alert.alert(
                                    "Declined",
                                    "Request declined."
                                );
                            } catch {
                                Alert.alert(
                                    "Error",
                                    "Unable to decline request."
                                );
                            } finally {
                                setActionLoading(false);
                            }
                        },
                    },
                ]
            );
        } catch (error) {
            console.log(error);
        }
    };

    const allMessages = useMemo(() => {
        const pendingUploads = uploadingMessages.filter((uploadMsg) => {
            if (uploadMsg.type === "text") {
                const matchExists = chatMessages.some(
                    (cm) =>
                        cm.isSender &&
                        cm.message === uploadMsg.message &&
                        cm.type === "text" &&
                        Math.abs(new Date(cm.date || 0).getTime() - new Date(uploadMsg.date || 0).getTime()) < 30000
                );
                return !matchExists;
            }
            return true;
        });

        return [
            ...chatMessages,
            ...pendingUploads,
        ].sort((a, b) => {
            const aTime = a.date
                ? new Date(a.date).getTime()
                : 0;

            const bTime = b.date
                ? new Date(b.date).getTime()
                : 0;

            return aTime - bTime;
        });
    }, [chatMessages, uploadingMessages]);
    const filteredMessages = useMemo(() => {

        if (!searchText.trim()) {
            return allMessages;
        }

        const query = searchText.toLowerCase();

        return allMessages.filter((item) =>
            item.message?.toLowerCase().includes(query)
        );

    }, [allMessages, searchText]);

    useEffect(() => {
        return () => {
            liveWatchRef.current?.remove();
            if (liveTimeoutRef.current) clearTimeout(liveTimeoutRef.current);
        };
    }, []);

    useEffect(() => {
        if (openSearch === "true") {
            setIsSearching(true);
        }
    }, [openSearch]);

    // 👇 naya — keyboard show/hide hone par uski real height track karo
    useEffect(() => {
        const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
        const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

        const showSub = Keyboard.addListener(showEvent, (e) => {
            setKeyboardHeight(e.endCoordinates.height);
        });

        const hideSub = Keyboard.addListener(hideEvent, () => {
            setKeyboardHeight(0);
        });

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    useEffect(() => {
        if (!chatId || !currentUser || type === "request") {
            return;
        }

        const unsubscribe = listenMessages(
            chatId,
            async (data) => {
                const formatted: Message[] = data.map((msg) => ({
                    id: msg.id,
                    message: msg.text || "",
                    type: msg.type || "text",
                    image: msg.image || null,
                    audio: msg.audio
                        ? {
                            uri: msg.audio.uri,
                            name: msg.audio.name,
                            size: msg.audio.size ?? 0,
                            duration: msg.audio.duration,
                        }
                        : undefined,

                    document: msg.document,
                    video: msg.video,
                    location: msg.location,
                    contact: msg.contact,
                    time: safeToDate(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    date: safeToDate(msg.createdAt).toISOString(),
                    isSender: msg.senderId === currentUser.uid,
                    status: msg.status,
                    seenBy: msg.seenBy ?? [],
                    isStarred: msg.isStarred ?? false,
                    deletedFor: msg.deletedFor ?? [],
                    deletedForEveryone: msg.deletedForEveryone ?? false,
                    isDeletedForMe: (msg.deletedFor ?? []).includes(currentUser.uid),
                    edited: msg.edited ?? false,
                    editedAt: msg.editedAt?.toDate()?.toISOString(),
                    reaction: msg.reaction || undefined,
                    reply:
                        msg.reply && msg.reply.messageId
                            ? {
                                sender: msg.reply.sender,
                                message: msg.reply.message,
                                messageId: msg.reply.messageId,
                            }
                            : undefined,
                }));
                setChatMessages(formatted);
            },
            chatDetails?.disappearing
        );

        return unsubscribe;

    }, [
        chatId,
        type,
        currentUser,
        chatDetails?.disappearing,
    ]);
    useFocusEffect(
        useCallback(() => {
            if (!chatId || !currentUser?.uid || type !== "chat") {
                return;
            }

            isChatActiveRef.current =
                AppState.currentState === "active";

            const markRead = async () => {
                if (!isChatActiveRef.current) return;

                try {
                    await markMessagesDelivered(
                        chatId,
                        currentUser.uid
                    );

                    await markMessagesSeen(
                        chatId,
                        currentUser.uid
                    );

                    await markChatRead();

                    console.log(
                        "✅ Chat open + active → messages seen"
                    );
                } catch (error) {
                    console.log(
                        "❌ Mark read error:",
                        error
                    );
                }
            };

            markRead();

            const subscription =
                AppState.addEventListener(
                    "change",
                    (state) => {
                        isChatActiveRef.current =
                            state === "active";

                        if (state === "active") {
                            markRead();
                        }
                    }
                );

            return () => {
                isChatActiveRef.current = false;
                subscription.remove();
            };
        }, [
            chatId,
            currentUser?.uid,
            type,
        ])
    );
    useEffect(() => {
        if (!chatId || !currentUser)
            return;

        if (type === "request")
            return;

        markChatRead();

    }, [chatId, currentUser, type]);

    useEffect(() => {
        if (!chatId || type !== "chat") {
            return;
        }

        const unsubscribe = listenTyping(chatId, (typing) => {
            if (typing?.isTyping && typing.uid !== currentUser?.uid) {
                setTypingUser(typing.name || "");
            } else {
                setTypingUser("");
            }
        });

        return unsubscribe;
    }, [chatId, type, currentUser?.uid]);

    useEffect(() => {
        console.log("Current Typing User:", typingUser);
        console.log("Chat ID:", chatId);
        console.log("User Name:", name);
    }, [typingUser, chatId, name]);


    return (
        <ScreenContainer>
            <View style={{ flex: 1 }}>
                <ChatHeader
                    name={(name as string) || "User"}
                    image={require("@/assets/images/man.png")}
                    online
                    typingUser={typingUser}
                    isSearching={isSearching}
                    searchText={searchText}
                    allowSearch={true}
                    onSearchChange={(text) => setSearchText(text)}

                    onCloseSearch={() => {
                        setIsSearching(false);
                        setSearchText("");
                        Keyboard.dismiss();
                    }}

                    onSearch={() => {
                        setIsSearching(true);
                    }}

                    onBack={() => router.back()}
                    onVoiceCall={() => {
                        Alert.alert("Voice Call", `Calling ${(name as string) || "User"}...`);
                    }}
                    onVideoCall={() => {
                        Alert.alert("Video Call", `Starting video call with ${(name as string) || "User"}...`);
                    }}
                    onMenu={handleMenu}

                    onProfilePress={() => {
                        router.push({
                            pathname: "/(profile)/[userId]",
                            params: {
                                userId: chatId as string,
                                name: name as string,
                                avatar: "",
                                online: "true",
                                messages: JSON.stringify(chatMessages),
                            },
                        });
                    }}
                />

                {/* Custom WhatsApp-style dropdown menu */}
                <ChatMenuPopup
                    visible={showChatMenu}
                    onClose={() => setShowChatMenu(false)}
                    items={[
                        {
                            label: isMuted ? "Unmute Notifications" : "Mute Notifications",
                            icon: isMuted ? "notifications-outline" : "notifications-off-outline",
                            onPress: handleToggleMute,
                        },
                        {
                            label: isBlockedByMe ? "Unblock Contact" : "Block Contact",
                            icon: isBlockedByMe ? "checkmark-circle-outline" : "ban-outline",
                            onPress: handleToggleBlock,
                            danger: !isBlockedByMe,
                        },
                        {
                            label: "View Contact Info",
                            icon: "person-outline",
                            onPress: () => {
                                router.push({
                                    pathname: "/(profile)/[userId]",
                                    params: {
                                        userId: chatId as string,
                                        name: name as string,
                                        avatar: "",
                                        online: "true",
                                        messages: JSON.stringify(chatMessages),
                                    },
                                });
                            },
                        },
                        {
                            label: isSearching ? "Close Search" : "Search",
                            icon: "search-outline",
                            onPress: () => setIsSearching(true),
                        },
                    ]}
                />

                <View style={{ flex: 1 }}>
                    {!isRequest && (
                        <View style={{ flex: 1 }}>
                            <MessageList
                                ref={listRef}
                                messages={filteredMessages}
                                bottomInset={inputHeight}
                                keyboardHeight={keyboardHeight}
                                chatId={chatId}
                                onScroll={handleScroll}
                                onLongPressMessage={(message) => {
                                    setSelectedMessage(message);
                                    setShowActionSheet(true);
                                }}
                                onImagePress={(image) => {
                                    setSelectedImage(image);
                                    setShowImageViewer(true);
                                }}
                                onVideoPress={(uri) => {
                                    setSelectedVideo(uri);
                                    setShowVideoViewer(true);
                                }}
                                onDocumentPress={(document) => {
                                    setSelectedDocument(document);
                                    setShowDocumentViewer(true);
                                }}
                                onLocationPress={(message) => {
                                    setSelectedLocationMessage(message);
                                    setShowLocationViewer(true);
                                }}
                                onContactPress={(message) => {
                                    setSelectedContactMessage(message);
                                    setShowContactViewer(true);
                                }}
                                onReplyMessage={(message) => {
                                    setReplyMessage({
                                        sender: message.isSender
                                            ? "You"
                                            : (name as string),
                                        message: message.message,
                                        messageId: message.id,
                                    });
                                }}
                            />
                        </View>
                    )}

                    {typingUser && !isRequest && (
                        <View style={{ paddingBottom: 6 }}>
                            <TypingIndicator />
                        </View>
                    )}

                    {!isRequest && type === "chat" && (
                        <KeyboardStickyView
                            onLayout={(event) => {
                                const height = event.nativeEvent.layout.height;
                                setInputHeight(height);
                            }}
                        >
                            <ScrollToBottomButton
                                visible={showScrollButton}
                                onPress={scrollToBottom}
                            />

                            {isBlockedByMe ? (
                                <View style={chatStyles.blockedBanner}>
                                    <Text style={chatStyles.blockedText}>You blocked this contact.</Text>
                                    <TouchableOpacity onPress={handleToggleBlock} style={chatStyles.unblockBtn}>
                                        <Text style={chatStyles.unblockBtnText}>Unblock</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : isBlockedByOther ? (
                                <View style={chatStyles.blockedBanner}>
                                    <Text style={chatStyles.blockedText}>You cannot send messages to this contact.</Text>
                                </View>
                            ) : (
                                <MessageInput
                                    replyMessage={replyMessage}
                                    setReplyMessage={setReplyMessage}
                                    onSend={handleSend}
                                    onTyping={handleTyping}
                                    onStopTyping={handleStopTyping}
                                    onEmojiPress={() => { }}
                                    onAttachmentPress={() => setShowAttachment(true)}
                                    onCameraPress={openCamera}
                                    onVoicePress={startRecording}
                                    isRecording={isRecording}
                                    recordingDuration={recordingDuration}
                                    onCancelRecording={cancelRecording}
                                    onStopAndSendRecording={stopRecording}
                                    showEmoji={showEmoji}
                                    setShowEmoji={setShowEmoji}
                                    editingMessage={editingMessage}
                                    onCancelEdit={() => setEditingMessage(null)}
                                    onEdit={handleEdit}
                                />
                            )}
                        </KeyboardStickyView>
                    )}
                </View>
                    <AttachmentSheet
                        visible={showAttachment}
                        onClose={() => setShowAttachment(false)}

                        onCamera={openCamera}
                        onGallery={openGallery}
                        onDocument={pickDocument}
                        onAudio={pickAudio}
                        onLocation={() => {
                            setShowAttachment(false);
                            setShowLocationSheet(true);
                        }}
                        onContact={() => {
                            setShowAttachment(false);
                            setShowContactSheet(true);
                        }}
                    />

                    {/* Action sheet */}
                    <MessageActionSheet
                        visible={showActionSheet}
                        onClose={() => setShowActionSheet(false)}

                        onReply={() => {
                            if (!selectedMessage) return;

                            setReplyMessage({
                                sender: selectedMessage.isSender ? "You" : (name as string),
                                message: selectedMessage.message,
                                messageId: selectedMessage.id,
                            });

                            setShowActionSheet(false);
                        }}

                        onCopy={async () => {
                            if (!selectedMessage) return;
                            await Clipboard.setStringAsync(selectedMessage?.message);
                            console.log("Copied");
                        }}

                        onForward={() => {
                            console.log("Forward");
                        }}

                        onStar={() => {
                            if (!selectedMessage) return;

                            handleToggleStar(selectedMessage.id);
                        }}

                        onDelete={() => {
                            if (!selectedMessage) return;

                            setShowActionSheet(false);
                            setShowDeleteModal(true);
                        }}

                        onEdit={() => {
                            if (!selectedMessage) return;

                            setEditingMessage(selectedMessage);
                            setShowActionSheet(false);
                        }}

                        onReaction={(emoji) => {
                            if (!selectedMessage) return;

                            handleReaction(selectedMessage.id, emoji);
                        }}

                        onOpenEmojiPicker={() => {
                            setShowFullEmojiPicker(true);
                        }}
                    />

                    {/* Root-level EmojiPicker — avoids nested Modal bug on Android */}
                    <EmojiPicker
                        visible={showFullEmojiPicker}
                        onClose={() => setShowFullEmojiPicker(false)}
                        onSelect={(emoji) => {
                            if (!selectedMessage) return;
                            handleReaction(selectedMessage.id, emoji);
                            setShowFullEmojiPicker(false);
                        }}
                    />

                    <DeleteMessageModal
                        visible={showDeleteModal}
                        isSender={selectedMessage?.isSender ?? false}
                        onClose={() => {
                            setShowDeleteModal(false);
                        }}
                        onDeleteForMe={async () => {
                            if (!selectedMessage || !chatId || !currentUser) {
                                return;
                            }

                            try {
                                await deleteMessageForMe(
                                    chatId,
                                    selectedMessage.id,
                                    currentUser.uid
                                );

                                setShowDeleteModal(false);
                                setSelectedMessage(null);

                            } catch (error) {
                                console.log(
                                    "Delete for me failed:",
                                    error
                                );
                            }
                        }}
                        onDeleteForEveryone={async () => {
                            if (!selectedMessage || !chatId) {
                                return;
                            }

                            try {
                                await deleteMessageForEveryone(
                                    chatId,
                                    selectedMessage.id
                                );

                                setShowDeleteModal(false);
                                setSelectedMessage(null);

                            } catch (error) {
                                console.log(
                                    "Delete for everyone failed:",
                                    error
                                );
                            }
                        }}
                    />
                    <ImageViewer
                        visible={showImageViewer}
                        image={selectedImage}
                        onClose={() => setShowImageViewer(false)}
                    />
                    <LocationShareSheet
                        visible={showLocationSheet}
                        onClose={() => setShowLocationSheet(false)}
                        onSendCurrent={handleSendCurrentLocation}
                        onShareLive={handleShareLiveLocation}
                    />

                    <LocationViewer
                        visible={showLocationViewer}
                        latitude={selectedLocationMessage?.location?.latitude ?? null}
                        longitude={selectedLocationMessage?.location?.longitude ?? null}
                        address={selectedLocationMessage?.location?.address}
                        isLive={selectedLocationMessage?.location?.isLive}
                        liveUntil={selectedLocationMessage?.location?.liveUntil}
                        isSender={selectedLocationMessage?.isSender}
                        onClose={() => setShowLocationViewer(false)}
                        onStopSharing={() => {
                            stopLiveLocation();
                            setShowLocationViewer(false);
                        }}
                    />

                    <ContactShareSheet
                        visible={showContactSheet}
                        onClose={() => setShowContactSheet(false)}
                        onPick={handlePickContact}
                    />

                    <ContactViewer
                        visible={showContactViewer}
                        contact={selectedContactMessage?.contact ?? null}
                        onClose={() => setShowContactViewer(false)}
                    />
                    <VideoViewer
                        visible={showVideoViewer}
                        uri={selectedVideo}
                        onClose={() => setShowVideoViewer(false)}
                    />
                    <DocumentViewer
                        visible={showDocumentViewer}
                        document={selectedDocument ?? null}
                        onClose={() => setShowDocumentViewer(false)}
                    />

                    {isRequest && (
                        <RequestActions
                            userName={(name as string) || "Unknown User"}
                            userImage={(avatar as string) || ""}
                            loading={actionLoading}
                            onAccept={handleAccept}
                            onBlock={handleBlock}
                        />
                    )}
                </View>
        </ScreenContainer>
    );
}