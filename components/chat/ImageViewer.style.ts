import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },

    header: {
        height: 60,
        paddingHorizontal: 16,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        zIndex: 10,
    },

    imageContainer: {
        flex: 1,

        justifyContent: "center",
        alignItems: "center",
    },

    image: {
        width: width,
        height: height * 0.75,
    },
});

export default styles;