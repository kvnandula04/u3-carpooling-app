import React, { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Pressable,
} from "react-native";
import Logo from "../components/Logo";
import useFonts from "../hooks/UseFonts";
import GridBackground from "../../assets/grid-background";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import RestAPI from "../hooks/Rest";

export default function DriverVerification() {
    const [IsReady, SetIsReady] = useState(false);
    const [numberPlate, setNumberPlate] = useState("");
    const [licence, setLicence] = useState("");
    const [callOne, setCallOne] = useState(false);
    const [recvOne, setRecvOne] = useState(false);
    const [callTwo, setCallTwo] = useState(false);
    const navigation = useNavigation();
    const myUserID = useSelector((state) => state.mySlice.myUserID);

    const onSkipPressed = () => {
        navigation.navigate("OldHomePage");
    };
    const onSubmitPressed = () => {
        if (!licence.trim() || !numberPlate.trim()) {
            alert("All fields must be filled. Please try again.");
            return;
        }

        console.log("DriverVerification: Form submitted");
        setCallOne(true);
        setRecvOne(false);
    };

    const vehicle = RestAPI(
        {
            operation: "vehiclelookup",
            registrationNumber: numberPlate.toUpperCase().replace(/\s/g,""),
        },
        { vehicleID: null },
        ( callOne )
    )[0];

    if (callOne) {
        setCallOne(false);
    }

    console.log(vehicle);

    if (!recvOne) {
        if (vehicle == "f") {
            alert("Invalid vehicle registration. Please try again.");
            setRecvOne(true);
        } else if (vehicle.vehicleID) {
            setRecvOne(true);
            setCallTwo(true);
        }
    }

    RestAPI(
        {
            operation: "insert",
            table: "Licence",
            licenceNumber: licence,
            userID: myUserID,
            vehicleID: vehicle.vehicleID,
        },
        {},
        callTwo
    );

    if (callTwo) {
        setCallTwo(false);
        navigation.navigate("OldHomePage");
    }

    // Loading in fonts
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

    console.log("Render: DriverVerification");
    return (
        <View style={styles.container}>
            <GridBackground
                position="absolute"
                zIndex={-5}
                lineColor={"#FFB800"}
                style={{ backgroundColor: "#2e73da" }}
            />

            <View style={styles.flex1}>
                <Logo fontSize={40} color={"#f7f3eb"} marginTop={"15%"} />
            </View>

            <View style={styles.flex2}>
                <Text style={styles.heading}>Be a{"\n"}Driver?</Text>
            </View>

            <View style={styles.flex3}>
                <Text style={styles.subheading}>
                    {" "}
                    Enter your car's number plate:{" "}
                </Text>
                <View id="numberPlateFrame" style={styles.frame}>
                    <View id="numberPlateButton" style={styles.button}>
                        <TextInput
                            style={styles.text}
                            placeholder="Registration Number   "
                            value={numberPlate}
                            onChangeText={(numberPlate) =>
                                setNumberPlate(numberPlate)
                            }
                        ></TextInput>
                    </View>
                    <View
                        id="numberPlateButtonShadow"
                        style={[styles.button, styles.buttonShadow]}
                    ></View>
                </View>
                <View id="licenceFrame" style={styles.frame}>
                    <View id="licenceButton" style={styles.button}>
                        <TextInput
                            style={styles.text}
                            placeholder="Licence Number  "
                            value={licence}
                            onChangeText={(licence) => setLicence(licence)}
                        ></TextInput>
                    </View>
                    <View
                        id="licenceButtonShadow"
                        style={[styles.button, styles.buttonShadow]}
                    ></View>
                </View>
            </View>

            <View style={styles.flex4}>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={onSubmitPressed}
                >
                    <Text style={styles.text}>submit.</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.flex5}>
                <TouchableOpacity
                    style={styles.skipButton}
                    onPress={onSkipPressed}
                >
                    <Text style={[styles.text, { fontSize: 24 }]}>skip</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.flex6}>
                <View style={styles.circle2}></View>
                <View style={styles.circle2}></View>
                <View style={styles.circle1}></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flex1: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    flex2: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    flex3: {
        flex: 1.5,
        justifyContent: "center",
        alignItems: "center",
        marginTop: "15%",
    },
    flex4: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        marginTop: "15%",
    },
    flex5: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10%",
    },
    flex6: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingBottom: "10%",
    },
    heading: {
        fontFamily: "atkinson-italic",
        fontSize: 54,
        color: "#ffb800",
        lineHeight: 53,
        shadowColor: "#000000",
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: {
            height: 4,
            width: 4,
        },
        textAlign: "center",
    },
    subheading: {
        fontFamily: "atkinson-italic",
        fontSize: 24,
        color: "#f7f3eb",
        lineHeight: 53,
        textAlign: "center",
    },
    frame: {
        width: "80%",
        height: 70,
        marginBottom: "5%",
        // backgroundColor: "white",
    },
    button: {
        width: "100%",
        height: "100%",
        borderRadius: 32,
        borderColor: "#000",
        borderWidth: 5,
        backgroundColor: "#f55726",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonShadow: {
        zIndex: -1,
        position: "absolute",
        backgroundColor: "#000",
        top: 6,
        left: 6,
    },
    text: {
        fontSize: 28,
        fontFamily: "atkinson-italic",
        color: "#f7f3eb",
        textAlign: "center",
    },
    skipButton: {
        justifyContent: "center",
        alignItems: "center",
    },
    submitButton: {
        justifyContent: "center",
        alignItems: "center",
    },
    circle1: {
        width: 35,
        height: 35,
        borderRadius: 1000,
        borderWidth: 6,
        borderColor: "#000",
        backgroundColor: "#ffb800",
        marginHorizontal: "1%",
    },
    circle2: {
        width: 25,
        height: 25,
        bottom: 5,
        borderRadius: 1000,
        backgroundColor: "#000",
        marginHorizontal: "1%",
    },
});
