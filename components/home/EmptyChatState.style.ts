import Colors from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingBottom: 90,
    },

    card: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 28,
        paddingHorizontal: 24,
        paddingVertical: 36,
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.06,
        shadowRadius: 16,

        elevation: 8,
    },

    iconWrapper: {
        marginBottom: 18,
    },

    iconCircle: {
        width: 76,
        height: 76,
        borderRadius: 38,
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.textPrimary,
        textAlign: "center",
    },

    subtitle: {
        marginTop: 6,
        fontSize: 14,
        color: Colors.textSecondary,
        textAlign: "center",
        lineHeight: 20,
    },
});