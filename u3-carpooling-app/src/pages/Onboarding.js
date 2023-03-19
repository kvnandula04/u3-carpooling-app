import React, { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import Logo from "../components/Logo";
import useFonts from "../hooks/UseFonts";
import GridBackground from "../../assets/grid-background";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { updateUserID } from "../../globalVariables/mySlice";
import RestAPI from "../hooks/Rest";

export default function Onboarding() {
    const [IsReady, SetIsReady] = useState(false);
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [callOne, setCallOne] = useState(false);
    const [recvOne, setRecvOne] = useState(false);
    const [callTwo, setCallTwo] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const onSubmitPressed = () => {
        if (!userName.trim() || !firstName.trim() || !password.trim()) {
            alert("All fields must be filled. Please try again.");
            return;
        }
        if (password !== password2) {
            alert("Passwords do not match! Please try again.");
            return;
        }
        if (password.length < 6) {
            alert("Password must be at least 6 characters. Please try again.");
            return;
        }

        console.log("Onboarding: Form submitted");
        setCallOne(true);
        setRecvOne(false);
    };

    const result = RestAPI(
        {
            operation: "insert",
            table: "User",
            name: firstName,
            email: userName + "@bath.ac.uk",
            pwdHash: password,
        },
        {},
        callOne
    );

    if (callOne) {
        setCallOne(false);
    }

    if (!recvOne) {
        if (
            result == "sqlite3IntegrityError UNIQUE constraint failed Useremail"
        ) {
            alert("User already exists. Please try a different username.");
            setRecvOne(true);
        } else if (result == "success") {
            setRecvOne(true);
            setCallTwo(true);
        }
    }

    const user = RestAPI(
        { operation: "select", table: "User", email: userName + "@bath.ac.uk" },
        { userID: null },
        callTwo
    )[0];

    if (callTwo) {
        setCallTwo(false);
    }

    if (user.userID) {
        dispatch(updateUserID(user.userID));
        navigation.navigate("DriverVerification");
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

    console.log("Render: Onboarding");
    return (
        <View style={styles.container}>
            <GridBackground
                position="absolute"
                zIndex={-5}
                lineColor={"#FFB800"}
                style={{ backgroundColor: "#1daf59" }}
            />

            <View style={styles.flex1}>
                <Logo fontSize={50} color={"#f7f3eb"} marginTop={"15%"} />
            </View>

            <View style={styles.flex2}>
                <Text style={styles.heading}>Create an Account</Text>
            </View>

            <View style={styles.flex3}>
                <Text style={styles.subheading}> Enter your details: </Text>
                <View id="userNameFrame" style={styles.frame}>
                    <View id="userNameButton" style={styles.button}>
                        <TextInput
                            style={styles.text}
                            placeholder="UoB username"
                            value={userName}
                            onChangeText={(userName) => setUserName(userName)}
                        ></TextInput>
                    </View>
                    <View
                        id="userNameShadow"
                        style={[styles.button, styles.shadow]}
                    ></View>
                </View>
                <View id="firstNameFrame" style={styles.frame}>
                    <View id="firstNameButton" style={styles.button}>
                        <TextInput
                            style={styles.text}
                            placeholder="First Name"
                            value={firstName}
                            onChangeText={(firstName) =>
                                setFirstName(firstName)
                            }
                        ></TextInput>
                    </View>
                    <View
                        id="firstNameShadow"
                        style={[styles.button, styles.shadow]}
                    ></View>
                </View>
                <View id="passwordFrame" style={styles.frame}>
                    <View id="passwordButton" style={styles.button}>
                        <TextInput
                            style={styles.text}
                            placeholder="Password"
                            value={password}
                            onChangeText={(password) => setPassword(password)}
                            secureTextEntry={true}
                        ></TextInput>
                    </View>
                    <View
                        id="passwordShadow"
                        style={[styles.button, styles.shadow]}
                    ></View>
                </View>
                <View id="password2Frame" style={styles.frame}>
                    <View id="password2Button" style={styles.button}>
                        <TextInput
                            style={styles.text}
                            placeholder="Re-enter Password"
                            value={password2}
                            onChangeText={(password2) =>
                                setPassword2(password2)
                            }
                            secureTextEntry={true}
                        ></TextInput>
                    </View>
                    <View
                        id="password2Shadow"
                        style={[styles.button, styles.shadow]}
                    ></View>
                </View>
            </View>

            {/* <View style={styles.flex4}></View> */}

            <View style={styles.flex5}>
                <TouchableOpacity
                    style={styles.button2}
                    onPress={onSubmitPressed}
                >
                    <Text
                        style={[styles.text, { fontSize: 34, color: "#fff" }]}
                    >
                        submit.
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flex1: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#1daf59",
    },
    flex2: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "black",
    },
    flex3: {
        flex: 6,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: "5%",
        // backgroundColor: "red",
    },
    flex4: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    flex5: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        // paddingBottom: "15%",
    },
    heading: {
        fontFamily: "atkinson-italic",
        fontSize: 54,
        color: "#f7f3eb",
        lineHeight: 53,
        shadowColor: "#000",
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
        width: "75%",
        // height: "25%",
        height: 60,
        marginBottom: "5%",
        // backgroundColor: "white",
    },
    button: {
        width: "100%",
        height: "100%",
        borderRadius: 32,
        borderColor: "#000",
        borderWidth: 5,
        backgroundColor: "#ffb800",
        justifyContent: "center",
        alignItems: "center",
    },
    shadow: {
        zIndex: -1,
        position: "absolute",
        backgroundColor: "#000",
        top: 6,
        left: 6,
    },
    text: {
        fontSize: 24,
        fontFamily: "atkinson-italic",
        color: "#1774fb",
        textAlign: "center",
    },
    button2: {
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#1774fb",
        marginTop: "2%",
        // padding: "5%",
    },
});
