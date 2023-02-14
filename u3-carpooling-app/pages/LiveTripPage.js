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

const LiveTripPage = () => {
    const onPressReport = () => {
        console.log("Take to Report Page / Card");
    };

    const [inFocus, setInFocus] = useState([1, 0, 0, 0]);
    const onPressMap = () => {
        setInFocus([1, 0, 0, 0]);
    };
    const onPressDur = () => {
        setInFocus([0, 1, 0, 0]);
    };
    const onPressETA = () => {
        setInFocus([0, 0, 1, 0]);
    };
    const onPressPick = () => {
        setInFocus([0, 0, 0, 1]);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <GridBackground
                lineColor={cream}
                style={{ zIndex: -5, backgroundColor: "#272727" }}
            />
            <Pressable style={styles.reportButton} onPress={onPressReport}>
                <Text style={[styles.reportText, { fontWeight: "900" }]}>
                    Report
                </Text>
                <Text style={styles.reportText}> Misconduct</Text>
            </Pressable>
            <View
                style={{
                    position: "absolute",
                    alignSelf: "center",
                    margin: "15%",
                    width: "100%",
                    height: "82%",
                    // backgroundColor: "red",
                }}
            >
                <LiveMap
                    style={
                        inFocus[0] === 1 ? styles.selected : styles.notSelected
                    }
                    onPress={onPressMap}
                    cardStyle={{
                        width: "100%",
                        height: "110%",
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
                        backgroundColor: greenShadow,
                        borderColor: greenShadow,
                        marginTop: -314,
                        // marginRight: 20,
                        right: -6,
                    }}
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
        </SafeAreaView>
    );
};

export default LiveTripPage;

const styles = StyleSheet.create({
    reportButton: {
        position: "absolute",
        bottom: 20,
        right: 0,
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingVertical: 20,
        paddingHorizontal: 20,
        // backgroundColor: "blue",
    },
    reportText: {
        fontSize: 32,
        fontWeight: "300",
        fontStyle: "italic",
        color: cream,
    },
    selected: {
        flex: 5,
    },
    notSelected: {
        flex: 2,
    },
});
