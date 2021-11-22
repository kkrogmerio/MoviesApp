class MovieDescription {
  constructor(title,overview,popularity,adult,vote_average,release,vote_count) {
    this.title = title;
    this.overview = overview;
    this.popularity = popularity;
    
    this.adult = adult;
    this.vote_average = vote_average;
    this.release=release;
    this.vote_count=vote_count;
  }
}

export default MovieDescription;
