import MainPageScreen from "../screens/MainPage";
import MovieDetailsScreen from "../screens/MovieDetails";
import { createStackNavigator } from "@react-navigation/stack";

import { Platform } from "react-native";
import React from "react";
import Colors from "../constants/colors";
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.accent : "",
  },

  headerTintColor: Platform.OS === "android" ? "white" : Colors.accent,
};
const MovieStackNavigator = createStackNavigator();
const MovieNavigator = () => {
  return (
    <MovieStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <MovieStackNavigator.Screen name="Movies" component={MainPageScreen} />
      <MovieStackNavigator.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={{ headerShown: false }}
      />
    </MovieStackNavigator.Navigator>
  );
};
export default MovieNavigator;
