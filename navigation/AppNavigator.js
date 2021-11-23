import React,{useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import MovieNavigator from './MovieNavigator';
import {useDispatch,useSelector} from 'react-redux'
import * as Notifications from "expo-notifications";
import  { useNetInfo } from "@react-native-community/netinfo";

export const INTERNET_STATUS = "INTERNET_STATUS";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export default function AppNavigator() {
    const dispatch=useDispatch();
    const internet = useSelector(state=>state.net.internetStatus);
    const netInfo = useNetInfo();
    
    const internetConnection = async () => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Internet connection",
          body: "Strong internet connection",
          data: null,
        },
        trigger: {
          seconds: 1,
        },
      });
    };

    const internetDisconnection = async () => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Internet disconnection",
          body: "Internet connection interrupted",
          data: null,
        },
        trigger: {
          seconds: 1,
        },
      });
    };
    useEffect(() => {
        console.log("Connect",netInfo.isConnected)
      if (netInfo.isConnected !== null && internet !== null) {
        netInfo.isConnected == true
          ? (() => {
              internetConnection();
            })()
          : (() => {
              internetDisconnection();
            })();
        dispatch({ type: INTERNET_STATUS, netStatus: netInfo.isConnected });
      } else if (netInfo.isConnected !== null)
        dispatch({ type: INTERNET_STATUS, netStatus: netInfo.isConnected });

      
    }, [netInfo.isConnected]);

    return (
        <NavigationContainer><MovieNavigator/></NavigationContainer>
    )
}

const styles = StyleSheet.create({})
