import React from "react";
import { View, Text, ScrollView, Platform } from "react-native";
import ListItem from "./ListItem";
import { styles } from "../styles/components.styles";

export default function History() {
  // For testing: display 5 loading ListItems
  const loadingItems = Array.from({ length: 5 });

  return (
    <View style={styles.historyContainer}>
      <Text style={styles.historyTitle}>Your Recent Matches</Text>
      <ScrollView
        showsVerticalScrollIndicator={false} // hide scrollbar on web
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {loadingItems.map((_, index) => (
          <ListItem key={index} loading />
        ))}
      </ScrollView>
    </View>
  );
}
