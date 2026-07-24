import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    gradient: {
        marginHorizontal: 18,
        marginTop: 110,

        borderRadius: 30,

        alignItems: "center",

        paddingTop: 35,
        paddingBottom: 28,

        paddingHorizontal: 24,

        overflow: "hidden",

        borderWidth: 1,
        borderColor: "rgba(255,255,255,.06)",

        shadowColor: "#000",
        shadowOpacity: 0.35,
        shadowRadius: 22,
        shadowOffset: {
            width: 0,
            height: 10,
        },

        elevation: 12,
    },

    avatarWrapper: {
        marginBottom: 20,

        shadowColor: Colors.brandPrimary,
        shadowOpacity: 0.45,
        shadowRadius: 20,
        shadowOffset: {
            width: 0,
            height: 8,
        },

        elevation: 10,
    },

    name: {
        color: "#FFF",

        fontSize: 28,

        fontWeight: "700",

        marginBottom: 6,
    },

    username: {
        color: Colors.brandPrimary,

        fontSize: 16,

        fontWeight: "600",

        marginBottom: 14,
    },

    bio: {
        color: "rgba(255,255,255,.75)",

        fontSize: 15,

        textAlign: "center",

        lineHeight: 22,

        marginBottom: 24,

        paddingHorizontal: 10,
    },

    editButton: {
        flexDirection: "row",

        alignItems: "center",

        justifyContent: "center",

        backgroundColor: Colors.brandPrimary,

        paddingHorizontal: 22,

        height: 46,

        borderRadius: 24,

        shadowColor: Colors.brandPrimary,
        shadowOpacity: 0.45,
        shadowRadius: 16,
        shadowOffset: {
            width: 0,
            height: 6,
        },

        elevation: 8,
    },

    editText: {
        color: "#FFF",

        fontSize: 15,

        fontWeight: "700",

        marginLeft: 8,
    },
});