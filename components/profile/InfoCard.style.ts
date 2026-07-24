import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#131D27",

    borderRadius: 24,

    marginBottom: 18,

    overflow: "hidden",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",

    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 10,
  },

  title: {
    color: Colors.textOnDark,

    fontSize: 17,

    fontWeight: "700",

    paddingHorizontal: 20,

    paddingTop: 18,

    paddingBottom: 10,

    letterSpacing: 0.4,
  },
});