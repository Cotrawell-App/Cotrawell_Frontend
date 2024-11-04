import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import COLORS from "../constants/colors";
import Input from "../components/Input";
import Button from "../components/Button";
import { LinearGradient } from "expo-linear-gradient";

SplashScreen.preventAutoHideAsync();

const SignupScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    PoppinsBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Hide the splash screen when fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Hide the splash screen
    }
  }, [fontsLoaded]);

  const validate = () => {
    Keyboard.dismiss(); // Dismiss keyboard on validation
    let valid = true;

    // Validate first name
    if (!input.firstname) {
      handleError("Please enter your first name", "firstname");
      valid = false;
    }

    // Validate last name
    if (!input.lastname) {
      handleError("Please enter your last name", "lastname");
      valid = false;
    }

    // Validate email
    if (!input.email) {
      handleError("Please enter your email", "email");
      valid = false;
    } else if (!input.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      valid = false;
    }

    // Validate password
    if (!input.password) {
      handleError("Please enter your password", "password");
      valid = false;
    } else if (input.password.length < 6) {
      handleError("Password must be at least 6 characters long", "password");
      valid = false;
    }

    if (valid) {
      login();
    }
  };

  const login = async () => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(input));
      navigation.navigate("Home");
    } catch (error) {
      alert("Error", "Failed to login. Please try again later.");
    }
  };

  const handleChange = (text, inputField) => {
    setInput((prevState) => ({ ...prevState, [inputField]: text }));
  };

  const handleError = (errorMessage, inputField) => {
    setErrors((prevState) => ({ ...prevState, [inputField]: errorMessage }));
  };

  // Show the splash/loading indicator until the fonts are fully loaded
  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <LinearGradient
      colors={["#E0F7FF", "#89B3BF"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.background}
    >
      <SafeAreaView style={styles.signupContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.contentContainer}>
            <Text style={styles.inputText}>Create Profile</Text>
            <View style={styles.inputContainer}>
              <Input
                placeholder="Enter your first name"
                onChangeText={(text) => handleChange(text, "firstname")}
                error={errors.firstname}
                onFocus={() => handleError(null, "firstname")}
              />
              <Input
                placeholder="Enter your last name"
                onChangeText={(text) => handleChange(text, "lastname")}
                error={errors.lastname}
                onFocus={() => handleError(null, "lastname")}
              />
              <Input
                placeholder="Enter your email address"
                onChangeText={(text) => handleChange(text, "email")}
                error={errors.email}
                onFocus={() => handleError(null, "email")}
              />
              <Input
                placeholder="Enter your password"
                onChangeText={(text) => handleChange(text, "password")}
                password
                error={errors.password}
                onFocus={() => handleError(null, "password")}
              />
              <Button title="Create" onPress={validate} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: "600px",
    height: "100vh",
  },
  inputText: {
    fontSize: 22,
    fontFamily: "PoppinsBold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

// Use media queries for more fine-tuned control on web
const mediaQueries = `
@media (max-width: 768px) {
  .contentContainer {
    padding: 10px; // Adjust padding for smaller screens
  }
  .inputText {
    font-size: 18px; // Smaller font sizes for mobile
  }
}
`;

export { styles, mediaQueries };
