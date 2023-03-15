import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import GridBackground from "../../assets/grid-background";
import LiveMap from "../components/LiveMap";
import { SafeAreaView } from "react-native-safe-area-context";
import RestAPI from "../hooks/Rest";

const PoolsPage = () => {
    const [callOne, updateCallOne] = useState(true);
    const [recvOne, updateRecvOne] = useState(false);
    const [callTwo, updateCallTwo] = useState(false);
    const [recvTwo, updateRecvTwo] = useState(false);
    const [callThree, updateCallThree] = useState(false);
    const [recvThree, updateRecvThree] = useState(false);
    const [callFour, updateCallFour] = useState(false);
    const [recvFour, updateRecvFour] = useState(false);

    const onPressCancel = () => {
        console.log("Cancel Trip Pressed");
    };
    const onPressShedule = () => {
        console.log("Shedule Another Trip Pressed");
    };

    let test = null;
    let pool = null;

    const [username, setUsername] = useState("blanc.");

    const initDB = () => {
        // RestAPI({
        //     operation: "insert",
        //     table: "User",
        //     name: "Will",
        //     email: "wb462@bath.ac.uk",
        //     pwdHash: "$123",
        // });
        // RestAPI({
        //     operation: "insert",
        //     table: "User",
        //     name: "Richard",
        //     email: "rp123@bath.ac.uk",
        //     pwdHash: "$456",
        // });
        // const will = RestAPI(
        //     { operation: "select", table: "User", name: "Will" },
        //     { userID: null },
        //     (ranAlready = singleCall)
        // )[0];
        // const richard = RestAPI(
        //     { operation: "select", table: "User", name: "Richard" },
        //     { userID: null },
        //     (ranAlready = singleCall)
        // )[0];
        // const vehicle = RestAPI(
        //     { operation: "vehiclelookup", registrationNumber: "RO11RWW" },
        //     { vehicleID: null },
        //     (ranAlready = singleCall)
        // )[0];
        // RestAPI({
        //     operation: "insert",
        //     table: "Licence",
        //     licenceNumber: "WTJ011132",
        //     userID: will.userID,
        //     vehicleID: vehicle.vehicleID,
        // });
        // const licence = RestAPI(
        //     {
        //         operation: "select",
        //         table: "Licence",
        //         licenceNumber: "WTJ011132",
        //     },
        //     { licenceID: null },
        //     (ranAlready = singleCall)
        // )[0];
        // RestAPI({
        //     operation: "insert",
        //     table: "Pool",
        //     licenceID: licence.licenceID,
        // });
        // RestAPI({
        //     operation: "insert",
        //     table: "PoolSubscriber",
        //     poolID: 1,
        //     userID: will.userID,
        // });
        // RestAPI({
        //     operation: "insert",
        //     table: "PoolSubscriber",
        //     poolID: 1,
        //     userID: richard.userID,
        // });

        // ----------------- TESTS -----------------

        offer = RestAPI(
            {
                operation: "select",
                table: "Offer",
                userID: "1",
            },
            {
                userID: null,
                poolID: null,
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
        if (user.name != null) console.log("USER NAME:", user.name);
    };
    initDB();

    return (
        <View id="pageFrame" style={styles.pageFrame}>
            <GridBackground
                position="absolute"
                zIndex={-5}
                lineColor={"black"}
                style={{ backgroundColor: "#f7f3eb" }}
            />
            <Pressable
                style={{
                    flex: 1,
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "70%",
                    backgroundColor: "red",
                }}
                onPress={onPressCancel}
            >
                <Text> TEST </Text>
                <Text> {username} </Text>
            </Pressable>
        </View>
    );

    // return (
    // <View id="pageFrame" style={styles.pageFrame}>
    // <GridBackground
    // position="absolute"
    // zIndex={-5}
    // lineColor={"black"}
    // style={{ backgroundColor: "#f7f3eb" }}
    // />
    // <SafeAreaView id="poolFrame" style={styles.poolFrame}>
    // <View id="poolCard" style={styles.poolCard}>
    // <LiveMap
    // cardStyle={styles.poolStyle}
    // shadowStyle={styles.shadowStyle}
    // text="U3"
    // />
    // <Pressable
    // id="cancelButton"
    // style={styles.cancelButton}
    // onPress={onPressCancel}
    // >
    // <Text id="cancelText" style={styles.cancelText}>
    // cancel trip
    // </Text>
    // </Pressable>
    // </View>
    // </SafeAreaView>
    // <View id="matchFrame" style={styles.matchFrame}></View>
    // <View id="sheduleFrame" style={styles.sheduleFrame}>
    // <Pressable
    // id="sheduleButton"
    // style={styles.sheduleButton}
    // onPress={onPressShedule}
    // >
    // <Text id="sheduleText" style={styles.sheduleText}>
    // shedule Another Trip
    // </Text>
    // </Pressable>
    // </View>
    // </View>
    // );
};

export default PoolsPage;

const styles = StyleSheet.create({
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
