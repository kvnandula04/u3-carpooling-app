import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
} from "react-native";
import RestAPI from "../hooks/Rest";

// const useFetchMyApi = (preferences) => {
//     const [data, setData] = useState([]);
//     useEffect(() => {
//         const fetchData = async () => {
//             const result = await RestAPI(
//                 { operation: "insert", table: "Offer", userID: "3", poolID: "3", role: "1", settings: JSON.stringify(preferences)}
//             );
//             setData(result);
//         };
//         fetchData();
//     }, [preferences]);
//     return data;
// };

// const [preferences_a, setPreferences_a] = useState(0);

export default function Preferences() {
    if (preferences_a !== 0) {
        RestAPI({
            operation: "insert",
            table: "Offer",
            userID: "3",
            poolID: "3",
            role: "1",
            settings: JSON.stringify(preferences_a),
        });
    }

    //   const [preferences, setPreferences] = useState({
    //     location: "",
    //     destination: "",
    //     departure_time: "",
    //     detour_distance: "",
    //     rating: "",
    //     seats: ""
    //   });

    const handleSavePreferences = (name) => {
        console.log(preferences);
        setPreferences_a(name);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>Preferences</Text>
                <Text style={styles.subtitle}>Enter your preferences here</Text>

                <Text style={styles.label}>Start Location</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Start Location"
                    value={preferences.location}
                    onChangeText={(text) =>
                        setPreferences({ ...preferences, location: text })
                    }
                />

                <Text style={styles.label}>Destination</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Destination"
                    value={preferences.destination}
                    onChangeText={(text) =>
                        setPreferences({ ...preferences, destination: text })
                    }
                />

                <Text style={styles.label}>Start Time</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Start Time"
                    value={preferences.departure_time}
                    onChangeText={(text) =>
                        setPreferences({ ...preferences, departure_time: text })
                    }
                />

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
                    title="Save Preferences"
                    onPress={handleSavePreferences("Hello")}
                />
            </ScrollView>
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
    },
    input: {
        height: 40,
        width: 300,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 20,
    },
    scrollView: {
        marginHorizontal: 20,
    },
});
