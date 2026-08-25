import {
    AudioModule,
    RecordingPresets,
    useAudioRecorder,
} from "expo-audio";
import * as FileSystem from "expo-file-system";
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";

export interface RecordedAudio {
    uri: string;
    name: string;
    size?: number;
    duration?: number;
}

interface Props {
    onRecorded?: (audio: RecordedAudio) => void;
}

export default function useVoiceRecorder({
    onRecorded,
}: Props = {}) {
    const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const startRecording = async () => {
        try {
            const permission =
                await AudioModule.requestRecordingPermissionsAsync();

            if (!permission.granted) {
                Alert.alert("Permission Required", "Microphone permission is required to record audio.");
                return false;
            }

            await recorder.prepareToRecordAsync();
            recorder.record();
            setIsRecording(true);
            setRecordingDuration(0);

            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            timerRef.current = setInterval(() => {
                setRecordingDuration((prev) => prev + 1);
            }, 1000);

            return true;
        } catch (e) {
            console.log("Start recording error:", e);
            Alert.alert("Recording Error", "Unable to start recording.");
            return false;
        }
    };

    const stopRecording = async () => {
        try {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }

            if (!isRecording) return;

            await recorder.stop();
            setIsRecording(false);

            const uri = recorder.uri;
            const finalDuration = recordingDuration;
            setRecordingDuration(0);

            if (!uri) return;

            let fileSize: number | undefined;
            try {
                const info = await FileSystem.getInfoAsync(uri);
                if (info.exists) {
                    fileSize = info.size;
                }
            } catch (err) {
                console.log("File info error:", err);
            }

            const recordedData: RecordedAudio = {
                uri,
                name: `voice_${Date.now()}.m4a`,
                size: fileSize,
                duration: finalDuration || Math.round(recorder.currentTime || 0),
            };

            if (onRecorded) {
                onRecorded(recordedData);
            }

            return recordedData;
        } catch (e) {
            console.log("Stop recording error:", e);
            setIsRecording(false);
            setRecordingDuration(0);
        }
    };

    const cancelRecording = async () => {
        try {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }

            if (isRecording) {
                await recorder.stop();
                setIsRecording(false);
                setRecordingDuration(0);

                if (recorder.uri) {
                    try {
                        await FileSystem.deleteAsync(recorder.uri, { idempotent: true });
                    } catch {}
                }
            }
        } catch (e) {
            console.log("Cancel recording error:", e);
            setIsRecording(false);
            setRecordingDuration(0);
        }
    };

    return {
        isRecording,
        recordingDuration,
        startRecording,
        stopRecording,
        cancelRecording,
    };
}