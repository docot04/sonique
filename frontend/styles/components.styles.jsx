import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Shared container
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
  },

  // ProcessTracks button
  processButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    borderRadius: 30,
    textAlign: "center",
    marginVertical: 12,
    backgroundColor: "#1db954",
    boxShadowColor: "#1db954",
    boxShadowOffset: { width: 0, height: 5 },
    boxShadowOpacity: 0.4,
    boxShadowRadius: 10,
    elevation: 6,
  },

  // Overlay
  overlayBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayContainer: {
    width: "90%",
    maxWidth: 750,
    maxHeight: "70%",
    backgroundColor: "#1b1b1b",
    borderRadius: 16,
    padding: 16,
    boxShadowColor: "#000",
    boxShadowOffset: { width: 0, height: 5 },
    boxShadowOpacity: 0.4,
    boxShadowRadius: 10,
    elevation: 10,
  },
  overlayEntriesContainer: {
    flexGrow: 1,
    marginVertical: 12,
  },
  overlayEntryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  overlayEntryText: {
    flex: 1,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginLeft: 1,
  },
  overlayBottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  overlayRemoveButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#ff4444",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayRemoveButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  overlayButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 4,
    backgroundColor: "#1db954",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayCancelButton: {
    backgroundColor: "#ff4444",
  },
  overlayButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  // Recorder
  recorderWrapper: {
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  recorderButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#1db954",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#1db954",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
  },
  recorderUploadButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#333",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  recorderUploadButtonPressed: {
    backgroundColor: "#555",
  },
  recorderUploadText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  recorderOverlayContent: {
    padding: 16,
  },
  recorderOverlayTitle: {
    color: "#fff",
    fontWeight: "700",
    marginBottom: 12,
    fontSize: 18,
  },
  recorderPlayPauseButton: {
    backgroundColor: "#1db954",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  recorderTimer: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
    fontSize: 16,
  },

  recorderOverlayBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recorderOverlayButton: {
    backgroundColor: "#1db954",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  recorderOverlayCancelButton: {
    backgroundColor: "#ff3b3b",
  },
  recorderOverlayButtonText: {
    color: "#fff",
    fontWeight: "700",
  },

  // List container
  listContainer: {
    flex: 1,
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#333",
    borderRadius: 15,
    padding: 12,
    backgroundColor: "#1b1b1b",
    boxShadowColor: "#000",
    boxShadowOffset: { width: 0, height: 3 },
    boxShadowOpacity: 0.3,
    boxShadowRadius: 5,
    elevation: 5,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  listHeaderText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  listHeaderButtons: {
    flexDirection: "row",
    gap: 12,
  },
  buttonSmall: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#1db95420",
    borderRadius: 20,
  },
  buttonSmallText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },

  // ListItemCollapsed
  listItemCollapsedContainer: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    borderRadius: 12,
    marginVertical: 4,
    backgroundColor: "#272727",
    boxShadowColor: "#000",
    boxShadowOffset: { width: 0, height: 2 },
    boxShadowOpacity: 0.2,
    boxShadowRadius: 4,
    elevation: 3,
  },
  listItemCollapsedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemCollapsedLeft: {
    flexShrink: 1,
  },
  listItemCollapsedSpotifyText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  listItemCollapsedYoutubeText: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 2,
  },
  listItemCollapsedRight: {
    alignItems: "flex-end",
  },
  listItemCollapsedEntryText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  listItemCollapsedExpandButton: {
    marginTop: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "#1db954",
    borderRadius: 12,
  },
  listItemCollapsedExpandButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  skeletonContainer: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    borderRadius: 12,
    marginVertical: 4,
    backgroundColor: "#1b1b1b",
  },
  skeletonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skeletonBox: {
    backgroundColor: "#2a2a2a",
    borderRadius: 6,
  },
  skeletonLeft: {
    width: 150,
    height: 16,
    marginBottom: 6,
  },
  skeletonSubText: {
    width: 100,
    height: 12,
  },
  skeletonRight: {
    width: 50,
    height: 16,
  },
  skeletonButton: {
    width: 60,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#2a2a2a",
    marginTop: 6,
  },

  // ListItem (inside expanded section)
  listItemContainer: {
    marginVertical: 6,
    backgroundColor: "#272727",
    borderRadius: 12,
    overflow: "hidden",
    boxShadowColor: "#000",
    boxShadowOffset: { width: 0, height: 3 },
    boxShadowOpacity: 0.25,
    boxShadowRadius: 5,
    elevation: 4,
  },
  listItemRow: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
  },
  listItemCover: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#1b1b1b",
  },
  listItemMiddle: {
    flex: 1,
    justifyContent: "center",
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  listItemArtists: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 2,
  },
  listItemAlbum: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 2,
  },
  listItemRight: {
    alignItems: "flex-end",
  },
  listItemDuration: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  listItemRelease: {
    fontSize: 12,
    color: "#ccc",
    marginTop: 2,
  },
  listItemButtonsRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  listItemButton: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  listItemButtonText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "600",
  },

  // Skeleton for ListItem
  skeletonListItemContainer: {
    marginVertical: 6,
    backgroundColor: "#1b1b1b",
    borderRadius: 12,
    overflow: "hidden",
    padding: 12,
  },
  skeletonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  skeletonCover: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: "#2a2a2a",
    marginRight: 12,
  },
  skeletonMiddleLine: {
    height: 14,
    borderRadius: 6,
    backgroundColor: "#2a2a2a",
    marginBottom: 6,
  },
  skeletonMiddleLineTitle: {
    width: 120,
  },
  skeletonMiddleLineArtist: {
    width: 80,
  },
  skeletonMiddleLineAlbum: {
    width: 100,
  },
  skeletonRightLine: {
    width: 50,
    height: 14,
    borderRadius: 6,
    backgroundColor: "#2a2a2a",
    marginBottom: 6,
  },
  skeletonButtonRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  skeletonButton: {
    flex: 1,
    height: 32,
    borderRadius: 12,
    backgroundColor: "#2a2a2a",
    marginRight: 6,
  },

  // Client
  clientContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212",
  },
  clientTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    marginBottom: 24,
  },
  historyContainer: {
    flex: 1,
    marginTop: 20,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
  },
  clientGithubButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  // Detected
  detectedContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  detectedConfidence: {
    color: "#1db954",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 10,
  },
  detectedCover: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  detectedTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  detectedArtist: {
    fontSize: 18,
    fontWeight: "500",
    color: "#ccc",
    marginTop: 4,
    textAlign: "center",
  },
  detectedAlbum: {
    fontSize: 16,
    fontWeight: "400",
    color: "#888",
    marginTop: 2,
    textAlign: "center",
  },
  detectedButtonsRow: {
    flexDirection: "row",
    width: "100%",
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#2a2a2a",
  },
  detectedButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
  },
  detectedSpotify: {
    backgroundColor: "#1db954",
    borderBottomLeftRadius: 16,
  },
  detectedYouTube: {
    backgroundColor: "#ff0000",
    borderBottomRightRadius: 16,
  },
  detectedButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
});
