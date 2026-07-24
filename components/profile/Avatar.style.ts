import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginBottom:10
    },

    avatarWrapper: {
        position: "relative",
    },

    circle: {
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",

        backgroundColor: "#22343D",

        borderWidth: 3,
        borderColor: "rgba(255,255,255,0.18)",
    },

    onlineBadge: {
        position: "absolute",

        right: 4,
        bottom: 5,

        width: 22,
        height: 22,

        borderRadius: 11,

        backgroundColor: "#22C55E",

        borderWidth: 4,
        borderColor: Colors.background,
    },

    name: {
        marginTop: 16,

        color: Colors.textOnDark,

        fontSize: 24,
        fontWeight: "700",
    },

    phone: {
        marginTop: 5,

        color: "rgba(255,255,255,0.55)",

        fontSize: 14,
        fontWeight: "500",
    },
});