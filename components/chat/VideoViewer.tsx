import { Ionicons } from "@expo/vector-icons";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect } from "react";
import { Modal, Pressable, SafeAreaView, View } from "react-native";

import styles from "./VideoViewer.style";

interface Props {
    visible: boolean;
    uri: string | null;
    onClose: () => void;
}

export default function VideoViewer({ visible, uri, onClose }: Props) {
    const player = useVideoPlayer(uri ?? "", (p) => {
        p.loop = false;
    });

    useEffect(() => {
        if (visible && uri) {
            player.play();
        } else {
            player.pause();
        }
    }, [visible, uri]);

    if (!uri) return null;

    return (
        <Modal
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <SafeAreaView style={styles.container}>
                <Pressable
                    style={styles.closeButton}
                    onPress={onClose}
                    hitSlop={12}
                >
                    <Ionicons name="close" size={28} color="#FFF" />
                </Pressable>

                <View style={styles.videoWrapper}>
                    <VideoView
                        player={player}
                        style={styles.video}
                        contentFit="contain"
                        nativeControls
                        allowsFullscreen
                    />
                </View>
            </SafeAreaView>
        </Modal>
    );
}