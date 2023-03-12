import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import RestAPI from "../hooks/Rest";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';

export default function Preferences() {
  const navigation = useNavigation();
  
  const route = useRoute();
  const {message} = route.params;

  const [preferences, setPreferences] = useState({
    location: message.location,
    destination: message.destination,
    departure_time: message.departure_time,
    arrival_time: message.arrival_time,
    detour_distance: message.detour_distance,
    rating: message.rating,
    seats: message.seats,
    prePage: false
  });

  const onPressBack = () => {
    navigation.navigate("OldHomePage", {messagePage: preferences});
  };

  const handleSavePreferences = () => {
    console.log("Save Preferences"); 
  }

  const [callOne,   updateCallOne]   = useState(true);
  const [recvOne,   updateRecvOne]   = useState(false);
  const [callTwo,   updateCallTwo]   = useState(false);
  const [recvTwo,   updateRecvTwo]   = useState(false);

  const myUserID = 3;
  var licence_table = null;
  var pool_table = null;
  var users_licence_id = null;
  var users_pool_id = null;

  licence_table = RestAPI(
    {
      operation: "select",
      table: "Licence",
      userID: myUserID.toString(),
    },
    {
      licenceID: null,
    },
    (runFlag = callOne)
  )[0];

  // Only run the call once
  if (callOne == true) {
    updateCallOne(false);
  }

  // If we received valid data, move onto the next call
  if (recvOne == false && licence_table.licenceID != null) {
  	console.log("licence ID: ", licence_table.licenceID);

  	updateRecvOne(true);
  	updateCallTwo(true);
  }

  
  pool_table = RestAPI(
    {
      operation: "select",
      table: "Pool",
      licenceID: licence_table.licenceID,
    },
    {
      poolID: null
    },
    (runFlag = callTwo)
  )[0];

  // Only run the call once
  if (callTwo == true) {
    updateCallTwo(false);
  }

  if (recvTwo == false && pool_table.poolID != null) {
    console.log("Pool ID: ", pool_table.poolID);

    // Do whatever you want with the poolID in here
    // if you want to use it somewhere else, wrap it in an "if (pool_table.poolID != null)" clause    


    updateRecvTwo(true);
  }


  

  // const [buttonCall, updateCall] = useState(false);

  // var result = null;
  // const myUserID = 3;
  
  // const handleSavePreferences = () => {
  //   updateCall(true);
  // };

  // RestAPI(
  // 	{ operation: "select", table: "Licence", userID: myUserID.toString()},
	// runFlag = buttonCall
  // );

  //console.log(result[0]);


  // const [apreferences, asetPreferences] = useState(null);
  // const [callOne,   updateCallOne]   = useState(true);

  // RestAPI(
  //     // { operation: "insert", table: "Offer", userID: "3", poolID: "3", role: "1", settings: JSON.stringify(preferences)}
  //     apreferences
  // );

  // const role = 1;
  // const myUserID = 3;
  // var result = null;


  // const handleSavePreferences = () => {
    //asetPreferences({ operation: "insert", table: "Offer", userID: "3", poolID: "3", role: "1", settings: JSON.stringify(preferences)});

    // if(role === 1){
    //   if (callOne === true) {
    //     result = asetPreferences({ operation: "select", table: "Licence", userID: myUserID.toString()});
    //     console.log(result);
    //     updateCallOne(false);
    //   }
    // }

  // };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Preferences</Text>
        <Text style={styles.subtitle}>Enter your preferences here</Text>
    
        <Text style={styles.label}>Maximum Detour Distance</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Maximum Detour Distance"
          value={preferences.detour_distance}
          onChangeText={(text) => setPreferences({...preferences, detour_distance: text})}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Ratings</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ratings"
          value={preferences.rating}
          onChangeText={(text) => setPreferences({...preferences, rating: text})}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Seats Available</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number of seats available"
          value={preferences.seats}
          onChangeText={(text) => setPreferences({...preferences, seats: text})}
          keyboardType="numeric"
        />

        <Button title="Save Preferences (back to home)" onPress={onPressBack} />
        
        <Button title="Save Preferences" onPress={handleSavePreferences} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
  },
  scrollView: {
    marginHorizontal: 20,
  }
});
