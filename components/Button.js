import { TouchableOpacity, StyleSheet, Text, Platform } from "react-native";
import React from "react";
import COLORS from "../constants/colors";
import { useFonts } from "expo-font";

const Button = ({ title, onPress = () => {} }) => {
  const [loaded] = useFonts({
    PoppinsBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 45,
    width: "100%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginTop: 10,
    cursor: Platform.OS === "web" ? "pointer" : "auto",
  },
  buttonTitle: {
    fontSize: 14,
    fontFamily: "PoppinsBold",
    color: "white",
  },
});
