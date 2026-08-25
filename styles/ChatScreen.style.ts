import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    messagesContainer: {
        flex: 1,
    },

    contentContainer: {
        paddingBottom: 20,
    },

    blockedBanner: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(30, 41, 59, 0.9)",
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 16,
        marginHorizontal: 14,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
    },

    blockedText: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center",
    },

    unblockBtn: {
        marginLeft: 12,
        backgroundColor: Colors.brandPrimary,
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
    },

    unblockBtnText: {
        color: "#FFF",
        fontSize: 13,
        fontWeight: "700",
    },
});