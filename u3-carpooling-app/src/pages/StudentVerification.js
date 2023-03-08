import React, { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Logo from "../components/Logo";
import useFonts from "../hooks/UseFonts";
import GridBackground from "../../assets/grid-background";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";

export default function StudentVerification() {
  const [IsReady, SetIsReady] = useState(false);
  const navigation = useNavigation();
  const onSignedIn = () => {
    navigation.navigate("DriverVerification");
  };

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const [showView, setShowView] = useState(true);

  const verifyEmail = () => {
    setShowView(false);
    setShowWebView(true);
  };

  const onNavigationStateChange = (navState) => {
    if (navState.url === "https://moodle.bath.ac.uk/") {
      setIsEmailVerified(true);
      setShowView(true);
      setShowWebView(false);
    }
  };

  // Loading in fonts
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

  const onLayoutRootView = useCallback(async () => {
    if (IsReady) {
      await SplashScreen.hideAsync();
    }
  }, [IsReady]);

  if (!IsReady) {
    return null;
  }

  return (
    <View style={styles.container}>
      {isEmailVerified ? (
        <View style={[styles.inner, { flexDirection: "column" }]}>
          <GridBackground
            position="absolute"
            zIndex={-5}
            lineColor={"black"}
            style={{ backgroundColor: "#f7f3eb" }}
          />
          <Text
            style={{
              fontFamily: "atkinson-italic",
              color: "#000",
              fontSize: 50,
            }}
          >
            Email verified
          </Text>
          <TouchableOpacity onPress={onSignedIn}>
            <Text
              style={{
                fontFamily: "atkinson-italic",
                color: "#1daf59",
                fontSize: 30,
                marginTop: "3%",
              }}
            >
              {" "}
              Continue >{" "}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          {showView && (
            <>
              <GridBackground
                position="absolute"
                zIndex={-5}
                lineColor={"black"}
                style={{ backgroundColor: "#1daf59" }}
              />

              <View style={styles.flex1}>
                <Logo fontSize={40} color={"#f7f3eb"} marginTop={"15%"} />
              </View>

              <View style={styles.flex2}>
                <Text style={styles.heading}>Student{"\n"}Verification</Text>
              </View>

              <View style={styles.flex3}>
                <View id="signinFrame" style={styles.signinFrame}>
                  <Pressable
                    id="signinButton"
                    style={styles.signinButton}
                    onPress={verifyEmail}
                  >
                    <Text style={styles.text}>UoB Sign In</Text>
                  </Pressable>
                  <View
                    id="signinButtonShadow"
                    style={[styles.signinButton, styles.signinButtonShadow]}
                  ></View>
                </View>
              </View>

              <View style={styles.flex4}>
                <View style={styles.circle1}></View>
                <View style={styles.circle2}></View>
              </View>
            </>
          )}
          {showWebView && (
            <SafeAreaView style={styles.inner}>
              <WebView
                style={{ flex: 1 }}
                source={{
                  uri: "https://auth.bath.ac.uk/login?service=http%3A%2F%2Fmoodle.bath.ac.uk%2Flogin%2Findex.php%3Fauthldap_skipntlmsso%3D1",
                }}
                onNavigationStateChange={onNavigationStateChange}
              />
            </SafeAreaView>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  flex1: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  flex2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flex3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flex4: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: "10%",
  },
  heading: {
    fontFamily: "atkinson-italic",
    fontSize: 54,
    color: "#f7f3eb",
    lineHeight: 53,
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    textAlign: "center",
  },
  signinFrame: {
    width: "50%",
    height: "60%",
    marginTop: "5%",
  },
  signinButton: {
    width: "100%",
    height: "100%",
    borderRadius: 32,
    borderColor: "#000",
    borderWidth: 5,
    backgroundColor: "#ffb800",
    justifyContent: "center",
    alignItems: "center",
  },
  signinButtonShadow: {
    zIndex: -1,
    position: "absolute",
    backgroundColor: "#000",
    top: 6,
    left: 6,
  },
  text: {
    fontSize: 24,
    fontFamily: "atkinson",
    color: "#1774ff",
  },
  circle1: {
    width: 30,
    height: 30,
    borderRadius: 1000,
    borderWidth: 6,
    borderColor: "#000000",
    backgroundColor: "#ffb800",
    marginRight: "1%",
  },
  circle2: {
    width: 30,
    height: 30,
    borderRadius: 1000,
    backgroundColor: "#000000",
    marginLeft: "1%",
  },
});
