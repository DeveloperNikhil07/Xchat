import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.surface,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: Colors.divider,
        backgroundColor: Colors.surface,
    },

    backButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.surfaceAlt,
    },

    headerText: {
        flex: 1,
        marginHorizontal: 12,
    },

    title: {
        fontSize: 15,
        fontWeight: "700",
        color: Colors.textPrimary,
    },

    liveRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginTop: 2,
    },

    liveDotSmall: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.danger,
    },

    subtitle: {
        fontSize: 12,
        color: Colors.danger,
        fontWeight: "600",
    },

    navButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E6F7F4",
    },

    footerButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        gap: 8,
    },

    openMapsButton: {
        backgroundColor: Colors.brandPrimary,
    },

    openMapsText: {
        color: Colors.textOnBrand,
        fontSize: 14.5,
        fontWeight: "700",
    },

    stopButton: {
        backgroundColor: Colors.danger,
    },

    stopButtonText: {
        color: Colors.textOnDark,
        fontSize: 14.5,
        fontWeight: "700",
    },
});