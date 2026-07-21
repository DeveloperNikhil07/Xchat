import Colors from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    header: {

        paddingBottom: 30,

    },

    content: {

        flex: 1,

        marginTop: -22,

        backgroundColor: Colors.surface,

        borderTopLeftRadius: 34,

        borderTopRightRadius: 34,

        overflow: "hidden",

    },

    item: {

        flexDirection: "row",

        alignItems: "center",

        paddingHorizontal: 22,

        paddingVertical: 16,

    },

    avatar: {

        width: 56,

        height: 56,

        borderRadius: 28,

        backgroundColor: Colors.brandPrimary,

        justifyContent: "center",

        alignItems: "center",

    },

    avatarText: {

        color: "#fff",

        fontSize: 22,

        fontWeight: "700",

    },

    info: {

        marginLeft: 16,

    },

    name: {

        fontSize: 17,

        fontWeight: "700",

        color: Colors.textPrimary,

    },

    phone: {

        marginTop: 4,

        fontSize: 14,

        color: Colors.textSecondary,

    },

});