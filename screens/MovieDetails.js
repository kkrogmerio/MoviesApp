import React,{useEffect} from 'react'
import { StyleSheet, Text, View,Image,Platform } from 'react-native'
import Colors from '../constants/colors';
import { LinearGradient } from "expo-linear-gradient";
import { Badge } from "react-native-elements";
import StarRating from "react-native-star-rating";
export default function MovieDetails(props) {
    const title=props.route.params.title;
    const overview = props.route.params.overview;
    const backdrop_path = props.route.params.backdrop_path;
    const rating = props.route.params.rating;
    const adult = props.route.params.adult;
    const release = props.route.params.release;

    const popularity = props.route.params.popularity;
     useEffect(() => {
    props.navigation.setOptions({
        headerTitle:title
    })},[])
    return (
      <LinearGradient
        colors={
          Platform.OS == "android"
            ? [Colors.primary, Colors.accent]
            : [Colors.second, Colors.second]
        }
        style={styles.gradient}
      >
        <Image
          style={styles.poster}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${backdrop_path}`,
          }}
        />
        <View style={styles.inlineData}>
          <View style={{ flex: 1, padding: 10 }}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={{ flex: 1, padding: 10 }}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={rating / 2}
              starStyle={{ color: "yellow" }}
            />
            <Badge
              badgeStyle={{ width: 50, height: 40, top: 10 }}
              status="primary"
              textStyle={{ color:Platform.OS=="android"?Colors.accent:Colors.primary, fontSize: 19 }}
              value={adult.toString() == "true" ? "18+" : "12+"}
            />
          </View>
        </View>
        <View
          style={{
            flex: 2,
            padding: 10,
          }}
        >
          <Text style={{ ...styles.title, textAlign: "auto" }}>{overview}</Text>
        </View>
        <View style={{ flex: 2, width: "40%", left: 15 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ ...styles.title, fontSize: 19 }}>Popularity</Text>
            <Text style={{ ...styles.title, fontSize: 18 }}>{parseInt(popularity)}</Text>
          </View>
          
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ ...styles.title, fontSize: 19 }}>Release</Text>
            <Text style={{ ...styles.title, fontSize: 18 }}>{release}</Text>
          </View>
        </View>
      </LinearGradient>
    );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: "100%",
  },
  poster:{
      width:"100%",
      height:350
  },
  inlineData:{
    top:10,  
    flex: 2,
    width: "100%",
    flexDirection: "row",
    
    justifyContent: "space-around"},
  title:{color:Platform.OS=="android"?Colors.second:Colors.primary,
    textAlign: "center",
fontSize:20}
  
});
