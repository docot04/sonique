import { useState, useRef } from "react";
import { Animated, Pressable, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { styles } from "../styles/components.styles";
import * as DocumentPicker from "expo-document-picker";
import { Alert } from "react-native";

async function handleFilePick() {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "audio/mpeg",
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (result.canceled) {
      console.log("User cancelled upload");
      return;
    }

    const file = result.assets[0];
    console.log("Picked file:", file);

    // Example:
    // file.uri -> local URI (works for upload)
    // file.name -> filename
    // file.size -> bytes
    // file.mimeType -> audio/mpeg

    Alert.alert("File Selected", `${file.name}`);
  } catch (err) {
    console.error("Error picking file:", err);
    Alert.alert("Error", "Something went wrong while selecting the file.");
  }
}

export default function Recorder() {
  const [recording, setRecording] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const uploadAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    setRecording(true);
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handlePressOut = () => {
    setRecording(false);
    scaleAnim.stopAnimation();
    scaleAnim.setValue(1);
  };

  const handleUploadPressIn = () => {
    Animated.spring(uploadAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 20,
      bounciness: 5,
    }).start();
  };

  const handleUploadPressOut = () => {
    Animated.spring(uploadAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 5,
    }).start();
  };

  return (
    <View style={styles.recorderWrapper}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
          <Animated.View style={styles.recorderButton}>
            <FontAwesome name="microphone" size={48} color="#fff" />
          </Animated.View>
        </Pressable>
      </Animated.View>
      <Animated.View style={{ transform: [{ scale: uploadAnim }] }}>
        <Pressable
          onPressIn={handleUploadPressIn}
          onPressOut={handleUploadPressOut}
          onPress={handleFilePick}
          style={({ pressed }) => [
            styles.uploadButton,
            pressed && { backgroundColor: "#555" },
          ]}
        >
          <FontAwesome name="upload" size={22} color="#fff" />
          <Text style={styles.uploadText}>Or Upload MP3</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
