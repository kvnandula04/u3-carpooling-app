import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView from "react-native-maps";

const green = "#4CD835";
const greenShadow = "#278A17";

const LiveMap = (props) => {
    return (
        <Pressable
            id="frame"
            style={[props.style, styles.frame]}
            onPress={props.onPress}
        >
            <View style={[props.cardStyle]}>
                <MapView style={[styles.map]} mapType="mutedStandard" />
                <Text style={[styles.text]}>U3</Text>
            </View>
            <View
                id="shadow"
                style={[props.cardStyle, props.shadowStyle]}
            ></View>
        </Pressable>
    );
};

export default LiveMap;

const styles = StyleSheet.create({
    frame: {},
    map: {
        width: "100%",
        height: "100%",
        // marginBottom: 25,
    },
    text: {
        color: "black",
        fontSize: 36,
        position: "absolute",
        top: 5,
        right: 10,
    },
});
