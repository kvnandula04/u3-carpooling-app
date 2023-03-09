import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import GridBackground from "../../assets/grid-background";
import LiveMap from "../components/LiveMap";
import { SafeAreaView } from "react-native-safe-area-context";
import RestAPI from "../hooks/Rest";

const PoolsPage = () => {
    const [singleCall, updateSingleCall] = useState(false);

    const onPressCancel = () => {
        console.log("Cancel Trip Pressed");
    };
    const onPressShedule = () => {
        console.log("Shedule Another Trip Pressed");
    };

    let test = null;

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
        test = RestAPI(
            {
                operation: "select",
                table: "Offer",
                userID: "3",
            },
            {
                userID: null,
            },
            (ranAlready = singleCall)
        );
        if (singleCall == false) updateSingleCall(true);
    };
    console.log(test);

    initDB();

    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    return (
        <View id="pageFrame" style={styles.pageFrame}>
            <GridBackground
                position="absolute"
                zIndex={-5}
                lineColor={"black"}
                style={{ backgroundColor: "#f7f3eb" }}
            />
            <Pressable style={{ flex: 1 }} onPress={onPressCancel}>
                <Text> TEST </Text>
            </Pressable>
            <FlatList
                data={test}
                renderItem={({ item }) => <Item title={item.offerID} />}
                keyExtractor={(item) => item.offerID}
            />
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
