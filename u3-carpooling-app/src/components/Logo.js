import { StyleSheet, Text, View } from "react-native";
import * as React from "react";

const Logo = (props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text
        style={{
          color: props.color,
          fontSize: props.fontSize,
          lineHeight: 0,
          fontFamily: "syne",
          top: props.top,
        }}
      >
        U
      </Text>
      <Text
        style={{
          color: props.color,
          fontSize: props.fontSize,
          lineHeight: -10,
          fontFamily: "syne",
          top: props.top,
        }}
      >
        3
      </Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({});
