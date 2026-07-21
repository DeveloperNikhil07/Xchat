export type MessageAction =
    | "reply"
    | "copy"
    | "forward"
    | "star"
    | "delete";

export interface ActionItem {
    id: MessageAction;
    title: string;
    icon: string;
    color?: string;
}
export interface Props {
    visible: boolean;
    onClose: () => void;
    onReply?: () => void;
    onCopy?: () => void;
    onForward?: () => void;
    onStar?: () => void;
    onDelete?: () => void;
    onReaction?: (emoji: string) => void;
}