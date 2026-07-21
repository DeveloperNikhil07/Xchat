import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
    },

    headerText: {
        flex: 1,
        marginHorizontal: 12,
    },

    title: {
        fontSize: 15,
        fontWeight: "600",
        color: "#111",
    },

    subtitle: {
        fontSize: 12,
        color: "#888",
        marginTop: 2,
    },

    loaderOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
    },

    fallback: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 32,
    },

    fallbackIcon: {
        width: 110,
        height: 110,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },

    fallbackName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#222",
        textAlign: "center",
        marginBottom: 10,
    },

    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        marginBottom: 14,
    },

    badgeText: {
        color: "#FFF",
        fontSize: 11,
        fontWeight: "700",
    },

    fallbackHint: {
        fontSize: 13,
        color: "#999",
        textAlign: "center",
        marginBottom: 24,
    },

    openButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#20A090",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 26,
        gap: 8,
    },

    openButtonText: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "600",
    },
    fallbackSize: {
        fontSize: 13,
        color: "#999",
        marginBottom: 10,
    },
});