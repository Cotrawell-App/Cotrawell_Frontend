import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import { useEffect } from "react";
import { OtpInput } from "react-native-otp-entry";
import Button from "../components/Button";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const pinCodeSize =
  Platform.OS === "web" && width < 720 ? 40 : Platform.OS === "web" ? 50 : 40;

const VerifyOTP = () => {
  const [fontsLoaded] = useFonts({
    PoppinsBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Hide the splash screen
    }
  }, [fontsLoaded]);

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
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={[
            {
              flex: 1,
              padding: "10%",
              alignContent: "center",
              justifyContent: "center",
            },
          ]}
        >
          <StatusBar hidden />
          <View style={styles.VerifyContainer}>
            <Text style={styles.headerText}>
              Please verify your email address
            </Text>
            <Text style={styles.headerSubText}>
              We just sent a 6-digit verification code to your
              email:xxxxxx@gmail.com. Please enter the code within 5 minutes.
            </Text>
            <OtpInput
              numberOfDigits={6}
              focusColor="green"
              focusStickBlinkingDuration={500}
              onTextChange={(text) => console.log(text)}
              onFilled={(text) => console.log(`OTP is ${text}`)}
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              theme={{
                containerStyle: styles.container,
                pinCodeContainerStyle: styles.pinCodeContainer,
                pinCodeTextStyle: styles.pinCodeText,
                focusStickStyle: styles.focusStick,
                focusedPinCodeContainerStyle: styles.activePinCodeContainer,
              }}
            />
            <Button title="Sign-in" />
            <Text style={styles.checkText}>
              Can't find the email? try checking your spam folder, or click here
              to <Text style={styles.sendText}>send a new code.</Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    height: "100vh",
  },
  VerifyContainer: {
    backgroundColor: "white",
    padding: "10%",
    borderRadius: 10,
  },
  headerText: {
    fontFamily: "PoppinsBold",
    marginVertical: "2%",
    fontSize: 22,
    textAlign: "center",
  },
  headerSubText: {
    fontFamily: "PoppinsRegular",
    marginVertical: "2%",
  },
  checkText: {
    fontFamily: "PoppinsRegular",
    marginVertical: "5%",
  },
  sendText: {
    fontFamily: "PoppinsRegular",
    color: "blue",
    textDecorationLine: "underline",
  },
  pinCodeContainer: {
    width: pinCodeSize,
    height: pinCodeSize,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  focusStick: {
    backgroundColor: "blue", // Color of the focus stick
  },
  activePinCodeContainer: {
    borderColor: "blue", // Border color when focused
    backgroundColor: "gray", // Background color when focused
  },
});
