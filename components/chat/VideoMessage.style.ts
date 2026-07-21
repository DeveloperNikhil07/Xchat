import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        width: 240,
        height: 240,
        borderRadius: 14,
        overflow: "hidden",
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },

    thumbnail: {
        width: "100%",
        height: "100%",
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.15)",
    },

    playCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },

    sizeBadge: {
        position: "absolute",
        bottom: 8,
        right: 8,
        backgroundColor: "rgba(0,0,0,0.6)",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
    },

    sizeText: {
        color: "#FFF",
        fontSize: 11,
        fontWeight: "600",
    },
});