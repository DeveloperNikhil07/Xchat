import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        width: 230,
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: Colors.surface,
    },

    mapWrapper: {
        width: "100%",
        height: 130,
        backgroundColor: Colors.surfaceAlt,
    },

    map: {
        flex: 1,
        backgroundColor: "transparent",
    },

    touchOverlay: {
        ...StyleSheet.absoluteFillObject,
    },

    liveBadge: {
        position: "absolute",
        top: 8,
        left: 8,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.danger,
        paddingHorizontal: 9,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 5,
    },

    liveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.textOnDark,
    },

    liveBadgeText: {
        color: Colors.textOnDark,
        fontSize: 10,
        fontWeight: "700",
        letterSpacing: 0.3,
    },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 9,
        gap: 7,
    },

    footerIconBox: {
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: "center",
        alignItems: "center",
    },

    footerText: {
        fontSize: 12.5,
        color: Colors.textPrimary,
        fontWeight: "500",
        flex: 1,
    },
});