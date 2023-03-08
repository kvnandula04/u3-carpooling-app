import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
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

    const windowHeight = Dimensions.get("window").height;
    const [height, setHeight] = useState(0);

    const onLayout = (event) => {
        setHeight(event.nativeEvent.layout.height);
    };
    const back = null;
    const backShadow = null;
    if (height === windowHeight) {
        backShadow = (
            <Text
                style={[
                    styles.back,
                    styles.backShadow,
                    {
                        color: props.shadow,
                        fontSize: props.fontSize,
                    },
                ]}
            >
                back.
            </Text>
        );
        back = (
            <Text style={[styles.back, { color: props.colour }]}>back.</Text>
        );
    }

    return (
        <Pressable
            id="frame"
            style={[props.style, styles.frame]}
            onPress={props.onPress}
            onLayout={onLayout}
        >
            <View style={[props.cardStyle]}>
                <MapView style={[styles.map]} mapType="mutedStandard" />
                <Text style={[styles.text]}>{props.text}</Text>
                <Pressable style={styles.backButton}>
                    {back}
                    {backShadow}
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
