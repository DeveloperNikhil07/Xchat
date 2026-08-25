import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    scrollContent: {
        paddingBottom: 60,
    },

    topSection: {
        backgroundColor: Colors.background,
        paddingTop: 16,
        paddingBottom: 24,
        alignItems: "center",
    },

    actionContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        paddingHorizontal: 20,
        marginTop: 20,
    },

    content: {
        paddingHorizontal: 16,
        paddingTop: 10,
    },

    aboutContainer: {
        paddingHorizontal: 16,
        paddingVertical: 14,
    },

    aboutTitle: {
        color: "rgba(255,255,255,0.45)",
        fontSize: 12,
        fontWeight: "600",
        marginBottom: 6,
        letterSpacing: 0.5,
        textTransform: "uppercase",
    },

    aboutText: {
        color: Colors.textOnDark,
        fontSize: 15,
        lineHeight: 22,
        fontWeight: "400",
    },
});