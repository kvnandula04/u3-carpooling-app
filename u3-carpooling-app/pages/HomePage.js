import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import RestPage from "./RestPage";
import tests from "../u3-carpooling-server/tests.py";

//import GridBackground from "../assets/grid-background";

const HomePage = () => {
    return (
        // <SafeAreaView>
        //     <Text style={styles.centre}>U3</Text>
        //     <GridBackground
        //         lineColor="#9A9A9A"
        //         style={{
        //             position: "absolute",
        //         }}
        //     />
        // </SafeAreaView>
        <RestPage/>
    );
};

export default HomePage;

const styles = StyleSheet.create({
    centre: {
        textAlign: "center",
        textAlignVertical: "center",
    },
});
