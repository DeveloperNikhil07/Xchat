import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, View } from "react-native";

import AttachmentOption from "./AttachmentOption";
import styles from "./AttachmentSheet.style";

interface Props {
    visible: boolean;
    onClose: () => void;

    onCamera: () => void;
    onGallery: () => void;
    onDocument: () => void;
    onAudio: () => void;
    onLocation: () => void;
    onContact: () => void;
}

export default function AttachmentSheet({
    visible,
    onClose,
    onCamera,
    onGallery,
    onDocument,
    onAudio,
    onLocation,
    onContact,
}: Props) {
    return (
        <Modal
            transparent
            animationType="slide"
            visible={visible}
            statusBarTranslucent
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose} />

            <View style={styles.sheet}>
                <View style={styles.handle} />

                <View style={styles.row}>
                    <AttachmentOption
                        title="Document"
                        onPress={onDocument}
                        icon={
                            <MaterialCommunityIcons
                                name="file-document-outline"
                                size={28}
                                color="#4F46E5"
                            />
                        }
                    />

                    <AttachmentOption
                        title="Camera"
                        onPress={onCamera}
                        icon={
                            <Ionicons
                                name="camera-outline"
                                size={28}
                                color="#22C55E"
                            />
                        }
                    />

                    <AttachmentOption
                        title="Gallery"
                        onPress={onGallery}
                        icon={
                            <Ionicons
                                name="images-outline"
                                size={28}
                                color="#EC4899"
                            />
                        }
                    />
                </View>

                <View style={styles.row}>
                    <AttachmentOption
                        title="Audio"
                        onPress={onAudio}
                        icon={
                            <Ionicons
                                name="mic-outline"
                                size={28}
                                color="#F97316"
                            />
                        }
                    />

                    <AttachmentOption
                        title="Location"
                        onPress={onLocation}
                        icon={
                            <Ionicons
                                name="location-outline"
                                size={28}
                                color="#EF4444"
                            />
                        }
                    />

                    <AttachmentOption
                        title="Contact"
                        onPress={onContact}
                        icon={
                            <Ionicons
                                name="person-outline"
                                size={28}
                                color="#06B6D4"
                            />
                        }
                    />
                </View>
            </View>
        </Modal>
    );
}