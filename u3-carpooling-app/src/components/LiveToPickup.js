import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ProfileCircle from "./ProfileCircle";

const charcoal = "#3F3F3F";
const yellow = "#EBB017";
const purple = "#C293FF";
const purpleShadow = "#9747FF";

const LiveToPickup = (props) => {
    return (
        <Pressable style={[props.style, styles.frame]} onPress={props.onPress}>
            <View style={[styles.card, styles.shadow]}></View>
            <View style={[styles.card]}></View>
            <Text style={[styles.text]}>to pick up.</Text>
            <View
                style={{
                    marginTop: 10,
                    marginRight: 15,
                    margin: 20,
                    flex: 1,
                    // backgroundColor: "white",
                }}
            >
                <ProfileCircle />
            </View>
        </Pressable>
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
    },
    shadow: {
        backgroundColor: purpleShadow,
        borderColor: purpleShadow,
        top: 6,
        left: 6,
    },
    text: {
        color: charcoal,
        fontSize: 36,
        position: "absolute",
        bottom: 10,
        left: 20,
    },
});