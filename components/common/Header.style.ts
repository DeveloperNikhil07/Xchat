import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {
        position: "absolute",

        top: 40,
        left: 0,
        right: 0,

        zIndex: 999,

        height: 56,

        paddingHorizontal: 18,

        flexDirection: "row",
        alignItems: "center",
    },

    touch: {
        width: 42,
        height: 42,
        borderRadius: 21,

        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "rgba(63,217,184,0.12)",
    },

    title: {
        flex: 1,

        marginLeft: 10,

        fontSize: 22,
        fontWeight: "700",
    },

    empty: {
        width: 40,
        height: 40,
    },

});