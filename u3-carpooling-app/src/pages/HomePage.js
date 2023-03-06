import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import * as SplashScreen from "expo-splash-screen";
import { Text, View, StyleSheet, Pressable } from "react-native";
import useFonts from "../hooks/UseFonts";
import Logo from "../components/Logo";
import GridBackground from "../../assets/grid-background";
import InputAutocomplete from "../components/InputAutocomplete";
import LiveMap from "../components/LiveMap";
import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";

export default function HomePage() {
  const [IsReady, SetIsReady] = useState(false);
  const bottomSheetRef = useRef(BottomSheet);
  const snapPoints = useMemo(() => ["90%", "30%"], []);
  const navigation = useNavigation();
  const onOffersPressed = () => {
    navigation.navigate("LiveTripPage");
  };
  const onPoolsPressed = () => {
    navigation.navigate("LiveTripPage");
  };
  const onPlanTripPressed = () => {
    navigation.navigate("PlanTrip");
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

      <View style={styles.flex1}>
        <View id="empty" style={styles.flexInner1} />
        <View if="logo" style={styles.flexInner2}>
          <Logo fontSize={64} color={"#000"} marginTop={"5%"} />
        </View>
        <View id="profile" style={styles.flexInner3}>
          <Text style={styles.profileText}>Me.</Text>
        </View>
      </View>

      <View style={styles.flex2}>
        <View style={styles.flexInner21}>
          <View id="offerButton" style={styles.button}>
            <Pressable onPress={onOffersPressed}>
              <Text style={styles.text2}>My Offers & Requests</Text>
            </Pressable>
          </View>
          <View style={[styles.button, styles.shadow]} />
        </View>
        <View style={styles.flexInner22}>
          <View id="poolsButton" style={styles.button}>
            <Pressable onPress={onPoolsPressed}>
              <Text style={styles.text2}>My Pools</Text>
            </Pressable>
          </View>
          <View style={[styles.button, styles.shadow]} />
        </View>
        <View style={styles.flexInner23}>
          <View id="planTripButton" style={styles.button}>
            <Pressable onPress={onPlanTripPressed}>
              <Text style={styles.text2}>Plan a Trip</Text>
            </Pressable>
          </View>
          <View style={[styles.button, styles.shadow]} />
        </View>
      </View>

      <View style={styles.flex3}></View>

      <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
        <View id="tripHistoryCard" style={styles.tripHistoryCard}>
          <View id="tripHistoryTitleView" style={styles.tripHistoryTitleView}>
            <Text style={styles.tripHistoryTitle}>Trip history</Text>
          </View>
          <View style={styles.tripHistoryTitleViewInner}>
            <Text style={styles.tripHistoryTitleViewInnerHeading}>
              Friday 9th December 2022
            </Text>
            <Text style={styles.tripHistoryTitleViewInnerBody}>
              10:30 @ University of Bath
            </Text>
            <Text style={styles.tripHistoryTitleViewInnerBody}>
              Picked up by Richard
            </Text>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex1: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "red",
  },
  flexInner1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    // backgroundColor: "blue",
  },
  flexInner2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "green",
  },
  flexInner3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    // backgroundColor: "yellow",
  },
  flex2: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "orange",
  },
  flexInner21: {
    flex: 1,
    width: "80%",
    // backgroundColor: "purple",
  },
  flexInner22: {
    flex: 1,
    width: "80%",
    // backgroundColor: "pink",
  },
  flexInner23: {
    flex: 1,
    width: "80%",
    // backgroundColor: "brown",
  },
  flex3: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  profileText: {
    fontFamily: "atkinson-italic",
    fontSize: 34,
    marginTop: "15%",
    marginRight: "15%",
  },
  text: {
    fontFamily: "syne-bold",
    fontSize: 18,
    color: "#000",
  },
  heading: {
    fontFamily: "atkinson-italic",
    fontSize: 54,
    color: "#f7f3eb",
    lineHeight: 53,
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    textAlign: "center",
  },
  button: {
    width: "100%",
    height: "65%",
    backgroundColor: "#efece8",
    borderWidth: 5,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  text2: {
    fontFamily: "syne-bold",
    fontSize: 25,
    color: "#9747ff",
  },
  shadow: {
    zIndex: -1,
    backgroundColor: "#000",
    position: "absolute",
    top: 6,
    left: 6,
  },
  body: {
    fontFamily: "atkinson-regular",
    fontSize: 18,
  },
  bodyBoldItalic: {
    fontFamily: "atkinson-italic",
    fontSize: 18,
  },
  tripHistoryCard: {
    width: "100%",
    height: "390%",
    borderRadius: 32,
    borderColor: "#000",
    borderWidth: 5,
    backgroundColor: "#fff",
  },
  tripHistoryTitleView: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tripHistoryTitle: {
    fontFamily: "syne",
    fontSize: 28,
    textDecorationLine: "underline",
    marginTop: "5%",
    color: "#1774ff",
  },
  tripHistoryTitleViewInner: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "5%",
  },
  tripHistoryTitleViewInnerHeading: {
    fontFamily: "atkinson-italic",
    fontSize: 22,
    color: "#000",
  },
  tripHistoryTitleViewInnerBody: {
    fontFamily: "atkinson-regular",
    fontSize: 20,
    color: "#000",
  },
});
