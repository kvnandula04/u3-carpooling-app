import React, { useState } from "react";
import { View, Text, Button } from "react-native";

export default RestAPI = (params) => {
  // Simply change the body, with the appropriate key-val pairs
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },

    // adapt this body for purposes
    body: JSON.stringify({
      operation: "select",
      table: "Pool",
      poolID: "1",
    }),
    // body: JSON.stringify(params.passed_dict),
  };

  fetch("http://u3pool.ddns.net:3333/api", requestOptions)
    .then((response) => {
      if (response.status == 200) {
        console.log("Success");
        console.log("Response Text: " + response.text());

        // logs the response to console
        // response.text().then((text) => {
        //   console.log("text: " + text);
        // });

        // returns the stringified response from server
        return response.text();
      } else {
        // if there is an error eg it will log it here
        response.text().then((text) => {
          console.log("Error msg: " + text);
        });

        return "";
      }
    })
    .catch((error) => {
      // if it cant connect to the db it will return this error msg.
      console.log("Connection error has taken place");
      return Error("Could not connect to db at the moment");
    });
};
