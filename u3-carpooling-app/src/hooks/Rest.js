import React, { useState } from "react";
import { View, Text, Button } from "react-native";

export default RestAPI = async (params) => {
  // simply change the body, with the appropriate key-val pairs
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },

    // adapt this body for purposes
    body: JSON.stringify(params),
  };

  const response = await fetch(
    "http://u3pool.ddns.net:3333/api",
    requestOptions
  );
  const data = await response.json();

  return data[0].poolID;
};
