import { Ionicons } from "@expo/vector-icons";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Modal,
    Pressable,
    Text,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { formatSize } from "@/hooks/fileFormatSize";
import { getFileInfo } from "@/hooks/getDocumentIcon";
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

export default function DocumentViewer({
    visible,
    document,
    onClose,
}: Props) {
    const [opening, setOpening] = useState(false);

    useEffect(() => {
        if (!visible) {
            setOpening(false);
        }
    }, [visible]);

    if (!document) {
        return null;
    }

    const file = getFileInfo(document.name);

    // --------------------------------------------------
    // MIME TYPE
    // --------------------------------------------------

    const getMimeType = (): string => {
        if (document.mimeType) {
            return document.mimeType;
        }

        const extension = document.name
            .split(".")
            .pop()
            ?.toLowerCase();

        switch (extension) {
            case "pdf":
                return "application/pdf";

            case "doc":
                return "application/msword";

            case "docx":
                return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

            case "xls":
                return "application/vnd.ms-excel";

            case "xlsx":
                return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            case "ppt":
                return "application/vnd.ms-powerpoint";

            case "pptx":
                return "application/vnd.openxmlformats-officedocument.presentationml.presentation";

            case "txt":
                return "text/plain";

            case "csv":
                return "text/csv";

            case "jpg":
            case "jpeg":
                return "image/jpeg";

            case "png":
                return "image/png";

            case "gif":
                return "image/gif";

            case "webp":
                return "image/webp";

            default:
                return "*/*";
        }
    };

    // --------------------------------------------------
    // DOWNLOAD FILE TO CACHE
    // --------------------------------------------------

    const downloadFile = async (): Promise<string> => {
        // Already local
        if (
            document.uri.startsWith("file://") ||
            document.uri.startsWith("content://")
        ) {
            console.log(
                "📁 File already local:",
                document.uri
            );

            return document.uri;
        }

        const safeName = document.name.replace(
            /[^a-zA-Z0-9._-]/g,
            "_"
        );

        const localFile = new File(
            Paths.cache,
            safeName
        );

        console.log("📥 Downloading document...");
        console.log(
            "☁️ Cloudinary URL:",
            document.uri
        );
        console.log(
            "📁 Local URI:",
            localFile.uri
        );

        try {
            if (localFile.exists) {
                localFile.delete();
            }
        } catch (error) {
            console.log(
                "⚠️ Cache delete error:",
                error
            );
        }

        const downloadedFile =
            await File.downloadFileAsync(
                document.uri,
                localFile
            );

        console.log(
            "✅ Downloaded:",
            downloadedFile.uri
        );

        return downloadedFile.uri;
    };

    // --------------------------------------------------
    // OPEN / SHARE
    // --------------------------------------------------

    const handleOpen = async () => {
        if (opening) {
            return;
        }

        try {
            setOpening(true);

            console.log(
                "📄 Opening:",
                document.name
            );

            const localUri =
                await downloadFile();

            console.log(
                "📂 Local file:",
                localUri
            );

            const available =
                await Sharing.isAvailableAsync();

            console.log(
                "📱 Sharing available:",
                available
            );

            if (!available) {
                Alert.alert(
                    "Not Available",
                    "Is device par Open With available nahi hai."
                );

                return;
            }

            await Sharing.shareAsync(
                localUri,
                {
                    mimeType: getMimeType(),

                    dialogTitle:
                        `Open ${document.name}`,
                }
            );

            console.log(
                "✅ Open With sheet opened"
            );
        } catch (error: any) {
            console.log(
                "❌ Document open error:",
                error
            );

            Alert.alert(
                "Unable to Open",
                error?.message ||
                    "Document open nahi ho paya."
            );
        } finally {
            setOpening(false);
        }
    };

    // --------------------------------------------------
    // UI
    // --------------------------------------------------

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <SafeAreaView
                style={styles.container}
            >
                {/* HEADER */}
                <View style={styles.header}>
                    <Pressable
                        onPress={onClose}
                        hitSlop={12}
                    >
                        <Ionicons
                            name="close"
                            size={26}
                            color="#111"
                        />
                    </Pressable>

                    <View
                        style={styles.headerText}
                    >
                        <Text
                            numberOfLines={1}
                            style={styles.title}
                        >
                            {document.name}
                        </Text>

                        {!!document.size && (
                            <Text
                                style={
                                    styles.subtitle
                                }
                            >
                                {formatSize(
                                    document.size
                                )}
                            </Text>
                        )}
                    </View>

                    <View
                        style={{
                            width: 26,
                        }}
                    />
                </View>

                {/* BODY */}
                <View style={styles.fallback}>
                    {/* ICON */}
                    <View
                        style={[
                            styles.fallbackIcon,
                            {
                                backgroundColor:
                                    file.bg,
                            },
                        ]}
                    >
                        <Ionicons
                            name={
                                file.icon as any
                            }
                            size={56}
                            color={file.color}
                        />
                    </View>

                    {/* NAME */}
                    <Text
                        style={
                            styles.fallbackName
                        }
                        numberOfLines={2}
                    >
                        {document.name}
                    </Text>

                    {/* BADGE */}
                    <View
                        style={[
                            styles.badge,
                            {
                                backgroundColor:
                                    file.color,
                            },
                        ]}
                    >
                        <Text
                            style={
                                styles.badgeText
                            }
                        >
                            {file.badge}
                        </Text>
                    </View>

                    {/* SIZE */}
                    {!!document.size && (
                        <Text
                            style={
                                styles.fallbackSize
                            }
                        >
                            {formatSize(
                                document.size
                            )}
                        </Text>
                    )}

                    {/* DESCRIPTION */}
                    <Text
                        style={
                            styles.fallbackHint
                        }
                    >
                        File ko phone ke installed
                        app se open karein.
                    </Text>

                    {/* OPEN BUTTON */}
                    <Pressable
                        style={[
                            styles.openButton,
                            opening && {
                                opacity: 0.7,
                            },
                        ]}
                        onPress={handleOpen}
                        disabled={opening}
                    >
                        {opening ? (
                            <ActivityIndicator
                                size="small"
                                color="#FFF"
                            />
                        ) : (
                            <Ionicons
                                name="open-outline"
                                size={18}
                                color="#FFF"
                            />
                        )}

                        <Text
                            style={
                                styles.openButtonText
                            }
                        >
                            {opening
                                ? "Opening..."
                                : "Open With"}
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </Modal>
    );
}
