import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: 72,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        marginTop: 10,
        marginBottom: 16,
    },

    leftContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    wrapper: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },

    iconButton: {
        width: 42,
        height: 42,
        borderRadius: 21,

        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "rgba(255,255,255,0.08)",
    },

    avatar: {
        width: 52,
        height: 52,
        borderRadius: 26,

        marginLeft: 14,

        borderWidth: 2,
        borderColor: "rgba(255,255,255,0.18)",
    },

    userInfo: {
        marginLeft: 12,
        flex: 1,
    },

    name: {
        fontSize: 18,
        fontWeight: "700",
        color: "#FFF",
    },

    status: {
        marginTop: 4,

        fontSize: 13,
        color: "rgba(255,255,255,0.72)",
    },

    // Search Mode
    searchInput: {
        flex: 1,

        height: 42,

        marginLeft: 10,
        paddingHorizontal: 16,

        borderRadius: 21,

        color: "#FFF",

        fontSize: 15,

        backgroundColor: "rgba(255,255,255,0.08)",
    },

    // Right Actions
    actions: {
        flexDirection: "row",
        alignItems: "center",

        marginLeft: 10,
    },

    actionButton: {
        width: 42,
        height: 42,

        borderRadius: 21,

        justifyContent: "center",
        alignItems: "center",

        marginLeft: 8,

        backgroundColor: "rgba(255,255,255,0.08)",
    },
});