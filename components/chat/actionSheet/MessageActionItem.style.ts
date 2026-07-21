import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",

        paddingHorizontal: 18,
        paddingVertical: 14,

        borderRadius: 12,
    },

    text: {
        flex: 1,

        fontSize: 16,
        color: "#FFF",

        marginLeft: 18,
        fontWeight: "500",
    },
});

export default styles;