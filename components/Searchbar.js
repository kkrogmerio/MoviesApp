import {useState,useRef,useEffect} from "react";
import { SearchBar } from "react-native-elements";
import {Animated,View,Text,Platform,Dimensions} from "react-native";
import React from 'react';
import Colors from '../constants/colors';


export default (props) => {
  const setValue=props.setValue;
    const fadeAnim = new Animated.Value(0);
    const accent = Colors.accent;
    const primary = Colors.primary;
    const [borderColor, setBorderColor] = useState(primary);
    const [shrink, setShrink] = useState(null);
const handleShrink = () => {
  setShrink(null);
};
const focusIt = () => {
  console.log("HEREEE");
  setShrink(0);
};
const blurIt = () => {
  setShrink(1);
};
useEffect(() => {
  console.log(shrink);
  if (shrink == 1) {
    setBorderColor(primary);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  } else if (shrink == 0) {
    setBorderColor(accent);
    Animated.timing(fadeAnim, {
      toValue: 2,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }
}, [fadeAnim, shrink]);
    
 
  return (
    <Animated.View
      style={{
      
        width: fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ["75%", "100%"],
        }),
        alignItems: "center",
      }}
    >
      <SearchBar
        platform={Platform.OS=="android"?"default":"ios"}
        containerStyle={{
          borderRadius: 15,
          width: "70%",
          top: 40,
        }}
        inputContainerStyle={{ borderColor: borderColor, borderWidth: 3 }}

        leftIconContainerStyle={{ color: "blue" }}
        value={props.movieTitle}
        onChangeText={(newVal) => {
          handleShrink();
          setValue(newVal);
        }}
        onClearText={() => console.log(onClearText())}
        placeholder="Search movie..."
        placeholderTextColor="#888"
        round
        onFocus={() => focusIt()}
        onBlur={() => blurIt()}
        cancelButtonTitle="Cancel"
        cancelButtonProps={{}}
        onCancel={() => console.log(onCancel())}
        //   value={value}
      />
    </Animated.View>
  );
};
