import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ArrivedPayment from '../PassengerPages/ArrivedPayment';
import HomePage from '../pages/HomePage';
import GenerateQRPage from '../DriverPages/GenerateQRPage';

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
      <Stack.Navigator
      screenOptions={{headerShown: false}}>
        <Stack.Group>
          <Stack.Screen name="FirstPage" component={HomePage}/>
          <Stack.Screen name="ArrivedPayment" component={ArrivedPayment}/>
          <Stack.Screen name="GenerateQRPage" component={GenerateQRPage}/>
        </Stack.Group>
      </Stack.Navigator>
  );
};