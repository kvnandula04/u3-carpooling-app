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

export default function StudentVerification() {
  const navigation = useNavigation();
  const onSigninPressed = () => {
    navigation.navigate("DriverVerification");
  };

  return (
    <View style={styles.container}>
      <Logo color="white" fontSize="40" />
      <Text style={styles.heading}>Student{"\n"}Verification</Text>
      <Pressable style={styles.button} onPress={onSigninPressed}>
        <Text style={styles.text}>UoB Sign In</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1daf59",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontFamily: "atkinson-italic",
    fontSize: 54,
    marginTop: 50,
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
    textAlign: "center",
  },
  button: {
    width: 250,
    height: 80,
    marginTop: 70,
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
    backgroundColor: "#ffb800",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontFamily: "atkinson",
    color: "#1774ff",
  },
});
