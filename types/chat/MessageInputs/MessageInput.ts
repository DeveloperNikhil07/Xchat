import { Message } from "../message/message";

export interface MessageInputProps {
    onSend?: (text: string) => void;

    onEmojiPress?: () => void;
    onAttachmentPress?: () => void;
    onCameraPress?: () => void;
    onVoicePress?: () => void;
    onTyping?: () => void;
    onStopTyping?: () => void;

    replyMessage: any;
    setReplyMessage: (value: any) => void;
    editingMessage?: Message | null;

    onCancelEdit?: () => void;

    onEdit?: (messageId: string, text: string) => void | Promise<void>;
    showEmoji: boolean;
    setShowEmoji: React.Dispatch<React.SetStateAction<boolean>>;
}