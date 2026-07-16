import Colors from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginRight: 18,
        width: 74,
    },

    avatarWrapper: {
        width: 68,
        height: 68,

        borderRadius: 34,

        backgroundColor: "#FFFFFF",

        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.12,
        shadowRadius: 12,

        elevation: 8,
    },

    avatar: {
        width: 62,
        height: 62,
        borderRadius: 31,
    },

    onlineDot: {
        position: "absolute",

        bottom: 2,
        right: 2,

        width: 16,
        height: 16,

        borderRadius: 8,

        backgroundColor: Colors.success,

        borderWidth: 3,
        borderColor: "#FFFFFF",
    },

    addAvatar: {
        width: 68,
        height: 68,

        borderRadius: 34,

        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "rgba(255,255,255,.18)",

        borderWidth: 1,
        borderColor: "rgba(255,255,255,.15)",
    },

    name: {
        marginTop: 10,

        fontSize: 14,

        fontWeight: "600",

        color: "#FFFFFF",

        maxWidth: 70,

        textAlign: "center",
    },
});