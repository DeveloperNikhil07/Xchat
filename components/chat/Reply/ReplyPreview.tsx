import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { ReplyPreviewProps } from "@/types/chat/message/message";
import styles from "./ReplyPreview.style";



const ReplyPreview: React.FC<ReplyPreviewProps> = ({
    senderName,
    message,
    onClose,
}) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.sender}>Replying to {senderName}</Text>

                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.closeButton}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name="close"
                            size={20}
                            color="#8696A0"
                        />
                    </TouchableOpacity>
                </View>

                <Text
                    style={styles.message}
                    numberOfLines={2}
                >
                    {message}
                </Text>
            </View>
        </View>
    );
};

export default ReplyPreview;