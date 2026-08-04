import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#17232D",
        borderRadius: 22,
        padding: 14,
        marginBottom: 14,
    },

    avatar: {
        width: 58,
        height: 58,
        borderRadius: 30,
    },

    online: {
        position: "absolute",
        width: 14,
        height: 14,
        borderRadius: 10,
        backgroundColor: "#20A090",
        bottom: 2,
        right: 2,
        borderWidth: 2,
        borderColor: "#17232D",
    },

    info: {
        flex: 1,
        marginLeft: 14,
    },

    name: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "700",
    },

    username: {
        color: "#9CA3AF",
        marginTop: 4,
        fontSize: 14,
    },

    button: {
        backgroundColor: "#20A090",
        paddingHorizontal: 18,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        minWidth: 88,
    },

    buttonDisabled: {
        backgroundColor: "#2E3B44",
    },

    buttonText: {
        color: "#fff",
        fontWeight: "700",
    },
});