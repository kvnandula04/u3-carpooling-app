import { StyleSheet, Text, View } from "react-native";
import React from "react";

const purple = "#C293FF";
const purpleShadow = "#9747FF";

const ProfileCircle = (props) => {
    return (
        <View style={props.frame}>
            <View style={[props.circle, props.circleShadow]}></View>
            <View style={props.circle}></View>
            <View style={props.picture}></View>
        </View>
    );
};

export default ProfileCircle;

const styles = StyleSheet.create({
    frame: {
        flex: 1,
    },
});
