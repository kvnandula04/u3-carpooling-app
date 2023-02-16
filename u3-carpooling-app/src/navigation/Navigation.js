import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignupLoginPage from "../pages/SignupLoginPage";
import StudentVerification from "../pages/StudentVerification";
import DriverVerification from "../pages/DriverVerification";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignupLoginPage" component={SignupLoginPage} />
        <Stack.Screen
          name="StudentVerification"
          component={StudentVerification}
        />
        <Stack.Screen
          name="DriverVerification"
          component={DriverVerification}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;