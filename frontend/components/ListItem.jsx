import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { styles } from "../styles/components.styles";
import { AntDesign, Entypo } from "@expo/vector-icons";

export default function ListItem({ data, loading }) {
  const formatDuration = (ms) => {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  if (loading) {
    // skeleton
    return (
      <View style={styles.skeletonListItemContainer}>
        <View style={styles.skeletonRow}>
          <View style={styles.skeletonCover} />
          <View style={{ flex: 1 }}>
            <View
              style={[
                styles.skeletonMiddleLine,
                styles.skeletonMiddleLineTitle,
              ]}
            />
            <View
              style={[
                styles.skeletonMiddleLine,
                styles.skeletonMiddleLineArtist,
              ]}
            />
            <View
              style={[
                styles.skeletonMiddleLine,
                styles.skeletonMiddleLineAlbum,
              ]}
            />
          </View>
          <View style={{ marginLeft: 12 }}>
            <View style={styles.skeletonRightLine} />
            <View style={styles.skeletonRightLine} />
          </View>
        </View>
        <View style={styles.skeletonButtonRow}>
          <View style={styles.skeletonButton} />
          <View style={[styles.skeletonButton, { marginRight: 0 }]} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.listItemContainer}>
      {/* Top row: cover, middle metadata, right metadata */}
      <View style={styles.listItemRow}>
        <Image source={{ uri: data.cover }} style={styles.listItemCover} />

        <View style={styles.listItemMiddle}>
          <Text
            style={styles.listItemTitle}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {data.title}
          </Text>
          <Text
            style={styles.listItemArtists}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {data.artists}
          </Text>
          <Text
            style={styles.listItemAlbum}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {data.album_name}
          </Text>
        </View>

        <View style={styles.listItemRight}>
          <Text style={styles.listItemDuration}>
            {formatDuration(data.duration_ms)}
          </Text>
          <Text style={styles.listItemRelease}>{data.release_date}</Text>
        </View>
      </View>

      {/* Bottom buttons */}
      <View style={styles.listItemButtonsRow}>
        <TouchableOpacity
          style={[styles.listItemButton, { backgroundColor: "#1db954" }]}
          onPress={() => {
            const url = `https://open.spotify.com/track/${data.spotify_ID}`;
            Linking.openURL(url).catch((err) =>
              console.error("Failed to open URL:", err)
            );
          }}
        >
          <AntDesign name="spotify" size={20} color="#fff" />
          <Text style={styles.listItemButtonText}>Spotify</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.listItemButton, { backgroundColor: "#FF0000" }]}
          onPress={() => {
            const url = `https://www.youtube.com/watch?v=${data.youtube_ID}`;
            Linking.openURL(url).catch((err) =>
              console.error("Failed to open URL:", err)
            );
          }}
        >
          <Entypo name="youtube" size={20} color="#fff" />
          <Text style={styles.listItemButtonText}>YouTube</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
