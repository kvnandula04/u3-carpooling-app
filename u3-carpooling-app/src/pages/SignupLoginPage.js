import React, { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import useFonts from "../hooks/UseFonts";
import Logo from "../components/Logo";
import { useNavigation } from "@react-navigation/native";

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
    <View style={styles.container}>
      <Logo fontSize="86" />
      <Text style={styles.heading}>Student{"\n"}Car Pooling</Text>
      <Pressable style={styles.button} onPress={onSignupPressed}>
        <Text style={styles.text}>Join.</Text>
      </Pressable>
      <TouchableOpacity>
        <Text style={styles.signinBtn}>sign in.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f3eb",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginTop: -150,
  },
  heading: {
    fontFamily: "syne",
    fontSize: 40,
    marginTop: 50,
    shadowColor: "#3dd37a",
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
    marginTop: 100,
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
    backgroundColor: "#3dd37a",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 36,
    fontFamily: "atkinson",
    color: "white",
  },
  signinBtn: {
    fontFamily: "atkinson",
    fontSize: 24,
    marginTop: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});
