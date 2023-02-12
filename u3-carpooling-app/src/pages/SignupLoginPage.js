import React, { useState, useEffect, useCallback } from "react";
import useFonts from "../hooks/UseFonts";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Logo from "../components/Logo";

export default function SignupLoginPage() {
  const [IsReady, SetIsReady] = useState(false);

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
      <Logo />
      <Text style={styles.heading}>Student{"\n"}Car Pooling</Text>
      <Pressable style={styles.button}>
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
    fontWeight: "750",
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
