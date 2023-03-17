import React, { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Logo from "../components/Logo";
import useFonts from "../hooks/UseFonts";
import GridBackground from "../../assets/grid-background";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { updateUserID} from "../../globalVariables/mySlice";
import RestAPI from "../hooks/Rest";

export default function Onboarding() {
  const [IsReady, SetIsReady] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [callOne, setCallOne] = useState(false);
  const [recvOne, setRecvOne] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onSubmitPressed = () => {
    if (!userName.trim() || !password.trim()) {
      alert("All fields must be filled. Please try again.");
      return;
    }
    
    console.log("LoginPage: Form submitted");
    setCallOne(true);
    setRecvOne(false);
  };

  const user = RestAPI (
    { operation: "select", table: "User", email: userName+"@bath.ac.uk" }, 
    { userID: null, pwdHash: null },
    ( callOne )  
  )[0];

  if ( callOne ) {
	setCallOne(false);
  }

  if ( !recvOne ) {
  	if ( user.userID ) {
	  if ( user.pwdHash === password ) {
	    dispatch(updateUserID((user.userID)));
	    navigation.navigate("OldHomePage");
	    setRecvOne(true);
	  }
	  else {
		alert("Incorrect password. Please try again.");
		setRecvOne(true);
	  }
	}
	else if ( user == "i" ) {
	  alert("User does not exist. Please try again.");
	  setRecvOne(true);
	}
  }
  

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

  console.log("Render: LoginPage")
  return (
    <View style={styles.container}>
      <GridBackground
        position="absolute"
        zIndex={-5}
        lineColor={"grey"}
        style={{ backgroundColor: "#e7ada0" }}
      />

      <View style={styles.flex1}>
        <Logo fontSize={40} color={"#000"} marginTop={"15%"} />
      </View>

      <View style={styles.flex2}>
        <Text style={styles.heading}>Sign in</Text>
      </View>

      <View style={styles.flex3}>
        <Text style={styles.subheading}> Enter your details: </Text>
        <View id="userNameFrame" style={styles.frame}>
          <View id="userNameButton" style={styles.button}>
            <TextInput
              style={styles.text}
              placeholder="Bath Username  "
              value={userName}
              onChangeText={(userName) => setUserName(userName)}
            ></TextInput>
          </View>
          <View
            id="userNameShadow"
            style={[styles.button, styles.shadow]}
          ></View>
        </View>
        <View id="passwordFrame" style={styles.frame}>
          <View id="passwordButton" style={styles.button}>
            <TextInput
              style={styles.text}
              placeholder="Password "
              value={password}
              onChangeText={(password) => setPassword(password)}
              secureTextEntry={true}
            ></TextInput>
          </View>
          <View
            id="passwordShadow"
            style={[styles.button, styles.shadow]}
          ></View>
        </View>
      </View>

      <View style={styles.flex4}></View>

      <View style={styles.flex5}>
        <TouchableOpacity style={styles.button2} onPress={onSubmitPressed}>
          <Text style={styles.text}>submit ></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flex2: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  flex3: {
    flex: 3.5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
  flex4: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  flex5: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: "15%",
  },
  heading: {
    fontFamily: "atkinson-italic",
    fontSize: 54,
    color: "#5dada0",
    lineHeight: 53,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    textAlign: "center",
  },
  subheading: {
    fontFamily: "atkinson-italic",
    fontSize: 24,
    color: "#000",
    lineHeight: 53,
    textAlign: "center",
  },
  frame: {
    width: "75%",
    height: "25%",
    marginTop: "5%",
    // backgroundColor: "white",
  },
  button: {
    width: "100%",
    height: "100%",
    borderRadius: 32,
    borderColor: "#000",
    borderWidth: 5,
    backgroundColor: "#beddd6",
    justifyContent: "center",
    alignItems: "center",
  },
  shadow: {
    zIndex: -1,
    position: "absolute",
    backgroundColor: "#000",
    top: 6,
    left: 6,
  },
  text: {
    fontSize: 24,
    fontFamily: "atkinson-italic",
    color: "#000",
    textAlign: "center",
  },
  button2: {
    justifyContent: "center",
    alignItems: "center",
  },
  circle1: {
    width: 30,
    height: 30,
    borderRadius: 1000,
    backgroundColor: "#000000",
    marginRight: "1%",
  },
  circle2: {
    width: 30,
    height: 30,
    borderRadius: 1000,
    borderWidth: 6,
    borderColor: "#000000",
    backgroundColor: "#ffb800",
    marginLeft: "1%",
  },
});
