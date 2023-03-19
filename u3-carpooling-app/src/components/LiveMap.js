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
import { black } from "color-name";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

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
//     JSON.stringify({"location":"Bath Spa University",
//                 "destination":"University of Bath",
//                 "departure_time":"",
//                 "detour_distance":"",
//                 "rating":"",
//                 "seats":"5"})});
// }

const LiveMap = (props) => {
  const gUserID = useSelector((state) => state.mySlice.myUserID);
  const gUserRole = useSelector((state) => state.mySlice.myUserRole);
  const gStartLocation = useSelector((state) => state.mySlice.startLocation);
  const gDestination = useSelector((state) => state.mySlice.gDestination);

  const [callOne, updateCallOne] = useState(true);
  const [recvOne, updateRecvOne] = useState(false);
  const [callTwo, updateCallTwo] = useState(false);
  const [recvTwo, updateRecvTwo] = useState(false);
  const [allDatabaseLocations, setAllDatabaseLocations] = useState();
  const [waypoints, setWaypoints] = useState([]);

  offer = RestAPI(
    {
      operation: "select",
      table: "PoolSubscriber",
      userID: gUserID,
      // userID: "3",
    },
    {
      userID: null,
      poolID: null,
    },
    (runFlag = callOne)
  )[0];

  // Only run the call once
  if (callOne == true) {
    updateCallOne(false);
  }

  // If we received valid data, move onto the next call
  if (recvOne == false && offer.poolID != null) {
    updateRecvOne(true);
    updateCallTwo(true);
  }

  pool = RestAPI(
    {
      operation: "select",
      table: "Offer",
      poolID: offer.poolID,
    },
    {
      settings: null,
    },
    (runFlag = callTwo)
  );

  // Only run the call once
  if (callTwo == true) {
    updateCallTwo(false);
  }

  // If we received valid data, set to true
  if (recvTwo == false && pool.settings != null) {
    updateRecvTwo(true);
  }

  // Once we receive offers in database, create markers and waypoints
  useEffect(() => {
    if (!pool) {
      return;
    }

    let listOfLocations = [];

    for (let item of pool) {
      let l = JSON.parse(item["settings"]);

      if (l == null) {
        return;
      }

      let location = l.location;
      listOfLocations.push(location);
    }

    let locationSet = new Set(listOfLocations);
    setAllDatabaseLocations(locationSet);
  }, [pool]);

  useEffect(() => {
    if (!allDatabaseLocations) {
      return;
    }

    for (let location of allDatabaseLocations) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GOOGLE_MAPS_APIKEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          let res = data.results[0];
          let latlng = res.geometry.location;
          setWaypoints((prevState) => {
            let newWaypoint = {
              latitude: latlng.lat,
              longitude: latlng.lng,
            };

            return [...prevState, newWaypoint];
          });
        });
    }
  }, [allDatabaseLocations]);

  const markerElements = waypoints.map((location) => {
    return (
      <Marker
        coordinate={{
          longitude: location.longitude,
          latitude: location.latitude,
        }}
        id={waypoints.indexOf(location)}
        pinColor="orange"
      />
    );
  });

  useEffect(() => {
    if (!waypoints) {
      return;
    }

    console.log(waypoints);
  }, [waypoints]);

  //
  // END OF DATABASE CALLS & PROCESSING
  //

  // insertTestData();
  const navigation = useNavigation();

  const mapRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showDirections, setShowDirections] = useState(false);
  const [IsReady, SetIsReady] = useState(false);
  const [origin, setOrigin] = useState({
    // latitude: gStartLocation.latitude,
    // longitude: gStartLocation.longitude,
    latitude: 51.38156107044501,
    longitude: -2.359066572043425,
  });
  const [destination, setDestination] = useState({
    // latitude: gDestination.latitude,
    // longitude: gDestination.longitude,
    latitude: 51.37943205963418,
    longitude: -2.3256547832841625,
  });

  const [currentUserLocation, setCurrentUserLocation] = useState();

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
    props.showRoute && traceRoute();
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
      console.log("WE'VE ARRIVED");
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
    if (waypoints) {
      console.log(origin);
      console.log(destination);
      console.log(waypoints);
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination], {
        edgePadding,
      });
    }
  }

  async function moveCamera(pos) {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = pos;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  }

  // UI for when map is fullscreen
  let focusBack = {};
  let focusStyle = {};
  let backButton = null;
  if (!props.cardStyle) {
    focusBack = {
      backgroundColor: greenShadow,
    };
    focusStyle = {
      borderWidth: 10,
      borderRadius: 62,
      overflow: "hidden",
      borderColor: greenShadow,
    };
    backButton = "yes";
  }

  return (
    <Pressable
      id="frame"
      style={[props.style, styles.frame, focusBack]}
      onPress={props.onPress}
    >
      <View style={[props.cardStyle, focusStyle]}>
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
          {props.showRoute && markerElements}
        </MapView>
        {backButton == null ? null : <Text style={[styles.text]}>U3</Text>}
        {backButton == null ? null : (
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.back]}>back.</Text>
            <Text style={[styles.back, styles.backShadow]}>back.</Text>
          </Pressable>
        )}
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
    fontSize: 48,
    position: "absolute",
    top: 5,
    right: 10,
    fontFamily: "syne-bold",
  },
  backButton: {
    position: "absolute",
    height: 70,
    width: "50%",
    bottom: "2%",
    left: "7%",
    alignItems: "flex-start",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  back: {
    position: "absolute",
    fontFamily: "syne-bold",
    fontSize: 48,
    color: green,
  },
  backShadow: {
    bottom: "2%",
    left: "3%",
    color: greenShadow,
  },
});
