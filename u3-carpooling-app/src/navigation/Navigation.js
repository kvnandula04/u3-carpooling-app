import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignupLoginPage from "../pages/SignupLoginPage";
import StudentVerification from "../pages/StudentVerification";
import DriverVerification from "../pages/DriverVerification";
import LiveTripPage from "../pages/LiveTripPage";
import ArrivedPage from "../pages/ArrivedPage";
import ArrivedPageDriver from "../pages/ArrivedPageDriver";
import Onboarding from "../pages/Onboarding";
import OldHomePage from "../pages/OldHomePage";
import ProfilePage from "../pages/ProfilePage";
import PaymentPage from "../pages/PaymentPage";
import Preferences from "../pages/Preferences";

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
        <Stack.Screen name="LiveTripPage" component={LiveTripPage} />
        <Stack.Screen name="ArrivedPage" component={ArrivedPage} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="ArrivedPageDriver" component={ArrivedPageDriver} />
        <Stack.Screen name="OldHomePage" component={OldHomePage} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="Preferences" component={Preferences} />
        <Stack.Screen
          name="PaymentPage"
          component={PaymentPage}
          initialParams={{ value: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
