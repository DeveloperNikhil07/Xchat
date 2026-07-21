import {
    AudioModule,
    RecordingPresets,
    useAudioRecorder,
} from "expo-audio";
import * as FileSystem from "expo-file-system";
import { useState } from "react";

export interface RecordedAudio {
    uri: string;
    name: string;
    size?: number;
    duration?: number;
}

interface Props {
    onRecorded: (audio: RecordedAudio) => void;
}

export default function useVoiceRecorder({
    onRecorded,
}: Props) {
    const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

    const [isRecording, setIsRecording] = useState(false);

    const startRecording = async () => {
        try {
            const permission =
                await AudioModule.requestRecordingPermissionsAsync();

            if (!permission.granted) return;

            await recorder.prepareToRecordAsync();

            recorder.record();

            setIsRecording(true);
        } catch (e) {
            console.log(e);
        }
    };

    const stopRecording = async () => {
        try {
            if (!isRecording) return;

            await recorder.stop();

            setIsRecording(false);

            const uri = recorder.uri;

            if (!uri) return;

            const info = await FileSystem.getInfoAsync(uri);

            onRecorded({
                uri,
                name: `voice_${Date.now()}.m4a`,
                size: info.exists ? info.size : undefined,
                duration: recorder.currentTime,
            });
        } catch (e) {
            console.log(e);
        }
    };

    return {
        isRecording,

        startRecording,

        stopRecording,
    };
}