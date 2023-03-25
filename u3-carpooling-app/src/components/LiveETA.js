import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useSelector, useDispatch } from "react-redux";

const cream = "#F7F3EB";
const blue = "#1774FF";
const charcoal = "#3F3F3F";

const LiveETA = (props) => {
  const [IsReady, SetIsReady] = useState(false);

  const dispatch = useDispatch();
  const gETA = useSelector((state) => state.mySlice.gETA);

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
      <Text id="arrivalTime" style={[styles.time, {marginBottom: "-15%"}]}>
        {Math.trunc(gETA)}m
      </Text>
      <Text id="arrivalTime" style={[styles.time]}>
        {(gETA * 100) % 100}s
      </Text>
    </Pressable>
  );
};

export default LiveETA;

const styles = StyleSheet.create({
  frame: {
    alignItems: "flex-end",
  },
  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: blue,
    borderColor: charcoal,
    borderWidth: 5,
    borderRadius: 32,
    // borderBottomLeftRadius: 0,
    // borderBottomRightRadius: 0,
  },
  shadow: {
    backgroundColor: "black",
    borderColor: "black",
    top: 6,
    left: 6,
  },
  title: {
    color: cream,
    fontSize: 64,
    position: "absolute",
    bottom: 0,
    left: 20,
    fontFamily: "atkinson-regular",
  },
  time: {
    flex: 1,
    color: cream,
    fontSize: 64,
    fontFamily: "atkinson-italic",
    fontWeight: "300",
    fontStyle: "italic",
    lineHeight: 94,
    paddingRight: "5%",
    // backgroundColor: "red",
  },
});
