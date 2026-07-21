import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,.35)",
    },

    sheet: {
        backgroundColor: "#FFF",

        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 40,

        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
    },

    handle: {
        alignSelf: "center",

        width: 45,
        height: 5,

        borderRadius: 10,

        backgroundColor: "#D1D5DB",

        marginBottom: 25,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

});

export default styles;