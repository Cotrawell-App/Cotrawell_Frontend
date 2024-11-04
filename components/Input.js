import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import COLORS from "../constants/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Input = ({
  label,
  placeholder,
  error,
  password,
  onFocus = () => {},
  ...props  
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);

  const [loaded] = useFonts({
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.inputField}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          { borderColor: error ? "red" : isFocused ? "black" : COLORS.light },
        ]}
      >
        <TextInput
          secureTextEntry={password && hidePassword}
          placeholder={placeholder}
          style={[
            styles.textInput,
            Platform.OS === "web" && styles.webtextInput,
          ]}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          {...props}
        />
        {password &&
          Platform.OS !== "web" && ( // Remove Touchable for web
            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
              <Icon
                name={hidePassword ? "eye-off-outline" : "eye-outline"}
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
        {password &&
          Platform.OS === "web" && ( // Web-specific password toggle handling
            <div
              onClick={() => setHidePassword(!hidePassword)}
              style={{ cursor: "pointer" }}
            >
              <Icon
                name={hidePassword ? "eye-off-outline" : "eye-outline"}
                style={styles.icon}
              />
            </div>
          )}
      </View>
      {error && (
        <Text
          style={{ color: "red", fontSize: 10, fontFamily: "PoppinsRegular" }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputField: {
    marginTop: 10,
  },
  label: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
  },
  inputContainer: {
    height: 45,
    marginVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    fontSize: 12,
    fontFamily: "PoppinsRegular",
  },
  webtextInput: {
    borderWidth: 0,
    outlineWidth: 0, // Disable the blue outline that shows in web browsers
  },
  icon: {
    fontSize: 18,
    color: COLORS.darkGray,
    padding: 5,
  },
});
