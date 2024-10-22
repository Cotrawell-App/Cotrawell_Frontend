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
import * as SplashScreen from "expo-splash-screen"; // Helps in controlling the splash screen
import COLORS from "../constants/colors";
import Input from "../components/Input";
import Button from "../components/Button";
import LoginButton from "../components/LoginButton";

// Prevents the splash screen from auto-hiding until we explicitly hide it
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
      navigation.navigate("Dashboard");
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
              instant travel plans for must-see places, great travel deals, and
              more!
            </Text>
          </View>
          <View>
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
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginContainer: {
    paddingVertical: 20,
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  inputText: {
    fontSize: 22,
    fontFamily: "PoppinsBold",
  },
  headerText: {
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    marginTop: 10,
  },
  forget: {
    color: "#0061D2",
    textDecorationLine: "underline",
    textAlign: "right",
    fontSize: 12,
    fontFamily: "PoppinsRegular",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#EEEEEE",
  },
  text: {
    marginHorizontal: 10,
    fontSize: 12,
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
});
