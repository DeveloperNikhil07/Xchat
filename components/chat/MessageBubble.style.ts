import Colors from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginVertical: 6,
    },

    senderContainer: {
        alignItems: "flex-end",
    },

    receiverContainer: {
        alignItems: "flex-start",
    },

    bubble: {
        maxWidth: "78%",
        paddingHorizontal: 16,
        paddingVertical: 12,
    },

    senderBubble: {
        backgroundColor: Colors.brandPrimary,

        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 8,
    },

    receiverBubble: {
        backgroundColor: "#FFFFFF",

        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 22,

        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },

    message: {
        fontSize: 15,
        lineHeight: 22,
        color: Colors.textPrimary,
    },

    senderMessage: {
        color: "#FFF",
    },

    footer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },

    time: {
        fontSize: 11,
        color: "#888",
        marginRight: 4,
    },

    senderTime: {
        color: "rgba(255,255,255,.75)",
    },
    reactionContainer: {
        position: "absolute",
        bottom: -10,
        backgroundColor: "#FFF",
        borderRadius: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
        elevation: 2,
    },

    senderReaction: {
        right: 8,
    },

    receiverReaction: {
        left: 8,
    },

    reactionText: {
        fontSize: 14,
    },
});