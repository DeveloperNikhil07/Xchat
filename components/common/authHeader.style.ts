import Colors from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: 170,
        justifyContent: "center",
        alignItems: "center",
    },

    backButton: {
        position: "absolute",
        top: 50,
        left: 18,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.15)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },

    logoWrapper: {
        width: 76,
        height: 76,
        borderRadius: 20,
        backgroundColor: Colors.surface,
        justifyContent: "center",
        alignItems: "center",
    },

    logo: {
        width: 50,
        height: 50,
    },
});