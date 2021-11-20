
import React, { useState, useEffect } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";

import Constants from "expo-constants";
import AppNavigator from "./navigation/AppNavigator";
// import { navigationRef } from "./NavigationService";

import { Provider} from "react-redux";
// import * as Permissions from "expo-permissions";


import ReduxThunk from "redux-thunk";

import { StyleSheet, Text, View } from "react-native";

import movieReducer from "./store/reducers/fetchMovieData";
import netReducer from "./store/reducers/internetStatus";
import PushNotification from "react-native-push-notification";


const rootReducer = combineReducers({movie:movieReducer,net:netReducer});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {

  
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
