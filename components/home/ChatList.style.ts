import Colors from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 36,
        borderTopRightRadius: 36,
        paddingTop: 26,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -5,
        },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 12,
    },

    header: {
        paddingHorizontal: 22,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        marginBottom: 8,
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.textPrimary,
    },

    count: {
        fontSize: 14,
        color: Colors.textSecondary,
        fontWeight: "600",
    },

    list: {
        paddingBottom: 120,
    },
    
    refreshHint: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    refreshHintText: {
        fontSize: 11,
        color: "#B0B0B0",
        marginLeft: 4,
    },
});