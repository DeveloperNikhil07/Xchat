import Colors from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  page: {
    width,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    overflow: "hidden",
  },

  // Skip Button

  skipBtn: {
    position: "absolute",
    top: 60,
    right: 25,
    zIndex: 100,
  },

  skipText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // Background Circles

  circle1: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(255,255,255,0.05)",
    top: -70,
    left: -70,
  },

  circle2: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(255,255,255,0.04)",
    bottom: 120,
    right: -50,
  },

  // Floating Icons

  icon1: {
    position: "absolute",
    top: 140,
    left: 40,
  },

  icon2: {
    position: "absolute",
    top: 180,
    right: 45,
    transform: [{ rotate: "-20deg" }],
  },

  icon3: {
    position: "absolute",
    top: 360,
    left: 40,
  },

  icon4: {
    position: "absolute",
    top: 390,
    right: 35,
  },

  // Phone Card

  phoneCard: {
    width: width * 0.75,
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 20,
    marginTop: 60,

    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 15,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  image:{
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  online: {
    marginTop: 3,
    fontSize: 13,
    color: Colors.success,
  },

  leftBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#EDF2F5",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 18,
    marginBottom: 12,
    maxWidth: "80%",
  },

  bubbleText: {
    color: Colors.textPrimary,
    fontSize: 15,
  },

  rightBubble: {
    alignSelf: "flex-end",
    backgroundColor: Colors.brandPrimary,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 18,
    marginBottom: 12,
    maxWidth: "80%",
  },

  rightBubbleText: {
    color: "#fff",
    fontSize: 15,
  },

  // Screen 2 Icons

  bottomIcons: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
  },

  smallIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  bigIcon: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: Colors.brandPrimary,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,

    shadowColor: Colors.brandPrimary,
    shadowOpacity: .45,
    shadowRadius: 18,
    elevation: 10,
  },

  // Text

  textContainer: {
    marginTop: 50,
    alignItems: "center",
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 18,
    fontSize: 17,
    lineHeight: 27,
    color: "rgba(255,255,255,.75)",
    textAlign: "center",
    paddingHorizontal: 12,
  },

  // Footer

  footer: {
    paddingHorizontal: 25,
    paddingBottom: 45,
  },

  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },

  dot: {
    width: 9,
    height: 9,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,.25)",
    marginHorizontal: 5,
  },

  activeDot: {
    width: 28,
    backgroundColor: "#fff",
  },

  button: {
    height: 58,
    backgroundColor: "#fff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.brandPrimary,
  },
});