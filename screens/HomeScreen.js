import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

const locations = ["Chennai", "Trichy", "Muhavur", "Thaeni"];

const LocationSelect = ({ label, selectedValue, onValueChange }) => (
  <View style={styles.newUserItem}>
    <Text style={styles.label}>{label}:</Text>
    <Picker
      selectedValue={selectedValue}
      style={styles.homeSelect}
      onValueChange={onValueChange}
    >
      {locations.map((location, index) => (
        <Picker.Item key={index} label={location} value={location} />
      ))}
    </Picker>
  </View>
);

const IconSwap = () => (
  <View style={styles.swapIcon}>
    <Ionicons name="swap-horizontal" size={24} color="black" />
  </View>
);

const { width, height } = Dimensions.get("window");

const Home = () => {
  const [fromLocation, setFromLocation] = React.useState(locations[0]);
  const [toLocation, setToLocation] = React.useState(locations[1]);
  const [mode, setMode] = React.useState(locations[0]);
  const [status, setStatus] = React.useState(locations[0]);

  return (
    <ScrollView contentContainerStyle={styles.homeContainer}>
      <View style={styles.homeContent}>
        <Text style={styles.title}>
          Find your next travel companion right here!
        </Text>
        <View style={styles.homeSuggestions}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Text key={i} style={styles.suggestionText}>
              Show me travelers going to Mumbai
            </Text>
          ))}
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputRight}>
            {Array.from({ length: 2 }).map((_, i) => (
              <View key={i} style={styles.inputGroup}>
                <LocationSelect
                  label="From"
                  selectedValue={fromLocation}
                  onValueChange={setFromLocation}
                />
                <IconSwap />
                <LocationSelect
                  label="To"
                  selectedValue={toLocation}
                  onValueChange={setToLocation}
                />
              </View>
            ))}
          </View>
          <View style={styles.inputLeft}>
            <LocationSelect
              label="Mode"
              selectedValue={mode}
              onValueChange={setMode}
            />
            <LocationSelect
              label="Status"
              selectedValue={status}
              onValueChange={setStatus}
            />
          </View>
          <TouchableOpacity style={styles.homeSearchButton}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#e0f7ff",
    width: "100%",
    minHeight: height, // Adjusting for full viewport height
    maxWidth: 1400,
    margin: "0 auto",
    padding: 20, // Added padding for better spacing
  },
  homeContent: {
    justifyContent: "center",
    alignItems: "center",
    height: "auto", // Allow height to adjust based on content
    textAlign: "center",
    width: "100%",
  },
  title: {
    fontSize: width > 600 ? 24 : 20, // Responsive font size
    margin: 20,
    color: "#333",
  },
  homeSuggestions: {
    justifyContent: "center",
    width: "100%", // Full width for suggestions
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 20,
  },
  suggestionText: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    fontSize: width > 600 ? 16 : 14, // Responsive font size
    margin: 5,
    color: "#555",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between", // Changed to space-between for better spacing
    marginTop: 20,
  },
  inputRight: {
    flex: 1,
    marginRight: 5, // Reduced margin for better spacing
  },
  inputLeft: {
    flex: 1,
    marginLeft: 5, // Reduced margin for better spacing
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  newUserItem: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    width: "100%",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  homeSelect: {
    width: "100%",
    padding: 10,
    borderRadius: 4,
    fontSize: width > 600 ? 16 : 14, // Responsive font size
    color: "#555",
  },
  swapIcon: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  homeSearchButton: {
    backgroundColor: "#0061d2",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: width > 600 ? 16 : 14, // Responsive font size
    fontWeight: "bold",
  },
});

export default Home;
