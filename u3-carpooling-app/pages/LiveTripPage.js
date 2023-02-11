import {
    Button,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React from "react";
import GridBackground from "../assets/grid-background";

const cream = "#F7F3EB";

const LiveTripPage = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <GridBackground
                lineColor={cream}
                style={{ backgroundColor: "#272727" }}
            />
            <Pressable style={styles.reportButton}>
                <Text style={[styles.reportText, { fontWeight: "900" }]}>
                    Report
                </Text>
                <Text style={styles.reportText}> Misconduct</Text>
            </Pressable>
            <View
                style={{
                    position: "absolute",
                    alignSelf: "center",
                    margin: "15%",
                    width: "100%",
                    height: "80%",
                    justifyContent: "center",
                    alignContent: "center",
                    backgroundColor: "red",
                }}
            >
                <View style={{ flex: 2, backgroundColor: "green" }} />
                <View style={{ flex: 1, backgroundColor: "cream" }} />
                <View style={{ flex: 1, backgroundColor: "blue" }} />
                <View style={{ flex: 1, backgroundColor: "purple" }} />
            </View>
        </SafeAreaView>
    );
};

export default LiveTripPage;

const styles = StyleSheet.create({
    reportButton: {
        position: "absolute",
        bottom: 20,
        right: 0,
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingVertical: 20,
        paddingHorizontal: 20,
        // backgroundColor: "blue",
    },
    reportText: {
        fontSize: 32,
        fontWeight: "300",
        fontStyle: "italic",
        color: cream,
    },
});
