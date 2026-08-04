import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  topSection: {
    paddingTop: 50,
    paddingHorizontal: 28,
    paddingBottom: 30,
  },

  brand: {
    fontSize: 34,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 6,
  },

  tagline: {
    fontSize: 15,
    color: "rgba(255,255,255,0.85)",
  },

  chatBubble: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: 16,
  },

  chatEmoji: {
    fontSize: 32,
  },

  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },

  cardContent: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
    flexGrow: 1,
  },
});