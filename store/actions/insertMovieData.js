import axios from "axios";
export const FETCH_MOVIES = "FETCH_MOVIES";
import { theMovieDbApiKey } from "../../env";
import MovieDescription from "../../models/MovieDescription";
import MovieInterface from "../../models/MovieInterface";
import { insertDataInDb  } from "../../database/realm/actions/manageMoviesData";
export const insertMoviesDataLocal=()=>{
    return async(_,getState)=>{
        try{
        
        let moviesData=getState().movie.moviesData.map(ie=>ie=Object.assign({},ie.description,ie.interface));
       
     
        insertDataInDb(moviesData);
        }catch(err){
            console.log(err)
        }
    }
}