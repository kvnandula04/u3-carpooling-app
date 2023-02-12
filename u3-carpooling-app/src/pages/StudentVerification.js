import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function StudentVerification() {
  const navigation = useNavigation();
  const backPressed = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.text}>
      <Pressable onPress={backPressed}>
        <Text> Student Verification </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
