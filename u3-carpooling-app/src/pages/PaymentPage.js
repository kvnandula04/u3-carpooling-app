import React from 'react';
import { Pressable, StyleSheet, Text, View, Dimensions, Linking } from "react-native";
import {useRoute} from '@react-navigation/native'

export default function PaymentPage() {
    const route = useRoute();
    return (
        <View style = {styles.box}>
            <Text style = {styles.qrButtonText} >Payment Page for {route.params.value}.</Text>
        </View>
    );
}
const styles = StyleSheet.create({
qrButtonText: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "5%",
    color: "rgba(0, 0, 0)",
    fontFamily: "atkinson-regular",
    fontSize: 30,
    letterSpacing: 3,
  },

box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  }
}
);