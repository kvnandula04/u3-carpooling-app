import React, { useState } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

const VerificationPage = () => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const [showTextAndButton, setShowTextAndButton] = useState(true);

  const verifyEmail = () => {
    setShowTextAndButton(false);
    setShowWebView(true);
  };

  const onNavigationStateChange = (navState) => {
    if (navState.url === "https://moodle.bath.ac.uk/") {
      setIsEmailVerified(true);
      setShowWebView(false);
      setShowTextAndButton(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {isEmailVerified ? (
        <View style={styles.outer}>
          <Text>Email verified</Text>
        </View>
      ) : (
        <SafeAreaView style={styles.outer}>
          {showTextAndButton && (
            <>
              <Text>Email is not verified</Text>
              <Button title="Press to verify email" onPress={verifyEmail} />
            </>
          )}
          {showWebView && (
            <View style={styles.inner}>
              <WebView
                style={{ flex: 1 }}
                source={{
                  uri: "https://auth.bath.ac.uk/login?service=http%3A%2F%2Fmoodle.bath.ac.uk%2Flogin%2Findex.php%3Fauthldap_skipntlmsso%3D1",
                }}
                onNavigationStateChange={onNavigationStateChange}
              />
            </View>
          )}
        </SafeAreaView>
      )}
    </View>
  );
};

export default VerificationPage;

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
