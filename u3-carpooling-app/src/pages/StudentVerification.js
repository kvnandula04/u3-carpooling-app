import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../components/Logo";
import GridBackground from "../../assets/grid-background";
import { Circle } from "react-native-svg";

export default function StudentVerification() {
  const navigation = useNavigation();
  const onSigninPressed = () => {
    navigation.navigate("DriverVerification");
  };

  return (
    <View>
      <GridBackground
        lineColor={"black"}
        style={{ backgroundColor: "#1daf59" }}
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
      <Text style={styles.heading}>Student{"\n"}Verification</Text>
      <Pressable style={styles.button} onPress={onSigninPressed}>
        <Text style={styles.text}>UoB Sign In</Text>
      </Pressable>
      <View style={styles.circle1}></View>
      <View style={styles.circle2}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    position: "absolute",
    top: 320,
    left: 0,
    bottom: 0,
    right: 0,
    fontFamily: "atkinson-italic",
    fontSize: 54,
    color: "#f7f3eb",
    lineHeight: 53,
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
  },
  button: {
    position: "absolute",
    top: 500,
    left: 90,
    bottom: 0,
    right: 0,
    width: 250,
    height: 80,
    borderRadius: 32,
    borderColor: "#000000",
    borderWidth: 5,
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    backgroundColor: "#ffb800",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontFamily: "atkinson",
    color: "#1774ff",
  },
  circle1: {
    position: "absolute",
    bottom: 50,
    left: 182,
    width: 30,
    height: 30,
    borderRadius: 1000,
    borderWidth: 6,
    borderColor: "#000000",
    backgroundColor: "#ffb800",
    justifyContent: "center",
    alignItems: "center",
  },
  circle2: {
    position: "absolute",
    bottom: 50,
    left: 220,
    width: 30,
    height: 30,
    borderRadius: 1000,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
});
