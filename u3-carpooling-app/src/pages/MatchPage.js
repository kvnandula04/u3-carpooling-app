import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import GridBackground from "../../assets/grid-background";
import LiveMap from "../components/LiveMap";
import { SafeAreaView } from "react-native-safe-area-context";

const MatchPage = () => {
    const onPressCancel = () => {
        console.log("Cancel Trip Pressed");
    };
    const onPressShedule = () => {
        console.log("Shedule Another Trip Pressed");
    };

    return (
        <View id="pageFrame" style={styles.pageFrame}>
            <GridBackground
                position="absolute"
                zIndex={-5}
                lineColor={"black"}
                style={{ backgroundColor: "#f7f3eb" }}
            />
            <SafeAreaView id="mapFrame" style={styles.mapFrame}>
                <View id="mapCard" style={styles.mapCard}>
                    <LiveMap
                        cardStyle={styles.mapStyle}
                        shadowStyle={styles.shadowStyle}
                        text="U3"
                    />
                    <Pressable
                        id="cancelButton"
                        style={styles.cancelButton}
                        onPress={onPressCancel}
                    >
                        <Text id="cancelText" style={styles.cancelText}>
                            cancel trip
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>
            <View id="matchFrame" style={styles.matchFrame}></View>
            <View id="sheduleFrame" style={styles.sheduleFrame}>
                <Pressable
                    id="sheduleButton"
                    style={styles.sheduleButton}
                    onPress={onPressShedule}
                >
                    <Text id="sheduleText" style={styles.sheduleText}>
                        shedule Another Trip
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default MatchPage;

const styles = StyleSheet.create({
    pageFrame: {
        flex: 1,
    },
    mapFrame: {
        flex: 5,
        // backgroundColor: "red",
    },
    mapCard: {
        width: "90%",
        alignSelf: "center",
        // marginTop: "-2%",
    },
    mapStyle: {
        width: "100%",
        height: "100%",
        borderColor: "#000",
        borderWidth: 5,
        borderRadius: 32,
        overflow: "hidden",
    },
    shadowStyle: {
        zIndex: -1,
        position: "absolute",
        top: 6,
        left: 6,
        backgroundColor: "#000",
        borderColor: "#000",
    },
    cancelButton: {
        position: "absolute",
        bottom: 5,
        right: 5,
    },
    cancelText: {
        fontSize: 36,
        color: "red",
    },
    matchFrame: {
        flex: 4,
        backgroundColor: "blue",
    },
    sheduleFrame: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "green",
    },
    sheduleButton: {
        padding: 10,
        backgroundColor: "yellow",
    },
    sheduleText: {
        fontSize: 32,
        fontStyle: "italic",
        color: "black",
    },
});
