import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import GridBackground from "../../assets/grid-background";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileCircle from "../components/ProfileCircle";

const cream = "#F7F3EB";
const blue = "#1774FF";
const green = "#3DD37A";
const orange = "#F55726";
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
            <View id="topFrame" style={styles.topFrame}>
                <View
                    id="topShadow"
                    style={[styles.topCard, styles.topShadow]}
                ></View>
                <View id="topCard" style={styles.topCard}>
                    <SafeAreaView id="safeFrame" style={styles.safeFrame}>
                        <Text id="hey" style={styles.hey}>
                            Hey,{"\n"}
                            {username}
                        </Text>
                        <ProfileCircle
                            frame={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                left: -10,
                            }}
                            circle={{
                                position: "absolute",
                                width: 130,
                                height: 130,
                                borderRadius: 130,
                                backgroundColor: green,
                            }}
                            shadow={{
                                position: "absolute",
                                width: 140,
                                height: 140,
                                borderRadius: 140,
                                backgroundColor: "black",
                            }}
                        />
                    </SafeAreaView>
                    <View id="ratingFrame" style={styles.ratingFrame}>
                        <Text id="pass_rating" style={styles.pass_rating}>
                            Passenger Rating: {passenger_rating}
                        </Text>
                        <Text id="driver_rating" style={styles.driver_rating}>
                            Driver Rating: {driver_rating}
                        </Text>
                    </View>
                    <View id="friendsFrame" style={styles.friendsFrame}>
                        <View
                            id="friendShadow"
                            style={styles.friendShadow}
                        ></View>
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
                </View>
            </View>
            <View id="cardsFrame" style={styles.cardsFrame}>
                <View id="analyticsFrame" style={styles.analyticsFrame}>
                    <View
                        id="analyticsShadow"
                        style={[styles.analyticsCard, styles.analyticsShadow]}
                    ></View>
                    <View id="analyticsCard" style={styles.analyticsCard}>
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
                </View>

                <View id="historyFrame" style={styles.historyFrame}>
                    <View
                        id="historyShadow"
                        style={[styles.historyCard, styles.historyShadow]}
                    ></View>
                    <View id="historyCard" style={styles.historyCard}>
                        <Text id="historyTitle" style={styles.historyTitle}>
                            Trip History
                        </Text>
                        <Text id="historyText" style={styles.historyText}>
                            {num_trips} trips
                        </Text>
                    </View>
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

export default ProfilePage2;

const styles = StyleSheet.create({
    pageFrame: { flex: 1 },
    topFrame: {
        flex: 4,
        width: "100%",
        alignSelf: "center",
        marginBottom: 10,
        // backgroundColor: "red",
    },
    topShadow: {
        // left: 6,
        top: 10,
        backgroundColor: "black",
    },
    topCard: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderWidth: 5,
        borderColor: "black",
        borderRadius: 32,
        backgroundColor: cream,
        overflow: "hidden",
    },
    safeFrame: {
        flex: 5,
        marginHorizontal: 10,
        flexDirection: "row",
    },
    ratingFrame: {
        flex: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    pass_rating: {
        flex: 1,
        fontSize: 20,
    },
    driver_rating: {
        flex: 1,
        fontSize: 20,
    },
    hey: {
        flex: 2,
        fontSize: 48,
    },
    friendsFrame: {
        flex: 2,
        // justifyContent: "center",
        // alignItems: "center",
        alignSelf: "flex-end",
        width: "70%",
        right: -5,
    },
    friendShadow: {},
    friendsButton: {
        position: "absolute",
        width: "100%",
        height: "100%",
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 5,
        borderColor: "black",
        // backgroundColor: "black",
        borderRadius: 32,
    },
    friendsText: {
        color: "black",
        fontSize: 32,
    },
    cardsFrame: {
        flex: 3,
        alignItems: "center",
        // backgroundColor: "blue",
    },
    analyticsFrame: {
        flex: 1,
        width: "60%",
        marginLeft: -100,
        marginVertical: 5,
        // backgroundColor: "red",
    },
    analyticsShadow: {
        left: -6,
        top: 6,
        backgroundColor: "black",
    },
    analyticsCard: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderWidth: 5,
        borderColor: "black",
        borderRadius: 32,
        backgroundColor: green,
        // justifyContent: "center",
        alignItems: "center",
    },
    analyticsTitle: {
        color: cream,
        fontSize: 40,
    },
    co2: {
        color: cream,
        fontSize: 20,
    },
    travelled: {
        color: cream,
        fontSize: 20,
    },
    historyFrame: {
        flex: 1,
        width: "60%",
        marginLeft: 100,
        marginVertical: 5,
        // backgroundColor: "red",
    },
    historyShadow: {
        left: 6,
        top: 6,
        backgroundColor: "black",
    },
    historyCard: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderWidth: 5,
        borderColor: "black",
        borderRadius: 32,
        backgroundColor: orange,
        // justifyContent: "center",
        alignItems: "center",
    },
    historyTitle: {
        color: cream,
        fontSize: 40,
    },
    historyText: {
        color: cream,
        fontSize: 20,
    },
    switchFrame: {
        flex: 1,
        alignItems: "center",
        // backgroundColor: "green",
    },
    switchButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        top: 5,
        // backgroundColor: "black",
    },
    switchText: {
        color: cream,
        fontSize: 40,
        fontStyle: "italic",
    },
});
