import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0B141A",
    },

    header: {
        height: 60,
        paddingHorizontal: 18,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 0.5,
        borderBottomColor: "#1D2A30",
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#162127",
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#FFF",
    },

    body: {
        padding: 20,
        paddingBottom: 40,
    },

    profileSection: {
        alignItems: "center",
        marginBottom: 30,
    },

    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },

    avatarFallback: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: Colors.brandPrimary,
        justifyContent: "center",
        alignItems: "center",
    },

    avatarInitials: {
        fontSize: 42,
        fontWeight: "700",
        color: "#FFF",
    },

    name: {
        marginTop: 18,
        fontSize: 24,
        fontWeight: "700",
        color: "#FFF",
    },

    section: {
        marginBottom: 22,
    },

    sectionLabel: {
        marginBottom: 10,
        marginLeft: 6,
        color: "#7E8B92",
        fontSize: 13,
        fontWeight: "600",
        textTransform: "uppercase",
    },

    card: {
        backgroundColor: "#162127",
        borderRadius: 18,
        overflow: "hidden",
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: "#223139",
    },

    rowIcon: {
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1E2C33",
        marginRight: 14,
    },

    rowContent: {
        flex: 1,
    },

    rowTitle: {
        color: "#FFF",
        fontSize: 15,
        fontWeight: "600",
    },

    rowSubtitle: {
        marginTop: 2,
        color: "#8D9BA3",
        fontSize: 13,
    },

    actions: {
        flexDirection: "row",
        gap: 10,
    },

    actionButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.brandPrimary,
    },

    secondaryButton: {
        backgroundColor: "#1E2C33",
    },
});