import React from "react";
import { View } from "react-native";
import { styles } from "../styles/components.styles";
import { ProcessTracks, List } from "../components";

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <ProcessTracks />
      <List />
    </View>
  );
}
