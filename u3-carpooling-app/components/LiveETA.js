import { StyleSheet, Text, View } from "react-native";
import React from "react";

const cream = "#F7F3EB";
const blue = "#1774FF";
const charcoal = "#3F3F3F";

const LiveETA = (props) => {
    return (
        <View style={[props.style, styles.frame]}>
            <View style={[styles.card, styles.shadow]}></View>
            <View style={[styles.card]}></View>
            <Text style={[styles.text]}>eta.</Text>
        </View>
    );
};

export default LiveETA;

const styles = StyleSheet.create({
    frame: {},
    card: {
        position: "absolute",
        width: "100%",
        height: "150%",
        backgroundColor: blue,
        borderColor: charcoal,
        borderWidth: 5,
        borderRadius: 32,
    },
    shadow: {
        backgroundColor: "black",
        borderColor: "black",
        top: 6,
        left: 6,
    },
    text: {
        color: cream,
        fontSize: 36,
        position: "absolute",
        bottom: 0,
        left: 20,
    },
});
