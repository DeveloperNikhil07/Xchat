import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    circle: {
        backgroundColor: Colors.brandDark,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 4,
        borderColor: Colors.background,
    },

    editBadge: {
        position: "absolute",
        bottom: 2,
        right: 2,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.brandPrimary,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: Colors.background,
    },
});