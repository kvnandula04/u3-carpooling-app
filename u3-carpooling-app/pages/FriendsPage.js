import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import GridBackground from "../assets/grid-background";

const cream = "#F7F3EB";
const blue = "#2E73DA";

const FriendsPage = () => {
    return (
        <View id="pageFrame" style={styles.pageFrame}>
            <GridBackground
                lineColor={cream}
                style={{
                    position: "absolute",
                    zIndex: -5,
                }}
            />
            <View id="titleFrame" style={styles.titleFrame}>
                <Text id="title" style={styles.title}>
                    Friends
                </Text>
                <Pressable id="search" style={styles.search}>
                    <Text>Search</Text>
                </Pressable>
            </View>
            <View id="friendsFrame" style={styles.friendsFrame}></View>
            <View id="contactsFrame" style={styles.contactsFrame}></View>
        </View>
    );
};

export default FriendsPage;

const styles = StyleSheet.create({
    pageFrame: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: blue,
    },
    titleFrame: {
        flex: 3,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
    },
    title: {
        paddingTop: 40,
        color: cream,
        fontSize: 48,
    },
    search: {
        alignSelf: "flex-end",
        paddingRight: 20,
    },
    friendsFrame: {
        flex: 11,
        width: "85%",
        backgroundColor: "green",
    },
    contactsFrame: {
        flex: 2,
        width: "100%",
        backgroundColor: "blue",
    },
});
