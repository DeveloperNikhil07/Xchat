import { StyleSheet } from "react-native";

const SENDER_BUBBLE = "#005C4B";
const RECEIVER_BUBBLE = "#202C33";
const TEXT_COLOR = "#E9EDEF";
const RECEIVER_TIME = "#8696A0";
const REACTION_BG = "#233138";
const REACTION_BORDER = "#0B141A";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginVertical: 2,
        // paddingHorizontal: 8,
    },

    senderContainer: {
        alignItems: "flex-end",
    },

    receiverContainer: {
        alignItems: "flex-start",
    },

    bubble: {
        alignSelf: "flex-start",
        maxWidth: "100%",
        minWidth: 60,
        paddingHorizontal: 8,
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 8,
        position: "relative",
    },

    senderBubble: {
        backgroundColor: SENDER_BUBBLE,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },

    receiverBubble: {
        backgroundColor: RECEIVER_BUBBLE,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },

    message: {
        fontSize: 15,
        lineHeight: 20,
        color: TEXT_COLOR,
        flexShrink: 1,
        flexWrap: "wrap",
    },

    senderMessage: {
        color: TEXT_COLOR,
    },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end",
        marginTop: 2,
    },

    time: {
        fontSize: 11,
        color: RECEIVER_TIME,
    },

    senderTime: {
        color: "rgba(255,255,255,0.65)",
    },

    reactionContainer: {
        position: "absolute",
        bottom: -12,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: REACTION_BG,
        borderRadius: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderWidth: 1.5,
        borderColor: REACTION_BORDER,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
    },

    senderReaction: {
        right: 6,
    },

    receiverReaction: {
        left: 6,
    },

    reactionText: {
        fontSize: 13,
    },
    deletedMessageContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingVertical: 3,
    },

    deletedMessageText: {
        fontSize: 14,
        fontStyle: "italic",
        color: "#777",
    },

    deletedMessageTextSender: {
        color: "rgba(255,255,255,0.7)",
    },
});