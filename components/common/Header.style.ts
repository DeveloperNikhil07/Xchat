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
        justifyContent: "space-between",
    },

    side: {
        width: 42,
        height: 42,

        justifyContent: "center",
        alignItems: "center",

        zIndex: 2,
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
        position: "absolute",

        left: 70,   // 18 padding + 42 side + spacing
        right: 70,

        textAlign: "center",

        fontSize: 22,
        fontWeight: "700",

        zIndex: 1,
    },

    empty: {
        width: 42,
        height: 42,
    },
});