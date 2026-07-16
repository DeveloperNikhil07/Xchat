import Colors from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    height: 62,
    borderRadius: 32,
    backgroundColor: "#FFFFFF",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 18,

    elevation: 12,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.brandPrimary,
    letterSpacing: 0.4,
  },

  icon: {
    marginLeft: 10,
  },

  disabledButton: {
    opacity: 0.6,
  },
});