import Colors from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        marginTop: 24,

        height: 58,

        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#FFFFFF",

        borderRadius: 20,

        paddingHorizontal: 18,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.08,
        shadowRadius: 18,

        elevation: 8,
    },

    input: {
        flex: 1,

        marginLeft: 12,

        fontSize: 16,

        color: Colors.textPrimary,
    },

    micButton: {
        width: 38,
        height: 38,

        borderRadius: 19,

        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "rgba(32,160,144,.10)",
    },
});