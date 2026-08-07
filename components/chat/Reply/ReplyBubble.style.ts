import { StyleSheet } from "react-native";

const QUOTE_BG = "rgba(255,255,255,0.06)";
const ACCENT_SENDER = "#06CF9C";
const ACCENT_RECEIVER = "#53BDEB";
const MESSAGE_TEXT = "#D1D7DB";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    backgroundColor: QUOTE_BG,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 6,
  },

  accentBar: {
    width: 4,
    alignSelf: "stretch",
    backgroundColor: ACCENT_SENDER,
  },

  accentBarReceiver: {
    backgroundColor: ACCENT_RECEIVER,
  },

  content: {
    flexShrink: 1,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },

  sender: {
    fontSize: 13,
    fontWeight: "700",
    color: ACCENT_SENDER,
    marginBottom: 4,
  },

  senderReceiver: {
    color: ACCENT_RECEIVER,
  },

  message: {
    fontSize: 13,
    lineHeight: 19,
    color: MESSAGE_TEXT,
    flexShrink: 1,
    flexWrap: "wrap",
  },
});