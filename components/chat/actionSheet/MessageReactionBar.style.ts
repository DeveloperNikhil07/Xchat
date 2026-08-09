import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",

        backgroundColor: "#202C33",

        borderRadius: 30,

        paddingHorizontal: 10,
        paddingVertical: 8,

        elevation: 8,

        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },

    reactionButton: {
        width: 42,
        height: 42,

        borderRadius: 21,

        justifyContent: "center",
        alignItems: "center",
    },

    emoji: {
        fontSize: 24,
    },
    // existing styles ke saath ye add karo:

    plusButton: {
        backgroundColor: "rgba(255,255,255,0.06)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.15)",
    },

    hiddenInput: {
        position: "absolute",
        height: 1,
        width: 1,
        opacity: 0,
    },
});

export default styles;