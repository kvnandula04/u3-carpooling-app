import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";

const PlanTrip = () => {
    const [startLocation, setStartLocation] = React.useState("");
    const [destination, setDestination] = React.useState("");
    const [departTime, setDepartTime] = React.useState("");
    const [arrivalTime, setarrivalTime] = React.useState("");

    const onMatchMePressed = () => {
        navigation.navigate("LiveTripPage");
    };

    return (
        <View id="planTripFrame" style={styles.planTripFrame}>
            <View id="planTripCard" style={styles.planTripCard}>
                <View id="planTripTitleView" style={styles.planTripTitleView}>
                    <Text style={styles.planTripTitle}>Plan a trip</Text>
                </View>
                <View id="list" style={styles.planList}>
                    <View style={styles.inputFrame}>
                        <Text style={styles.inputTitle}>Start location: </Text>
                        <TextInput
                            style={styles.inputText}
                            placeholder="53 Hungerford Rd"
                            value={startLocation}
                            onChangeText={(startLocation) =>
                                setStartLocation(startLocation)
                            }
                        ></TextInput>
                    </View>
                    <View style={styles.inputFrame}>
                        <Text style={styles.inputTitle}>Destination: </Text>
                        <TextInput
                            style={styles.inputText}
                            placeholder="University of Bath"
                            value={destination}
                            onChangeText={(destination) =>
                                setDestination(destination)
                            }
                        ></TextInput>
                    </View>
                    <View style={styles.inputFrame}>
                        <Text style={styles.inputTitle}>Departure time: </Text>
                        <TextInput
                            style={styles.inputText}
                            placeholder="9:45"
                            value={departTime}
                            onChangeText={(departTime) =>
                                setDepartTime(departTime)
                            }
                        ></TextInput>
                    </View>
                    <View style={styles.inputFrame}>
                        <Text style={styles.inputTitle}>Arrival time: </Text>
                        <TextInput
                            style={styles.inputText}
                            placeholder="10:05"
                            value={arrivalTime}
                            onChangeText={(arrivalTime) =>
                                setarrivalTime(arrivalTime)
                            }
                        ></TextInput>
                    </View>
                </View>
            </View>
            <View
                id="planTripShadow"
                style={[styles.planTripCard, styles.planTripShadow]}
            />
            <View id="matchMeButton" style={styles.matchMeButton}>
                <Pressable onPress={onMatchMePressed}>
                    <Text style={styles.matchMeButtonText}>Match me!</Text>
                </Pressable>
            </View>
            <View
                id="matchMeButtonShadow"
                style={[styles.matchMeButton, styles.matchMeButtonShadow]}
            />
        </View>
    );
};

export default PlanTrip;

const styles = StyleSheet.create({
    planTripFrame: {
        flex: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    planTripCard: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 32,
        borderColor: "#000",
        borderWidth: 5,
        backgroundColor: "#fff",
    },
    planTripTitle: {
        fontFamily: "syne-bold",
        fontSize: 36,
        color: "#ffb800",
        // textDecorationLine: "underline",
    },
    planTripShadow: {
        zIndex: -1,
        backgroundColor: "#000",
        position: "absolute",
        top: 6,
        left: 6,
    },
    planTripTitleView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: "2%",
        marginBottom: "-2%",
        marginRight: "4%",
    },
    planList: {
        flex: 4,
        flexDirection: "column",
        justifyContent: "space-evenly",
        marginLeft: "5%",
    },
    inputFrame: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        // backgroundColor: "#efece8",
    },
    inputTitle: {
        fontFamily: "atkinson-italic",
        fontSize: 18,
    },
    inputText: {
        fontFamily: "atkinson-regular",
        fontSize: 18,
    },
    matchMeButton: {
        width: "45%",
        height: "30%",
        position: "absolute",
        bottom: -15,
        right: -20,
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
        right: -25,
    },
});
