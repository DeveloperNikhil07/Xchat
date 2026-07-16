import Colors from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
    },

    line: {
        flex: 1,
        height: 1,

        backgroundColor: "rgba(255,255,255,.15)",
    },

    badge: {
        paddingHorizontal: 14,
        paddingVertical: 6,

        marginHorizontal: 12,

        borderRadius: 20,

        backgroundColor: "#FFFFFF",
    },

    text: {
        fontSize: 12,
        fontWeight: "600",

        color: Colors.textSecondary,
    },
});