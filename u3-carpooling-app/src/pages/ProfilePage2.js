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

const ProfilePage2 = () => {
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
                <View id="topCard" style={styles.topCard}></View>
                <View id="topShadow" style={styles.topShadow}></View>
            </SafeAreaView>
            <View id="analyticsFrame" style={styles.analyticsFrame}>
                <View id="analyticsFrame" style={styles.analyticsFrame}>
                    <View
                        id="analyticsCard"
                        style={styles.analyticsCard}
                    ></View>
                    <View
                        id="analyticsShadow"
                        style={styles.analyticsShadow}
                    ></View>
                </View>

                <View id="historyFrame" style={styles.historyFrame}>
                    <View id="historyCard" style={styles.historyCard}></View>
                    <View
                        id="historyShadow"
                        style={styles.historyShadow}
                    ></View>
                </View>
            </View>
            <View id="switchFrame" style={styles.switchFrame}>
                <Pressable
                    id="switchButton"
                    style={styles.switchButton}
                ></Pressable>
            </View>
        </View>
    );
};

export default ProfilePage2;

const styles = StyleSheet.create({
    pageFrame: { flex: 1 },
});
