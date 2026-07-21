import { ReplyMessage } from "../message/message";

export interface MessageInputProps {
    onSend?: (message: string) => void;
    onEmojiPress?: () => void;
    onAttachmentPress?: () => void;
    onCameraPress?: () => void;
    onVoicePress?: () => void;

    replyMessage?: ReplyMessage | null;
    setReplyMessage: (reply: ReplyMessage | null) => void;
}