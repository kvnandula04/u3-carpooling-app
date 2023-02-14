import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView from "react-native-maps";

const green = "#4CD835";
const greenShadow = "#278A17";

const LiveMap = (props) => {
    return (
        <Pressable style={[props.style, styles.frame]} onPress={props.onPress}>
            <View style={[styles.card]}>
                <MapView style={[styles.map]} mapType="mutedStandard" />
                <Text style={[styles.text]}>U3</Text>
            </View>
            <View style={[styles.card, styles.shadow]}></View>
        </Pressable>
    );
};

export default LiveMap;

const styles = StyleSheet.create({
    frame: {},
    map: {
        width: "100%",
        height: "100%",
        marginBottom: 25,
    },
    card: {
        width: "90%",
        height: "80%",
        borderColor: green,
        borderWidth: 5,
        borderRadius: 32,
        overflow: "hidden",
        marginBottom: 5,
    },
    shadow: {
        zIndex: -1,
        backgroundColor: greenShadow,
        borderColor: greenShadow,
        marginTop: -214,
        marginRight: -12,
    },
    text: {
        color: "black",
        fontSize: 36,
        position: "absolute",
        top: 5,
        right: 10,
    },
});
