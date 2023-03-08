import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import ProfileCircle from "./ProfileCircle";

const charcoal = "#3F3F3F";
const yellow = "#EBB017";
const purple = "#C293FF";
const purpleShadow = "#9747FF";

const LiveToPickup = (props) => {
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
    <Pressable style={[props.style, styles.frame]} onPress={props.onPress}>
      <View style={[styles.card, styles.shadow]}></View>
      <View style={[styles.card]}></View>
      <Text style={[styles.text]}>to pick up.</Text>
      <View
        style={{
          marginTop: 10,
          marginRight: 15,
          margin: 20,
          flex: 1,
          // backgroundColor: "white",
        }}
      >
        <ProfileCircle
          picture={styles.picture}
          circle={styles.circle}
          circleShadow={styles.circleShadow}
        />
      </View>
    </Pressable>
  );
};

export default LiveToPickup;

const styles = StyleSheet.create({
  frame: {},
  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: yellow,
    borderColor: purple,
    borderWidth: 5,
    borderRadius: 32,
  },
  shadow: {
    backgroundColor: purpleShadow,
    borderColor: purpleShadow,
    top: 6,
    left: 6,
  },
  text: {
    color: charcoal,
    fontSize: 36,
    position: "absolute",
    bottom: 10,
    left: 20,
    fontFamily: "atkinson-regular",
  },
  picture: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 1000,
    top: 5,
    right: 5,
    backgroundColor: "white",
  },
  circle: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 1000,
    right: 0,
    backgroundColor: purple,
  },
  circleShadow: {
    right: -4,
    top: 4,
    backgroundColor: purpleShadow,
  },
});
