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
import { Icon } from "react-native-elements";
import RestAPI from "../hooks/Rest";

export default function PlanTrip() {
  const [IsReady, SetIsReady] = useState(false);
  const bottomSheetRef = useRef(BottomSheet);
  const snapPoints = useMemo(() => ["90%", "25%"], []);
  const navigation = useNavigation();
  const onMatchMePressed = () => {
    navigation.navigate("LiveTripPage");
  };

  const [startLocation, setStartLocation] = useState();
  const [destination, setDestination] = useState();
  const [result, setResult] = useState([]);

  let data = { sdf: "sdf" };
  let poolID, licenceID;

  RestAPI({ operation: "select", table: "Pool", poolID: "1" }).then((res) => {
    console.log("RES: ", res);
    poolID = parseInt(res.poolID, 10);
    licenceID = parseInt(res.licenceID, 10);
    // Object.assign(res, data);
  });
  // console.log("PLAN TRIP DATA: ", data);
  console.log("poolID: ", poolID);
  console.log("licenceID: ", licenceID);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operation: "select",
      table: "Pool",
      poolID: "1",
    }),
  };

  function onPlaceSelected(data, details = null, isDestination) {
    const pos = {
      latitude: details?.geometry.location.lat,
      longitude: details?.geometry.location.lng,
    };
    isDestination ? setDestination(pos) : setStartLocation(pos);
  }

  // useEffect(() => {
  //   console.log(startLocation);
  // }, [startLocation]);

  // useEffect(() => {
  //   console.log(destination);
  // }, [destination]);

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
          <Icon
            style={styles.settingsIcon}
            name="tune"
            color="#000"
            size={50}
          />
        </View>
      </View>

      <View style={styles.flex2}>
        <Text> {result} </Text>
        <View id="whereFrame" style={styles.planTripFrame}>
          <View id="whereCard" style={styles.planTripCard}>
            <View id="whereTitleView" style={styles.planTripTitleView}>
              <Text style={styles.planTripTitle}>Where?</Text>
            </View>
            <View id="startAndDestination" style={styles.planList}>
              <View style={styles.planListColumn}>
                {/* <Text style={styles.bodyBoldItalic}>Start location: </Text> */}
                <View id="start" style={styles.searchContainer}>
                  <InputAutocomplete
                    id="startLocationInput"
                    onPlaceSelected={onPlaceSelected}
                    isDestination={false}
                    text="Where from?"
                  />
                </View>
              </View>
              <View style={styles.planListColumn}>
                {/* <Text style={styles.bodyBoldItalic}>Destination: </Text> */}
                <View id="destination" style={styles.searchContainer2}>
                  <InputAutocomplete
                    onPlaceSelected={onPlaceSelected}
                    isDestination={true}
                    text="Where to?"
                  />
                </View>
              </View>
            </View>
          </View>
          <View
            id="planTripShadow"
            style={[styles.planTripCard, styles.planTripShadow]}
          />
        </View>
      </View>

      <View style={[styles.flex2, { backgroundColor: "purple" }]}>
        <View id="whenFrame" style={styles.planTripFrame}>
          <View id="whenCard" style={styles.planTripCard}>
            <View id="whenTitleView" style={styles.planTripTitleView}>
              <Text style={styles.planTripTitle}>When?</Text>
            </View>
            <View id="startDestination" style={styles.planList}>
              <View style={styles.planListColumn}>
                <Text style={styles.bodyBoldItalic}>Leaving: </Text>
              </View>
              <View style={styles.planListColumn}>
                <Text style={styles.bodyBoldItalic}>Arriving: </Text>
              </View>
            </View>
          </View>
          <View
            id="planTripShadow"
            style={[styles.planTripCard, styles.planTripShadow]}
          />
          <View id="matchMeButton" style={styles.matchMeButton}>
            <Pressable onPress={onMatchMePressed}>
              <Text style={styles.matchMeButtonText}>Match me</Text>
            </Pressable>
          </View>
          <View
            id="matchMeButtonShadow"
            style={[styles.matchMeButton, styles.matchMeButtonShadow]}
          />
        </View>
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
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
  },
  settingsIcon: {
    marginTop: "15%",
    marginRight: "20%",
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
  planTripFrame: {
    width: "80%",
    height: "80%",
    // backgroundColor: "#f7f3eb",
  },
  planTripCard: {
    width: "100%",
    height: "100%",
    borderRadius: 32,
    borderColor: "#000",
    borderWidth: 5,
    backgroundColor: "#fff",
  },
  planTripTitle: {
    fontFamily: "syne-bold",
    fontSize: 32,
    color: "#ffb800",
    textDecorationLine: "underline",
  },
  planTripShadow: {
    zIndex: -1,
    backgroundColor: "#000",
    position: "absolute",
    top: 6,
    left: 6,
  },
  matchMeButton: {
    width: "45%",
    height: "30%",
    position: "absolute",
    bottom: -15,
    right: -15,
    backgroundColor: "#efece8",
    borderWidth: 5,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  matchMeButtonText: {
    fontFamily: "syne-bold",
    fontSize: 20,
    color: "#9747ff",
  },
  matchMeButtonShadow: {
    zIndex: -1,
    backgroundColor: "#000",
    position: "absolute",
    bottom: -20,
    right: -20,
  },
  planTripTitleView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: "7%",
    marginTop: "3%",
  },
  planList: {
    flex: 2.5,
    flexDirection: "column",
    marginLeft: "5%",
  },
  planListColumn: {
    flex: 1,
  },
  bodyBoldItalic: {
    fontFamily: "atkinson-italic",
    fontSize: 18,
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 5,
    padding: 8,
    borderRadius: 8,
  },
  searchContainer2: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 5,
    padding: 8,
    borderRadius: 8,
  },
});
