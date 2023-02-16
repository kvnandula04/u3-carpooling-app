import { StyleSheet, Text, View } from "react-native";
import * as React from "react";

const Logo = (props) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: props.color,
          fontSize: props.fontSize,
          lineHeight: 0,
          fontFamily: "syne",
          marginTop: props.marginTop,
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
          marginTop: props.marginTop,
        }}
      >
        3
      </Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
