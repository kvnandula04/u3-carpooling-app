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
    <View style={styles.container}>
      <GridBackground
        position="absolute"
        zIndex={-5}
        lineColor={"black"}
        style={{ backgroundColor: "#f7f3eb" }}
      />

      <View id style={styles.flex1}>
        <Logo fontSize={86} marginTop={"15%"} />
      </View>

      <View id="headingAndJoin" style={styles.flex2}>
        <Text id="headingText" style={styles.heading}>
          Student{"\n"}Car Pooling
        </Text>
        <View id="joinFrame" style={styles.joinFrame}>
          <Pressable
            id="joinButton"
            style={styles.joinButton}
            onPress={onSignupPressed}
          >
            <Text style={styles.text}>Join.</Text>
          </Pressable>
          <View
            id="joinButtonShadow"
            style={[styles.joinButton, styles.joinButtonShadow]}
          ></View>
        </View>
      </View>

      <View style={styles.flex3}>
        <TouchableOpacity onPress={onSignupPressed}>
          <Text style={styles.text2}>sign in.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  flex2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "blue",
  },
  flex3: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "green",
  },
  heading: {
    fontFamily: "syne",
    fontSize: 40,
    shadowColor: "#3dd37a",
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    textAlign: "center",
  },
  joinFrame: {
    width: "40%",
    height: "30%",
    marginTop: "5%",
    // backgroundColor: "white",
  },
  joinButton: {
    width: "100%",
    height: "100%",
    borderRadius: 32,
    borderColor: "#000",
    borderWidth: 5,
    backgroundColor: "#3dd37a",
    justifyContent: "center",
    alignItems: "center",
  },
  joinButtonShadow: {
    zIndex: -1,
    position: "absolute",
    backgroundColor: "#000",
    top: 6,
    left: 6,
  },
  text: {
    fontSize: 36,
    fontFamily: "atkinson",
    color: "#ffffff",
  },
  text2: {
    fontSize: 24,
    fontFamily: "atkinson",
    marginTop: "15%",
  },
});
