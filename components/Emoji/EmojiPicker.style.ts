import { StyleSheet } from "react-native";

export default StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "flex-end",
    },

    container: {
        backgroundColor: "#202C33",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 12,
        paddingHorizontal: 12,
        height: "60%",
    },

    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2A3942",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 10,
        gap: 8,
    },

    searchInput: {
        flex: 1,
        color: "#E9EDEF",
        fontSize: 14,
        padding: 0,
    },

    categoryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },

    categoryTab: {
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 8,
    },

    categoryTabActive: {
        backgroundColor: "#2A3942",
    },

    categoryIcon: {
        fontSize: 18,
    },

    grid: {
        paddingBottom: 20,
    },

    emojiCell: {
        flex: 1 / 8,
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    emojiText: {
        fontSize: 24,
    },
});