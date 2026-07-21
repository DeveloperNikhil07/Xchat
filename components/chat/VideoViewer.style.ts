import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },

    closeButton: {
        position: "absolute",
        top: 16,
        right: 16,
        zIndex: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.15)",
        justifyContent: "center",
        alignItems: "center",
    },

    videoWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    video: {
        width: "100%",
        height: "100%",
    },
});