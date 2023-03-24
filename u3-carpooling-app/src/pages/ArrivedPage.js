import {
    Pressable,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Linking,
    Alert,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import LiveMap from "../components/LiveMap";
import Svg, { SvgProps, G, Path, Defs } from "react-native-svg";
import GridBackground from "../../assets/grid-background";
import { BarCodeScanner } from "expo-barcode-scanner";
import RestAPI from "../hooks/Rest";
import { useNavigation } from "@react-navigation/native";
import PaymentPage from "./PaymentPage";
import ReturnSpecDriver from "../hooks/ReturnSpecDriver";
import { useSelector } from "react-redux";

const cream = "#F7F3EB";
const yellow = "#FFB800";
const green = "#4CD835";
const greenShadow = "#278A17";
const charcoal = "#3F3F3F";
const black = "#272727";
const blue = "#1774ff";

const ArrivedPage = () => {
    const navigation = useNavigation();
    const myUserRole = useSelector((state) => state.mySlice.myUserRole);

    // background grid colour to represent role
    let secondColour = yellow;
    // if (myUserRole === 0) {
    //     secondColour = cream;
    // } else {
    //     secondColour = yellow;
    // }

    const onPressMap = () => {
        console.log("Take to Map");
    };

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getBarCodeScannerPermissions();
    }, []);
    const userNo = useSelector((state) => state.mySlice.myUserID);
    const result = ReturnSpecDriver(userNo.toString());

    function showAlert() {
        Alert.alert(
            "Uh oh!",
            "That's the wrong QR Code!",
            [{ text: "My Bad", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
        );
    }

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setShow(false);
        if (
            data ===
            result.email + result.name + result.pwdHash + result.userID
        ) {
            navigation.navigate("PaymentPage", {
                value: result.name,
            });
        } else {
            showAlert();
            console.log("This isn't the right driver");
        }
        setScanned(false);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    function ShowScanner() {
        if (show) {
            return (
                <BarCodeScanner
                    onBarCodeScanned={
                        scanned ? undefined : handleBarCodeScanned
                    }
                    style={{
                        height: 500,
                        width: Dimensions.get("window").width,
                    }}
                />
            );
        }
    }

    function ShowButton() {
        if (!show) {
            return (
                <View id="cardFrame" style={styles.cardFrame}>
                    <Pressable
                        id="qr"
                        style={styles.qr}
                        onPress={() => setShow(true)}
                    >
                        <View id="qrTextFrame" style={styles.qrTextFrame}>
                            <Text id="qrText" style={styles.qrText}>
                                scan{"\n"}Driver's{"\n"}QR{"\n"}code.
                            </Text>
                        </View>
                        <View id="qrSymbol" style={styles.qrSymbol}>
                            <Svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={88}
                                height={88}
                                fill="none"
                                // {...props}
                                style={{
                                    justifyContent: "flex-end",
                                    alignItems: "flex-end",
                                    // marginLeft: -35,
                                    // marginBottom: 4,
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
                        </View>
                    </Pressable>
                    <View id="qrShadow" style={[styles.qr, styles.qrShadow]} />
                </View>
            );
        }
    }

    return (
        <View id="pageFrame" style={styles.pageFrame}>
            <GridBackground
                lineColor={secondColour}
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
                <ShowButton />
                <ShowScanner />
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
        flex: 2.5,
        width: "100%",
        marginTop: "10%",
        // backgroundColor: "red",
    },
    map: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: "5%",
    },
    mapCardStyle: {
        width: "100%",
        height: "100%",
        borderColor: green,
        borderWidth: 5,
        borderRadius: 32,
        overflow: "hidden",
    },
    mapShadowStyle: {
        zIndex: -1,
        backgroundColor: greenShadow,
        borderColor: greenShadow,
        position: "absolute",
        top: 6,
        left: 6,
    },
    titleFrame: {
        flex: 1.5,
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        // backgroundColor: "blue",
    },
    title: {
        fontFamily: "syne",
        fontSize: 48,
        color: cream,
        textAlign: "center",
    },
    titleShadow: {
        zIndex: -1,
        color: greenShadow,
        marginTop: -105,
        marginRight: -10,
    },
    subTitle: {
        fontFamily: "atkinson-italic",
        fontSize: 24,
        color: cream,
        textAlign: "center",
        // marginTop: -10,
    },
    qrFrame: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "green",
    },
    qr: {
        zIndex: 0,
        height: "80%",
        width: "65%",
        backgroundColor: cream,
        borderColor: charcoal,
        borderWidth: 5,
        borderRadius: 32,
        flexDirection: "row",
    },
    qrShadow: {
        zIndex: -1,
        backgroundColor: "black",
        borderColor: "black",
        position: "absolute",
        top: 6,
        left: 6,
    },
    qrTextFrame: {
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "5%",
    },
    qrSymbol: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginRight: "5%",
        marginBottom: "5%",
    },
    qrText: {
        color: black,
        fontFamily: "atkinson-regular",
        fontSize: 40,
        letterSpacing: 3,
        textShadowColor: "rgba(0, 0, 0, 0.5)",
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 7,
    },
});
