import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { forgetPasswordStyle } from "../styles/forgetpasswordStyle";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import COLORS from "../constants/colors";
import Input from "../components/Input";
import Button from "../components/Button";
import { LinearGradient } from "expo-linear-gradient";

const ForgetPasswordScreen = () => {
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

  const requestResetCode = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.setItem("resetEmail", input.email);
      Alert.alert("Success", "A reset code has been sent to your email.");
      setIsLoading(false);
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
      <SafeAreaView style={forgetPasswordStyle.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <LinearGradient
      colors={["#E0F7FF", "#89B3BF"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={forgetPasswordStyle.background}
    >
      <SafeAreaView style={forgetPasswordStyle.forgetPasswordContainer}>
        <ScrollView
          contentContainerStyle={forgetPasswordStyle.scrollViewContent}
        >
          <View style={forgetPasswordStyle.contentContainer}>
            <Text style={forgetPasswordStyle.headerText}>Forgot Password</Text>
            <Text style={forgetPasswordStyle.forgetMessage}>
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
