import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const PlanTrip = () => {
    const onMatchMePressed = () => {
        navigation.navigate("LiveTripPage");
    };

    return (
        <View style={styles.flex3}>
            <View id="planTripFrame" style={styles.planTripFrame}>
                <View id="planTripCard" style={styles.planTripCard}>
                    <View
                        id="planTripTitleView"
                        style={styles.planTripTitleView}
                    >
                        <Text style={styles.planTripTitle}>Plan a trip</Text>
                    </View>
                    <View id="list" style={styles.planList}>
                        <View style={styles.planListRow}>
                            <Text style={styles.bodyBoldItalic}>
                                Start location:{" "}
                            </Text>
                            <Text style={styles.body}>53 Hungerford Rd. </Text>
                        </View>
                        <View style={styles.planListRow}>
                            <Text style={styles.bodyBoldItalic}>
                                Destination:{" "}
                            </Text>
                            <Text style={styles.body}>University of Bath</Text>
                        </View>
                        <View style={styles.planListRow}>
                            <Text style={styles.bodyBoldItalic}>
                                Arrival time:{" "}
                            </Text>
                            <Text style={styles.body}>10:05</Text>
                        </View>
                    </View>
                </View>
                <View
                    id="planTripShadow"
                    style={[styles.planTripCard, styles.planTripShadow]}
                />
                <View id="matchMeButton" style={styles.matchMeButton}>
                    <Pressable onPress={onMatchMePressed}>
                        <Text style={styles.matchMeButtonText}>Match me</Text>
                    </Pressable>
                </View>
                <View
                    id="matchMeButtonShadow"
                    style={[styles.matchMeButton, styles.matchMeButtonShadow]}
                />
            </View>
        </View>
    );
};

export default PlanTrip;

const styles = StyleSheet.create({
    flex3: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "orange",
    },
    planTripFrame: {
        width: "80%",
        height: "80%",
    },
    planTripCard: {
        width: "100%",
        height: "100%",
        borderRadius: 32,
        borderColor: "#000",
        borderWidth: 5,
        backgroundColor: "#fff",
    },
    planTripTitle: {
        fontFamily: "syne-bold",
        fontSize: 32,
        color: "#ffb800",
        textDecorationLine: "underline",
    },
    planTripShadow: {
        zIndex: -1,
        backgroundColor: "#000",
        position: "absolute",
        top: 6,
        left: 6,
    },
    matchMeButton: {
        width: "45%",
        height: "30%",
        position: "absolute",
        bottom: -15,
        right: -15,
        backgroundColor: "#efece8",
        borderWidth: 5,
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center",
    },
    matchMeButtonText: {
        fontFamily: "syne-bold",
        fontSize: 20,
        color: "#9747ff",
    },
    matchMeButtonShadow: {
        zIndex: -1,
        backgroundColor: "#000",
        position: "absolute",
        bottom: -20,
        right: -20,
    },
    planTripTitleView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        marginRight: "5%",
    },
    planList: {
        flex: 2.5,
        flexDirection: "column",
        justifyContent: "space-evenly",
        marginLeft: "5%",
    },
    planListRow: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
    },

    body: {
        fontFamily: "atkinson-regular",
        fontSize: 18,
    },
    bodyBoldItalic: {
        fontFamily: "atkinson-italic",
        fontSize: 18,
    },
});
