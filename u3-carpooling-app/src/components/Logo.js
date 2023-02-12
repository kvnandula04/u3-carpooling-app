import { StyleSheet, Text, View } from "react-native";
import * as React from "react";

const Logo = (props) => {
  return (
    <View>
      <Text
        style={{
          color: props.color,
          fontSize: props.fontSize,
          lineHeight: 0,
          fontFamily: "syne",
          position: "absolute",
          top: props.top,
          left: props.left,
          right: props.right,
          bottom: props.bottom,
          alignContent: "center",
          justifyContent: "center",
          textAlign: "center",
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
          left: props.left,
          right: props.right,
          bottom: props.bottom,
          position: "absolute",
          alignContent: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        3
      </Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({});
