import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import GridBackground from "../../assets/grid-background";

const cream = "#F7F3EB";
const blue = "#1774FF";
const green = "#4CD835";
const greenShadow = "#278A17";
const charcoal = "#3F3F3F";
const black = "#272727";

const ProfilePage = () => {
    const roles = ["Driver", "Passenger"];
    var cur_role = 1;

    var username = "John Doe";
    var passenger_rating = 4.5;
    var driver_rating = 4.8;

    const onPressFriends = () => {
        console.log("Go to Friends Page");
    };
    const onPressSwitch = () => {
        console.log("Switch role to " + roles[(cur_role + 1) % 2]);
    };

    return (
        <View id="pageFrame" style={styles.pageFrame}>
            <GridBackground
                lineColor={cream}
                style={{
                    position: "absolute",
                    zIndex: -5,
                    backgroundColor: blue,
                }}
            />
            <View id="topFrame" style={styles.topFrame}>
                <Text id="hey" style={styles.hey}>
                    Hey,{"\n"}
                    {username}
                </Text>
                <Text id="pass_rating" style={styles.pass_rating}>
                    Passenger Rating: {passenger_rating}
                </Text>
                <Text id="driver_rating" style={styles.driver_rating}>
                    Driver Rating: {driver_rating}
                </Text>
                <Pressable
                    id="friendsButton"
                    style={styles.friendsButton}
                    onPress={onPressFriends}
                >
                    <Text id="friendsText" style={styles.friendsText}>
                        go to Friends
                    </Text>
                </Pressable>
            </View>
            <View id="analyticsFrame" style={styles.analyticsFrame}></View>
            <View id="switchFrame" style={styles.switchFrame}>
                <Pressable
                    id="switchButton"
                    style={styles.switchButton}
                    onPress={onPressSwitch}
                >
                    <Text id="switchText" style={styles.switchText}>
                        switch to {roles[(cur_role + 1) % 2]}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default ProfilePage;

const styles = StyleSheet.create({
    pageFrame: {
        flex: 1,
    },
    topFrame: {
        flex: 4,
        alignItems: "center",
        backgroundColor: "red",
    },
    hey: {
        flex: 2,
    },
    pass_rating: {
        flex: 1,
    },
    driver_rating: {
        flex: 1,
    },
    friendsButton: {
        flex: 2,
        backgroundColor: "black",
    },
    friendsText: {
        color: cream,
    },
    analyticsFrame: {
        flex: 4,
        backgroundColor: "blue",
    },
    switchFrame: {
        flex: 1,
        alignItems: "center",
        // backgroundColor: "green",
    },
    switchButton: {
        padding: 10,
        top: -10,
        // backgroundColor: "black",
    },
    switchText: {
        color: cream,
        fontSize: 40,
        fontStyle: "italic",
    },
});
