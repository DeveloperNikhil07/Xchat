import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#08131D",
    },

    content: {
        paddingBottom: 50,
    },

    section: {
        paddingHorizontal: 18,
        paddingTop: 22,
        gap: 18,
    },

    card: {
        backgroundColor: "rgba(19,28,38,.95)",

        borderRadius: 24,

        borderWidth: 1,
        borderColor: "rgba(255,255,255,.05)",

        overflow: "hidden",

        shadowColor: "#000",
        shadowOpacity: .3,
        shadowRadius: 20,
        shadowOffset: {
            width: 0,
            height: 10,
        },

        elevation: 10,
    },

    title: {
        color: "#FFF",

        fontSize: 18,

        fontWeight: "700",

        paddingHorizontal: 20,

        paddingTop: 18,

        paddingBottom: 8,
    },

    logout: {
        color: "#FF5B5B",
    },
});