import Colors from "@/constants/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        position: "absolute",

        bottom: 80,
        right: 0,

        width: 46,
        height: 46,

        borderRadius: 23,

        justifyContent: "center",
        alignItems: "center",

        backgroundColor: Colors.surface,

        elevation: 6,

        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },
});

export default styles;