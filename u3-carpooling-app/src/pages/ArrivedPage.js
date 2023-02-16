import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import LiveMap from "../components/LiveMap";
import Svg, { SvgProps, G, Path, Defs } from "react-native-svg";
import GridBackground from "../../assets/grid-background";

const cream = "#F7F3EB";
const green = "#4CD835";
const greenShadow = "#278A17";
const charcoal = "#3F3F3F";
const black = "#272727";

const ArrivedPage = () => {
    const onPressQR = () => {
        console.log("Take to QR Scanner");
    };
    const onPressMap = () => {
        console.log("Take to Map");
    };

    return (
        <View id="pageFrame" style={styles.pageFrame}>
            <GridBackground
                lineColor={cream}
                style={{
                    position: "absolute",
                    zIndex: -5,
                    backgroundColor: black,
                }}
            />
            <View id="mapFrame" style={styles.mapFrame}>
                <LiveMap
                    id="map"
                    style={styles.map}
                    onPress={onPressMap}
                    cardStyle={styles.mapCardStyle}
                    shadowStyle={styles.mapShadowStyle}
                />
            </View>
            <View id="titleFrame" style={styles.titleFrame}>
                <Text id="title" style={styles.title}>
                    You've{"\n"}Arrived!
                </Text>
                <Text
                    id="titleShadow"
                    style={[styles.title, styles.titleShadow]}
                >
                    You've{"\n"}Arrived!
                </Text>
                <Text id="subTitle" style={styles.subTitle}>
                    Confirm your trip is complete by...
                </Text>
            </View>
            <View id="qrFrame" style={styles.qrFrame}>
                <Pressable id="qr" style={styles.qr} onPress={onPressQR}>
                    <Text id="qrText" style={styles.qrText}>
                        scan{"\n"}Driver's{"\n"}QR{"\n"}code.
                    </Text>
                    <Svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={88}
                        height={88}
                        fill="none"
                        // {...props}
                        style={{
                            marginLeft: -35,
                            marginBottom: 4,
                        }}
                    >
                        <G filter="url(#a)">
                            <Path
                                stroke="#272727"
                                strokeLinecap="square"
                                strokeWidth={5}
                                d="M31.17 8.5H16.06a7.56 7.56 0 0 0-7.56 7.56v15.1M31.17 76.5H16.06a7.56 7.56 0 0 1-7.56-7.56v-15.1M53.83 8.5h15.11a7.56 7.56 0 0 1 7.56 7.56v15.1m0 22.67v15.11a7.56 7.56 0 0 1-7.56 7.56h-15.1M8.5 42.5h68"
                            />
                        </G>
                        <Defs></Defs>
                    </Svg>
                </Pressable>
                <View id="qrShadow" style={[styles.qr, styles.qrShadow]}></View>
            </View>
        </View>
    );
};

export default ArrivedPage;

const styles = StyleSheet.create({
    pageFrame: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: black,
    },
    mapFrame: {
        flex: 2,
        width: "100%",
        // backgroundColor: "red",
    },
    map: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    mapCardStyle: {
        width: "90%",
        height: "80%",
        marginBottom: 5,
        borderColor: green,
        borderWidth: 5,
        borderRadius: 32,
        overflow: "hidden",
    },
    mapShadowStyle: {
        zIndex: -1,
        backgroundColor: greenShadow,
        borderColor: greenShadow,
        marginTop: -214,
        marginRight: -12,
    },
    titleFrame: {
        flex: 1,
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        // backgroundColor: "blue",
    },
    title: {
        fontSize: 48,
        color: cream,
        textAlign: "center",
    },
    titleShadow: {
        zIndex: -1,
        color: greenShadow,
        marginTop: -114,
        marginRight: -8,
    },
    subTitle: {
        fontSize: 24,
        color: cream,
        textAlign: "center",
        marginTop: -10,
    },
    qrFrame: {
        flex: 3,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "green",
    },
    qr: {
        zIndex: 0,
        height: "60%",
        width: "60%",
        backgroundColor: cream,
        borderColor: charcoal,
        borderWidth: 5,
        borderRadius: 32,
        flexDirection: "row",
        alignItems: "flex-end",
    },
    qrShadow: {
        zIndex: -1,
        backgroundColor: "black",
        borderColor: "black",
        marginTop: -234,
        marginRight: -12,
    },
    qrText: {
        color: black,
        fontSize: 48,
        width: "75%",
    },
});
