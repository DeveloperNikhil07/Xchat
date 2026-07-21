import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  container: {
    backgroundColor: "#202C33",

    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 28,
  },

  reactionContainer: {
    marginBottom: 18,
    alignItems: "center",
  },

  actions: {
    gap: 4,
  },
});

export default styles;