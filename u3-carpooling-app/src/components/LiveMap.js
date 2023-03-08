import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import useFonts from "../hooks/UseFonts";
import { GOOGLE_MAPS_APIKEY } from "@env";
import * as Location from "expo-location";
import RestAPI from "../hooks/Rest";
import MapViewDirections from "react-native-maps-directions";

const green = "#4CD835";
const greenShadow = "#278A17";
const edgePaddingValue = 70;
const edgePadding = {
  top: edgePaddingValue,
  right: edgePaddingValue,
  bottom: edgePaddingValue,
  left: edgePaddingValue,
};

// const insertTestData = () => {
//     RestAPI({ operation: "insert", table: "Offer", userID: 3, poolID: 4, role: 1, settings:
//     JSON.stringify({"location":"Bath Spa Station",
//                 "destination":"University of Bath",
//                 "departure_time":"",
//                 "detour_distance":"",
//                 "rating":"",
//                 "seats":"5"})});
// }

const LiveMap = (props) => {
  // insertTestData();

  const mapRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showDirections, setShowDirections] = useState(false);
  const [IsReady, SetIsReady] = useState(false);
  const [origin, setOrigin] = useState({
    latitude: 51.38156107044501,
    longitude: -2.359066572043425,
  });
  const [destination, setDestination] = useState({
    latitude: 51.37943205963418,
    longitude: -2.3256547832841625,
  });
  const [waypoints, setWaypoints] = useState([
    {
      latitude: 51.382481020706635,
      longitude: -2.3812105369639043,
    },
    {
      latitude: 51.37685566810041,
      longitude: -2.370529450651123,
    },
  ]);
  const [currentUserLocation, setCurrentUserLocation] = useState();
  const DUMMY_LOCATIONS = [
    {
      id: 1,
      latitude: 51.382481020706635,
      longitude: -2.3812105369639043,
      pinColor: "orange",
    },
    {
      id: 2,
      latitude: 51.37685566810041,
      longitude: -2.370529450651123,
      pinColor: "orange",
    },
  ];

  const markerElements = DUMMY_LOCATIONS.map((location) => (
    <Marker
      coordinate={{
        longitude: location.longitude,
        latitude: location.latitude,
      }}
      pinColor={location.pinColor}
    />
  ));

  _getLocationAsync = async () => {
    this.location = await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        distanceInterval: 1,
        timeInterval: 10000,
      },
      (newLocation) => {
        let coords = newLocation.coords;
        // this.props.getMyLocation sets my reducer state my_location
        setCurrentUserLocation(coords);
      },
      (error) => console.log(error)
    );
    return location;
  };

  useEffect(() => {
    (async () => {
      let { statusforeground } =
        await Location.requestForegroundPermissionsAsync();
      let { statusbackground } =
        await Location.requestBackgroundPermissionsAsync();
      let location = await Location.getCurrentPositionAsync({});
      _getLocationAsync(); // removed this. at the beginning
      setCurrentUserLocation(location);
      moveCamera(location.coords);
    })();
  }, []);

  // Need to call this once when we have the origin, destination and waypoints
  useEffect(() => {
    traceRoute();
  }, [waypoints]);

  useEffect(() => {
    _getLocationAsync();
  }, []);

  useEffect(() => {
    if (!currentUserLocation) {
      return;
    }

    const R = 6371e3; // metres
    const phi1 = (currentUserLocation.latitude * Math.PI) / 180; // phi, lambda in radians
    const phi2 = (destination.latitude * Math.PI) / 180;
    const d_phi =
      ((destination.latitude - currentUserLocation.latitude) * Math.PI) / 180;
    const d_lambda =
      ((destination.longitude - currentUserLocation.longitude) * Math.PI) / 180;

    const a =
      Math.sin(d_phi / 2) * Math.sin(d_phi / 2) +
      Math.cos(phi1) *
        Math.cos(phi2) *
        Math.sin(d_lambda / 2) *
        Math.sin(d_lambda / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // in metres

    if (d < 100) {
      console.log("WE'VE ARRIVED DO SOMETHING FUCKHEADS");
    }
  }, [currentUserLocation]);

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

  function traceRouteOnReady(args) {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
    }
  }

  function traceRoute() {
    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
    }
  }

  async function moveCamera(pos) {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = pos;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  }

  return (
    <Pressable
      id="frame"
      style={[props.style, styles.frame]}
      onPress={props.onPress}
    >
      <View style={[props.cardStyle]}>
        <MapView
          testID="map"
          ref={mapRef}
          initialRegion={{
            longitude: origin ? origin.longitude : 0,
            latitude: origin ? origin.latitude : 0,
            latitudeDelta: 0.0225,
            longitudeDelta: 0.0225,
          }}
          showsCompass={true}
          showsMyLocationButton={true}
          showsUserLocation={true}
          followsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          style={[styles.map]}
          mapType="mutedStandard"
        >
          {destination && (
            <Marker
              coordinate={{
                longitude: destination?.longitude,
                latitude: destination?.latitude,
              }}
            />
          )}
          {showDirections && (
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={4}
              strokeColor="red"
              onReady={traceRouteOnReady}
              waypoints={waypoints}
            />
          )}
          {markerElements}
        </MapView>
        <Text style={[styles.text]}>{props.text}</Text>
        <Pressable style={styles.backButton}>
          <Text style={[styles.back, { color: props.colour }]}>back.</Text>
          <Text
            style={[
              styles.back,
              styles.backShadow,
              { color: props.shadow, fontSize: props.fontSize },
            ]}
          >
            back.
          </Text>
        </Pressable>
      </View>
      <View id="shadow" style={[props.cardStyle, props.shadowStyle]}></View>
    </Pressable>
  );
};

export default LiveMap;

const styles = StyleSheet.create({
  frame: {},
  button: {
    margin: 100,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: "black",
    fontSize: 36,
    position: "absolute",
    top: 5,
    right: 10,
    fontFamily: "syne-bold",
  },
  backButton: {
    position: "absolute",
    bottom: 5,
    right: 50,
  },
  back: {
    position: "absolute",
    bottom: 0,
    left: 0,
    fontFamily: "syne-bold",
    fontStyle: "italic",
    fontWeight: "700",
  },
  backShadow: {
    bottom: 2,
    left: 2,
    opacity: 0,
  },
});
