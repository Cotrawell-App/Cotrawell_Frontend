import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import COLORS from "../constants/colors";
import Input from "../components/Input";
import Button from "../components/Button";
import LoginButton from "../components/LoginButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SignupScreen = ({ navigation }) => {
  const [loaded] = useFonts({
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
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!input.firstname) {
      handleError("Please enter your first name", "firstname");
      valid = false;
    }
    if (!input.lastname) {
      handleError("Please enter your last name", "lastname");
      valid = false;
    }
    if (!input.email) {
      handleError("Please enter your email", "email");
      valid = false;
    } else if (!input.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please enter a valid email", "email");
      valid = false;
    }
    if (!input.password) {
      handleError("Please enter your password", "password");
      valid = false;
    } else if (input.password.length < 6) {
      handleError("Password must be at least 6 characters long", "password");
      valid = false;
    }
    if (!isChecked) {
      Alert.alert(
        "Terms and Conditions",
        "Please accept the terms and conditions to continue."
      );
      valid = false;
    }

    if (valid) {
      Signup();
    }
  };

  const Signup = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.setItem("user", JSON.stringify(input));
      setIsLoading(false);
      Alert.alert("Success", "Account created successfully");
      navigation.navigate("Dashboard");
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", "Failed to create account. Please try again later.");
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.signupContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contentContainer}>
            <Text style={styles.headerText}>Create Account</Text>
            <Text style={styles.subHeaderText}>
              Ready to find your next travel vibe?
            </Text>

            {/* First Name Input */}
            <Input
              label="First name"
              placeholder="Enter your first name"
              onChangeText={(text) => handleChange(text, "firstname")}
              error={errors.firstname}
              onFocus={() => handleError(null, "firstname")}
            />
            {/* Last Name Input */}
            <Input
              label="Last name"
              placeholder="Enter your last name"
              onChangeText={(text) => handleChange(text, "lastname")}
              error={errors.lastname}
              onFocus={() => handleError(null, "lastname")}
            />
            {/* Email Input */}
            <Input
              label="Email"
              placeholder="Enter your email address"
              onChangeText={(text) => handleChange(text, "email")}
              error={errors.email}
              onFocus={() => handleError(null, "email")}
            />
            {/* Password Input */}
            <Input
              label="Password"
              placeholder="Enter your Password"
              password
              onChangeText={(text) => handleChange(text, "password")}
              error={errors.password}
              onFocus={() => handleError(null, "password")}
            />

            {/* Terms and Conditions Checkbox */}
            <View style={styles.checkboxContainer}>
              <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                <Icon
                  name={
                    isChecked ? "checkbox-marked" : "checkbox-blank-outline"
                  }
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>
                Please accept our{" "}
                <Text
                  style={styles.linkText}
                  onPress={() =>
                    Alert.alert("Terms", "Terms & Conditions here.")
                  }
                >
                  terms and conditions
                </Text>
              </Text>
            </View>

            {/* Create Account Button */}
            <Button title="Create Account" onPress={validate} />

            {/* Divider Line */}
            <View style={styles.lineContainer}>
              <View style={styles.line} />
              <Text style={styles.text}>More Sign-up Options</Text>
              <View style={styles.line} />
            </View>

            {/* Social Login Buttons */}
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

            {/* Already have an account */}
            <View style={styles.accountContainer}>
              <Text style={styles.smallText}>Already have an account?</Text>
              <Text
                style={styles.linkText}
                onPress={() => navigation.navigate("Login")}
              >
                Login
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  signupContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    paddingTop: 30,
    width: "100%",
  },
  headerText: {
    fontSize: 22,
    fontFamily: "PoppinsBold",
    marginBottom: 5,
  },
  subHeaderText: {
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    marginBottom: 10,
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
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
  smallText: {
    fontSize: 12,
    fontFamily: "PoppinsRegular",
  },
  linkText: {
    fontSize: 12,
    fontFamily: "PoppinsBold",
    color: COLORS.primary,
    marginLeft: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});
