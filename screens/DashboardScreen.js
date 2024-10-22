import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import COLORS from "../constants/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { useFonts } from "expo-font";
import Button from "../components/Button";

const DashboardScreen = ({ navigation }) => {
  const [loaded] = useFonts({
    PoppinsBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  const [fromdate, setFromDate] = useState(new Date());
  const [todate, setToDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || fromdate;
    setShowPicker(false);
    setFromDate(currentDate);
    setFormattedDate(currentDate.toISOString().split("T")[0]);
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  if (!loaded || isLoading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <ScrollView>
      <View>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://t4.ftcdn.net/jpg/00/65/48/25/360_F_65482539_C0ZozE5gUjCafz7Xq98WB4dW6LAhqKfs.jpg",
            }}
            style={styles.image}
          />
          <Text style={styles.title}>Plan Your Trip</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>From Location</Text>
          <TextInput placeholder="Enter departure city" style={styles.input} />

          <Text style={styles.label}>To Location</Text>
          <TextInput
            placeholder="Enter destination city"
            style={styles.input}
          />
          <View style={styles.date}>
            <View style={styles.fromdate}>
              <Text style={styles.label}>From Date</Text>
              <TextInput
                placeholder="YYYY-MM-DD"
                value={formattedDate}
                onFocus={showDatePicker} // Show the date picker when focused
                style={styles.input}
              />
              {showPicker && (
                <DateTimePicker
                  value={fromdate}
                  mode="date"
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
            <View style={styles.todate}>
              <Text style={styles.label}>To Date</Text>
              <TextInput
                placeholder="YYYY-MM-DD"
                value={formattedDate}
                onFocus={showDatePicker} // Show the date picker when focused
                style={styles.input}
              />
              {showPicker && (
                <DateTimePicker
                  value={todate}
                  mode="date"
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
          </View>
          <Text>Mode of Travel:</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedValue(value)}
            items={[
              { label: "Car", value: "Car" },
              { label: "Bike", value: "Bike" },
              { label: "Bus", value: "Bus" },
              { label: "Flight", value: "Flight" },
            ]}
            style={pickerSelectStyles}
          />

          <Button title="Search" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: "30%",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    opacity: 0.8,
  },
  title: {
    fontSize: 32,
    fontWeight: "condensedBold",
    padding: 30,
    fontFamily: "PoppinsBold",
    color: "white",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    padding: 10,
    fontFamily: "PoppinsRegular",
  },
  selectList: {
    marginBottom: 20,
  },
  search: {
    marginTop: 10,
  },
  date: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  fromdate: {
    flex: 1,
    marginRight: 5,
  },
  todate: {
    flex: 1,
    marginLeft: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});

export default DashboardScreen;
