import Colors from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",

        paddingHorizontal: 22,
        paddingVertical: 16,

        borderBottomWidth: 1,
        borderBottomColor: "#F2F2F2",
    },

    avatarContainer: {
        position: "relative",
    },

    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },

    onlineDot: {
        position: "absolute",
        bottom: 2,
        right: 2,

        width: 15,
        height: 15,
        borderRadius: 8,

        backgroundColor: Colors.success,

        borderWidth: 2,
        borderColor: "#fff",
    },

    content: {
        flex: 1,
        marginLeft: 15,
    },

    name: {
        fontSize: 17,
        fontWeight: "700",
        color: Colors.textPrimary,
    },

    messageRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },

    message: {
        flex: 1,
        fontSize: 14,
        color: Colors.textSecondary,
        marginLeft: 4,
    },

    typing: {
        color: Colors.brandPrimary,
        fontStyle: "italic",
    },

    right: {
        alignItems: "flex-end",
        justifyContent: "space-between",
        height: 50,
    },

    time: {
        fontSize: 12,
        color: Colors.textSecondary,
    },

    badge: {
        minWidth: 22,
        height: 22,
        borderRadius: 11,

        backgroundColor: Colors.brandPrimary,

        justifyContent: "center",
        alignItems: "center",

        paddingHorizontal: 6,
    },

    badgeText: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "700",
    },
});