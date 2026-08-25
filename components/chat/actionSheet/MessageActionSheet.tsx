import React from "react";
import { Modal, Pressable, View } from "react-native";

import { Props } from "@/types/chat/actionSheet/types";
import MessageActionItem from "./MessageActionItem";
import styles from "./MessageActionSheet.style";
import MessageReactionBar from "./MessageReactionBar";

export default function MessageActionSheet({
    visible,
    onClose,
    onReply,
    onCopy,
    onForward,
    onStar,
    onDelete,
    onReaction,
    onEdit,
    onOpenEmojiPicker,
}: Props) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            statusBarTranslucent
            onRequestClose={onClose}
        >
            <Pressable
                style={styles.overlay}
                onPress={onClose}
            >
                <Pressable style={styles.container}>
                    <View style={styles.reactionContainer}>
                        <MessageReactionBar
                            onSelect={onReaction}
                            onOpenEmojiPicker={() => {
                                onClose();
                                setTimeout(() => onOpenEmojiPicker?.(), 250);
                            }}
                        />
                    </View>


                    <View style={styles.actions}>
                        <MessageActionItem
                            title="Reply"
                            icon="arrow-undo-outline"
                            onPress={() => {
                                onReply?.();
                                onClose();
                            }}
                        />

                        <MessageActionItem
                            title="Edit"
                            icon="pencil"
                            onPress={() => {
                                onEdit?.();
                                onClose();
                            }}
                        />

                        <MessageActionItem
                            title="Copy"
                            icon="copy-outline"
                            onPress={() => {
                                onCopy?.();
                                onClose();
                            }}
                        />

                        <MessageActionItem
                            title="Forward"
                            icon="share-social-outline"
                            onPress={() => {
                                onForward?.();
                                onClose();
                            }}
                        />

                        <MessageActionItem
                            title="Star"
                            icon="star-outline"
                            onPress={() => {
                                onStar?.();
                                onClose();
                            }}
                        />

                        <MessageActionItem
                            title="Delete"
                            icon="trash-outline"
                            color="#FF4D4F"
                            onPress={() => {
                                onDelete?.();
                                onClose();
                            }}
                        />
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
}