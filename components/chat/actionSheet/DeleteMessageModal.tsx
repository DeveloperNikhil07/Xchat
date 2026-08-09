import React from "react";
import {
    Modal,
    Pressable,
    Text,
    View,
    useColorScheme,
} from "react-native";

import styles from "./DeleteMessageModal.style";

interface Props {
    visible: boolean;
    isSender: boolean;
    onClose: () => void;
    onDeleteForMe: () => void;
    onDeleteForEveryone: () => void;
}

export default function DeleteMessageModal({
    visible,
    isSender,
    onClose,
    onDeleteForMe,
    onDeleteForEveryone,
}: Props) {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            statusBarTranslucent
            onRequestClose={onClose}
        >
            <View
                style={[
                    styles.overlay,
                    isDark && styles.overlayDark,
                ]}
            >
                <Pressable
                    style={styles.backdrop}
                    onPress={onClose}
                />

                <View
                    style={[
                        styles.container,
                        isDark && styles.containerDark,
                    ]}
                >
                    {/* Handle */}
                    <View
                        style={[
                            styles.handle,
                            isDark && styles.handleDark,
                        ]}
                    />

                    {/* Header */}
                    <View style={styles.header}>
                        <Text
                            style={[
                                styles.title,
                                isDark && styles.titleDark,
                            ]}
                        >
                            Delete message
                        </Text>

                        <Text
                            style={[
                                styles.subtitle,
                                isDark && styles.subtitleDark,
                            ]}
                        >
                            Choose an option
                        </Text>
                    </View>

                    {/* Delete for everyone */}
                    {isSender && (
                        <Pressable
                            onPress={onDeleteForEveryone}
                            style={({ pressed }) => [
                                styles.option,
                                styles.deleteEveryoneOption,
                                isDark &&
                                    styles.deleteEveryoneOptionDark,
                                pressed &&
                                    styles.optionPressed,
                            ]}
                        >
                            <View
                                style={[
                                    styles.iconBox,
                                    styles.everyoneIconBox,
                                    isDark &&
                                        styles.everyoneIconBoxDark,
                                ]}
                            >
                                <Text style={styles.icon}>
                                    🗑️
                                </Text>
                            </View>

                            <View style={styles.textContainer}>
                                <Text
                                    style={[
                                        styles.optionTitle,
                                        styles.everyoneTitle,
                                        isDark &&
                                            styles.everyoneTitleDark,
                                    ]}
                                >
                                    Delete for everyone
                                </Text>

                                <Text
                                    style={[
                                        styles.optionSubtitle,
                                        isDark &&
                                            styles.optionSubtitleDark,
                                    ]}
                                >
                                    Remove this message for everyone
                                </Text>
                            </View>

                            <Text
                                style={[
                                    styles.arrow,
                                    isDark &&
                                        styles.arrowDark,
                                ]}
                            >
                                ›
                            </Text>
                        </Pressable>
                    )}

                    {/* Delete for me */}
                    <Pressable
                        onPress={onDeleteForMe}
                        style={({ pressed }) => [
                            styles.option,
                            styles.deleteMeOption,
                            isDark &&
                                styles.deleteMeOptionDark,
                            pressed &&
                                styles.optionPressed,
                        ]}
                    >
                        <View
                            style={[
                                styles.iconBox,
                                styles.meIconBox,
                                isDark &&
                                    styles.meIconBoxDark,
                            ]}
                        >
                            <Text style={styles.icon}>
                                🗑️
                            </Text>
                        </View>

                        <View style={styles.textContainer}>
                            <Text
                                style={[
                                    styles.optionTitle,
                                    isDark &&
                                        styles.optionTitleDark,
                                ]}
                            >
                                Delete for me
                            </Text>

                            <Text
                                style={[
                                    styles.optionSubtitle,
                                    isDark &&
                                        styles.optionSubtitleDark,
                                ]}
                            >
                                Remove this message only for you
                            </Text>
                        </View>

                        <Text
                            style={[
                                styles.arrow,
                                isDark && styles.arrowDark,
                            ]}
                        >
                            ›
                        </Text>
                    </Pressable>

                    {/* Cancel */}
                    <Pressable
                        style={({ pressed }) => [
                            styles.cancelButton,
                            isDark &&
                                styles.cancelButtonDark,
                            pressed &&
                                styles.cancelPressed,
                        ]}
                        onPress={onClose}
                    >
                        <Text
                            style={[
                                styles.cancelText,
                                isDark &&
                                    styles.cancelTextDark,
                            ]}
                        >
                            Cancel
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}