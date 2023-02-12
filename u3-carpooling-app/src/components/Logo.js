import { StyleSheet, Text, View } from "react-native";
import * as React from "react";

const Logo = (props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text
        style={{
          color: props.color,
          fontSize: 86,
          lineHeight: 0,
          fontFamily: "syne",
        }}
      >
        U
      </Text>
      <Text
        style={{
          color: props.color,
          fontSize: 86,
          lineHeight: -10,
          fontFamily: "syne",
        }}
      >
        3
      </Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({});
