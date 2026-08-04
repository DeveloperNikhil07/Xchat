import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    loaderContainer: {
        flex: 1,
        backgroundColor: "#08131D",
        justifyContent: "center",
        alignItems: "center",
    },

    content: {
        paddingTop: 95,
        paddingHorizontal: 20,
        paddingBottom: 50,
    },

    // ===========================
    // Avatar
    // ===========================

    avatarSection: {
        alignItems: "center",
        marginBottom: 35,
    },

    avatarWrapper: {
        position: "relative",

        padding: 6,

        borderRadius: 80,

        backgroundColor: "rgba(255,255,255,.04)",

        borderWidth: 1.5,
        borderColor: "rgba(255,255,255,.08)",

        shadowColor: Colors.brandPrimary,
        shadowOpacity: .45,
        shadowRadius: 24,
        shadowOffset: {
            width: 0,
            height: 12,
        },

        elevation: 15,
    },
    cameraButton: {
        position: "absolute",
        bottom: 0,
        right: 0,

        width: 44,
        height: 44,

        borderRadius: 22,

        backgroundColor: Colors.brandPrimary,

        justifyContent: "center",
        alignItems: "center",

        borderWidth: 3,
        borderColor: "#08121A",

        shadowColor: Colors.brandPrimary,
        shadowOpacity: .55,
        shadowRadius: 16,
        shadowOffset: {
            width: 0,
            height: 8,
        },

        elevation: 12,
    },

    changePhoto: {
        marginTop: 16,

        color: Colors.brandPrimary,

        fontWeight: "700",

        fontSize: 15,

        letterSpacing: .3,
    },
    // ===========================
    // Card
    // ===========================

    card: {
        backgroundColor: "#141E29",

        borderRadius: 28,

        padding: 22,

        marginBottom: 18,

        borderWidth: 1,
        borderColor: "rgba(255,255,255,.05)",

        shadowColor: "#000",
        shadowOpacity: .25,
        shadowRadius: 25,
        shadowOffset: {
            width: 0,
            height: 12,
        },

        elevation: 12,
    },

    cardTitle: {
        color: "#FFF",

        fontSize: 20,

        fontWeight: "700",

        marginBottom: 20,

        letterSpacing: .5,
    },

    // ===========================
    // Field
    // ===========================

    field: {
        marginBottom: 22,
    },

    fieldHeader: {
        flexDirection: "row",

        alignItems: "center",

        marginBottom: 10,
    },

    label: {
        marginLeft: 10,

        color: "rgba(255,255,255,.65)",

        fontSize: 14,

        fontWeight: "600",
    },

    input: {
        backgroundColor: "#1A2633",

        borderRadius: 20,

        paddingHorizontal: 18,

        paddingVertical: 17,

        color: "#FFF",

        fontSize: 16,

        borderWidth: 1,

        borderColor: "#283849",

        minHeight: 60,
    },

    bioInput: {
        minHeight: 130,

        paddingTop: 16,

        paddingBottom: 16,

        textAlignVertical: "top",
    },

    // ===========================
    // Save Button
    // ===========================

    saveButton: {
        marginTop: 12,

        height: 62,

        borderRadius: 20,

        backgroundColor: Colors.brandPrimary,

        justifyContent: "center",

        alignItems: "center",

        shadowColor: Colors.brandPrimary,

        shadowOpacity: .55,

        shadowRadius: 22,

        shadowOffset: {
            width: 0,
            height: 10,
        },

        elevation: 15,
    },

    saveButtonText: {
        color: "#FFF",

        fontSize: 17,

        fontWeight: "700",

        letterSpacing: .5,
    },
});