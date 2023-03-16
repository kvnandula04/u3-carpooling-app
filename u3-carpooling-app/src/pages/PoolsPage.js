import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import GridBackground from "../../assets/grid-background";
import LiveMap from "../components/LiveMap";
import { SafeAreaView } from "react-native-safe-area-context";
import RestAPI from "../hooks/Rest";
import useFonts from "../hooks/UseFonts";
import { useSelector, useDispatch } from "react-redux";
import { updateUserRole } from "../../globalVariables/mySlice";

const PoolsPage = () => {
    const myUserRole = useSelector((state) => state.mySlice.myUserRole);

    const [callOne, updateCallOne] = useState(true);
    const [recvOne, updateRecvOne] = useState(false);
    const [callTwo, updateCallTwo] = useState(false);
    const [recvTwo, updateRecvTwo] = useState(false);
    const [callThree, updateCallThree] = useState(false);
    const [recvThree, updateRecvThree] = useState(false);
    const [callFour, updateCallFour] = useState(false);
    const [recvFour, updateRecvFour] = useState(false);

    // Schedule
    const [shedCallOne, updateShedCallOne] = useState(true);
    const [shedRecvOne, updateShedRecvOne] = useState(false);
    const [shedCallTwo, updateShedCallTwo] = useState(false);
    const [shedRecvTwo, updateShedRecvTwo] = useState(false);

    const onPressCancel = () => {
        console.log("Cancel Trip Pressed");
    };
    const onPressShedule = () => {
        console.log("Shedule Another Trip Pressed");
    };

    let test = null;
    let pool = null;

    const [date, setDate] = useState("'date'");
    const [time, setTime] = useState("'time'");
    const [destination, setDestination] = useState("'destination'");
    // const [driver, setDriver] = useState("'driver'");

    let destin_depart = null;
    let shed_date = null;

    const initDB = () => {
        offer = RestAPI(
            {
                operation: "select",
                table: "Offer",
                userID: "3",
            },
            {
                userID: null,
                poolID: null,
                settings: { departure_time: "2", destination: "3" },
            },
            (runFlag = callOne)
        )[0];

        // Only run the call once
        if (callOne == true) {
            updateCallOne(false);
        }

        // If we received valid data, move onto the next call
        if (recvOne == false && offer.poolID != null) {
            updateRecvOne(true);
            updateCallTwo(true);
        }
        // console.log("OFFER:", typeof JSON.parse(offer.settings).departure_time);

        pool = RestAPI(
            {
                operation: "select",
                table: "Pool",
                poolID: offer.poolID,
            },
            {
                licenceID: null,
            },
            (runFlag = callTwo)
        )[0];

        // Only run the call once
        if (callTwo == true) {
            updateCallTwo(false);
        }

        // If we received valid data, move onto the next call
        if (recvTwo == false && pool.licenceID != null) {
            updateRecvTwo(true);
            updateCallThree(true);
        }

        licence = RestAPI(
            {
                operation: "select",
                table: "Licence",
                licenceID: pool.licenceID,
            },
            {
                userID: null,
            },
            (runFlag = callThree)
        )[0];

        // Only run the call once
        if (callThree == true) {
            updateCallThree(false);
        }
        // If we received valid data, move onto the next call
        if (recvThree == false && licence.userID != null) {
            updateRecvThree(true);
            updateCallFour(true);
        }

        user = RestAPI(
            {
                operation: "select",
                table: "User",
                userID: licence.userID,
            },
            {
                name: null,
            },
            (runFlag = callFour)
        )[0];

        // Only run the call once
        if (callFour == true) {
            updateCallFour(false);
        }

        // Retrieve the driver's name
        if (user.name != null) {
            console.log("USER NAME:", user.name);
            console.log("OFFER SETTINGS:", offer.settings.destination);
            destin_depart = (
                <Text id="text" style={styles.text}>
                    {" "}
                    {JSON.parse(offer.settings).departure_time} @{" "}
                    {JSON.parse(offer.settings).destination}
                </Text>
            );
        }
    };
    initDB();

    const shedDB = () => {
        shedOffer = RestAPI(
            {
                operation: "select",
                table: "Offer",
                userID: "3",
            },
            {
                userID: null,
                poolID: null,
            },
            (runFlag = shedCallOne)
        )[0];

        // Only run the call once
        if (callOne == true) {
            updateShedCallOne(false);
        }

        // If we received valid data, move onto the next call
        if (shedRecvOne == false && shedOffer.poolID != null) {
            updateShedRecvOne(true);
            updateShedCallTwo(true);
        }

        shed = RestAPI(
            {
                operation: "select",
                table: "Schedule",
                poolID: shedOffer.poolID,
            },
            {
                datetime: { date: null, time: null },
                scheduleID: null,
            },
            (runFlag = shedCallTwo)
        )[0];

        // Only run the call once
        if (shedCallTwo == true) {
            updateShedCallTwo(false);
        }

        if (shed.scheduleID != null) {
            console.log("Schedule DATE", shed.datetime);
            shed_date = (
                <Text id="date" style={styles.date}>
                    {JSON.parse(shed.datetime).date}
                </Text>
            );
        }
    };
    shedDB();

    const onPressCommence = () => {
        console.log("Commence Trip Pressed");
    };
    let commenceTrip = null;
    if (myUserRole === 0) {
        commenceTrip = (
            <Pressable
                id="commence"
                style={styles.commence}
                onPress={onPressCommence}
            >
                <Text> Commence Trip </Text>
            </Pressable>
        );
    }

    return (
        <View id="pageFrame" style={styles.pageFrame}>
            <View
                style={{
                    flex: 1,
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "85%",
                    top: "5%",
                    backgroundColor: "red",
                }}
                onPress={onPressCancel}
            >
                {shed_date}
                {destin_depart}
                <Text> Picked up by {user.name} </Text>
                {commenceTrip}
            </View>
        </View>
    );
};

export default PoolsPage;

const styles = StyleSheet.create({
    commence: {
        position: "absolute",
        bottom: "-10%",
        right: 0,
        width: "50%",
        height: "30%",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "green",
    },
    date: {
        // fontFamily: "atkinson-italic",
        fontSize: 22,
        fontWeight: "bold",
        color: "#000",
    },
    text: {
        // fontFamily: "atkinson-regular",
        fontSize: 20,
        color: "#000",
    },
    pageFrame: {
        flex: 1,
    },
    poolFrame: {
        flex: 5,
        // backgroundColor: "red",
    },
    poolCard: {
        width: "90%",
        alignSelf: "center",
        // marginTop: "-2%",
    },
    poolStyle: {
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
    cancelButton: {
        position: "absolute",
        bottom: 5,
        right: 5,
    },
    cancelText: {
        fontSize: 36,
        color: "red",
    },
    matchFrame: {
        flex: 4,
        backgroundColor: "blue",
    },
    sheduleFrame: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "green",
    },
    sheduleButton: {
        padding: 10,
        backgroundColor: "yellow",
    },
    sheduleText: {
        fontSize: 32,
        fontStyle: "italic",
        color: "black",
    },
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});
