import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navigation from "./src/navigation/Navigation";
import React from 'react';
import { Provider } from 'react-redux';
import store from './globalVariables/store';

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
            <Navigation />
        </GestureHandlerRootView>
    </Provider>
    );
}
