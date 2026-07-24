import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    scrollContent: {
        paddingBottom: 40,
    },

    topSection: {
        backgroundColor: Colors.background,
        paddingTop: 90,
        paddingBottom: 24,
        alignItems: "center",
    },

    actionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 30,
    },

    content: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },

    aboutContainer: {
        paddingHorizontal: 16,
        paddingVertical: 14,
    },

    aboutTitle: {
        color: "rgba(255,255,255,0.4)",
        fontSize: 11,
        marginBottom: 5,
        letterSpacing: 0.3,
    },

    aboutText: {
        color: Colors.textOnDark,
        fontSize: 13.5,
    },
});