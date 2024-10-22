import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useFonts } from "expo-font";

const LoginButton = ({ url, title }) => {
  const [loaded] = useFonts({
    PoppinsBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.button}>
      <Image
        style={styles.image}
        source={{
          uri: url,
        }}
      />
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default LoginButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
  },
  image: {
    width: 15,
    height: 15,
    borderRadius: 100,
    resizeMode: "contain",
    marginRight: 10,
  },
  buttonTitle: {
    fontSize: 12,
    fontFamily: "PoppinsBold",
  },
});
