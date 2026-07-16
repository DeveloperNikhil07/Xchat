import Colors from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    list: {
        paddingVertical: 10,
        marginTop: 10,
        flex:1,
        justifyContent: "space-between",
    },

    filter: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 8,

        borderRadius: 20,

        backgroundColor: "#F3F5F7",

        borderWidth: 1,
        borderColor: "#E8ECEF",
    },

    activeFilter: {
        backgroundColor: Colors.brandPrimary,
        borderColor: Colors.brandPrimary,

        shadowColor: Colors.brandPrimary,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,

        elevation: 5,
    },

    label: {
        fontSize: 15,
        fontWeight: "600",

        color: Colors.textPrimary,
    },

    activeLabel: {
        color: "#FFFFFF",
    },

    count: {
        marginLeft: 8,

        minWidth: 22,
        height: 22,

        borderRadius: 11,

        backgroundColor: "#FFFFFF",

        textAlign: "center",
        textAlignVertical: "center",

        fontSize: 12,
        fontWeight: "700",

        color: Colors.brandPrimary,

        overflow: "hidden",
        paddingHorizontal: 6,
    },

    activeCount: {
        backgroundColor: "#FFFFFF",
        color: Colors.brandPrimary,
    },
});