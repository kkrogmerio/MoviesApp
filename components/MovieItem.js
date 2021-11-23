import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity,Platform } from "react-native";
import Colors from "../constants/colors";
import StarRating from "react-native-star-rating";
export default function MovieItem(props) {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.movieItemStyle}>
        {props.title.length > 16 && (
          <Text style={styles.title}>{props.title.substring(0, 17)}...</Text>
        )}
        {props.title.length <= 16 && (
          <Text style={styles.title}>{props.title}</Text>
        )}
        <Image
          style={styles.poster}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${props.poster_path}`,
          }}
        />
        <StarRating
          disabled={true}
          maxStars={5}
          rating={props.rating / 2}
          starStyle={styles.starStyle}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  starStyle: { color: "yellow" },
  movieItemStyle: { margin: 17 },
  poster: { width: 175, height: 300 },
  title: { fontSize: 20, color: Platform.OS=="android"?Colors.second:Colors.primary },
});
