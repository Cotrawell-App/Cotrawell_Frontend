import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { OtpInput } from "react-native-otp-entry";
import Button from "../components/Button";
import { globalStyles } from "../constants/styles";

const VerifyOTP = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          padding: "10%",
          alignItems: "center",
        }}
      >
        <StatusBar hidden />
        <Text style={globa}>Please verify your email address</Text>
        <Text>
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
        <Text>
          Can't find the email? try checking your spam folder, or click here to{" "}
          <Text>send a new code</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({});
