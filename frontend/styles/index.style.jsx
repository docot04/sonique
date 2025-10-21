import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f", // deep dark background
  },
  content: {
    flex: 1,
    paddingBottom: 10,
  },
  tabBar: {
    flexDirection: "row",
    height: 70,
    borderTopWidth: 0,
    backgroundColor: "#1b1b1b",
    boxShadowColor: "#000",
    boxShadowOffset: { width: 0, height: -3 },
    boxShadowOpacity: 0.5,
    boxShadowRadius: 5,
    elevation: 10,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    borderRadius: 15,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  activeTab: {
    backgroundColor: "#1db954",
    boxShadowColor: "#1db954",
    boxShadowOpacity: 0.6,
    boxShadowOffset: { width: 0, height: 3 },
    boxShadowRadius: 8,
    elevation: 6,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#aaa",
  },
  activeTabText: {
    color: "#fff",
  },
});
