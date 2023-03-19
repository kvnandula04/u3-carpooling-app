import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import GridBackground from "../../assets/grid-background";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileCircle from "../components/ProfileCircle";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { useSelector } from "react-redux";

const cream = "#F7F3EB";
const yellow = "#FFB800";
const orange = "#F55726";
const green = "#4CD835";
const greenShadow = "#278A17";
const charcoal = "#3F3F3F";
const black = "#272727";
const blue = "#1774ff";

const ProfilePage2 = () => {
    const roles = ["Driver", "Passenger"];
    const [IsReady, SetIsReady] = useState(false);

    const myUserRole = useSelector((state) => state.mySlice.myUserRole);

    var username = "John";
    var passenger_rating = 4.5;
    var driver_rating = 4.8;
    var co2 = 0.5;
    var travelled = 5.2;
    var num_trips = 10;

    const onPressFriends = () => {
        console.log("Go to Friends Page");
    };
    const onPressSwitch = () => {
        console.log("Switch role to " + roles[(myUserRole + 1) % 2]);
    };

    useEffect(() => {
        async function prepare() {
            try {
                await useFonts();
            } catch (e) {
                console.warn(e);
            } finally {
                SetIsReady(true);
            }
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (IsReady) {
            await SplashScreen.hideAsync();
        }
    }, [IsReady]);

    if (!IsReady) {
        return null;
    }

    return (
        <View id="pageFrame" style={styles.pageFrame}>
            <GridBackground
                lineColor={cream}
                style={{
                    position: "absolute",
                    zIndex: -5,
                    backgroundColor: "#272727",
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
                                left: "-1%",
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
                        <Text id="driver_rating" style={styles.dangerous}>
                            Sign out.
                        </Text>
                        <View
                            style={{
                                flex: 1,
                                width: "60%",
                                flexDirection: "row",
                            }}
                        >
                            <Text id="driver_rating" style={styles.dangerous}>
                                Delete account.
                            </Text>
                            <Icon
                                name="delete"
                                type="delete"
                                color="red"
                                size={"40%"}
                            />
                        </View>
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
        </View>
    );
};

export default ProfilePage2;

const styles = StyleSheet.create({
    pageFrame: { flex: 1 },
    topFrame: {
        flex: 2.5,
        width: "105%",
        alignSelf: "center",
        marginBottom: "1%",
        marginTop: "-5%",
    },
    topShadow: {
        top: 10,
        backgroundColor: "#1774ff",
    },
    topCard: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderWidth: 5,
        borderColor: "#1774ff",
        borderRadius: 60,
        backgroundColor: cream,
        overflow: "hidden",
    },
    safeFrame: {
        flex: 5,
        marginHorizontal: "8%",
        flexDirection: "row",
        alignItems: "center",
    },
    ratingFrame: {
        flex: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    pass_rating: {
        flex: 1,
        fontFamily: "atkinson",
        fontSize: 30,
    },
    driver_rating: {
        flex: 1,
        fontFamily: "atkinson",
        fontSize: 30,
    },
    dangerous: {
        flex: 1,
        fontFamily: "atkinson",
        fontSize: 30,
        color: "red",
    },
    hey: {
        flex: 2,
        fontFamily: "syne",
        fontSize: 48,
        shadowColor: "#7c7c7c",
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: {
            height: 6,
            width: -4,
        },
    },
    friendsFrame: {
        flex: 2,
        backgroundColor: "#efece8",
    },
    friendsButton: {
        width: "100%",
        height: "70%",
        position: "absolute",
        bottom: "-3%",
        right: "0%",
        backgroundColor: "#efece8",
        borderWidth: 5,
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center",
    },
    friendShadow: {
        zIndex: -1,
        backgroundColor: "#000",
        position: "absolute",
        top: 6,
        left: 6,
    },
    friendsText: {
        color: "#000",
        fontSize: 32,
    },
    cardsFrame: {
        flex: 2,
        alignItems: "center",
        marginTop: "5%",
        marginBottom: "10%",
    },
    analyticsFrame: {
        flex: 1,
        width: "70%",
        marginLeft: "-15%",
        marginVertical: "5%",
    },
    analyticsShadow: {
        left: -6,
        top: 6,
        backgroundColor: cream,
    },
    analyticsCard: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderWidth: 5,
        borderColor: cream,
        borderRadius: 32,
        backgroundColor: green,
        alignItems: "center",
        justifyContent: "center",
    },
    analyticsTitle: {
        color: "#000",
        fontFamily: "syne",
        fontSize: 30,
        marginBottom: "5%",
    },
    co2: {
        color: "#000",
        fontFamily: "atkinson",
        fontSize: 20,
    },
    travelled: {
        color: "#000",
        fontFamily: "atkinson",
        fontSize: 20,
    },
    historyFrame: {
        flex: 1,
        width: "70%",
        marginLeft: "15%",
        marginVertical: "5%",
    },
    historyShadow: {
        left: 6,
        top: 6,
        backgroundColor: cream,
    },
    historyCard: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderWidth: 5,
        borderColor: cream,
        borderRadius: 32,
        backgroundColor: orange,
        alignItems: "center",
        justifyContent: "center",
    },
    historyTitle: {
        color: cream,
        fontFamily: "syne",
        fontSize: 30,
        marginBottom: "5%",
    },
    historyText: {
        color: cream,
        fontFamily: "atkinson",
        fontSize: 25,
    },
});
