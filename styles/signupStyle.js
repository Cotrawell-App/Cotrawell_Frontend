import { StyleSheet, Platform } from "react-native";

const isWeb = Platform.OS === "web";

const signupStyles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  safeAreaViewContainer: {
    flex: 1,
    width: "100%",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
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

export { signupStyles };
