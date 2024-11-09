import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "./awsConfig";

export const signUp = (email, password) => {
  return new Promise((resolve, reject) => {
    UserPool.signUp(email, password, [], null, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export const signIn = (email, password) => {
  const user = new CognitoUser({ Username: email, Pool: UserPool });
  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  return new Promise((resolve, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};
