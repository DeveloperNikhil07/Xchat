import Colors from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        alignItems: "flex-end",

        paddingVertical: 8,
    },

    inputContainer: {
        flex: 1,

        flexDirection: "row",
        alignItems: "flex-end",

        minHeight: 54,

        backgroundColor: "#FFF",

        borderRadius: 28,

        paddingHorizontal: 12,
        paddingVertical: 6,

        elevation: 5,
    },

    iconButton: {
        width: 40,
        height: 40,

        justifyContent: "center",
        alignItems: "center",
    },

    input: {
        flex: 1,

        fontSize: 16,
        color: Colors.textPrimary,

        minHeight: 42,
        maxHeight: 120,

        paddingVertical: 8,
        paddingHorizontal: 8,

        textAlignVertical: "top",
    },

    sendButton: {
        width: 42,
        height: 42,

        borderRadius: 21,

        justifyContent: "center",
        alignItems: "center",

        backgroundColor: Colors.brandPrimary,

        marginLeft: 8,
    },

    voiceButton: {
        width: 54,
        height: 54,

        borderRadius: 27,

        marginLeft: 12,

        justifyContent: "center",
        alignItems: "center",

        backgroundColor: Colors.brandPrimary,

        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10,

        elevation: 8,
    },

});