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
import LoginButton from "../components/LoginButton";
import { LinearGradient } from "expo-linear-gradient";

SplashScreen.preventAutoHideAsync();

const LoginScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    PoppinsBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  const [input, setInput] = useState({
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
    if (Platform.OS !== "web") {
      Keyboard.dismiss(); // Skip on web, handled by browser
    }

    let valid = true;

    if (!input.email) {
      handleError("Please enter your email", "email");
      valid = false;
    } else if (!input.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      valid = false;
    }

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

  const login = () => {
    try {
      if (Platform.OS === "web") {
        localStorage.setItem("user", JSON.stringify(input));
      } else {
        AsyncStorage.setItem("user", JSON.stringify(input));
      }
      navigation.navigate("Home");
    } catch (error) {
      alert("Error", "Failed to login. Please try again later.");
    }
  };

  const handleChange = (text, input) => {
    setInput((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
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
      <SafeAreaView style={styles.loginContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.inputText}>Welcome to Cotrawell!</Text>
              <Text style={styles.inputText}>
                Ready to find your next travel vibe?
              </Text>
              <Text style={styles.inputText}>Let's go!</Text>
            </View>
            <View>
              <Text style={styles.headerText}>
                Sign in or sign-up to find your perfect travel match, create
                instant travel plans for must-see places, great travel deals,
                and more!
              </Text>
            </View>
            <View style={Platform.OS === "web" && styles.loginInputContainer}>
              <View style={styles.loginInput}>
                <Input
                  label="Email"
                  placeholder="Enter your email address"
                  onChangeText={(text) => handleChange(text, "email")}
                  error={errors.email}
                  onFocus={() => {
                    handleError(null, "email");
                  }}
                />
                <Input
                  label="Password"
                  placeholder="Enter your Password"
                  onChangeText={(text) => handleChange(text, "password")}
                  password
                  error={errors.password}
                  onFocus={() => {
                    handleError(null, "password");
                  }}
                />
                <Text
                  style={styles.forget}
                  onPress={() => {
                    navigation.navigate("ForgetPassword");
                  }}
                >
                  Forget Password?
                </Text>
                <Button title="Login" onPress={validate} />
              </View>
            </View>
            <View style={styles.lineContainer}>
              <View style={styles.line} />
              <Text style={styles.text}>More Sign-in Options</Text>
              <View style={styles.line} />
            </View>
            <View style={styles.loginButtonContainer}>
              <LoginButton
                title="Google"
                url="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
              />
              <LoginButton
                title="Apple"
                url="https://w7.pngwing.com/pngs/664/673/png-transparent-apple-logo-iphone-computer-apple-logo-company-heart-logo-thumbnail.png"
              />
            </View>
            <View style={styles.accountContainer}>
              <Text style={{ fontSize: 10, fontFamily: "PoppinsRegular" }}>
                Don't have an account?
              </Text>
              <Text
                style={{ fontSize: 10, fontFamily: "PoppinsBold" }}
                onPress={() => navigation.navigate("Signup")}
              >
                Create Account
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    height: "100vh", // Full height for all platforms
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20, // Adjusted for better mobile view
    paddingVertical: 30, // Adjusted for better mobile view
    width: "100%", // Use a percentage for better responsiveness
    maxWidth: "1200px", // Limit max width for large screens
  },
  inputText: {
    fontSize: 22,
    fontFamily: "PoppinsBold",
  },
  headerText: {
    fontSize: 14, // Increased font size for better readability
    fontFamily: "PoppinsRegular",
    marginTop: 10,
  },
  forget: {
    color: "#0061D2",
    textDecorationLine: "underline",
    textAlign: "right",
    fontSize: 14, // Increased font size for better readability
    fontFamily: "PoppinsRegular",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#EEEEEE",
  },
  text: {
    marginHorizontal: 10,
    fontSize: 14, // Increased font size for better readability
    fontFamily: "PoppinsRegular",
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  loginButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%", // Ensure button container takes full width
  },
  accountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginInput: {
    width: "100%", // Full width
    maxWidth: "500px", // Limit max width on web
    padding: 10, // Added padding for better touch targets
  },
  loginInputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

// Use media queries for more fine-tuned control on web
const mediaQueries = `
@media (max-width: 768px) {
  .contentContainer {
    padding: 10px; // Adjust padding for smaller screens
  }
  .headerText,
  .text,
  .forget {
    font-size: 12px; // Smaller font sizes for mobile
  }
}
`;

export { styles, mediaQueries };
