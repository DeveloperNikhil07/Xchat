import Colors from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 16,
    },

    label: {
        fontSize: 12.5,
        fontWeight: "600",
        color: Colors.textSecondary,
        marginBottom: 6,
        marginLeft: 4,
    },

    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.surfaceAlt,
        borderRadius: 26,
        paddingHorizontal: 18,
        height: 52,
        borderWidth: 1.5,
        borderColor: "transparent",
    },

    containerFocused: {
        borderColor: Colors.brandPrimary,
        backgroundColor: Colors.surface,
    },

    containerError: {
        borderColor: Colors.danger,
    },

    leftIcon: {
        marginRight: 10,
    },

    input: {
        flex: 1,
        fontSize: 14.5,
        color: Colors.textPrimary,
        paddingVertical: 0,
    },

    inputNoIcon: {
        marginLeft: 0,
    },

    errorText: {
        fontSize: 11.5,
        color: Colors.danger,
        marginTop: 5,
        marginLeft: 4,
    },
});