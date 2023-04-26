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
    navigation.navigate("PoolsPage");
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

  function onMatchMePressed() {
    //Driver
    if (myUserRole === 1) {
      Alert.alert(
        "Offer Request",
        "Your request has been sent. We will match you with someone..."
      );
    }
    //Passenger
    else {
      Alert.alert(
        "Match found!",
        "You have been matched with a driver. Your pool has been created."
      );
    }
    //console.log(preferences)
    //navigation.navigate("LiveTripPage");
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
        <View id="empty" style={styles.flexInner3} />
      </View>

      <View style={styles.flex2}>
        <View style={styles.flexInner23}>
          <View style={styles.button}>
            <Pressable
              onPress={onPressMap}
              style={{
                flex: 1,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.text2}>Map</Text>
            </Pressable>
          </View>
          <View style={[styles.button, styles.shadow]} />
        </View>
        <View style={styles.flexInner21}>
          <View style={styles.button}>
            <Pressable
              onPress={onPressProfile}
              style={{
                flex: 1,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.text2}>Profile</Text>
            </Pressable>
          </View>
          <View style={[styles.button, styles.shadow]} />
        </View>
        <View style={styles.flexInner21}>
          <View style={styles.button}>
            <Pressable
              onPress={onPressSwitch}
              style={{
                flex: 1,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.text2}>
                Change to {myUserRole ? "Passenger" : "Driver"}
              </Text>
            </Pressable>
          </View>
          <View style={[styles.button, styles.shadow]} />
        </View>
        <View style={styles.flexInner22}>
          <View style={styles.button}>
            <Pressable
              onPress={onPressPool}
              style={{
                flex: 1,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.text2}>My Pools</Text>
            </Pressable>
          </View>
          <View style={[styles.button, styles.shadow]} />
        </View>
        <View style={styles.flexInner23}>
          <View style={styles.button}>
            <Pressable
              onPress={onPressPrefer}
              style={{
                flex: 1,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.text2}>Trip Preferences</Text>
            </Pressable>
          </View>
          <View style={[styles.button, styles.shadow]} />
        </View>
        <View style={styles.flexInner24}>
          <View style={styles.button11}>
            <Pressable
              onPress={onMatchMePressed}
              style={{
                flex: 1,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={[styles.text2, { color: "#000000" }]}>Match me</Text>
            </Pressable>
          </View>
          <View style={[styles.button, styles.shadow]} />
        </View>
      </View>

      <View style={styles.flex3}></View>
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
  flexInner24: {
    flex: 1,
    width: "80%",
    // backgroundColor: "brown",
  },
  flex3: {
    flex: 0.3,
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
  button11: {
    width: "100%",
    height: "65%",
    backgroundColor: "#ffaa00",
    borderWidth: 5,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  text2: {
    fontFamily: "syne-bold",
    fontSize: 20,
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
