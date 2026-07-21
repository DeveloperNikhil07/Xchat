import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 3,
    borderLeftColor: "#25D366",

    backgroundColor: "rgba(0,0,0,0.08)",

    borderRadius: 8,

    paddingHorizontal: 10,
    paddingVertical: 8,

    marginBottom: 6,
  },

  sender: {
    fontSize: 12,
    fontWeight: "700",
    color: "#25D366",
    marginBottom: 2,
  },

  message: {
    fontSize: 13,
    color: "#fafafa",
  },
});

export default styles;