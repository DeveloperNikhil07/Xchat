import { StyleSheet } from "react-native";

export default StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.45)",
    },

    overlayDark: {
        backgroundColor: "rgba(0,0,0,0.70)",
    },

    backdrop: {
        flex: 1,
        width: "100%",
    },

    container: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 18,
        paddingTop: 10,
        paddingBottom: 28,

        elevation: 20,

        shadowColor: "#000",
        shadowOpacity: 0.22,
        shadowRadius: 20,
        shadowOffset: {
            width: 0,
            height: -6,
        },
    },

    containerDark: {
        backgroundColor: "#1C1C1E",
    },

    handle: {
        alignSelf: "center",
        width: 44,
        height: 5,
        borderRadius: 10,
        backgroundColor: "#D0D0D5",
        marginBottom: 20,
    },

    handleDark: {
        backgroundColor: "#636366",
    },

    header: {
        paddingHorizontal: 4,
        marginBottom: 16,
    },

    title: {
        fontSize: 21,
        fontWeight: "700",
        color: "#111111",
    },

    titleDark: {
        color: "#FFFFFF",
    },

    subtitle: {
        fontSize: 13,
        color: "#7A7A80",
        marginTop: 5,
    },

    subtitleDark: {
        color: "#A1A1A6",
    },

    option: {
        flexDirection: "row",
        alignItems: "center",
        minHeight: 72,
        borderRadius: 18,
        paddingHorizontal: 12,
        marginBottom: 10,
        borderWidth: 1,
    },

    deleteEveryoneOption: {
        backgroundColor: "#FFF5F5",
        borderColor: "#FFD6D6",
    },

    deleteEveryoneOptionDark: {
        backgroundColor: "#2B1D1D",
        borderColor: "#543030",
    },

    deleteMeOption: {
        backgroundColor: "#FFF9F0",
        borderColor: "#FFE4BC",
    },

    deleteMeOptionDark: {
        backgroundColor: "#2A251D",
        borderColor: "#50432D",
    },

    optionPressed: {
        opacity: 0.72,
        transform: [{ scale: 0.985 }],
    },

    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },

    everyoneIconBox: {
        backgroundColor: "#FFE0E0",
    },

    everyoneIconBoxDark: {
        backgroundColor: "#492525",
    },

    meIconBox: {
        backgroundColor: "#FFECCF",
    },

    meIconBoxDark: {
        backgroundColor: "#493A22",
    },

    icon: {
        fontSize: 21,
    },

    textContainer: {
        flex: 1,
    },

    optionTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#242424",
    },

    everyoneTitle: {
        color: "#D92D20",
    },

    everyoneTitleDark: {
        color: "#FF6B61",
    },

    optionTitleDark: {
        color: "#FFFFFF",
    },

    optionSubtitle: {
        fontSize: 12,
        color: "#858585",
        marginTop: 4,
    },

    optionSubtitleDark: {
        color: "#A1A1A6",
    },

    arrow: {
        fontSize: 28,
        fontWeight: "300",
        color: "#A0A0A0",
        marginLeft: 8,
    },

    arrowDark: {
        color: "#77777C",
    },

    cancelButton: {
        height: 52,
        borderRadius: 17,
        backgroundColor: "#F1F1F3",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 4,
    },

    cancelButtonDark: {
        backgroundColor: "#2C2C2E",
    },

    cancelPressed: {
        opacity: 0.65,
    },

    cancelText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#444444",
    },

    cancelTextDark: {
        color: "#FFFFFF",
    },
});