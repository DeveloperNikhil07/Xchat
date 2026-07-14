import Colors from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.brandPrimary,
        justifyContent: "center",
        alignItems: "center",
    },

    logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },

    title: {
        marginTop: 24,
        fontSize: 28,
        fontWeight: "700",
        color: "#fff",
        letterSpacing: 0.5,
    },
});