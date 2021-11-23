import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppNavigator from "./navigation/AppNavigator";

import { Provider } from "react-redux";

import ReduxThunk from "redux-thunk";

import { init } from "./database/realm/actions/manageMoviesData";
import movieReducer from "./store/reducers/fetchMovieData";
import netReducer from "./store/reducers/internetStatus";

const rootReducer = combineReducers({ movie: movieReducer, net: netReducer });
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
init();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}
