import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        gap: 12,
    },

    divider: {
        borderBottomWidth: 0.5,
        borderBottomColor: "rgba(255,255,255,0.06)",
    },

    iconBox: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },

    label: {
        flex: 1,
        color: Colors.textOnDark,
        fontSize: 13.5,
    },

    rightText: {
        color: "rgba(255,255,255,0.35)",
        fontSize: 12.5,
        marginRight: 2,
    },
});