import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
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
          style={styles.textInput}
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
        {password && (
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Icon
              name={hidePassword ? "eye-off-outline" : "eye-outline"}
              style={styles.icon}
            />
          </TouchableOpacity>
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
  icon: {
    fontSize: 18,
    color: COLORS.darkGray, // Optionally use a color from your constants
    padding: 5,
  },
});
