import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";

const cream = "#F7F3EB";
const blue = "#1774FF";
const charcoal = "#3F3F3F";

const LiveETA = (props) => {
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

  var arrivalTime = "12:43";

  return (
    <Pressable style={[props.style, styles.frame]} onPress={props.onPress}>
      <View id="card" style={[styles.card, styles.shadow]}></View>
      <View id="cardShadow" style={[styles.card]}></View>
      <Text id="title" style={[styles.title]}>
        eta.
      </Text>
      <Text id="arrivalTime" style={[styles.time]}>
        {arrivalTime}
      </Text>
    </Pressable>
  );
};

export default LiveETA;

const styles = StyleSheet.create({
  frame: {},
  card: {
    position: "absolute",
    width: "100%",
    height: "125%",
    backgroundColor: blue,
    borderColor: charcoal,
    borderWidth: 5,
    borderRadius: 32,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  shadow: {
    backgroundColor: "black",
    borderColor: "black",
    top: 6,
    left: 6,
  },
  title: {
    color: cream,
    fontSize: 36,
    position: "absolute",
    bottom: 0,
    left: 20,
    fontFamily: "atkinson-regular",
  },
  time: {
    color: cream,
    fontSize: 64,
    fontFamily: "atkinson-italic",
    fontWeight: "300",
    fontStyle: "italic",
    position: "absolute",
    top: 0,
    right: 20,
  },
});
