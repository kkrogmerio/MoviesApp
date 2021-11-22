import axios from "axios";
export const FETCH_MOVIES = "FETCH_MOVIES";
import { theMovieDbApiKey } from "../../env";
import MovieDescription from "../../models/MovieDescription";
import MovieInterface from "../../models/MovieInterface";
import {getDataFromDb} from "../../database/realm/actions/manageMoviesData"
import { insertDataInDb } from "../../database/realm/actions/manageMoviesData";
import {databaseOptions} from '../../database/realm/actions//manageMoviesData'
export const fetchMovieDataLocal=()=>{

  return async(dispatch)=>{
     
    let moviesData=await getDataFromDb();
    moviesData = moviesData.rows._array;
   
    moviesDetails=[];
    moviesData.map((movie) =>
      moviesDetails.push({
        description: new MovieDescription(
          movie["title"],
          movie["overview"],
          movie["popularity"],
          movie["adult"],
          movie["vote_average"],
          movie["release"],
          movie["vote_count"]
        ),
        interface: new MovieInterface(
          movie["backdrop_path"],
          movie["poster_path"]
        ),
      })
    );
  
    dispatch({
      type: FETCH_MOVIES,
      data: moviesDetails,
    });
    // }
    // catch(error){
    //   console.log(error);
    //   // throw new Error("Data couldn't be fetched from the device");
    // }
  }

}
export const fetchMovieDataRemote=(chars)=>{
    return async(dispatch)=>{
    let fetchedData=await axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${theMovieDbApiKey}&page=1`);
    fetchedData=fetchedData.data;
    let numOfPages=parseInt(fetchedData.total_pages);
    let partialMoviesDetails=[];
    let allMoviesDetails=[];
    let count = 0;
        for(let i=1;i<numOfPages;i++){

            let fetchedPageData = await axios.get(
              `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${theMovieDbApiKey}&page=${i}`
            );
              fetchedPageData=fetchedPageData.data;
            for(let movie in fetchedPageData["results"]){
               movie=fetchedPageData["results"][movie];
              // console.log(movie["title"],chars,"WHEREEE")\
           
                if(movie["title"].substr(0,chars.length).toLowerCase()!=chars)
                    continue;
                
                count+=1;
                
                allMoviesDetails.push({title: movie["title"],
            overview: movie["overview"],
            popularity: movie["popularity"],
            adult: movie["adult"],
            backdrop_path: movie["backdrop_path"],
            poster_path: movie["poster_path"],
            vote_average:movie["vote_average"],
            id: movie["id"],
            release:movie["release_date"].split("-")[0],
            vote_count:movie["vote_count"]});
                partialMoviesDetails.push({
                  description: new MovieDescription(
                    movie["title"],
                    movie["overview"],
                    movie["popularity"],
                    movie["adult"],
                    movie["vote_average"],
                    movie["release_date"].split("-")[0],
                    movie["vote_count"]
                  ),
                  interface: new MovieInterface(
                    movie["backdrop_path"],
                    movie["poster_path"]
                  ),
                });
                if(count==10)
                    break;
            }
            if(count==10)
                    break;
                   
        }
    
    try {
    
      insertDataInDb(allMoviesDetails);
    } catch (err) {
      console.log(err);
    }
    dispatch({
        type:FETCH_MOVIES,
        data:partialMoviesDetails
    })
    }
}