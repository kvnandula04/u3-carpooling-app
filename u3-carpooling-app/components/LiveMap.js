import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView from "react-native-maps";

const green = "#4CD835";
const greenShadow = "#278A17";

const LiveMap = (props) => {
    return (
        <Pressable style={[props.style, styles.frame]} onPress={props.onPress}>
            <View style={[styles.card, styles.shadow]}></View>
            <View style={[styles.card]}>
                <MapView style={[styles.card, styles.map]} />
            </View>
            <Text style={[styles.text]}>U3</Text>
        </Pressable>
    );
};

export default LiveMap;

const styles = StyleSheet.create({
    frame: {},
    map: {},
    card: {
        position: "absolute",
        width: "100%",
        height: "125%",
        backgroundColor: "white",
        borderColor: green,
        borderWidth: 5,
        borderRadius: 32,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        overflow: "hidden",
    },
    shadow: {
        backgroundColor: greenShadow,
        borderColor: greenShadow,
        top: 6,
        left: 6,
    },
    text: {
        color: "black",
        fontSize: 36,
        position: "absolute",
        top: 10,
        right: 20,
    },
});
