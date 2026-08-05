import Colors from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",

    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: "#FFFFFF",

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 34,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,

    elevation: 25,
  },

  handle: {
    width: 52,
    height: 5,

    borderRadius: 50,

    backgroundColor: "#D8D8D8",

    alignSelf: "center",

    marginBottom: 22,
  },

  avatarWrapper: {
    alignItems: "center",
    justifyContent: "center",

    marginBottom: 18,
  },

  avatar: {
    width: 84,
    height: 84,

    borderRadius: 42,

    borderWidth: 3,
    borderColor: Colors.brandPrimary,
  },

  placeholderAvatar: {
    width: 84,
    height: 84,

    borderRadius: 42,

    backgroundColor: Colors.brandPrimary,

    justifyContent: "center",
    alignItems: "center",
  },

  badge: {
    position: "absolute",

    bottom: -8,

    backgroundColor: "#10B981",

    paddingHorizontal: 12,
    paddingVertical: 5,

    borderRadius: 20,

    borderWidth: 3,
    borderColor: "#FFF",
  },

  badgeText: {
    color: "#FFF",

    fontSize: 11,

    fontWeight: "700",

    letterSpacing: 0.8,
  },

  title: {
    textAlign: "center",

    fontSize: 24,

    fontWeight: "700",

    color: Colors.textPrimary,
  },

  subtitle: {
    marginTop: 4,

    textAlign: "center",

    fontSize: 16,

    color: Colors.brandPrimary,

    fontWeight: "600",
  },

  description: {
    marginTop: 14,

    textAlign: "center",

    color: "#777",

    fontSize: 14,

    lineHeight: 22,

    paddingHorizontal: 10,
  },

  buttonRow: {
    flexDirection: "row",

    marginTop: 28,

    gap: 14,
  },

  declineButton: {
    flex: 1,

    height: 56,

    borderRadius: 18,

    backgroundColor: "#F5F6F8",

    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",

    gap: 8,

    borderWidth: 1,
    borderColor: "#ECECEC",
  },

  declineText: {
    color: "#555",

    fontWeight: "700",

    fontSize: 16,
  },

  acceptButton: {
    flex: 1,

    height: 56,

    borderRadius: 18,

    backgroundColor: Colors.brandPrimary,

    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",

    gap: 8,

    shadowColor: Colors.brandPrimary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.35,
    shadowRadius: 12,

    elevation: 8,
  },

  acceptText: {
    color: "#FFF",

    fontWeight: "700",

    fontSize: 16,
  },
});