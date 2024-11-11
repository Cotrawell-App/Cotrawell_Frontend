import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { signupStyles } from "../styles/signupStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import COLORS from "../constants/colors";
import Input from "../components/Input";
import Button from "../components/Button";
import { LinearGradient } from "expo-linear-gradient";
// import * as ImagePicker from "expo-image-picker";
// import { signIn, signUp } from "../AuthService";
// import { signUp } from "../services/CognitoService";

SplashScreen.preventAutoHideAsync();

const SignupScreen = () => {
  const [fontsLoaded] = useFonts({
    PoppinsBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  // State for the image and gallery permission
  // const [image, setImage] = useState("");
  // const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  // // Request gallery permissions when the component mounts
  // useEffect(() => {
  //   const getGalleryPermissions = async () => {
  //     const galleryStatus =
  //       await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     setHasGalleryPermission(galleryStatus.status === "granted");
  //   };

  //   getGalleryPermissions();
  // }, []);

  // Image selection logic
  // const handleImagePickerPress = async () => {
  //   if (hasGalleryPermission) {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.All,
  //       allowsEditing: true,
  //       aspect: [1, 1],
  //       quality: 1,
  //     });

  //     if (!result.canceled) {
  //       setImage(result.assets[0].uri);
  //     }
  //   } else {
  //     alert("No access to gallery.");
  //   }
  // };

  // if (hasGalleryPermission === false) {
  //   return <Text>No access to Internal Storage</Text>;
  // }

  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  // const imageSource = image
  //   ? { uri: image }
  //   : {
  //       uri: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png",
  //     };

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    // Validate first name
    // if (!input.firstname) {
    //   handleError("Please enter your first name", "firstname");
    //   valid = false;
    // }

    // // Validate last name
    // if (!input.lastname) {
    //   handleError("Please enter your last name", "lastname");
    //   valid = false;
    // }

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
      handleSignUp();
    }
  };

  const handleSignUp = async () => {
    try {
      // const result = await signUp(input.email, input.password);
      setMessage(`Sign-up successful: ${result.user.getUsername()}`);
      await AsyncStorage.setItem("user", JSON.stringify(input));
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.log(message, "message");
    }
  };

  const handleChange = (text, inputField) => {
    setInput((prevState) => ({ ...prevState, [inputField]: text }));
  };

  const handleError = (errorMessage, inputField) => {
    setErrors((prevState) => ({ ...prevState, [inputField]: errorMessage }));
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={signupStyles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <LinearGradient
      colors={["#E0F7FF", "#89B3BF"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={signupStyles.background}
    >
      <SafeAreaView style={signupStyles.safeAreaViewContainer}>
        <ScrollView contentContainerStyle={signupStyles.scrollViewContent}>
          <View style={signupStyles.contentContainer}>
            <Text style={signupStyles.inputText}>Create Profile</Text>
            <View style={signupStyles.inputcardContainer}>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    alignItems: "center",
                    fontFamily: "PoppinsRegular",
                    marginVertical: 10,
                  }}
                >
                  This how your details appears in cotrawell
                </Text>
                {/* <View style={styles.profileImageContainer}>
                    <Image source={imageSource} style={styles.image} />
                    <TouchableOpacity
                      style={styles.plusSymbol}
                      onPress={handleImagePickerPress}
                    >
                      <Text style={styles.plusSign}>+</Text>
                    </TouchableOpacity>
                  </View> */}
              </View>

              <View style={signupStyles.inputContainer}>
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SignupScreen;
