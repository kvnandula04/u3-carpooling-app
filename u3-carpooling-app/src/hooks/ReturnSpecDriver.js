import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import GridBackground from "../../assets/grid-background";
import LiveMap from "../components/LiveMap";
import { SafeAreaView } from "react-native-safe-area-context";
import RestAPI from "../hooks/Rest";

export default function ReturnSpecDriver(relevantPassengerId) {

    //userid -- poolsubscriber -- pool -- licenseid -- userID, return this
    //return sum
    const [callOne,   updateCallOne]   = useState(true);
    const [recvOne,   updateRecvOne]   = useState(false);
    const [callTwo,   updateCallTwo]   = useState(false);
    const [recvTwo,   updateRecvTwo]   = useState(false);
    const [callThree, updateCallThree] = useState(false);
    const [recvThree, updateRecvThree] = useState(false);
    const [callFour,  updateCallFour]  = useState(false);
    const [recvFour,  updateRecvFour]  = useState(false);
    let pool = null;

    pool = RestAPI(
        {
            operation: "select",
            table: "PoolSubscriber",
            userID: relevantPassengerId,
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
    if (recvOne == false && pool.userID != null) {
        updateRecvOne(true);
        updateCallTwo(true);
    }
    licenseNo = RestAPI(
        {
            operation: "select",
            table: "Pool",
            poolID: pool.poolID,
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
    if (recvTwo == false && licenseNo.licenceID != null) {
        updateRecvTwo(true);
        updateCallThree(true);
    }
    
    licence = RestAPI(
        {
            operation: "select",
            table: "Licence",
            licenceID: licenseNo.licenceID,
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

    // NAME!!!!
    return user;
};

