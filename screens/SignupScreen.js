import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Platform,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import COLORS from "../constants/colors";
import Input from "../components/Input";
import Button from "../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";

SplashScreen.preventAutoHideAsync();
const { width } = Dimensions.get("window");

const isWeb = Platform.OS === "web";

const SignupScreen = ({ navigation }) => {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    PoppinsBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  // State for the image and gallery permission
  const [image, setImage] = useState("");
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  // Request gallery permissions when the component mounts
  useEffect(() => {
    const getGalleryPermissions = async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    };

    getGalleryPermissions();
  }, []);

  // Image selection logic
  const handleImagePickerPress = async () => {
    if (hasGalleryPermission) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } else {
      alert("No access to gallery.");
    }
  };

  if (hasGalleryPermission === false) {
    return <Text>No access to Internal Storage</Text>;
  }

  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const imageSource = image
    ? { uri: image }
    : {
        uri: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png",
      };

  // Hide the splash screen when fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
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
      navigation.navigate("VerifyOTP");
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
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.contentContainer}>
            <Text style={styles.inputText}>Create Profile</Text>
            <View style={styles.inputcardContainer}>
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
                <View style={styles.profileImageContainer}>
                  <Image source={imageSource} style={styles.image} />
                  <TouchableOpacity
                    style={styles.plusSymbol}
                    onPress={handleImagePickerPress}
                  >
                    <Text style={styles.plusSign}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

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
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  safeAreaViewContainer: {
    flex: 1, // Take full screen height
    width: "100%",
    paddingTop: Platform.OS === "ios" ? 20 : 0, // Padding top for iOS devices
  },
  scrollViewContent: {
    flexGrow: 1, // Allow the content to grow vertically
    justifyContent: "flex-start", // Ensure it starts at the top
    alignContent: "center",
  },
  contentContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: "auto",
    marginHorizontal: "auto",
    maxWidth: isWeb ? 600 : "",
    overflow: "hidden",
  },

  inputcardContainer: {
    padding: 20,
  },
  inputText: {
    fontSize: 22,
    fontFamily: "PoppinsBold",
    textAlign: "center",
    backgroundColor: "black",
    color: "white",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    alignSelf: "center",
    width: Platform.OS === "web" ? 100 : 70,
    height: Platform.OS === "web" ? 100 : 70,
    marginBottom: 20,
    borderRadius: Platform.OS === "web" ? "100%" : 35,
    resizeMode: "cover",
  },
  plusSign: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -12 }, { translateY: -12 }],
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
});

export { styles };
