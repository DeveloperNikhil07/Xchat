import { Dimensions, StyleSheet } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.55)",
    },

    sheet: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        maxHeight: SCREEN_HEIGHT * 0.85,
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        overflow: "hidden",
        backgroundColor: "#12191d",
    },

    solidBg: {
        paddingTop: 10,
        backgroundColor: "#202C33", // WhatsApp sheet color
    },

    handle: {
        width: 40,
        height: 4,
        borderRadius: 3,
        backgroundColor: "#667781",
        alignSelf: "center",
        marginBottom: 12,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        paddingBottom: 14,
    },

    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#E9EDEF",
    },

    closeButton: {
        width: 34,
        height: 34,
        borderRadius: 17,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2A3942",
    },

    mapWrapper: {
        height: 200,
        marginHorizontal: 16,
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: "#2A3942",
    },

    centerBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },

    hintText: {
        fontSize: 13,
        color: "#8696A0",
        textAlign: "center",
        paddingHorizontal: 20,
    },

    options: {
        padding: 16,
    },

    optionRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        gap: 14,
    },

    optionIcon: {
        width: 46,
        height: 46,
        borderRadius: 23,
        justifyContent: "center",
        alignItems: "center",
    },

    optionTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#E9EDEF",
    },

    optionSubtitle: {
        fontSize: 12.5,
        color: "#8696A0",
        marginTop: 2,
    },

    backRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        gap: 2,
    },

    backText: {
        color: "#00A884",
        fontSize: 14,
        fontWeight: "700",
    },

    durationLabel: {
        fontSize: 13,
        color: "#8696A0",
        marginTop: 10,
        marginBottom: 4,
        fontWeight: "500",
    },

    durationRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        gap: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#2F3B43",
    },

    durationIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#2A3942",
        justifyContent: "center",
        alignItems: "center",
    },

    durationText: {
        fontSize: 15,
        color: "#E9EDEF",
        fontWeight: "500",
    },
});