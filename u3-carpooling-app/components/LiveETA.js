import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const cream = "#F7F3EB";
const blue = "#1774FF";
const charcoal = "#3F3F3F";

const LiveETA = (props) => {
    var arrivalTime = "12:43";

    return (
        <Pressable style={[props.style, styles.frame]} onPress={props.onPress}>
            <View id="card" style={[styles.card, styles.shadow]}></View>
            <View id="cardShadow" style={[styles.card]}></View>
            <Text id="title" style={[styles.title]}>
                eta.
            </Text>
            <Text id="arrivalTime" style={[styles.time]}>
                {arrivalTime}
            </Text>
        </Pressable>
    );
};

export default LiveETA;

const styles = StyleSheet.create({
    frame: {},
    card: {
        position: "absolute",
        width: "100%",
        height: "125%",
        backgroundColor: blue,
        borderColor: charcoal,
        borderWidth: 5,
        borderRadius: 32,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    shadow: {
        backgroundColor: "black",
        borderColor: "black",
        top: 6,
        left: 6,
    },
    title: {
        color: cream,
        fontSize: 36,
        position: "absolute",
        bottom: 0,
        left: 20,
    },
    time: {
        color: cream,
        fontSize: 64,
        fontStyle: "italic",
        fontWeight: "300",
        position: "absolute",
        top: 0,
        right: 20,
    },
});
