import MessageActionSheet from "@/components/chat/actionSheet/MessageActionSheet";
import AttachmentSheet from "@/components/chat/attachment/AttachmentSheet";
import ChatHeader from "@/components/chat/ChatHeader";
import ContactShareSheet, { PickedContact } from "@/components/chat/contact/ContactShareSheet";
import ContactViewer from "@/components/chat/contact/ContactViewer";
import DocumentViewer from "@/components/chat/DocumentViewer";
import ImageViewer from "@/components/chat/ImageViewer";
import LocationShareSheet from "@/components/chat/locations/LocationShareSheet";
import LocationViewer from "@/components/chat/locations/LocationViewer";
import MessageInput from "@/components/chat/MessageInput";
import MessageList from "@/components/chat/MessageList";
import ScrollToBottomButton from "@/components/chat/ScrollToBottomButton";
import VideoViewer from "@/components/chat/VideoViewer";
import ScreenContainer from "@/components/layout/ScreenContainer";
import { Message, ReplyMessage } from "@/types/chat/message/message";
import * as Clipboard from "expo-clipboard";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as ExpoLocation from "expo-location";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
const messages: Message[] = [
    {
        id: "1",
        message: "Hey 👋",
        time: "10:01",
        isSender: false,
        date: "Today",
        isStarred: false,
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800 ',
        type: 'image',
    },
    {
        id: "2",
        message: "Hi! How are you?",
        time: "10:02",
        isSender: true,
        status: "seen",
        date: "Today",
        isStarred: false,
        image: '',
        type: 'text',
    },
    {
        id: "3",
        message: "I'm doing great 😊",
        time: "10:03",
        isSender: false,
        date: "Today",
        isStarred: true,
        image: '',
        type: 'text',
    },
    {
        id: "4",
        message: "Are we meeting this evening?",
        time: "10:05",
        isSender: false,
        date: "Today",
        isStarred: false,
        image: '',
        type: 'text',
    },
    {
        id: "5",
        message: "Yes, let's meet at 6 PM.",
        time: "10:06",
        isSender: true,
        status: "delivered",
        date: "Today",
        isStarred: false,
        image: '',
        type: 'text',
    },
    {
        id: "6",
        message: "Perfect! See you then.",
        time: "10:07",
        isSender: false,
        date: "Today",
        isStarred: false,
        image: '',
        type: 'text',
    },
    {
        id: "7",
        message: "Don't forget to bring the documents.",
        time: "10:08",
        isSender: true,
        status: "seen",
        date: "Today",
        isStarred: true,
        image: '',
        type: 'text',
    },
    {
        id: "8",
        message: "Sure, I'll bring everything.",
        time: "10:09",
        isSender: false,
        date: "Today",
        isStarred: false,
        image: '',
        type: 'text',
    },
    {
        id: "9",
        message: "Thanks! 👍",
        time: "10:10",
        isSender: true,
        status: "seen",
        date: "Today",
        isStarred: false,
        image: '',
        type: 'text',
    },
    {
        id: "10",
        message: "See you soon 👋",
        time: "10:11",
        isSender: false,
        date: "Today",
        isStarred: false,
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800',
        type: 'image',
    },
];

export default function ChatScreen() {
    const listRef = useRef<FlatList>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [inputHeight, setInputHeight] = useState(0);
    const [chatMessages, setChatMessages] = useState<Message[]>(messages);
    const { chatId, name } = useLocalSearchParams();
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

    const liveWatchRef = useRef<ExpoLocation.LocationSubscription | null>(null);
    const liveMessageIdRef = useRef<string | null>(null);
    const liveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSend = (text: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            type: "text",
            message: text,
            image: null,
            time: "Now",
            isSender: true,
            status: "sent",
            date: "Today",
            isStarred: false,
            reply: replyMessage
                ? {
                    sender: replyMessage.sender,
                    message: replyMessage.message,
                }
                : undefined,
        };

        setChatMessages((prev) => [...prev, newMessage]);

        setReplyMessage(null);
    };

    const handleDeleteMessage = (id: string) => {
        setChatMessages(prev =>
            prev.filter(item => item.id !== id)
        );

        setShowActionSheet(false);
    };

    const handleToggleStar = (id: string) => {
        setChatMessages(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                        ...item,
                        isStarred: !item.isStarred,
                    }
                    : item
            )
        );

        setShowActionSheet(false);
    };

    const handleReaction = (id: string, emoji: string) => {
        setChatMessages(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                        ...item,
                        reaction: emoji,
                    }
                    : item
            )
        );

        setShowActionSheet(false);
    };

    const handleScroll = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;

        // user thoda upar gaya
        if (offsetY > 250) {
            setShowScrollButton(true);
        } else {
            setShowScrollButton(false);
        }
    };

    const scrollToBottom = () => {
        listRef.current?.scrollToEnd({
            animated: true,
        });
    };

    const openCamera = async () => {
        const permission =
            await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) {
            alert("Camera permission denied");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ["images"],
            quality: 0.8,
        });

        if (result.canceled) return;

        const image = result.assets[0].uri;

        const newMessage: Message = {
            id: Date.now().toString(),
            type: "image",
            message: "",
            image,
            time: "Now",
            isSender: true,
            status: "sent",
            date: "Today",
            isStarred: false,
        };

        setChatMessages(prev => [...prev, newMessage]);

        setShowAttachment(false);
    };

    const openGallery = async () => {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            alert("Gallery permission denied");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images", "videos"],
            quality: 0.8,
            allowsMultipleSelection: false,
        });

        if (result.canceled) return;

        const asset = result.assets[0];
        const isVideo = asset.type === "video";

        const newMessage: Message = {
            id: Date.now().toString(),
            type: isVideo ? "video" : "image",
            message: "",
            image: isVideo ? null : asset.uri,
            video: isVideo
                ? { uri: asset.uri, size: asset.fileSize, duration: asset.duration ?? undefined }
                : undefined,
            time: "Now",
            isSender: true,
            status: "sent",
            date: "Today",
            isStarred: false,
        };

        setChatMessages(prev => [...prev, newMessage]);
        setShowAttachment(false);
    };

    const pickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            multiple: false,
            copyToCacheDirectory: true,
        });

        if (result.canceled) return;

        const file = result.assets[0];

        const newMessage: Message = {
            id: Date.now().toString(),
            type: "document",
            message: "",
            image: null,
            document: {
                name: file.name,
                uri: file.uri,
                size: file.size,
                mimeType: file.mimeType,
            },
            time: "Now",
            isSender: true,
            status: "sent",
            date: "Today",
            isStarred: false,
        };

        setChatMessages(prev => [...prev, newMessage]);

        setShowAttachment(false);
    };

    const pickAudio = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: "audio/*",
            copyToCacheDirectory: true,
        });

        if (result.canceled) return;

        const file = result.assets[0];

        const newMessage: Message = {
            id: Date.now().toString(),
            message: "",
            type: 'audio',
            audio: {
                uri: file.uri,
                name: file.name,
                size: file.size,
            },

            time: "Now",
            isSender: true,
            status: "sent",
            date: "Today",
            isStarred: false,
        };

        setChatMessages(prev => [...prev, newMessage]);

        setShowAttachment(false);
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

    const handleSendCurrentLocation = (loc: { latitude: number; longitude: number }) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            type: "location",
            message: "",
            image: null,
            location: { latitude: loc.latitude, longitude: loc.longitude },
            time: "Now",
            isSender: true,
            status: "sent",
            date: "Today",
            isStarred: false,
        };

        setChatMessages((prev) => [...prev, newMessage]);
        setShowLocationSheet(false);
    };

    const handleShareLiveLocation = async (
        loc: { latitude: number; longitude: number },
        durationMs: number
    ) => {
        // Abhi ek waqt me ek hi active live share (simplicity ke liye)
        stopLiveLocation();

        const id = Date.now().toString();
        const liveUntil = Date.now() + durationMs;

        const newMessage: Message = {
            id,
            type: "location",
            message: "",
            image: null,
            location: {
                latitude: loc.latitude,
                longitude: loc.longitude,
                isLive: true,
                liveUntil,
            },
            time: "Now",
            isSender: true,
            status: "sent",
            date: "Today",
            isStarred: false,
        };

        setChatMessages((prev) => [...prev, newMessage]);
        setShowLocationSheet(false);
        liveMessageIdRef.current = id;

        liveWatchRef.current = await ExpoLocation.watchPositionAsync(
            { accuracy: ExpoLocation.Accuracy.Balanced, timeInterval: 5000, distanceInterval: 10 },
            (update) => {
                setChatMessages((prev) =>
                    prev.map((m) =>
                        m.id === id && m.location
                            ? {
                                ...m,
                                location: {
                                    ...m.location,
                                    latitude: update.coords.latitude,
                                    longitude: update.coords.longitude,
                                },
                            }
                            : m
                    )
                );
            }
        );

        liveTimeoutRef.current = setTimeout(stopLiveLocation, durationMs);
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

    useEffect(() => {
        return () => {
            liveWatchRef.current?.remove();
            if (liveTimeoutRef.current) clearTimeout(liveTimeoutRef.current);
        };
    }, []);

    console.log("Chat ID:", chatId);
    console.log("User Name:", name);


    return (
        <ScreenContainer>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={{ flex: 1 }}>

                    <ChatHeader
                        name={(name as string) || "User"}
                        image={require("@/assets/images/man.png")}
                        online
                        onBack={() => router.back()}
                        onVoiceCall={() => { }}
                        onVideoCall={() => { }}
                        onMenu={() => { }}
                    />

                    <MessageList
                        ref={listRef}
                        messages={chatMessages}
                        bottomInset={inputHeight}
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
                            setSelectedDocument(document)
                            setShowDocumentViewer(true)
                        }}
                        onLocationPress={(message) => {
                            setSelectedLocationMessage(message);
                            setShowLocationViewer(true);
                        }}
                        onContactPress={(message) => {
                            setSelectedContactMessage(message);
                            setShowContactViewer(true);
                        }}

                    />

                    <KeyboardStickyView onLayout={(event) => {
                        setInputHeight(event.nativeEvent.layout.height);
                    }}>
                        <ScrollToBottomButton
                            visible={showScrollButton}
                            onPress={scrollToBottom}
                        />
                        <MessageInput
                            replyMessage={replyMessage}
                            setReplyMessage={setReplyMessage}
                            onSend={handleSend}
                            onEmojiPress={() => { }}
                            onAttachmentPress={() => setShowAttachment(true)}
                            onCameraPress={openCamera}
                            onVoicePress={() => { }}
                        />
                    </KeyboardStickyView>

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
                                sender: selectedMessage?.isSender ? "You" : (name as string),
                                message: selectedMessage?.message,
                            });
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

                            handleDeleteMessage(selectedMessage.id);
                        }}

                        onReaction={(emoji) => {
                            if (!selectedMessage) return;

                            handleReaction(selectedMessage.id, emoji);
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
                </View>
            </TouchableWithoutFeedback>

        </ScreenContainer>
    );
}