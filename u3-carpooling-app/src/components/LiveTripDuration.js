import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";

const cream = "#F7F3EB";
const orange = "#FFB36D";
const charcoal = "#3F3F3F";

const LiveTripDuration = (props) => {
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

  var minutes = 12;
  var seconds = 43;

  return (
    <Pressable
      id="frame"
      style={[props.style, styles.frame]}
      onPress={props.onPress}
    >
      <View id="cardShadow" style={[styles.card, styles.shadow]}></View>
      <View id="card" style={[styles.card]}></View>
      <Text id="title" style={[styles.title]}>
        trip length.
      </Text>

      <Text id="minutesShadow" style={[styles.minutes, styles.minutesShadow]}>
        {minutes} mins
      </Text>
      <Text id="minutes" style={[styles.minutes]}>
        {minutes} mins
      </Text>

      <Text id="secondsShadow" style={[styles.seconds, styles.secondsShadow]}>
        {seconds} seconds
      </Text>
      <Text id="seconds" style={[styles.seconds]}>
        {seconds} seconds
      </Text>
    </Pressable>
  );
};

export default LiveTripDuration;

const styles = StyleSheet.create({
  frame: {},
  card: {
    position: "absolute",
    width: "100%",
    height: "125%",
    backgroundColor: cream,
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
    color: charcoal,
    fontSize: 36,
    position: "absolute",
    bottom: 0,
    left: 20,
    fontFamily: "atkinson-regular",
  },
  minutes: {
    color: charcoal,
    fontSize: 48,
    position: "absolute",
    top: 0,
    right: 20,
    fontFamily: "syne-bold",
  },
  minutesShadow: {
    color: orange,
    top: 2,
    right: 20,
  },
  seconds: {
    color: charcoal,
    fontSize: 24,
    position: "absolute",
    top: 40,
    right: 20,
    fontFamily: "syne-bold",
  },
  secondsShadow: {
    color: orange,
    top: 42,
    right: 20,
  },
});
