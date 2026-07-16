import Colors from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        marginTop: 20,

        flexDirection: "row",

        justifyContent: "space-between",

        alignItems: "center",
    },

    greeting: {
        fontSize: 15,

        color: "rgba(255,255,255,.75)",
    },

    name: {
        marginTop: 4,

        fontSize: 28,

        fontWeight: "700",

        color: Colors.textOnDark,
    },

    actions: {
        flexDirection: "row",

        alignItems: "center",
    },

    iconButton: {
        width: 46,

        height: 46,

        borderRadius: 23,

        marginLeft: 12,

        backgroundColor: "rgba(255,255,255,.12)",

        justifyContent: "center",

        alignItems: "center",
    },
});