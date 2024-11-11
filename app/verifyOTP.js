import { SafeAreaView, StatusBar, Text, View } from "react-native";
import { verifyOtpStyle } from "../styles/verifyotpStyle";
import React from "react";
import { useEffect } from "react";
import { OtpInput } from "react-native-otp-entry";
import Button from "../components/Button";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";

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
      <SafeAreaView style={verifyOtpStyle.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }
  return (
    <LinearGradient
      colors={["#E0F7FF", "#89B3BF"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={verifyOtpStyle.background}
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
          <View style={verifyOtpStyle.VerifyContainer}>
            <Text style={verifyOtpStyle.headerText}>
              Please verify your email address
            </Text>
            <Text style={verifyOtpStyle.headerSubText}>
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
                containerStyle: verifyOtpStyle.container,
                pinCodeContainerStyle: verifyOtpStyle.pinCodeContainer,
                pinCodeTextStyle: verifyOtpStyle.pinCodeText,
                focusStickStyle: verifyOtpStyle.focusStick,
                focusedPinCodeContainerStyle:
                  verifyOtpStyle.activePinCodeContainer,
              }}
            />
            <Button title="Sign-in" />
            <Text style={verifyOtpStyle.checkText}>
              Can't find the email? try checking your spam folder, or click here
              to <Text style={verifyOtpStyle.sendText}>send a new code.</Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default VerifyOTP;
