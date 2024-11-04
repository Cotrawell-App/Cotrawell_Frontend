import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View
        style={[
          styles.headerLeft,
          Platform.OS === "web" && styles.webheaderLeft,
        ]}
      >
        {Platform.OS === "web" && (
          <div style={{ cursor: "pointer" }}>
            <Icon name={"home-outline"} style={styles.icon} />
          </div>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
