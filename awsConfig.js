import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_dMDfcl01I",
  ClientId: "74ad0p0esfhrhpn62q45g4ndms",
};

export default new CognitoUserPool(poolData);
