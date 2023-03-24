import React from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Linking,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { color } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function PaymentPage() {
    const route = useRoute();
    const navigation = useNavigation();
    return (
        <View style={styles.box}>
            <Text style={styles.qrButtonText}>[ BLACK BOX ]</Text>
            <Text style={styles.qrButtonText}>
                Payment Page for {route.params.value}.
            </Text>
            <Pressable style={styles.color}
                        onPress={() => navigation.navigate("OldHomePage")}
                    >
                        <Text id="qrButtonText" style={styles.qrButtonText}>
                            Go back to home page
                        </Text>
                    </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    qrButtonText: {
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "5%",
        color: "white",
        fontFamily: "atkinson-regular",
        fontSize: 30,
        letterSpacing: 3,
    },

    box: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        backgroundColor: "black",
    },
    color:{
        backgroundColor: "red",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    }
});
