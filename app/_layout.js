import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="forget_password" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="verifyOTP" />
    </Stack>
  );
}
