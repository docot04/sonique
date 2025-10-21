import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/components.styles";
import ListItem from "./ListItem";

export default function ListItemCollapsed({
  spotify_ID,
  youtube_ID,
  entry_count,
  loading,
}) {
  const [expanded, setExpanded] = useState(false);
  const [trackData, setTrackData] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const toggleExpand = async () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);

    if (newExpanded && !trackData) {
      // fetch track details from API
      setLoadingDetails(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/dashboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ spotify_id: spotify_ID }), // <-- key fixed
        });

        if (!response.ok) {
          console.error("Failed to fetch track details", response.status);
          setLoadingDetails(false);
          return;
        }

        const data = await response.json();
        setTrackData(data); // expects data in the format used by ListItem
      } catch (error) {
        console.error("Error fetching track details:", error);
      } finally {
        setLoadingDetails(false);
      }
    }
  };

  if (loading) {
    // Render skeleton while loading ListItemCollapsed
    return (
      <View style={styles.skeletonContainer}>
        <View style={styles.skeletonRow}>
          <View>
            <View style={[styles.skeletonBox, styles.skeletonLeft]} />
            <View style={[styles.skeletonBox, styles.skeletonSubText]} />
          </View>
          <View>
            <View style={[styles.skeletonBox, styles.skeletonRight]} />
            <View style={[styles.skeletonBox, styles.skeletonButton]} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.listItemCollapsedContainer}>
      <View style={styles.listItemCollapsedRow}>
        {/* Left side: Spotify & YouTube */}
        <View style={styles.listItemCollapsedLeft}>
          <Text style={styles.listItemCollapsedSpotifyText}>{spotify_ID}</Text>
          <Text style={styles.listItemCollapsedYoutubeText}>{youtube_ID}</Text>
        </View>

        {/* Right side: Entry count + expand button */}
        <View style={styles.listItemCollapsedRight}>
          <Text style={styles.listItemCollapsedEntryText}>{entry_count}</Text>
          <TouchableOpacity
            onPress={toggleExpand}
            style={styles.listItemCollapsedExpandButton}
          >
            <Text style={styles.listItemCollapsedExpandButtonText}>
              {expanded ? "Collapse" : "Expand"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Expanded content */}
      {expanded && (
        <View style={{ marginTop: 12 }}>
          {loadingDetails ? (
            <ListItem loading /> // show skeleton while fetching details
          ) : trackData ? (
            <ListItem data={trackData} /> // render actual track details
          ) : (
            <Text style={{ color: "#ccc", textAlign: "center", marginTop: 10 }}>
              Failed to load track details.
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
