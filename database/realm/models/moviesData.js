export default class MoviesModel {
  static schema = {
    name: "Movie",
    properties: {
      title: "string",
      overview: "string",
      popularity: "float",
      adult: "bool",
      backdrop_path: "string",
      poster_path: "string",
      id: "int",
      release_date: "string",
      vote_average: "float",
      vote_count: "float",
    },
  };
  static schema2 = {
    name: "Rovie",
    properties: {
      title: "string",

    },
}
  
}
export const Dog = {
  name: "Dog",
  properties: {
    name: "string",
  
  },
};