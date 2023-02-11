import { StyleSheet, Text, View } from "react-native";
import React from "react";

const cream = "#F7F3EB";
const charcoal = "#3F3F3F";

const LiveTripDuration = (props) => {
    return (
        <View style={[props.style, styles.frame]}>
            <View style={[styles.card, styles.shadow]}></View>
            <View style={[styles.card]}></View>
            <Text style={[styles.text]}>trip length.</Text>
        </View>
    );
};

export default LiveTripDuration;

const styles = StyleSheet.create({
    frame: {},
    card: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: cream,
        borderColor: charcoal,
        borderWidth: 5,
        borderRadius: 32,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    shadow: {
        backgroundColor: "black",
        borderColor: "black",
        right: -6,
        bottom: -6,
    },
    text: {
        color: charcoal,
        fontSize: 36,
        position: "absolute",
        bottom: 10,
        left: 20,
    },
});
