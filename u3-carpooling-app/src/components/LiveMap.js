import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import MapView from "react-native-maps";

const green = "#4CD835";
const greenShadow = "#278A17";

const LiveMap = (props) => {
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

    return (
        <Pressable
            id="frame"
            style={[props.style, styles.frame]}
            onPress={props.onPress}
        >
            <View style={[props.cardStyle]}>
                <MapView style={[styles.map]} mapType="mutedStandard" />
                <Text style={[styles.text]}>{props.text}</Text>
                <Pressable style={styles.backButton}>
                    <Text style={[styles.back, { color: props.colour }]}>
                        back.
                    </Text>
                    <Text
                        style={[
                            styles.back,
                            styles.backShadow,
                            { color: props.shadow, fontSize: props.fontSize },
                        ]}
                    >
                        back.
                    </Text>
                </Pressable>
            </View>
            <View
                id="shadow"
                style={[props.cardStyle, props.shadowStyle]}
            ></View>
        </Pressable>
    );
};

export default LiveMap;

const styles = StyleSheet.create({
    frame: {},
    map: {
        width: "100%",
        height: "100%",
        // marginBottom: 25,
    },
    text: {
        color: "black",
        fontSize: 36,
        position: "absolute",
        top: 5,
        right: 10,
        fontFamily: "syne-bold",
    },
    backButton: {
        position: "absolute",
        bottom: 5,
        left: 10,
    },
    back: {
        position: "absolute",
        bottom: 0,
        left: 0,
        fontFamily: "Roboto",
        fontStyle: "italic",
        fontWeight: "700",
    },
    backShadow: {
        bottom: 2,
        left: 2,
    },
});
