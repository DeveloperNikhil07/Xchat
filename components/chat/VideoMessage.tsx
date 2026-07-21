import { Ionicons } from "@expo/vector-icons";
import { useVideoPlayer, VideoView } from "expo-video";
import { Pressable, Text, View } from "react-native";

import { formatSize } from "@/hooks/fileFormatSize";
import styles from "./VideoMessage.style";

interface Props {
    uri: string;
    size?: number;
    onPress?: () => void;
}

export default function VideoMessage({ uri, size, onPress }: Props) {
    // Sirf first frame thumbnail ke liye player, play nahi karte yaha
    const player = useVideoPlayer(uri, (p) => {
        p.muted = true;
    });

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <VideoView
                player={player}
                style={styles.thumbnail}
                contentFit="cover"
                nativeControls={false}
                allowsFullscreen={false}
                allowsPictureInPicture={false}
            />

            <View style={styles.overlay}>
                <View style={styles.playCircle}>
                    <Ionicons
                        name="play"
                        size={26}
                        color="#FFF"
                        style={{ marginLeft: 3 }}
                    />
                </View>
            </View>

            {!!size && (
                <View style={styles.sizeBadge}>
                    <Text style={styles.sizeText}>{formatSize(size)}</Text>
                </View>
            )}
        </Pressable>
    );
}