import { StyleSheet } from "react-native";

const loginStyle = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    height: "100vh",
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: "100%",
    maxWidth: "1200px",
  },
  inputText: {
    fontSize: 22,
    fontFamily: "PoppinsBold",
  },
  headerText: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    marginTop: 10,
  },
  forget: {
    color: "#0061D2",
    textDecorationLine: "underline",
    textAlign: "right",
    fontSize: 14,
    fontFamily: "PoppinsRegular",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#EEEEEE",
  },
  text: {
    marginHorizontal: 10,
    fontSize: 14,
    fontFamily: "PoppinsRegular",
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  loginButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  accountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginInput: {
    width: "100%",
    maxWidth: "500px",
    padding: 10,
  },
  loginInputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

const mediaQueries = `
    @media (max-width: 768px) {
      .contentContainer {
        padding: 10px; // Adjust padding for smaller screens
      }
      .headerText,
      .text,
      .forget {
        font-size: 12px; // Smaller font sizes for mobile
      }
    }
    `;

export { loginStyle, mediaQueries };
