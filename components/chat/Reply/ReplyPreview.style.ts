import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 8,
    },
    container: {
        backgroundColor: "#fafafa",
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderLeftWidth: 4,
        borderLeftColor: "#25D366",
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 2,
    },

    sender: {
        color: "#25D366",
        fontSize: 13,
        fontWeight: "700",
    },

    closeButton: {
        padding: 2,
    },

    message: {
        color: "#333",
        fontSize: 14,
    },
});

export default styles;