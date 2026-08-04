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

    paddingHorizontal: 14,
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
    width: 72,
    height: 72,

    borderRadius: 46,

    alignSelf: "center",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 12,
  },

  logo: {
    width: 42,
    height: 42,
    resizeMode: "contain",
  },

  title: {
    fontSize: 21,
    fontWeight: "700",

    color: Colors.textPrimary,

    textAlign: "center",
  },

  subtitle: {
    marginTop: 8,

    textAlign: "center",

    color: Colors.textSecondary,

    lineHeight: 24,

    fontSize: 14,
  },

  divider: {
    height: 1,

    backgroundColor: "#ECECEC",

    marginVertical: 22,
  },

  chatPreview: {
    marginHorizontal: 4,
  },

  leftBubble: {
    alignSelf: "flex-start",

    backgroundColor: "#F3F6F7",

    borderRadius: 20,

    borderBottomLeftRadius: 8,

    paddingHorizontal: 12,
    paddingVertical: 12,

    marginBottom: 12,

    maxWidth: "78%",
  },

  leftText: {
    fontSize: 13,

    color: Colors.textPrimary,
  },

  rightBubble: {
    alignSelf: "flex-end",

    backgroundColor: Colors.brandPrimary,

    borderRadius: 20,

    borderBottomRightRadius: 8,

    paddingHorizontal: 12,
    paddingVertical: 12,

    marginBottom: 12,

    maxWidth: "78%",
  },

  rightText: {
    color: "#FFFFFF",

    fontSize: 13,
  },

  bottomDivider: {
    height: 1,

    backgroundColor: "#ECECEC",

    marginTop: 12,
    marginBottom: 12,
  },

  hint: {
    textAlign: "center",

    fontSize: 13,

    color: Colors.textSecondary,

    lineHeight: 24,
  },

  plus: {
    color: Colors.brandPrimary,

    fontWeight: "700",

    fontSize: 20,
  },
});