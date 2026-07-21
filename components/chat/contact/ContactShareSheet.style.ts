import { Colors } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: Colors.overlay,
    },

    sheet: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: SCREEN_HEIGHT * 0.85,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        overflow: "hidden",
    },

    solidBg: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#12191d',
    },

    handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: "rgba(255,255,255,0.25)",
        alignSelf: "center",
        marginBottom: 12,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        paddingBottom: 12,
    },

    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.textOnDark,
    },

    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.1)",
    },

    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 16,
        marginBottom: 10,
        paddingHorizontal: 12,
        height: 40,
        borderRadius: 12,
        backgroundColor: "rgba(255,255,255,0.08)",
        gap: 8,
    },

    searchInput: {
        flex: 1,
        color: Colors.textOnDark,
        fontSize: 14,
    },

    listWrapper: {
        flex: 1,
        paddingHorizontal: 16,
    },

    centerBox: {
        paddingTop: 60,
        alignItems: "center",
        gap: 10,
    },

    hintText: {
        fontSize: 13,
        color: "rgba(255,255,255,0.6)",
        textAlign: "center",
    },

    contactRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.06)",
    },

    contactAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
    },

    contactAvatarFallback: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.brandPrimary,
        justifyContent: "center",
        alignItems: "center",
    },

    contactInitials: {
        color: Colors.textOnBrand,
        fontSize: 15,
        fontWeight: "700",
    },

    contactName: {
        fontSize: 15,
        fontWeight: "600",
        color: Colors.textOnDark,
    },

    contactSubtitle: {
        fontSize: 12.5,
        color: "rgba(255,255,255,0.55)",
        marginTop: 2,
    },
});