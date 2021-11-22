import { FETCH_MOVIES } from "../actions/fetchMovieData";
const initialState = {
  moviesData: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES: {
      return { moviesData: action.data };
    }
    default:
      return state;
  }
};
