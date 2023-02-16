import {
    Button,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useState } from "react";
import GridBackground from "../assets/grid-background";
import LiveMap from "../components/LiveMap";
import LiveTripDuration from "../components/LiveTripDuration";
import LiveETA from "../components/LiveETA";
import LiveToPickup from "../components/LiveToPickup";

const cream = "#F7F3EB";
const green = "#4CD835";
const greenShadow = "#278A17";
const charcoal = "#3F3F3F";
const black = "#272727";

const LiveTripPage = () => {
    const onPressReport = () => {
        console.log("Take to Report Page / Card");
    };

    const [inFocus, setInFocus] = useState([1, 0, 0, 0]);
    const onPressMap = () => {
        setInFocus([1, 0, 0, 0]);
        console.log("Map Pressed");
    };
    const onPressDur = () => {
        setInFocus([0, 1, 0, 0]);
        console.log("Duration Pressed");
    };
    const onPressETA = () => {
        setInFocus([0, 0, 1, 0]);
        console.log("ETA Pressed");
    };
    const onPressPick = () => {
        setInFocus([0, 0, 0, 1]);
        console.log("Pickup Pressed");
    };

    return (
        <View id="pageFrame" style={styles.pageFrame}>
            <GridBackground
                lineColor={cream}
                style={{
                    position: "absolute",
                    zIndex: -5,
                    backgroundColor: "#272727",
                }}
            />
            <View id="cardFrame" style={styles.cardFrame}>
                <LiveMap
                    style={
                        inFocus[0] === 1 ? styles.selected : styles.notSelected
                    }
                    cardStyle={{
                        width: "100%",
                        height: "120%",
                        marginBottom: 5,
                        borderColor: green,
                        borderWidth: 5,
                        borderRadius: 32,
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 0,
                        overflow: "hidden",
                    }}
                    shadowStyle={{
                        zIndex: -1,
                        position: "absolute",
                        top: 6,
                        left: 6,
                        backgroundColor: greenShadow,
                        borderColor: greenShadow,
                    }}
                    onPress={onPressMap}
                />
                <LiveTripDuration
                    style={
                        inFocus[1] === 1 ? styles.selected : styles.notSelected
                    }
                    onPress={onPressDur}
                />
                <LiveETA
                    style={
                        inFocus[2] === 1 ? styles.selected : styles.notSelected
                    }
                    onPress={onPressETA}
                />
                <LiveToPickup
                    style={
                        inFocus[3] === 1 ? styles.selected : styles.notSelected
                    }
                    onPress={onPressPick}
                />
            </View>
            <Pressable
                id="reportButton"
                style={styles.reportButton}
                onPress={onPressReport}
            >
                <Text style={[styles.reportText, { fontWeight: "900" }]}>
                    Report
                </Text>
                <Text style={styles.reportText}> Misconduct</Text>
            </Pressable>
        </View>
    );
};

export default LiveTripPage;

const styles = StyleSheet.create({
    pageFrame: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: black,
    },
    cardFrame: {
        flex: 6,
        alignSelf: "center",
        width: "85%",
        marginTop: 40,
        // backgroundColor: "red",
    },
    selected: {
        flex: 5,
    },
    notSelected: {
        flex: 2,
    },
    reportButton: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: 5,
        // backgroundColor: "blue",
    },
    reportText: {
        fontSize: 32,
        fontWeight: "300",
        fontStyle: "italic",
        color: cream,
    },
});
