import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Client, Dashboard } from "../pages";
import { styles } from "../styles/index.style";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("client");

  const renderContent = () => {
    if (activeTab === "client") return <Client />;
    if (activeTab === "dashboard") return <Dashboard />;
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.content}>{renderContent()}</View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "client" && styles.activeTab]}
          onPress={() => setActiveTab("client")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "client" && styles.activeTabText,
            ]}
          >
            Client
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "dashboard" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("dashboard")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "dashboard" && styles.activeTabText,
            ]}
          >
            Dashboard
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
