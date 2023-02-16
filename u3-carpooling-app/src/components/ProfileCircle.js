import { StyleSheet, Text, View } from "react-native";
import React from "react";

const purple = "#C293FF";
const purpleShadow = "#9747FF";

const ProfileCircle = () => {
    return (
        <View style={styles.frame}>
            <View style={[styles.circle, styles.circleShadow]}></View>
            <View style={styles.circle}></View>
            <View style={styles.picture}></View>
        </View>
    );
};

export default ProfileCircle;

const styles = StyleSheet.create({
    frame: {},
    picture: {
        position: "absolute",
        width: 60,
        height: 60,
        borderRadius: 1000,
        top: 5,
        right: 5,
        backgroundColor: "white",
    },
    circle: {
        position: "absolute",
        width: 70,
        height: 70,
        borderRadius: 1000,
        right: 0,
        backgroundColor: purple,
    },
    circleShadow: {
        right: -4,
        top: 4,
        backgroundColor: purpleShadow,
    },
});
