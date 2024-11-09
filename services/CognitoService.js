import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
  ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import config from "../config.json";

// Initialize Cognito client
const cognitoClient = new CognitoIdentityProviderClient({
  region: config.region,
});

// Sign in function
export const signIn = async (username, password) => {
  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: config.clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };
  try {
    const command = new InitiateAuthCommand(params);
    const { AuthenticationResult } = await cognitoClient.send(command);
    if (AuthenticationResult) {
      await AsyncStorage.setItem("idToken", AuthenticationResult.IdToken || "");
      await AsyncStorage.setItem(
        "accessToken",
        AuthenticationResult.AccessToken || ""
      );
      await AsyncStorage.setItem(
        "refreshToken",
        AuthenticationResult.RefreshToken || ""
      );
      return AuthenticationResult;
    }
  } catch (error) {
    console.error("Error signing in: ", error);
    throw error;
  }
};

// Sign up function
export const signUp = async (email, password) => {
  const params = {
    ClientId: config.clientId,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  };
  try {
    const command = new SignUpCommand(params);
    const response = await cognitoClient.send(command);
    console.log("Sign up success: ", response);
    return response;
  } catch (error) {
    console.error("Error signing up: ", error);
    throw error;
  }
};

// Confirm sign up function
export const confirmSignUp = async (username, code) => {
  const params = {
    ClientId: config.clientId,
    Username: username,
    ConfirmationCode: code,
  };
  try {
    const command = new ConfirmSignUpCommand(params);
    await cognitoClient.send(command);
    console.log("User confirmed successfully");
    return true;
  } catch (error) {
    console.error("Error confirming sign up: ", error);
    throw error;
  }
};
