import React, { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Pressable,
    SafeAreaView,
    Button,
} from "react-native";
import Logo from "../components/Logo";
import useFonts from "../hooks/UseFonts";
import GridBackground from "../../assets/grid-background";
import { useNavigation } from "@react-navigation/native";

export default function SignupLoginPage() {
    const [IsReady, SetIsReady] = useState(false);
    const navigation = useNavigation();
    const onSignupPressed = () => {
        navigation.navigate("StudentVerification");
    };

    const onLoginPressed = () => {
        navigation.navigate("LoginPage");
    };

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

    console.log("Render: SignupLoginPage");
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <GridBackground
                    position="absolute"
                    zIndex={-5}
                    lineColor={"#9A9A9A"}
                    style={{ backgroundColor: "#f7f3eb" }}
                />

                <View id style={styles.flex1}>
                    <Logo fontSize={86} marginTop={"15%"} />
                </View>

                <View id="headingAndJoin" style={styles.flex2}>
                    <Text id="headingText" style={styles.heading}>
                        Student{"\n"}Car Pooling
                    </Text>
                    <View id="joinFrame" style={styles.joinFrame}>
                        <Pressable
                            id="joinButton"
                            style={styles.joinButton}
                            onPress={onSignupPressed}
                        >
                            <Text style={styles.text}>Join</Text>
                        </Pressable>
                        <View
                            id="joinButtonShadow"
                            style={[styles.joinButton, styles.joinButtonShadow]}
                        ></View>
                    </View>
                </View>

                <View style={styles.flex3}>
                    <TouchableOpacity
                        onPress={onLoginPressed}
                        style={styles.sign}
                    >
                        <Text style={styles.text2}>sign in.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    inner: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    flex1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "red",
    },
    flex2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "10%",
        // backgroundColor: "blue",
    },
    heading: {
        fontFamily: "syne",
        fontSize: 40,
        shadowColor: "#3dd37a",
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: {
            height: 4,
            width: 4,
        },
        textAlign: "center",
    },
    joinFrame: {
        width: "40%",
        height: "40%",
        marginTop: "5%",
        // backgroundColor: "white",
    },
    joinButton: {
        width: "100%",
        height: "100%",
        borderRadius: 32,
        borderColor: "#000",
        borderWidth: 5,
        backgroundColor: "#3dd37a",
        justifyContent: "center",
        alignItems: "center",
    },
    joinButtonShadow: {
        zIndex: -1,
        position: "absolute",
        backgroundColor: "#000",
        top: 6,
        left: 6,
    },
    text: {
        fontSize: 36,
        fontFamily: "atkinson",
        color: "#ffffff",
    },
    flex3: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        // backgroundColor: "green",
    },
    sign: {
        padding: "5%",
        // backgroundColor: "red",
    },
    text2: {
        fontSize: 24,
        fontFamily: "atkinson",
        // marginTop: "15%",
    },
});
