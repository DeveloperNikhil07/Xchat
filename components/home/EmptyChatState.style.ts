import Colors from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 90,
  },

  card: {
    width: "100%",

    backgroundColor: "#FFFFFF",

    borderRadius: 32,

    paddingHorizontal: 24,
    paddingVertical: 32,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.08,
    shadowRadius: 20,

    elevation: 12,
  },

  logoWrapper: {
    width: 92,
    height: 92,

    borderRadius: 46,

    alignSelf: "center",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 22,
  },

  logo: {
    width: 52,
    height: 52,
    resizeMode: "contain",
  },

  title: {
    fontSize: 27,
    fontWeight: "700",

    color: Colors.textPrimary,

    textAlign: "center",
  },

  subtitle: {
    marginTop: 14,

    textAlign: "center",

    color: Colors.textSecondary,

    lineHeight: 24,

    fontSize: 15,
  },

  divider: {
    height: 1,

    backgroundColor: "#ECECEC",

    marginVertical: 28,
  },

  chatPreview: {
    marginHorizontal: 4,
  },

  leftBubble: {
    alignSelf: "flex-start",

    backgroundColor: "#F3F6F7",

    borderRadius: 20,

    borderBottomLeftRadius: 8,

    paddingHorizontal: 16,
    paddingVertical: 12,

    marginBottom: 14,

    maxWidth: "78%",
  },

  leftText: {
    fontSize: 15,

    color: Colors.textPrimary,
  },

  rightBubble: {
    alignSelf: "flex-end",

    backgroundColor: Colors.brandPrimary,

    borderRadius: 20,

    borderBottomRightRadius: 8,

    paddingHorizontal: 16,
    paddingVertical: 12,

    marginBottom: 14,

    maxWidth: "78%",
  },

  rightText: {
    color: "#FFFFFF",

    fontSize: 15,
  },

  bottomDivider: {
    height: 1,

    backgroundColor: "#ECECEC",

    marginTop: 12,
    marginBottom: 22,
  },

  hint: {
    textAlign: "center",

    fontSize: 15,

    color: Colors.textSecondary,

    lineHeight: 24,
  },

  plus: {
    color: Colors.brandPrimary,

    fontWeight: "700",

    fontSize: 18,
  },
});