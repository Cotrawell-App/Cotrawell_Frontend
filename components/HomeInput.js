import React from "react";
import { StyleSheet, View, TextInput, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Get device dimensions
const { width } = Dimensions.get("window");

// Define breakpoints for responsive styles
const isTabletOrDesktop = width >= 768; // Adjust based on your breakpoints

const HomeInput = () => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputField}>
        <TextInput placeholder="From" style={styles.input} />
        <Icon name="exchange" style={styles.icon} size={20} color="white" />
        <TextInput placeholder="To" style={styles.input} />
      </View>
    </View>
  );
};

export default HomeInput;

const styles = StyleSheet.create({
  inputContainer: {
    padding: isTabletOrDesktop ? 40 : 30, // Increased padding for larger screens
  },
  inputField: {
    position: "relative",
    backgroundColor: "red",
  },
  input: {
    padding: isTabletOrDesktop ? 15 : 10,
    borderWidth: 1,
    borderRadius: 10,
    width: isTabletOrDesktop ? "80%" : "100%", // Use 80% width for tablets/desktops and 100% for mobile
  },
  icon: {
    position: "absolute",
    transform: [{ rotate: "90deg" }], // Rotate icon 90 degrees
    alignSelf: "flex-end", // Optional: center the icon
    top: 30, // Keep consistent top position
    right: 20, // Position icon from the right
    borderWidth: 1,
    padding: 5,
    borderRadius: 99,
    backgroundColor: "black",
  },
});
