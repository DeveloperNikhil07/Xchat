import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopLeftRadius:36,
    borderTopRightRadius:36,
    marginTop: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  count: {
    fontSize: 13,
    color: "#9A9A9A",
  },

  list: {
    paddingBottom: 20,
  },

  chatRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F3F3",
  },

  chatContent: {
    flex: 1,
    marginLeft: 14,
  },

  chatTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  chatBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
});