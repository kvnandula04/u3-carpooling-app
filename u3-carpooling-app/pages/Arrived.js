import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import LiveMap from "../components/LiveMap";

const cream = "#F7F3EB";
const green = "#218C4C";
const charcoal = "#3F3F3F";
const black = "#272727";

const Arrived = () => {
    const onPressQR = () => {
        console.log("Take to QR Scanner");
    };

    return (
        <View id="pageFrame" style={styles.pageFrame}>
            <View id="mapFrame" style={styles.mapFrame}>
                <LiveMap id="map" style={styles.ma} p />
            </View>
            <View id="titleFrame" style={styles.titleFrame}>
                <Text id="title" style={styles.title}>
                    You've{"\n"}Arrived!
                </Text>
                {/* <Text
                    id="titleShadow"
                    style={[styles.title, styles.titleShadow]}
                >
                    You've{"\n"}Arrived!
                </Text> */}
                <Text id="subTitle" style={styles.subTitle}>
                    Confirm your trip is complete by...
                </Text>
            </View>
            <View id="qrFrame" style={styles.qrFrame}>
                <Pressable id="qr" style={styles.qr} onPress={onPressQR}>
                    <Text id="qrText" style={styles.qrText}>
                        scan{"\n"}Driver's{"\n"}QR{"\n"}code
                    </Text>
                </Pressable>
                {/* <View id="qrShadow" style={[styles.qr, styles.qrShadow]}></View> */}
            </View>
        </View>
    );
};

export default Arrived;

const styles = StyleSheet.create({
    pageFrame: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    mapFrame: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
    },
    map: {
        flex: 1,
    },
    titleFrame: {
        flex: 1,
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "blue",
    },
    title: {
        zIndex: 1,
        fontSize: 48,
        color: cream,
        textAlign: "center",
    },
    titleShadow: {
        zIndex: 0,
        color: green,
    },
    subTitle: {
        fontSize: 24,
        color: cream,
        textAlign: "center",
    },
    qrFrame: {
        flex: 2,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green",
    },
    qr: {
        zIndex: 1,
        height: "60%",
        width: "60%",
        backgroundColor: cream,
        borderColor: charcoal,
        borderWidth: 5,
        borderRadius: 32,
    },
    qrShadow: {
        zIndex: 0,
        backgroundColor: "black",
        borderColor: "black",
    },
    qrText: {
        color: black,
        fontSize: 48,
    },
});
