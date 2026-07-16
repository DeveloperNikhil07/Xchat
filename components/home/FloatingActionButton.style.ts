import Colors from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        position: "absolute",

        right: 24,
        bottom: 32,

        width: 64,
        height: 64,

        borderRadius: 32,

        backgroundColor: Colors.brandPrimary,

        justifyContent: "center",
        alignItems: "center",

        shadowColor: Colors.brandPrimary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.35,
        shadowRadius: 18,

        elevation: 12,

        borderWidth: 3,
        borderColor: "#FFFFFF",
    },
});