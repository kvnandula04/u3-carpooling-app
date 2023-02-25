import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import GridBackground from "../../assets/grid-background";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileCircle from "../components/ProfileCircle";

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
    var co2 = 0.5;
    var travelled = 5.2;
    var num_trips = 10;

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
            <SafeAreaView id="topFrame" style={styles.topFrame}>
                <Text id="hey" style={styles.hey}>
                    Hey,{"\n"}
                    {username}
                </Text>
                <ProfileCircle id="profilePic" style={styles.profilePic} />
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
            </SafeAreaView>
            <View id="cardsFrame" style={styles.cardsFrame}>
                <View id="analytics" style={styles.analytics}>
                    <Text id="analyticsTitle" style={styles.analyticsTitle}>
                        Analytics
                    </Text>
                    <Text id="co2" style={styles.co2}>
                        CO2 Saved: {co2}
                    </Text>
                    <Text id="travelled" style={styles.travelled}>
                        Distance Travelled: {travelled}
                    </Text>
                </View>
                <View id="history" style={styles.history}>
                    <Text id="historyTitle" style={styles.historyTitle}>
                        Trip History
                    </Text>
                    <Text id="historyText" style={styles.historyText}>
                        {num_trips} trips
                    </Text>
                </View>
            </View>
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
    profilePic: {},
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
    cardsFrame: {
        flex: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "blue",
    },
    analytics: {
        margin: 10,
        backgroundColor: "green",
    },
    analyticsTitle: {
        color: cream,
    },
    co2: {
        color: cream,
    },
    travelled: {
        color: cream,
    },
    history: {
        margin: 10,
        backgroundColor: "green",
    },
    historyTitle: {
        color: cream,
    },
    historyText: {
        color: cream,
    },
    switchFrame: {
        flex: 1,
        alignItems: "center",
        // backgroundColor: "green",
    },
    switchButton: {
        padding: 10,
        // top: -10,
        backgroundColor: "black",
    },
    switchText: {
        color: cream,
        fontSize: 40,
        fontStyle: "italic",
    },
});
