import { Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect, useCallback, useRef } from "react";
import LiveMap from "../components/LiveMap";
import Svg, { SvgProps, G, Path, Defs } from "react-native-svg";
import GridBackground from "../../assets/grid-background";
import QRCode from "react-qr-code";

const cream = "#F7F3EB";
const green = "#180";
const greenShadow = "#278A17";
const charcoal = "#3F3F3F";
const black = "#272727";

export default function ArrivedPageDriver() {
  const [IsReady, SetIsReady] = useState(false);
  const [url, setUrl] = useState("");

  function RenderOrNot() {
    if (url != "") {
      return <QRCode id={"QRCode"} value={url} level={"L"} />;
    }
  }

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
    <View id="pageFrame" style={styles.pageFrame}>
      <GridBackground
        lineColor={cream}
        style={{
          position: "absolute",
          zIndex: -5,
          backgroundColor: black,
        }}
      />
      <View id="mapFrame" style={styles.mapFrame}>
        <LiveMap
          id="map"
          style={styles.map}
          cardStyle={styles.mapCardStyle}
          shadowStyle={styles.mapShadowStyle}
        />
      </View>

      <View id="titleFrame" style={styles.titleFrame}>
        <Text id="title" style={styles.title}>
          You've{"\n"}Arrived!
        </Text>
        <Text id="titleShadow" style={[styles.title, styles.titleShadow]}>
          You've{"\n"}Arrived!
        </Text>
        <Text id="subTitle" style={styles.subTitle}>
          Confirm your trip is complete by...
        </Text>
      </View>

      <View id="qrButtonFrame" style={styles.qrButtonFrame}>
        <View id="cardFrame" style={styles.cardFrame}>
          <Pressable
            id="qr"
            style={styles.qrButton}
            onPress={() => setUrl("https://www.google.com")}
          >
            <Text id="qrButtonText" style={styles.qrButtonText}>
              generate QR code.
            </Text>
          </Pressable>
          <View
            id="qrButtonShadow"
            style={[styles.qButton, styles.qrButtonShadow]}
          />
        </View>
      </View>

      <View id="qrFrame" style={styles.qrFrame}>
        <RenderOrNot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageFrame: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: black,
  },
  mapFrame: {
    flex: 2.5,
    width: "100%",
    marginTop: "10%",
    // backgroundColor: "red",
  },
  map: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: "5%",
  },
  mapCardStyle: {
    width: "100%",
    height: "100%",
    borderColor: green,
    borderWidth: 5,
    borderRadius: 32,
    overflow: "hidden",
  },
  mapShadowStyle: {
    zIndex: -1,
    backgroundColor: greenShadow,
    borderColor: greenShadow,
    position: "absolute",
    top: 6,
    left: 6,
  },
  titleFrame: {
    flex: 1.5,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: "blue",
  },
  title: {
    fontFamily: "syne",
    fontSize: 48,
    color: cream,
    textAlign: "center",
  },
  titleShadow: {
    zIndex: -1,
    color: greenShadow,
    marginTop: -105,
    marginRight: -10,
  },
  subTitle: {
    fontFamily: "atkinson-italic",
    fontSize: 24,
    color: cream,
    textAlign: "center",
    // marginTop: -10,
  },
  qrButtonFrame: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "green",
  },
  qrButton: {
    zIndex: 0,
    backgroundColor: cream,
    borderColor: charcoal,
    borderWidth: 5,
    borderRadius: 32,
    flexDirection: "row",
  },
  qrButtonShadow: {
    zIndex: -1,
    backgroundColor: "black",
    borderColor: "black",
    position: "absolute",
    top: 6,
    left: 6,
  },
  qrButtonText: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "5%",
    color: black,
    fontFamily: "atkinson-regular",
    fontSize: 30,
    letterSpacing: 3,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 7,
  },
  qrFrame: {
    flex: 2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "15%",
    // backgroundColor: "red",
  },
});
