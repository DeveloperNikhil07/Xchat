import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    gradient: {
        flex: 1,
    },

    header: {
        height: 220,
        paddingHorizontal: 30,
        justifyContent: "center",
    },

    hello: {
        color: Colors.textOnDark,
        fontSize: 38,
        fontWeight: "800",
    },

    welcome: {
        color: Colors.textOnDark,
        fontSize: 17,
        marginTop: 4,
    },

    plant: {
        position: "absolute",
        right: 25,
        bottom: 10,
        fontSize: 75,
    },

    card: {
        flex: 1,
        backgroundColor: Colors.surface,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 28,
        paddingTop: 25,
        paddingBottom: 40,
    },

    title: {
        fontSize: 30,
        fontWeight: "800",
        color: Colors.brandPrimary,
        marginBottom: 18,
    },

    bottomRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
    },

    bottomText: {
        color: Colors.textSecondary,
        fontSize: 14,
    },

    login: {
        color: Colors.brandPrimary,
        fontWeight: "700",
        marginLeft: 5,
        fontSize: 14,
    },

});