import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import * as SplashScreen from "expo-splash-screen";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useFonts from "../hooks/UseFonts";
import GridBackground from "../../assets/grid-background";
import LiveMap from "../components/LiveMap";
import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import PlanTrip from "../components/PlanTrip";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import LiveTripPage from "./LiveTripPage";

export default function HomePage() {
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

  const [IsReady, SetIsReady] = useState(false);
  const bottomSheetRef = useRef(BottomSheet);
  const snapPoints = useMemo(() => ["90%", "10%"], []);
  const navigation = useNavigation();

  const onPressProfile = () => {
    navigation.navigate("ProfilePage");
  };
  const onPressPrefer = () => {
    navigation.navigate("Preferences");
  };

  const onPressPool = () => {
    navigation.navigate("LiveTripPage");
  };

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

      <SafeAreaView style={styles.headerFrame}>
        <View id="spacer" style={styles.profileButton}>
          <Icon style={styles.icon} name="person" color="#000" size={50} />
        </View>
        <View id="logo" style={{ flex: 2, alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "syne",
              fontSize: 64,
            }}
          >
            U3
          </Text>
        </View>
        <Pressable
          id="profile"
          style={styles.profileButton}
          onPress={onPressProfile}
        >
          <Text style={styles.profileText}>Me.</Text>
        </Pressable>
      </SafeAreaView>

      <View style={styles.mapFrame}>
        <View id="map" style={styles.flexInner22}>
          <LiveMap
            cardStyle={styles.cardStyle}
            shadowStyle={styles.shadowStyle}
          />
        </View>
      </View>

      <View id="planFrame" style={styles.planFrame}>
        <View id="preferFrame" style={styles.preferFrame}>
          <Pressable
            id="preferButton"
            style={styles.preferButton}
            onPress={onPressPrefer}
          >
            <Text id="preferText" style={styles.preferText}>
              Preferences
            </Text>
            <Icon style={styles.icon} name="settings" color="#000" size={30} />
          </Pressable>
        </View>
        <View id="planTripFrame" style={styles.planTripFrame}>
          <PlanTrip />
        </View>
      </View>

      <View style={styles.bottomSpacer}></View>

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
        handleIndicatorStyle={styles.bottomSheetHandle}
      >
        <View id="tripHistoryCard" style={styles.tripHistoryCard}>
          <View id="tripHistoryTitleView" style={styles.tripHistoryTitleView}>
            <Text style={styles.tripHistoryTitle}>My Pools</Text>
          </View>
          <TouchableOpacity onPress={onPressPool}>
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
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerFrame: {
    // flex: 0.75,
    width: "100%",
    height: 170,
    marginTop: "-5%",
    flexDirection: "row",
    // backgroundColor: "red",
  },
  profileButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: "3%",
    // backgroundColor: "green",
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
  mapFrame: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "purple",
  },
  flexInner21: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    // backgroundColor: "blue",
  },
  flexInner22: {
    flex: 6,
    width: "80%",
    marginTop: "-2%",
  },
  planFrame: {
    flex: 2,
  },
  preferFrame: {
    flex: 0.75,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: "-1%",
    // backgroundColor: "pink",
  },
  preferButton: {
    flex: 1,
    paddingHorizontal: "5%",
    marginTop: "1.5%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flexDirection: "row",
    // backgroundColor: "red",
  },
  preferText: {
    fontFamily: "syne-bold",
    fontSize: 20,
    // color: "#3DD37A",
    marginRight: "1%",
    bottom: "1%",
  },
  preferNotif: {
    width: 30,
    height: 30,
    borderRadius: 1000,
    backgroundColor: "#3dd37a",
    justifyContent: "center",
    alignItems: "center",
  },
  preferNotifText: {
    fontFamily: "atkinson-italic",
    fontSize: 18,
    color: "#000",
    textAlign: "center",
  },
  planTripFrame: {
    flex: 5,
    width: "90%",
    alignSelf: "center",
    // justifyContent: "center",
    // alignItems: "center",
  },
  bottomSpacer: {
    flex: 0.75,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    // backgroundColor: "pink",
  },
  profileText: {
    fontFamily: "atkinson-italic",
    fontSize: 34,
    // marginTop: "15%",
    // marginRight: "15%",
  },
  cardStyle: {
    width: "100%",
    height: "100%",
    borderColor: "#000",
    borderWidth: 5,
    borderRadius: 32,
    overflow: "hidden",
  },
  shadowStyle: {
    zIndex: -1,
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: "#000",
    borderColor: "#000",
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
  tripHistoryCard: {
    width: "100%",
    height: "390%",
    marginTop: -15,
    backgroundColor: "#fff",
  },
  tripHistoryTitleView: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tripHistoryTitle: {
    fontFamily: "syne",
    fontSize: 24,
    marginTop: "5%",
    color: "#1774ff",
    lineHeight: 30,
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
  bottomSheet: {
    borderRadius: 32,
    borderColor: "#000",
    backgroundColor: "#fff",
    borderWidth: 5,
    overflow: "hidden",
  },
  bottomSheetHandle: {
    backgroundColor: "#000",
    width: 70,
    height: 5,
    borderRadius: 5,
  },
});