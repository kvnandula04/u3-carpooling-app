import React, { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import useFonts from "../hooks/UseFonts";
import Logo from "../components/Logo";
import { useNavigation } from "@react-navigation/native";
import GridBackground from "../../assets/grid-background";

export default function SignupLoginPage() {
  const [IsReady, SetIsReady] = useState(false);
  const navigation = useNavigation();
  const onSignupPressed = () => {
    navigation.navigate("StudentVerification");
  };

  useEffect(() => {
    async function prepare() {
      try {
        await useFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        SetIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (IsReady) {
      await SplashScreen.hideAsync();
    }
  }, [IsReady]);

  if (!IsReady) {
    return null;
  }

  return (
    <View>
      <GridBackground
        lineColor={"black"}
        style={{ backgroundColor: "#f7f3eb" }}
      />
      <Text
        style={{
          color: "#000000",
          fontSize: 86,
          lineHeight: 0,
          fontFamily: "syne",
          top: 150,
          left: 0,
          right: 100,
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
          color: "#000000",
          fontSize: 86,
          lineHeight: -10,
          fontFamily: "syne",
          top: 150,
          left: 100,
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
      <Text style={styles.heading}>Student{"\n"}Car Pooling</Text>
      <Pressable style={styles.button} onPress={onSignupPressed}>
        <Text style={styles.text}>Join.</Text>
      </Pressable>
      <TouchableOpacity style={styles.button2} onPress={onSignupPressed}>
        <Text style={styles.text2}>sign in.</Text>
      </TouchableOpacity>
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
    fontFamily: "syne",
    fontSize: 40,
    shadowColor: "#3dd37a",
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
    backgroundColor: "#3dd37a",
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  text: {
    fontSize: 36,
    fontFamily: "atkinson",
    color: "#ffffff",
  },
  button2: {
    position: "absolute",
    top: 680,
    left: 172,
    bottom: 0,
    right: 0,
    width: "20%",
    height: "5%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  text2: {
    fontSize: 24,
    fontFamily: "atkinson",
  },
});
