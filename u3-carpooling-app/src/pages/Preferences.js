import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
} from "react-native";
import RestAPI from "../hooks/Rest";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import GridBackground from "../../assets/grid-background";
import { useSelector, useDispatch } from "react-redux";
import { updateUserRole } from "../../globalVariables/mySlice";

const cream = "#F7F3EB";
const charcol = "#646464";
const green = "#4CD835";
const greenShadow = "#278A17";
const charcoal = "#3F3F3F";
const black = "#272727";
const blue = "#1774ff";
const orange = "#F55726";

export default function Preferences() {
    const navigation = useNavigation();
    const [role, setRole] = useState(myUserRole);
    const myUserRole = useSelector((state) => state.mySlice.myUserRole);

    const route = useRoute();
    const { message } = route.params;

    const [preferences, setPreferences] = useState({
        location: message.location,
        destination: message.destination,
        departure_time: message.departure_time,
        arrival_time: message.arrival_time,
        detour_distance: message.detour_distance,
        rating: message.rating,
        seats: message.seats,
        prePage: false,
    });

    //console.log("Preferences page- preferences: ",preferences);

    const onPressBack = () => {
        navigation.navigate("OldHomePage", { messagePage: preferences });
    };

    const [apreferences, asetPreferences] = useState(null);

    RestAPI(
        // { operation: "insert", table: "Offer", userID: "3", poolID: "3", role: "1", settings: JSON.stringify(preferences)}
        apreferences
    );

    const handleSavePreferences = () => {
        asetPreferences({
            operation: "insert",
            table: "Offer",
            userID: "3",
            poolID: "3",
            role: "1",
            settings: JSON.stringify(preferences),
        });
    };

    let mainColour = cream;
    let secondColour = charcol;
    if (myUserRole === 1) {
        mainColour = charcol;
        secondColour = cream;
    } else {
        mainColour = cream;
        secondColour = charcol;
    }

    return (
        <View style={styles.container}>
            <GridBackground
                position="absolute"
                zIndex={-5}
                lineColor={mainColour}
                style={{ backgroundColor: secondColour }}
            />
            <View style={styles.scrollView}>
                <Text style={styles.title}>Preferences</Text>
                <Text style={styles.subtitle}>Enter your preferences here</Text>

                <Text style={styles.label}>Maximum Detour Distance</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Maximum Detour Distance"
                    value={preferences.detour_distance}
                    onChangeText={(text) =>
                        setPreferences({
                            ...preferences,
                            detour_distance: text,
                        })
                    }
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Ratings</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter ratings"
                    value={preferences.rating}
                    onChangeText={(text) =>
                        setPreferences({ ...preferences, rating: text })
                    }
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Seats Available</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter number of seats available"
                    value={preferences.seats}
                    onChangeText={(text) =>
                        setPreferences({ ...preferences, seats: text })
                    }
                    keyboardType="numeric"
                />

                <Button
                    title="Save Preferences (back to home)"
                    onPress={onPressBack}
                />

                <Button
                    title="Save Preferences"
                    onPress={handleSavePreferences}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        marginBottom: 20,
    },
    label: {
        fontSize: 20,
        marginBottom: 10,
        backgroundColor: "white",
    },
    input: {
        height: 40,
        width: 300,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 20,
        backgroundColor: "white",
    },
    scrollView: {
        marginHorizontal: 20,
        top: "-10%",
        // backgroundColor: "blue",
        alignItems: "center",
        justifyContent: "center",
    },
});
