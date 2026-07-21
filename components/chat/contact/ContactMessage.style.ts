import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: 16,
        backgroundColor: Colors.surface,
        minWidth: 250,
        maxWidth: 300,
    },

    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },

    avatarFallback: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.brandPrimary,
        justifyContent: "center",
        alignItems: "center",
    },

    avatarInitials: {
        color: Colors.textOnBrand,
        fontSize: 17,
        fontWeight: "700",
    },

    content: {
        flex: 1,
        marginLeft: 12,
    },

    name: {
        fontSize: 15,
        fontWeight: "700",
        color: Colors.textPrimary,
    },

    subtitle: {
        fontSize: 12.5,
        color: Colors.textSecondary,
        marginTop: 2,
    },

    chevronBox: {
        marginLeft: 6,
    },
});