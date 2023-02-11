import { StyleSheet, Text, View } from "react-native";
import React from "react";

const charcoal = "#3F3F3F";
const yellow = "#EBB017";
const purple = "#C293FF";
const purpleShadow = "#A37BFF";

const LiveToPickup = (props) => {
    return (
        <View style={[props.style, styles.frame]}>
            <View style={[styles.card, styles.shadow]}></View>
            <View style={[styles.card]}></View>
            <Text style={[styles.text]}>to pick up.</Text>
        </View>
    );
};

export default LiveToPickup;

const styles = StyleSheet.create({
    frame: {},
    card: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: yellow,
        borderColor: purple,
        borderWidth: 5,
        borderRadius: 32,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    shadow: {
        backgroundColor: purpleShadow,
        borderColor: purpleShadow,
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
