import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import COLORS from "../constants/colors";
import Input from "../components/Input";
import Button from "../components/Button";
import { LinearGradient } from "expo-linear-gradient";

const ForgetPasswordScreen = ({ navigation }) => {
  const [loaded] = useFonts({
    PoppinsBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  const [input, setInput] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Form validation
  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!input.email) {
      handleError("Please enter your email", "email");
      valid = false;
    } else if (!input.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      valid = false;
    }

    if (valid) {
      requestResetCode();
    }
  };

  // Simulate requesting password reset code
  const requestResetCode = async () => {
    setIsLoading(true);
    try {
      // Simulate API request to request reset code
      await AsyncStorage.setItem("resetEmail", input.email);
      Alert.alert("Success", "A reset code has been sent to your email.");
      setIsLoading(false);
      navigation.navigate("ResetCodeScreen"); // Navigate to the next screen (Reset Code Input Screen)
    } catch (error) {
      setIsLoading(false);
      Alert.alert(
        "Error",
        "Failed to request reset code. Please try again later."
      );
    }
  };

  const handleChange = (text, input) => {
    setInput((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  if (!loaded || isLoading) {
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
      <SafeAreaView style={styles.forgetPasswordContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.contentContainer}>
            <Text style={styles.headerText}>Forgot Password</Text>
            <Text style={styles.forgetMessage}>
              Enter your email and we'll send a verification code to reset your
              password.
            </Text>
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

              <Button title="Request Code" onPress={validate} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    height: "100vh", // Full height for all platforms
  },
  forgetPasswordContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    paddingHorizontal: 30,
    width: "100%",
  },
  headerText: {
    fontSize: 22,
    fontFamily: "PoppinsBold",
    marginBottom: 10,
  },
  forgetMessage: {
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    marginBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
