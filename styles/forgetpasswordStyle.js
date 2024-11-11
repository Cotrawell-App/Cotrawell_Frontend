import { StyleSheet } from "react-native";

const forgetPasswordStyle = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    height: "100vh",
  },
  forgetPasswordContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    paddingHorizontal: 30,
    width: "100%",
  },
  headerText: {
    fontSize: 22,
    fontFamily: "PoppinsBold",
    marginBottom: 10,
  },
  forgetMessage: {
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    marginBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { forgetPasswordStyle };
