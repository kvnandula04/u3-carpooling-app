import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../components/Logo";

export default function DriverVerification() {
  const navigation = useNavigation();
  const [text, setText] = React.useState("");

  return (
    <View style={styles.container}>
      <Logo color="white" fontSize="40" />
      <Text style={styles.heading}>Be a{"\n"}Driver?</Text>
      <Text style={styles.subheading}> Enter your car's number plate: </Text>
      <View style={styles.textInput}>
        <TextInput
          style={styles.text}
          placeholder="AB12 CDE"
          value={text}
          onChangeText={(text) => setText(text)}
        ></TextInput>
      </View>
      <TouchableOpacity>
        <Text style={styles.skipBtn}>skip.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2e73da",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontFamily: "atkinson-italic",
    fontSize: 54,
    marginTop: 50,
    color: "#ffb800",
    lineHeight: 53,
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    justifyContent: "center",
    textAlign: "center",
  },
  subheading: {
    fontFamily: "atkinson-italic",
    fontSize: 24,
    marginTop: 30,
    color: "#f7f3eb",
    lineHeight: 53,
    justifyContent: "center",
    textAlign: "center",
  },
  textInput: {
    width: 250,
    height: 80,
    borderRadius: 32,
    borderColor: "black",
    borderWidth: 5,
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    backgroundColor: "#f55726",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontFamily: "atkinson-italic",
    color: "#f7f3eb",
  },
  skipBtn: {
    fontFamily: "atkinson",
    fontSize: 24,
    color: "#f7f3eb",
    marginTop: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});
