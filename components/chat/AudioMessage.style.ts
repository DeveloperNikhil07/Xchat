import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: 18,
        backgroundColor: "#FFF",
        minWidth: 260,
        maxWidth: 320,
    },

    playButton: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: "#20A090",
        justifyContent: "center",
        alignItems: "center",
    },

    content: {
        flex: 1,
        marginLeft: 12,
    },

    name: {
        fontSize: 14,
        fontWeight: "600",
        color: "#222",
        marginBottom: 8,
    },

    progressTrack: {
        height: 4,
        borderRadius: 2,
        backgroundColor: "#E5E5E5",
        width: "100%",
        justifyContent: "center",
    },

    progressFill: {
        height: 4,
        borderRadius: 2,
        backgroundColor: "#20A090",
        position: "absolute",
        left: 0,
        top: 0,
    },

    progressDot: {
        position: "absolute",
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#20A090",
        marginLeft: -6,
        top: -4,
    },

    bottomRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },

    badge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 20,
    },

    badgeText: {
        color: "#FFF",
        fontSize: 10,
        fontWeight: "700",
    },

    duration: {
        marginLeft: 10,
        fontSize: 12,
        color: "#777",
    },

    size: {
        marginLeft: 10,
        fontSize: 12,
        color: "#777",
    },
});