import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

const pinCodeSize =
  Platform.OS === "web" && width < 720 ? 40 : Platform.OS === "web" ? 50 : 40;

const verifyOtpStyle = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    height: "100vh",
  },
  VerifyContainer: {
    backgroundColor: "white",
    padding: "10%",
    borderRadius: 10,
  },
  headerText: {
    fontFamily: "PoppinsBold",
    marginVertical: "2%",
    fontSize: 22,
    textAlign: "center",
  },
  headerSubText: {
    fontFamily: "PoppinsRegular",
    marginVertical: "2%",
  },
  checkText: {
    fontFamily: "PoppinsRegular",
    marginVertical: "5%",
  },
  sendText: {
    fontFamily: "PoppinsRegular",
    color: "blue",
    textDecorationLine: "underline",
  },
  pinCodeContainer: {
    width: pinCodeSize,
    height: pinCodeSize,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  focusStick: {
    backgroundColor: "blue",
  },
  activePinCodeContainer: {
    borderColor: "blue",
    backgroundColor: "gray",
  },
});

export { verifyOtpStyle };
