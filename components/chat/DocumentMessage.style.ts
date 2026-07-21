import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 18,
    backgroundColor: "#FFF",
    minWidth: 260,
    maxWidth: 320,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    flex: 1,
    marginLeft: 14,
  },

  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },

  badgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "700",
  },

  size: {
    marginLeft: 10,
    fontSize: 12,
    color: "#777",
  },
});