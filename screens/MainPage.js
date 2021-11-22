import React, { useState, useEffect } from "react";
import {
  StyleSheet,

  View,
  ActivityIndicator,

  Dimensions,

  FlatList,
  Platform
} from "react-native";
import MovieItem from "../components/MovieItem";
import {
  fetchMovieDataLocal,
  fetchMovieDataRemote,
} from "../store/actions/fetchMovieData";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../components/Searchbar";
import Colors from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
export default function MainPage(props) {
  
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [movieTitle, setMovieTitle] = useState("");
  const internet = useSelector((state) => state.net.internetStatus);
  const moviesData = useSelector((state) => state.movie.moviesData);
  console.log(internet, "RRRRRRRRRRRRRRR");
  console.log(internet);
  useEffect(async () => {
    console.log("NU AICIIIIIIIIIIIIIIIIII")
    setIsLoading(true);
    await dispatch(fetchMovieDataRemote(movieTitle));
    setIsLoading(false);
  }, [movieTitle]);
  useEffect(async () => {
    if (internet != null) {
      setIsLoading(true);
      internet == true
        ? await dispatch(fetchMovieDataRemote(""))
        : await dispatch(fetchMovieDataLocal(""));
      setIsLoading(false);
    }
  }, [internet]);

  return (
    <LinearGradient
      colors={
        Platform.OS === "android"
          ? [Colors.primary, Colors.accent]
          : [Colors.second, Colors.second]
      }
      style={styles.gradient}
    >
      <View style={styles.container}>
        {internet && (
          <SearchBar setValue={setMovieTitle} movieTitle={movieTitle} />
        )}
        {isLoading && (
          <ActivityIndicator
            size="large"
            color={Platform.OS == "android" ? Colors.second : Colors.primary}
            style={{ top: 200 }}
          />
        )}
        {moviesData && (
          <View style={styles.listMovies}>
            <FlatList
              style={{ top: 100 }}
              numColumns={Dimensions.get("window").width < 400 ? 1 : 2}
              data={moviesData}
              ListFooterComponent={
                <View style={{ height: 0, marginBottom: 90 }}></View>
              }
              keyExtractor={(item) => item.title}
              renderItem={(itemData) => (
                <MovieItem
                  title={itemData.item.description.title}
                  rating={itemData.item.description.vote_average}
                  poster_path={itemData.item.interface.poster_path}
                  backdrop_path={itemData.item.interface.backdrop_path}
                  
                  
                  onSelect={() => {
                    props.navigation.navigate("MovieDetails", {
                      adult: itemData.item.description.adult,
                      title: itemData.item.description.title,
                      overview: itemData.item.description.overview,
                      rating: itemData.item.description.vote_average,
                      backdrop_path: itemData.item.interface.backdrop_path,
                      release:itemData.item.description.release,
                      popularity:itemData.item.description.popularity
                    });
                  }}
                />
              )}
            />
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: "100%",
  },
  list:{
    flexGrow:1
  },
  listMovies:{
    flex:1
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
});
