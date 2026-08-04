import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.65)",
        justifyContent: "flex-end",
    },

    container: {
        height: "82%",
        backgroundColor: "#101820",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingHorizontal: 20,
        paddingTop: 15,
    },

    handle: {
        width: 65,
        height: 5,
        borderRadius: 10,
        backgroundColor: "#5A6670",
        alignSelf: "center",
        marginBottom: 20,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 18,
    },

    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "800",
    },

    closeBtn: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: "rgba(255,255,255,0.08)",
        justifyContent: "center",
        alignItems: "center",
    },

    empty: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },

    emptyEmoji: {
        fontSize: 40,
    },

    emptyText: {
        color: "#9CA3AF",
        marginTop: 10,
        fontSize: 16,
    },

    inviteBox: {
        alignItems: "center",
        width: "100%",
    },

    inviteIconWrap: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "rgba(32,160,144,0.15)",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },

    inviteTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 6,
    },

    inviteSubtitle: {
        color: "#9CA3AF",
        fontSize: 14,
        textAlign: "center",
        lineHeight: 20,
        marginBottom: 22,
    },

    inviteButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#20A090",
        paddingHorizontal: 22,
        height: 48,
        borderRadius: 24,
    },

    inviteButtonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 15,
    },
});