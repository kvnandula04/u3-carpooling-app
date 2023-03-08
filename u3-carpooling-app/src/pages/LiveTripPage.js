import {
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState, useCallback } from "react";
import GridBackground from "../../assets/grid-background";
import LiveMap from "../components/LiveMap";
import LiveTripDuration from "../components/LiveTripDuration";
import LiveETA from "../components/LiveETA";
import LiveToPickup from "../components/LiveToPickup";
import UseFonts from "../hooks/UseFonts";
import { useNavigation } from "@react-navigation/native";

const cream = "#F7F3EB";
const green = "#4CD835";
const greenShadow = "#278A17";
const charcoal = "#3F3F3F";
const black = "#272727";

export default function LiveTripPage() {
  const navigation = useNavigation();

  const [inFocus, setInFocus] = useState([1, 0, 0, 0]);
  const [IsReady, SetIsReady] = useState(false);

  const onPressMap = () => {
    setInFocus([1, 0, 0, 0]);
    if (inFocus[0] === 1)
      console.log("Map Pressed to Open Page"); // fullscreen map
    else console.log("Map Pressed to Focus Component"); // focus map
  };
  const onPressDur = () => {
    setInFocus([0, 1, 0, 0]);
  };
  const onPressETA = () => {
    setInFocus([0, 0, 1, 0]);
  };
  const onPressPick = () => {
    setInFocus([0, 0, 0, 1]);
  };
  const onPressReport = () => {
    navigation.navigate("ArrivedPage");
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
    <View id="pageFrame" style={styles.pageFrame}>
      <GridBackground
        lineColor={cream}
        style={{
          position: "absolute",
          zIndex: -5,
          backgroundColor: "#272727",
        }}
      />
      <View id="cardFrame" style={styles.cardFrame}>
        <LiveMap
          style={inFocus[0] === 1 ? styles.selected : styles.notSelected}
          colour={green}
          shadow={greenShadow}
          cardStyle={{
            width: "100%",
            height: "145%",
            marginBottom: 5,
            borderColor: green,
            borderWidth: 5,
            borderRadius: 32,
            overflow: "hidden",
          }}
          shadowStyle={{
            zIndex: -1,
            position: "absolute",
            top: 6,
            left: 6,
            backgroundColor: greenShadow,
            borderColor: greenShadow,
          }}
          text="U3"
          fontFamily="syne-bold"
          fontSize={48}
          onPress={onPressMap}
        />
        <LiveTripDuration
          style={inFocus[1] === 1 ? styles.selected : styles.notSelected}
          onPress={onPressDur}
        />
        <LiveETA
          style={inFocus[2] === 1 ? styles.selected : styles.notSelected}
          onPress={onPressETA}
        />
        <LiveToPickup
          style={inFocus[3] === 1 ? styles.selected : styles.notSelected}
          onPress={onPressPick}
        />
      </View>
      <View id="reportFrame" style={styles.reportFrame}>
        <Pressable
          id="reportButton"
          style={styles.reportButton}
          onPress={onPressReport}
        >
          <Text style={[styles.reportText, { fontFamily: "atkinson" }]}>
            Report
          </Text>
          <Text style={[styles.reportText, { fontFamily: "atkinson-regular" }]}>
            {" "}
            Misconduct
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageFrame: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: black,
  },
  cardFrame: {
    flex: 6,
    alignSelf: "center",
    width: "85%",
    marginTop: "15%",
    // backgroundColor: "red",
  },
  selected: {
    flex: 5,
  },
  notSelected: {
    flex: 2,
  },
  reportFrame: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  reportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "7%",
    // backgroundColor: "blue",
  },
  reportText: {
    fontSize: 32,
    fontWeight: "300",
    fontStyle: "italic",
    color: cream,
  },
});
