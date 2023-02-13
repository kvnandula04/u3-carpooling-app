import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Linking } from "react-native";

const VerificationPage = () => {
  const [emailVerified, setEmailVerified] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 18 }}>
        {emailVerified ? "Email Verified" : "Email Not Verified"}
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: "blue",
          padding: 10,
          marginTop: 20,
          width: "80%",
        }}

        onPress={() => Linking.openURL("https://auth.bath.ac.uk/login")}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Verify Email
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default VerificationPage;