import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginBottom: 16,
    },

    avatarWrapper: {
        position: "relative",
    },

    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#22343D",
        borderWidth: 3,
        borderColor: "rgba(255,255,255,0.18)",
    },

    onlineDot: {
        position: "absolute",
        right: 4,
        bottom: 6,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#22C55E",
        borderWidth: 3,
        borderColor: Colors.background,
    },

    cameraButton: {
        position: "absolute",
        right: -2,
        bottom: -2,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.brandPrimary,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#FFF",
    },

    name: {
        marginTop: 14,
        color: Colors.textOnDark,
        fontSize: 22,
        fontWeight: "700",
    },

    phone: {
        marginTop: 4,
        color: "rgba(255,255,255,0.55)",
        fontSize: 14,
        fontWeight: "500",
    },
});
