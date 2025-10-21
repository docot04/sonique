import React, { useState, useRef } from "react";
import { Animated, TouchableWithoutFeedback } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { styles } from "../styles/components.styles";

export default function Recorder() {
  const [recording, setRecording] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

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

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={styles.recorderButton}>
          <FontAwesome name="microphone" size={48} color="#fff" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}
