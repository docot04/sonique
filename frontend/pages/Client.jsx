import { View, Text, TouchableOpacity, Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Recorder, History, Detected } from "../components";
import { styles } from "../styles/components.styles";

export default function Client() {
  const testData = {
    spotify_ID: "7CZRguMolNqIobnXxpV735",
    youtube_ID: "86BST8NIpNM",
    title: "Coin",
    artists: "IU",
    cover: "https://i.scdn.co/image/ab67616d0000b2734ed058b71650a6ca2c04adff",
    album_name: "IU 5th Album 'LILAC'",
    release_date: "2021-03-25",
    duration_ms: 193080,
    confidence: 0.93,
  };

  const openGitHub = () => {
    Linking.openURL("https://github.com/docot04/sonique");
  };

  return (
    <View style={styles.clientContainer}>
      <Text style={styles.clientTitle}>Sonique Your Tune</Text>
      <TouchableOpacity style={styles.clientGithubButton} onPress={openGitHub}>
        <FontAwesome name="github" size={20} color="#fff" />
      </TouchableOpacity>
      <View style={styles.recorderWrapper}>
        <Recorder />
      </View>

      <History />

      {/* <Detected data={testData} /> */}
    </View>
  );
}
