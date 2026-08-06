export interface MessageInputProps {
    onSend?: (text: string) => void;

    onEmojiPress?: () => void;
    onAttachmentPress?: () => void;
    onCameraPress?: () => void;
    onVoicePress?: () => void;

    replyMessage: any;
    setReplyMessage: (value: any) => void;

    showEmoji: boolean;
    setShowEmoji: React.Dispatch<React.SetStateAction<boolean>>;
}