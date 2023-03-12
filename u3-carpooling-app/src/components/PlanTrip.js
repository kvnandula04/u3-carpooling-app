import { Pressable, StyleSheet, Text, View } from "react-native";
import React, {useState} from "react";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import RestAPI from "../hooks/Rest";
import { useSelector, useDispatch } from 'react-redux';
import { updateUserID } from '../../globalVariables/mySlice';

const PlanTrip = ({preferenceData}) => {

  const [alreadyRun, setAlreadyRun] = useState(false);
  const [id, setID] = useState(useSelector(state => state.mySlice.myUserID));
  const IdToBeChangedTo = 11623;//this is the id that will be changed to
  const [preferences, setPreferences] = useState({
    location: "53 Hungerford Rd",
    destination: "University of Bath",
    departure_time: "9:45",
    arrival_time: "10:05",
    detour_distance: "2",
    rating: "5",
    seats: "1",
    prePage: false
  });

  if (!alreadyRun) {
    setPreferences(preferenceData);
    setAlreadyRun(true);
  }
  const dispatch = useDispatch();
  
  function changeIDinPageandReduxStore (val){
    dispatch(updateUserID((val)));
    setID((val));
    console.log("page and store ID: " + id.toString());
  }
  const navigation = useNavigation();
  
  const onMatchMePressed = () => {
    // console.log("UserID: ", myUserID);
    if(role === 1){
      const pool_result = asetPreferences({ operation: "select", table: "Licence", userID: myUserID});
      console.log(pool_result.vehicleID);
    }

    console.log(preferences)
    navigation.navigate("LiveTripPage");
  };

  return (
    <View id="planTripFrame" style={styles.planTripFrame}>
      <View id="planTripCard" style={styles.planTripCard}>
        <View id="planTripTitleView" style={styles.planTripTitleView}>
          <Text style={styles.planTripTitle}>Plan a trip</Text>
        </View>
        <View id="list" style={styles.planList}>
          <View style={styles.inputFrame}>
            <Text style={styles.inputTitle}>Start location: </Text>
            <TextInput
              style={styles.inputText}
              //placeholder="53 Hungerford Rd"
              value={preferences.location}
              //onChangeText={(startLocation) => setStartLocation(startLocation)}
              onChangeText={(text) => setPreferences({...preferences, location: text})}
            ></TextInput>
          </View>
          <View style={styles.inputFrame}>
            <Text style={styles.inputTitle}>Destination: </Text>
            <TextInput
              style={styles.inputText}
              //placeholder="University of Bath"
              value={preferences.destination}
              //onChangeText={(destination) => setDestination(destination)}
              onChangeText={(text) => setPreferences({...preferences, destination: text})}

            ></TextInput>
          </View>
          <View style={styles.inputFrame}>
            <Text style={styles.inputTitle}>Departure time: </Text>
            <TextInput
              style={styles.inputText}
              //placeholder="9:45"
              value={preferences.departure_time}
              //onChangeText={(departTime) => setDepartTime(departTime)}
              onChangeText={(text) => setPreferences({...preferences, departure_time: text})}
            ></TextInput>
          </View>
          <View style={styles.inputFrame}>
            <Text style={styles.inputTitle}>Arrival time: </Text>
            <TextInput
              style={styles.inputText}
              //placeholder="10:05"
              value={preferences.arrival_time}
              //onChangeText={(arrivalTime) => setarrivalTime(arrivalTime)}
              onChangeText={(text) => setPreferences({...preferences, arrival_time: text})}
            ></TextInput>
          </View>
        </View>
      </View>
      <View
        id="planTripShadow"
        style={[styles.planTripCard, styles.planTripShadow]}
      />
      <View id="matchMeButton" style={styles.matchMeButton}>
        <Pressable onPress={() => {onMatchMePressed, changeIDinPageandReduxStore(IdToBeChangedTo);}}>
          <Text style={styles.matchMeButtonText}>Match me!</Text>
        </Pressable>
      </View>
      <View
        id="matchMeButtonShadow"
        style={[styles.matchMeButton, styles.matchMeButtonShadow]}
      />
    </View>
  );
};

export default PlanTrip;

const styles = StyleSheet.create({
  planTripFrame: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  planTripCard: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 32,
    borderColor: "#000",
    borderWidth: 5,
    backgroundColor: "#fff",
  },
  planTripTitle: {
    fontFamily: "syne-bold",
    fontSize: 36,
    color: "#ffb800",
    // textDecorationLine: "underline",
  },
  planTripShadow: {
    zIndex: -1,
    backgroundColor: "#000",
    position: "absolute",
    top: 6,
    left: 6,
  },
  planTripTitleView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: "2%",
    marginBottom: "-2%",
    marginRight: "4%",
  },
  planList: {
    flex: 4,
    flexDirection: "column",
    justifyContent: "space-evenly",
    marginLeft: "5%",
  },
  inputFrame: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    // backgroundColor: "#efece8",
  },
  inputTitle: {
    fontFamily: "atkinson-italic",
    fontSize: 18,
  },
  inputText: {
    fontFamily: "atkinson-regular",
    fontSize: 18,
  },
  matchMeButton: {
    width: "45%",
    height: "30%",
    position: "absolute",
    bottom: "-3%",
    right: "-3%",
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
    bottom: "-5%",
    right: "-5%",
  },
});
