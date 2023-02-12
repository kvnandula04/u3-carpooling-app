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
import GridBackground from "../../assets/grid-background";

export default function DriverVerification() {
  const navigation = useNavigation();
  const [text, setText] = React.useState("");

  return (
    <View>
      <GridBackground
        lineColor={"black"}
        style={{ backgroundColor: "#2e73da" }}
      />
      <Text
        style={{
          color: "#f7f3eb",
          fontSize: 40,
          lineHeight: 0,
          fontFamily: "syne",
          top: 100,
          left: 0,
          right: 50,
          bottom: 0,
          position: "absolute",
          alignContent: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        U
      </Text>
      <Text
        style={{
          color: "#f7f3eb",
          fontSize: 40,
          lineHeight: -10,
          fontFamily: "syne",
          top: 100,
          left: 50,
          right: 0,
          bottom: 0,
          position: "absolute",
          alignContent: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        3
      </Text>
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>skip.</Text>
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
    position: "absolute",
    top: 320,
    left: 0,
    bottom: 0,
    right: 0,
    fontFamily: "atkinson-italic",
    fontSize: 54,
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
    alignItems: "center",
    textAlign: "center",
  },
  subheading: {
    position: "absolute",
    top: 450,
    left: 0,
    bottom: 0,
    right: 0,
    fontFamily: "atkinson-italic",
    fontSize: 24,
    color: "#f7f3eb",
    lineHeight: 53,
    justifyContent: "center",
    textAlign: "center",
  },
  textInput: {
    position: "absolute",
    top: 500,
    left: 90,
    bottom: 0,
    right: 0,
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
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  text: {
    fontSize: 24,
    fontFamily: "atkinson-italic",
    color: "#f7f3eb",
  },
  button: {
    position: "absolute",
    top: 680,
    left: 172,
    bottom: 0,
    right: 0,
    width: "20%",
    height: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  text2: {
    fontFamily: "atkinson",
    fontSize: 24,
    color: "#f7f3eb",
  },
});
