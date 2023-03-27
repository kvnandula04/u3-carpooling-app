import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import * as SplashScreen from "expo-splash-screen";
import { Text, View, StyleSheet, Pressable, Alert } from "react-native";
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
import { useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { updateUserRole } from "../../globalVariables/mySlice";
import PoolsPage from "./PoolsPage";
import Logo from "../components/Logo";

const cream = "#F7F3EB";
const yellow = "#FFB800";
const green = "#4CD835";
const greenShadow = "#278A17";
const charcoal = "#3F3F3F";
const black = "#272727";
const blue = "#1774ff";

export default function HomePage() {
  const [role, setRole] = useState(myUserRole);
  const [IsReady, SetIsReady] = useState(false);
  const navigation = useNavigation();

  const [alreadyRun, setAlreadyRun] = useState(false);

  let messagePage = null;

  const [preferences, setPreferences] = useState({
    location: "53 Hungerford Rd",
    destination: "University of Bath",
    departure_time: "9:45",
    arrival_time: "10:05",
    detour_distance: "2",
    rating: "5",
    seats: "1",
    prePage: false,
  });

  const route = useRoute();
  if (!route.IsReady) {
    messagePage = route.params;
    if (messagePage !== undefined) {
      if (alreadyRun === false && messagePage.messagePage.prePage === false) {
        setPreferences({
          ...preferences,
          detour_distance: messagePage.messagePage.detour_distance,
          rating: messagePage.messagePage.rating,
          seats: messagePage.messagePage.seats,
        });

        messagePage = undefined;
        setAlreadyRun(true);
      }
    }
  }

  var new_preferences = preferences;

  useEffect(() => {
    new_preferences = preferences;
  }, [preferences]);

  const myUserRole = useSelector((state) => state.mySlice.myUserRole);
  const dispatch = useDispatch();

  const snapPoints = useMemo(() => ["85%", "10%"], []);
  const bottomSheetRef = useRef(BottomSheet);

  const onPressSwitch = () => {
    //global variable - stores user role
    dispatch(updateUserRole((myUserRole + 1) % 2));
    setRole(myUserRole);
    Alert.alert("Switched to " + (myUserRole === 0 ? "Driver" : "Passenger"));
  };
  const onPressProfile = () => {
    navigation.navigate("ProfilePage");
  };
  const onPressMap = () => {
    navigation.navigate("LiveMap");
  };
  const onPressPrefer = () => {
    preferences.prePage = true;
    navigation.navigate("Preferences", { message: preferences });
    setAlreadyRun(false);
  };

  const onPressPool = () => {
    navigation.navigate("LiveTripPage");
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

  let mainColour = cream;
  let secondColour = yellow;
  let switchIcon = "directions-car";
  if (myUserRole === 0) {
    mainColour = yellow;
    secondColour = cream;
    switchIcon = "airline-seat-recline-normal";
  } else {
    mainColour = cream;
    secondColour = yellow;
    switchIcon = "directions-car";
  }

  return (
    <View style={styles.container}>
      <GridBackground
        position="absolute"
        zIndex={-5}
        lineColor={mainColour}
        style={{ backgroundColor: secondColour }}
      />

      <SafeAreaView style={styles.headerFrame}>
        <Pressable
          id="spacer"
          style={[styles.profileButton, { marginLeft: "-3%" }]}
          onPress={onPressSwitch}
        >
          <Icon
            // style={{  marginBottom: -10}}
            name={switchIcon}
            color="#000"
            size={50}
          />
        </Pressable>
        <Logo fontSize={65} color={"#000"} />
        <Pressable
          id="profile"
          style={[styles.profileButton, { marginRight: "-3%" }]}
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
            onPress={onPressMap}
            showRoute={false}
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
          <PlanTrip preferenceData={new_preferences} />
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
            <Text
              style={[styles.tripHistoryTitle, styles.tripHistoryTitleShadow]}
            >
              My Pools
            </Text>
            <Text style={styles.tripHistoryTitle}>My Pools</Text>
          </View>
          <PoolsPage />
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
    flex: 0.6,
    flexDirection: "row",
    marginBottom: "-7%",
    // backgroundColor: "red",
  },
  profileButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: "2%",
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
    flex: 1.8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%",
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
    marginBottom: "3%",
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
    borderColor: green,
    borderWidth: 5,
    borderRadius: 32,
    overflow: "hidden",
  },
  shadowStyle: {
    zIndex: -1,
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: greenShadow,
    borderColor: greenShadow,
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
  },
  tripHistoryTitleView: {
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "center",
    width: "70%",
    height: "20%",
    // backgroundColor: "black",
  },
  tripHistoryTitle: {
    position: "absolute",
    fontFamily: "syne",
    fontSize: 34,
    marginTop: "7%",
    color: blue,
    lineHeight: 35,
  },
  tripHistoryTitleShadow: {
    position: "absolute",
    top: 4,
    color: yellow,
    marginTop: "7%",
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
    borderColor: blue,
    backgroundColor: "black",
    color: "black",
    borderWidth: 5,
    overflow: "hidden",
  },
  bottomSheetHandle: {
    backgroundColor: blue,
    width: 70,
    height: 5,
    borderRadius: 5,
    color: "black",
  },
});
