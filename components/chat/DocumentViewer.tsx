import { Ionicons } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Linking,
    Modal,
    Pressable,
    Text,
    View,
} from "react-native";
import { WebView } from "react-native-webview";

import { formatSize } from "@/hooks/fileFormatSize";
import { getFileInfo } from "@/hooks/getDocumentIcon";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./DocumentViewer.style";

interface DocumentData {
    name: string;
    uri: string;
    size?: number;
    mimeType?: string;
}

interface Props {
    visible: boolean;
    document: DocumentData | null;
    onClose: () => void;
}

// Sirf PDF hi kabhi inline preview hoti hai, baaki sab hamesha "open with"
function isPdf(doc: DocumentData) {
    return (
        doc.mimeType?.includes("pdf") ||
        doc.name.toLowerCase().endsWith(".pdf")
    );
}

// Local file:// URI pe WebView PDF preview bharosemand nahi hai
// (khaaskar Android pe). Ye tabhi reliable hoga jab file https url ho
// (cloud/Firebase Storage aane ke baad). Isliye preview sirf http(s)
// URLs ke liye try karo, local files ke liye seedha fallback card.
function isPreviewable(doc: DocumentData) {
    const isRemote = doc.uri.startsWith("http://") || doc.uri.startsWith("https://");
    return isPdf(doc) && isRemote;
}

export default function DocumentViewer({ visible, document, onClose }: Props) {
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        if (visible) {
            setLoading(true);
            setFailed(false);
        }
    }, [visible, document?.uri]);

    if (!document) return null;

    const file = getFileInfo(document.name);
    const canPreview = isPreviewable(document) && !failed;

    const handleOpenExternally = async () => {
        try {
            const isAvailable = await Sharing.isAvailableAsync();

            if (isAvailable) {
                await Sharing.shareAsync(document.uri, {
                    mimeType: document.mimeType,
                    dialogTitle: document.name,
                });
            } else {
                await Linking.openURL(document.uri);
            }
        } catch (e) {
            alert("Document open nahi ho paya");
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Pressable onPress={onClose} hitSlop={12}>
                        <Ionicons name="close" size={26} color="#111" />
                    </Pressable>

                    <View style={styles.headerText}>
                        <Text numberOfLines={1} style={styles.title}>
                            {document.name}
                        </Text>
                        {!!document.size && (
                            <Text style={styles.subtitle}>
                                {formatSize(document.size)}
                            </Text>
                        )}
                    </View>

                    <Pressable onPress={handleOpenExternally} hitSlop={12}>
                        <Ionicons name="share-outline" size={22} color="#111" />
                    </Pressable>
                </View>

                {/* Body */}
                {canPreview ? (
                    <View style={{ flex: 1 }}>
                        <WebView
                            source={{ uri: document.uri }}
                            style={{ flex: 1 }}
                            startInLoadingState
                            onLoadEnd={() => setLoading(false)}
                            onError={() => {
                                setFailed(true);
                                setLoading(false);
                            }}
                        />
                        {loading && (
                            <View style={styles.loaderOverlay}>
                                <ActivityIndicator size="large" color="#20A090" />
                            </View>
                        )}
                    </View>
                ) : (
                    <View style={styles.fallback}>
                        <View
                            style={[
                                styles.fallbackIcon,
                                { backgroundColor: file.bg },
                            ]}
                        >
                            <Ionicons
                                name={file.icon as any}
                                size={56}
                                color={file.color}
                            />
                        </View>

                        <Text style={styles.fallbackName} numberOfLines={2}>
                            {document.name}
                        </Text>

                        <View
                            style={[
                                styles.badge,
                                { backgroundColor: file.color },
                            ]}
                        >
                            <Text style={styles.badgeText}>{file.badge}</Text>
                        </View>

                        {!!document.size && (
                            <Text style={styles.fallbackSize}>
                                {formatSize(document.size)}
                            </Text>
                        )}

                        <Text style={styles.fallbackHint}>
                            Is file type ki inline preview yaha available nahi hai
                        </Text>

                        <Pressable
                            style={styles.openButton}
                            onPress={handleOpenExternally}
                        >
                            <Ionicons name="open-outline" size={18} color="#FFF" />
                            <Text style={styles.openButtonText}>
                                Open With
                            </Text>
                        </Pressable>
                    </View>
                )}
            </SafeAreaView>
        </Modal>
    );
}