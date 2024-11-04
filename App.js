import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SignupScreen from "./screens/SignupScreen";
import DashboardScreen from "./screens/DashboardScreen";
import ForgetPasswordScreen from "./screens/ForgetPasswordScreen";

const Stack = createStackNavigator();

const linking = {
  prefixes: ["http://localhost:8081/", "yourapp://"], // Add your own prefix or domain if needed
  config: {
    screens: {
      Login: "login",
      Home: "home",
      Signup: "signup",
      Dashboard: "dashboard",
      ForgetPassword: "forget-password",
    },
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: "white" },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPasswordScreen}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "web" ? 0 : 40,
  },
});
