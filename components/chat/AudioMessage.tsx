import { Ionicons } from "@expo/vector-icons";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";

import { formatSize } from "@/hooks/fileFormatSize";
import { getFileInfo } from "@/hooks/getDocumentIcon";
import styles from "./AudioMessage.style";

interface Props {
    uri: string;
    name: string;
    size?: number;
}

function formatDuration(seconds: number) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export default function AudioMessage({ uri, name, size }: Props) {
    const file = getFileInfo(name);

    const player = useAudioPlayer(uri);
    const status = useAudioPlayerStatus(player);

    const duration = status.duration || 0;
    const currentTime = status.currentTime || 0;
    const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0;

    // Audio khtm hote hi wapas start pe reset
    useEffect(() => {
        if (status.didJustFinish) {
            player.seekTo(0);
            player.pause();
        }
    }, [status.didJustFinish]);

    const togglePlay = () => {
        if (status.playing) {
            player.pause();
        } else {
            player.play();
        }
    };

    const timeLabel =
        status.playing || currentTime > 0
            ? formatDuration(currentTime)
            : formatDuration(duration);

    return (
        <View style={styles.container}>
            <Pressable onPress={togglePlay} style={styles.playButton}>
                <Ionicons
                    name={status.playing ? "pause" : "play"}
                    size={22}
                    color="#FFF"
                    style={!status.playing ? { marginLeft: 2 } : undefined}
                />
            </Pressable>

            <View style={styles.content}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="middle"
                    style={styles.name}
                >
                    {name}
                </Text>

                <View style={styles.progressTrack}>
                    <View
                        style={[
                            styles.progressFill,
                            { width: `${progress * 100}%` },
                        ]}
                    />
                    <View
                        style={[
                            styles.progressDot,
                            { left: `${progress * 100}%` },
                        ]}
                    />
                </View>

                <View style={styles.bottomRow}>
                    <View
                        style={[
                            styles.badge,
                            { backgroundColor: file.color },
                        ]}
                    >
                        <Text style={styles.badgeText}>{file.badge}</Text>
                    </View>

                    <Text style={styles.duration}>{timeLabel}</Text>

                    {!!size && (
                        <Text style={styles.size}>{formatSize(size)}</Text>
                    )}
                </View>
            </View>
        </View>
    );
}