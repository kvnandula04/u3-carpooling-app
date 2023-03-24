import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import RestAPI from "../hooks/Rest";
import { useSelector, useDispatch } from "react-redux";
import {
    updateStartLocation,
    updateUserID,
} from "../../globalVariables/mySlice";
import { GOOGLE_MAPS_APIKEY } from "@env";

const cream = "#F7F3EB";
const yellow = "#FFB800";
const green = "#4CD835";
const greenShadow = "#278A17";
const charcoal = "#3F3F3F";
const black = "#272727";
const blue = "#1774ff";

const PlanTrip = ({ preferenceData }) => {
    // background grid colour to represent role
    let mainColour = yellow;
    let secondColour = yellow;
    if (myUserRole === 0) {
        mainColour = yellow;
        secondColour = cream;
    } else {
        mainColour = cream;
        secondColour = yellow;
    }

    const [alreadyRun, setAlreadyRun] = useState(false);

    const [startLocation, setStartLocation] = useState();
    const [destination, setDestination] = useState();

    const [preferences, setPreferences] = useState({
        location: "53 Hungerford Rd",
        destination: "University of Bath",
        departure_time: null,
        arrival_time: null,
        detour_distance: "2",
        rating: "5",
        seats: "1",
        prePage: false,
    });

    var today = new Date();
    var departure_time = today.toLocaleTimeString("en", { hour: '2-digit', hour12: false, minute: '2-digit' });
    departure_time = departure_time.substring(0, departure_time.length - 3);
    today.setHours(today.getHours() + 1);
    var arrival_time = today.toLocaleTimeString("en", { hour: '2-digit', hour12: false, minute: '2-digit' });
    arrival_time = arrival_time.substring(0, arrival_time.length - 3);

    //preferences data, make sre to check if the
    if (!alreadyRun) {
        if (
            preferenceData.detour_distance != "2" ||
            preferenceData.rating != "5" ||
            preferenceData.seats != "1" ||
            !preferences.departure_time ||
            !preferences.arrival_time
        ) {
            setPreferences({
                ...preferences,
                departure_time: departure_time,
                arrival_time: arrival_time,
                detour_distance: preferenceData.detour_distance,
                rating: preferenceData.rating,
                seats: preferenceData.seats,
            });

            setAlreadyRun(true);
        }
    }

    if (
        preferences.detour_distance != preferenceData.detour_distance ||
        preferences.rating != preferenceData.rating ||
        preferences.seats != preferenceData.seats
    ) {
        setAlreadyRun(false);
    }

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const myUserID = useSelector((state) => state.mySlice.myUserID);
    const myUserRole = useSelector((state) => state.mySlice.myUserRole);

    const [callOne, updateCallOne] = useState(true);
    const [recvOne, updateRecvOne] = useState(false);
    const [callTwo, updateCallTwo] = useState(false);
    const [recvTwo, updateRecvTwo] = useState(false);
    const [callThree, updateCallThree] = useState(false);
    const [recvThree, updateRecvThree] = useState(false);
    const [callOffer, updateCallOffer] = useState(false);
    const [recvOffer, updateRecvOffer] = useState(false);
    const [callMatch, updateCallMatch] = useState(false);

    const licence_table = RestAPI(
        {
            operation: "select",
            table: "Licence",
            userID: myUserID.toString(),
        },
        {
            licenceID: null,
        },
        callOne
    )[0];

    // Only run the call once
    if (callOne) updateCallOne(false);

    // If we received valid data, move onto the next call
    if (!recvOne && licence_table.licenceID) {
        console.log("licence ID: ", licence_table.licenceID);

        updateRecvOne(true);
    }

    function onMatchMePressed() {
        //Driver
        if (myUserRole === 1) {
            updateCallTwo(true);
        }
        //Passenger
        else {
            updateCallOffer(true);
        }

        //console.log(preferences)
        //navigation.navigate("LiveTripPage");
    }

    var res = RestAPI(
        {
            operation: "insert",
            table: "Pool",
            licenceID: licence_table.licenceID,
        },
        {},
        callTwo
    );

    if (callTwo) {
        console.log("PlanTrip: Inserting driver pool");
        updateCallTwo(false);
        updateRecvTwo(false);
    }

    if (!recvTwo && res == "success") {
        updateRecvTwo(true);
        updateCallThree(true);
    }

    const pool_table = RestAPI(
        {
            operation: "select",
            table: "Pool",
            licenceID: licence_table.licenceID,
        },
        {
            poolID: null,
        },
        callThree
    )[0];

    if (callThree) {
        updateCallThree(false);
        updateRecvThree(false);
    }

    if (!recvThree && pool_table.poolID) {
        console.log("Pool ID: ", pool_table.poolID);
        updateRecvThree(true);
        updateCallOffer(true);
    }

    res = RestAPI(
        {
            operation: "insert",
            table: "Offer",
            userID: myUserID,
            poolID: pool_table.poolID,
            role: myUserRole,
            settings: JSON.stringify(preferences),
        },
        {},
        callOffer
    );

    if (callOffer) {
        if (myUserRole) console.log("PlanTrip: Inserting driver offer");
        else console.log("PlanTrip: Inserting passenger offer");
        updateCallOffer(false);
        updateRecvOffer(false);
    }

    if (!recvOffer && res == "success") {
        updateRecvOffer(true);
        updateCallMatch(true);
    }

    RestAPI({ operation: "matchmake" }, {}, callMatch);

    if (callMatch) {
        console.log("PlanTrip: Running matchmaking");
        updateCallMatch(false);
    }

    useEffect(() => {
        if (!startLocation) {
            return;
        }

        fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${startLocation}&key=${GOOGLE_MAPS_APIKEY}`
        )
            .then((response) => response.json())
            .then((data) => {
                let res = data.results[0];
                let latlng = res.geometry.location;
                dispatch(updateStartLocation(latlng));

                // make global variable for start location
            });
    }, [startLocation]);

    useEffect(() => {
        if (!destination) {
            return;
        }

        fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${destination}&key=${GOOGLE_MAPS_APIKEY}`
        )
            .then((response) => response.json())
            .then((data) => {
                let res = data.results[0];
                let latlng = res.geometry.location;
                dispatch(updateDestination(latlng));
                // make global variable for destination
            });
    }, [destination]);

    console.log("Render: PlanTrip");
    return (
        <View id="planTripFrame" style={styles.planTripFrame}>
            <View
                id="planTripCard"
                style={[
                    styles.planTripCard,
                    myUserRole == 0
                        ? { backgroundColor: yellow }
                        : { backgroundColor: cream },
                ]}
            >
                <View id="planTripTitleView" style={[styles.planTripTitleView]}>
                    <Text
                        style={[
                            styles.planTripTitle,
                            myUserRole == 0
                                ? { color: cream }
                                : { color: yellow },
                            // {
                            //     color: mainColour,
                            //     backgroundColor: secondColour,
                            // },
                        ]}
                    >
                        Plan a trip
                    </Text>
                </View>
                <View id="list" style={styles.planList}>
                    <View style={styles.inputFrame}>
                        <Text style={styles.inputTitle}>Start location: </Text>
                        <TextInput
                            style={styles.inputText}
                            //placeholder="53 Hungerford Rd"
                            value={preferences.location}
                            //onChangeText={(startLocation) => setStartLocation(startLocation)}
                            onChangeText={(text) => {
                                setPreferences({
                                    ...preferences,
                                    location: text,
                                });
                                setStartLocation(text);
                            }}
                        ></TextInput>
                    </View>
                    <View style={styles.inputFrame}>
                        <Text style={styles.inputTitle}>Destination: </Text>
                        <TextInput
                            style={styles.inputText}
                            //placeholder="University of Bath"
                            value={preferences.destination}
                            //onChangeText={(destination) => setDestination(destination)}
                            onChangeText={(text) => {
                                setPreferences({
                                    ...preferences,
                                    destination: text,
                                });
                                setDestination(text);
                            }}
                        ></TextInput>
                    </View>
                    <View style={styles.inputFrame}>
                        <Text style={styles.inputTitle}>Departure time: </Text>
                        <TextInput
                            style={styles.inputText}
                            //placeholder="9:45"
                            value={preferences.departure_time}
                            //onChangeText={(departTime) => setDepartTime(departTime)}
                            onChangeText={(text) =>
                                setPreferences({
                                    ...preferences,
                                    departure_time: text,
                                })
                            }
                        ></TextInput>
                    </View>
                    <View style={styles.inputFrame}>
                        <Text style={styles.inputTitle}>Arrival time: </Text>
                        <TextInput
                            style={styles.inputText}
                            //placeholder="10:05"
                            value={preferences.arrival_time}
                            //onChangeText={(arrivalTime) => setarrivalTime(arrivalTime)}
                            onChangeText={(text) =>
                                setPreferences({
                                    ...preferences,
                                    arrival_time: text,
                                })
                            }
                        ></TextInput>
                    </View>
                </View>
            </View>
            <View
                id="planTripShadow"
                style={[styles.planTripCard, styles.planTripShadow]}
            />
            <View id="matchMeButton" style={styles.matchMeButton}>
                <Pressable
                    onPress={() => {
                        onMatchMePressed();
                    }}
                >
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
