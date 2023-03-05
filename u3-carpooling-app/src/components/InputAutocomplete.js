import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";

const InputAutocomplete = (props) => {
  return (
    <View>
      <GooglePlacesAutocomplete
        styles={{ textInput: styles.input }}
        placeholder="Where to?"
        fetchDetails={true}
        returnKeyType={"search"}
        onPress={(data, details = null) => {
          props.onPlaceSelected(data, details, props.isDestination);
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: "en",
        }}
        enablePoweredByContainer={false}
        debounce={400}
        nearbyPlacesAPI="GooglePlacesSearch"
      />
    </View>
  );
};

export default InputAutocomplete;

const styles = StyleSheet.create({});
