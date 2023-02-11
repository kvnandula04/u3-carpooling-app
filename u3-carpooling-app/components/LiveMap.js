import { StyleSheet, Text, View } from "react-native";
import React from "react";

const green = "#4CD835";
const greenShadow = "#278A17";

const LiveMap = (props) => {
    return (
        <View style={[props.style, styles.frame]}>
            <View style={[styles.card, styles.shadow]}></View>
            <View style={[styles.card]}></View>
            <Text style={[styles.text]}>U3</Text>
        </View>
    );
};

export default LiveMap;

const styles = StyleSheet.create({
    frame: {},
    card: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "gray",
        borderColor: green,
        borderWidth: 5,
        borderRadius: 32,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    shadow: {
        backgroundColor: greenShadow,
        borderColor: greenShadow,
        right: -6,
        bottom: -6,
    },
    text: {
        color: "black",
        fontSize: 36,
        position: "absolute",
        top: 10,
        right: 20,
    },
});
