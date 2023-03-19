import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import RestAPI from "../hooks/Rest";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import GridBackground from "../../assets/grid-background";
import { useSelector, useDispatch } from "react-redux";
import { updateUserRole } from "../../globalVariables/mySlice";
import Logo from "../components/Logo";

const cream = "#F7F3EB";
const yellow = "#FFB800";
const black = "#000";
const white = "#FFF";

export default function Preferences() {
  const navigation = useNavigation();
  const [role, setRole] = useState(myUserRole);
  const myUserRole = useSelector((state) => state.mySlice.myUserRole);

  const route = useRoute();
  const { message } = route.params;

  const [preferences, setPreferences] = useState({
    location: message.location,
    destination: message.destination,
    departure_time: message.departure_time,
    arrival_time: message.arrival_time,
    detour_distance: message.detour_distance,
    rating: message.rating,
    seats: message.seats,
    prePage: false,
  });

  const onPressBack = () => {
    navigation.navigate("OldHomePage", { messagePage: preferences });
  };

  let mainColour = cream;
  let secondColour = yellow;
  let textColour = black;
  if (myUserRole === 1) {
    mainColour = cream;
    secondColour = yellow;
    textColour = black;
  } else {
    mainColour = yellow;
    secondColour = cream;
    textColour = black;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      behavior="height"
      enabled
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* <View style={styles.container}> */}
        <GridBackground
          position="absolute"
          zIndex={-5}
          lineColor={mainColour}
          style={{ backgroundColor: secondColour }}
        />

        <View style={styles.flex1}>
          <Logo fontSize={86} color={textColour} marginTop={"15%"} />
        </View>

        <View style={styles.flex2}>
          <Text
            style={[
              styles.title,
              {
                color: mainColour,
              },
            ]}
          >
            Preferences
          </Text>
          {/* <Text style={styles.subtitle}>Enter your preferences:</Text> */}
        </View>

        <View style={styles.scrollView}>
          <Text style={styles.label}>Maximum Detour Distance</Text>
          <View id="distanceFrame" style={styles.frame}>
            <View
              id="distanceButton"
              style={[styles.button, { backgroundColor: mainColour }]}
            >
              <TextInput
                style={styles.text}
                placeholder="2"
                value={preferences.detour_distance}
                onChangeText={(text) =>
                  setPreferences({
                    ...preferences,
                    detour_distance: text,
                  })
                }
                keyboardType="numeric"
              />
            </View>
            <View
              id="userNameShadow"
              style={[styles.button, styles.shadow]}
            ></View>
          </View>

          <Text style={styles.label}>Ratings</Text>
          <View id="distanceFrame" style={styles.frame}>
            <View
              id="distanceButton"
              style={[styles.button, { backgroundColor: mainColour }]}
            >
              <TextInput
                style={styles.text}
                placeholder="5"
                value={preferences.rating}
                onChangeText={(text) =>
                  setPreferences({ ...preferences, rating: text })
                }
                keyboardType="numeric"
              />
            </View>
            <View
              id="userNameShadow"
              style={[styles.button, styles.shadow]}
            ></View>
          </View>

          <Text style={styles.label}>Seats Available</Text>
          <View id="distanceFrame" style={styles.frame}>
            <View
              id="distanceButton"
              style={[styles.button, { backgroundColor: mainColour }]}
            >
              <TextInput
                style={styles.text}
                placeholder="1"
                value={preferences.seats}
                onChangeText={(text) =>
                  setPreferences({ ...preferences, seats: text })
                }
                keyboardType="numeric"
              />
            </View>
            <View
              id="userNameShadow"
              style={[styles.button, styles.shadow]}
            ></View>
          </View>
        </View>

        <View style={styles.flex3}>
          <TouchableOpacity style={styles.button2} onPress={onPressBack}>
            <Text style={[styles.text, { color: textColour }]}>
              save + go back.
            </Text>
          </TouchableOpacity>
        </View>
        {/* </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  flex1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  flex2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    // backgroundColor: "blue",
  },
  scrollView: {
    flex: 2.5,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    // backgroundColor: "blue",
  },
  flex3: {
    flex: 1,
    // backgroundColor: "green",
  },
  title: {
    fontSize: 60,
    fontFamily: "atkinson-italic",
    marginBottom: "1%",
  },
  subtitle: {
    fontSize: 24,
    fontFamily: "atkinson-italic",
  },
  label: {
    fontSize: 20,
    fontFamily: "atkinson-italic",
    marginBottom: "1%",
  },
  frame: {
    width: 150,
    height: 70,
    marginBottom: "7%",
    // backgroundColor: "white",
  },
  button: {
    width: "100%",
    height: "100%",
    borderRadius: 32,
    borderColor: "#000",
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  shadow: {
    zIndex: -1,
    position: "absolute",
    backgroundColor: "#000",
    top: 6,
    left: 6,
  },
  text: {
    fontSize: 36,
    fontFamily: "atkinson-italic",
    color: "#1774ff",
    textAlign: "center",
  },
  button2: {
    justifyContent: "flex-start",
    alignItems: "center",
    // marginBottom: "2%",
    padding: "5%",
    // backgroundColor: "#F7F3EB",
  },
});
