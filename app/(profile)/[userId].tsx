import ImageViewer from "@/components/chat/ImageViewer";
import Header from "@/components/common/Header";
import Avatar from "@/components/profile/Avatar";
import InfoCard from "@/components/profile/InfoCard";
import InfoRow from "@/components/profile/InfoRow";
import MediaPreview from "@/components/profile/MediaPreview";
import QuickActionButton from "@/components/profile/QuickActionButton";
import Colors from "@/constants/theme";
import { useAuth } from "@/hooks/useAuth";
import {
    blockUserInChat,
    ChatDetails,
    listenChatDetails,
    setDisappearingMessages,
    toggleMuteChat,
    unblockUserInChat,
} from "@/services/chat.service";
import { clearAllChatMessages } from "@/services/message.service";
import { getUserDocument } from "@/services/user.service";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ContactInfoScreen() {
    const { currentUser } = useAuth();
    const {
        userId,
        name,
        avatar,
        online,
        messages
    } = useLocalSearchParams<{
        userId: string;
        name?: string;
        avatar?: string;
        online?: string;
        messages?: string;
    }>();

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showImageViewer, setShowImageViewer] = useState(false);
    const [chatDetails, setChatDetails] = useState<ChatDetails | null>(null);
    const [userProfile, setUserProfile] = useState<any>(null);
    const [chatLock, setChatLock] = useState(false);

    const displayName = userProfile?.displayName || name || "User";
    const phone = userProfile?.phone;
    const bio = userProfile?.bio || "Hey there, I am using Xchat";
    const userAvatar = userProfile?.photoURL || avatar || "";
    const isOnline = online === "true" || userProfile?.isOnline;

    const disappearing = chatDetails?.disappearing ?? null;

    const isBlocked = useMemo(() => {
        return currentUser?.uid ? (chatDetails?.blockedBy || []).includes(currentUser.uid) : false;
    }, [chatDetails, currentUser?.uid]);

    const isMuted = useMemo(() => {
        return currentUser?.uid ? (chatDetails?.mutedBy || []).includes(currentUser.uid) : false;
    }, [chatDetails, currentUser?.uid]);

    useEffect(() => {
        if (!userId) return;
        const unsub = listenChatDetails(userId, (details) => {
            setChatDetails(details);
        });
        getUserDocument(userId).then((doc) => {
            if (doc) setUserProfile(doc);
        }).catch(() => {});
        return unsub;
    }, [userId]);

    const chatMessages = useMemo(() => {
        if (!messages) return [];
        try { return JSON.parse(messages); } catch { return []; }
    }, [messages]);

    const sharedImages = useMemo(() => {
        return chatMessages.filter((item: any) => item.type === "image" && item.image);
    }, [chatMessages]);

    const handleAudioCall = () => Alert.alert("Audio Call", `Calling ${displayName}...`);
    const handleVideoCall = () => Alert.alert("Video Call", `Starting video call with ${displayName}...`);

    const handleSearch = () => {
        router.replace({
            pathname: "/(chat)/[chatId]",
            params: { chatId: userId as string, name: displayName, openSearch: "true" },
        });
    };

    const handleMute = async () => {
        if (!userId || !currentUser) return;
        try {
            const nowMuted = await toggleMuteChat(userId, currentUser.uid);
            Alert.alert(
                nowMuted ? "Chat Muted" : "Notifications Enabled",
                nowMuted ? "You won't receive notifications from this chat." : "You will receive notifications."
            );
        } catch (e) { console.log("Mute error:", e); }
    };

    const handleBlock = () => {
        if (!userId || !currentUser) return;
        if (isBlocked) {
            Alert.alert(`Unblock ${displayName}`, "Do you want to unblock this user?", [
                { text: "Cancel", style: "cancel" },
                { text: "Unblock", onPress: async () => { await unblockUserInChat(userId, currentUser.uid); Alert.alert("Unblocked", `${displayName} has been unblocked.`); } },
            ]);
        } else {
            Alert.alert(`Block ${displayName}`, "Are you sure you want to block this user?", [
                { text: "Cancel", style: "cancel" },
                { text: "Block", style: "destructive", onPress: async () => { await blockUserInChat(userId, currentUser.uid); Alert.alert("Blocked", `${displayName} has been blocked.`); } },
            ]);
        }
    };

    const handleReport = () => {
        Alert.alert(`Report ${displayName}`, "Report this user for spam or inappropriate behavior?", [
            { text: "Cancel", style: "cancel" },
            { text: "Report", style: "destructive", onPress: () => Alert.alert("Reported", "Thank you. Your report has been submitted.") },
        ]);
    };

    const handleDisappearing = () => {
        const currentLabel = disappearing === "24h" ? "24 hours" : disappearing === "7days" ? "7 days" : disappearing === "90days" ? "90 days" : "Off";
        Alert.alert(
            "Disappearing Messages",
            `Currently: ${currentLabel}\n\nNew messages will disappear after:`,
            [
                { text: "24 Hours", onPress: async () => { if (userId) await setDisappearingMessages(userId, "24h"); } },
                { text: "7 Days", onPress: async () => { if (userId) await setDisappearingMessages(userId, "7days"); } },
                { text: "90 Days", onPress: async () => { if (userId) await setDisappearingMessages(userId, "90days"); } },
                { text: "Turn Off", style: "destructive", onPress: async () => { if (userId) await setDisappearingMessages(userId, null); } },
                { text: "Cancel", style: "cancel" },
            ]
        );
    };

    const clearChat = () => {
        Alert.alert("Clear Chat", "Are you sure you want to clear chat messages?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Clear",
                style: "destructive",
                onPress: async () => {
                    if (userId && currentUser?.uid) {
                        try {
                            await clearAllChatMessages(userId, currentUser.uid);
                            Alert.alert("Chat Cleared", "All messages have been cleared.");
                        } catch (e) {
                            console.log("Clear chat error:", e);
                        }
                    }
                },
            },
        ]);
    };

    const disappearingLabel = disappearing === "24h" ? "24 hours" : disappearing === "7days" ? "7 days" : disappearing === "90days" ? "90 days" : "Off";

    return (
        <View style={sc.container}>
            <View style={sc.headerWrapper} pointerEvents="box-none">
                <Header title="" onBack={() => router.back()} iconColor={Colors.surface} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={sc.scrollContent}>
                <LinearGradient
                    colors={["#1A3040", "#111B21"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={sc.heroBanner}
                >
                    <Avatar name={displayName} imageUri={userAvatar} online={isOnline} size={110} />
                    <View style={sc.actionContainer}>
                        <QuickActionButton icon="call" label="Audio" onPress={handleAudioCall} />
                        <QuickActionButton icon="videocam" label="Video" onPress={handleVideoCall} />
                        <QuickActionButton icon="search" label="Search" onPress={handleSearch} />
                        <QuickActionButton icon={isMuted ? "notifications" : "notifications-off"} label={isMuted ? "Unmute" : "Mute"} onPress={handleMute} />
                    </View>
                </LinearGradient>

                <View style={sc.content}>
                    <InfoCard>
                        <View style={sc.aboutContainer}>
                            <Text style={sc.aboutTitle}>About</Text>
                            <Text style={sc.aboutText}>{bio}</Text>
                        </View>
                        {phone ? (
                            <InfoRow icon="call" label={phone} rightText="Mobile" showDivider={false} onPress={handleAudioCall} />
                        ) : null}
                    </InfoCard>

                    {sharedImages.length > 0 && (
                        <InfoCard>
                            <MediaPreview images={sharedImages} onPress={(uri: string) => { setSelectedImage(uri); setShowImageViewer(true); }} />
                        </InfoCard>
                    )}

                    <InfoCard>
                        <InfoRow icon="timer" label="Disappearing messages" rightText={disappearingLabel} onPress={handleDisappearing} />
                        <InfoRow icon="lock-closed" label="Chat lock" rightText={chatLock ? "On" : "Off"} onPress={() => setChatLock(prev => !prev)} />
                        <InfoRow icon="trash" label="Clear chat" danger showChevron={false} showDivider={false} onPress={clearChat} />
                    </InfoCard>

                    <InfoCard>
                        <InfoRow icon={isBlocked ? "checkmark-circle" : "ban"} label={isBlocked ? `Unblock ${displayName}` : `Block ${displayName}`} showChevron={false} danger={!isBlocked} onPress={handleBlock} />
                        <InfoRow icon="flag" label={`Report ${displayName}`} showChevron={false} showDivider={false} danger onPress={handleReport} />
                    </InfoCard>
                </View>

                <ImageViewer
                    visible={showImageViewer}
                    image={selectedImage}
                    onClose={() => { setShowImageViewer(false); setSelectedImage(null); }}
                />
            </ScrollView>
        </View>
    );
}

const sc = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#111B21" },
    headerWrapper: { position: "absolute", top: 0, left: 0, right: 0, zIndex: 10 },
    scrollContent: { paddingBottom: 60 },
    heroBanner: { paddingTop: 80, paddingBottom: 28, alignItems: "center" },
    actionContainer: { flexDirection: "row", justifyContent: "space-evenly", width: "100%", paddingHorizontal: 20, marginTop: 20 },
    content: { paddingHorizontal: 16, paddingTop: 12 },
    aboutContainer: { paddingHorizontal: 16, paddingVertical: 14 },
    aboutTitle: { color: "rgba(255,255,255,0.45)", fontSize: 12, fontWeight: "600", marginBottom: 6, letterSpacing: 0.5, textTransform: "uppercase" },
    aboutText: { color: Colors.textOnDark, fontSize: 15, lineHeight: 22, fontWeight: "400" },
});