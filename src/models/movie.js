export default class Movie {
  constructor(data) {
    this.id = data[`id`];
    this.comments = data[`comments`];
    this.filmInfo = data[`film_info`];
    this.userDetails = data[`user_details`];
  }

  getData() {
    return {
      id: this.id,
      title: this.filmInfo[`title`],
      originalTitle: this.filmInfo[`alternative_title`],
      poster: {
        url: this.filmInfo[`poster`],
      },
      description: this.filmInfo[`description`],
      rating: this.filmInfo[`total_rating`],
      duration: this.filmInfo[`runtime`],
      genres: this.filmInfo[`genre`],
      comments: this.comments,
      creators: {
        director: this.filmInfo[`director`],
        writers: this.filmInfo[`writers`],
        actors: this.filmInfo[`actors`],
        country: this.filmInfo[`release`][`release_country`],
      },
      ageRating: this.filmInfo[`age_rating`],
      releaseDate: this.filmInfo[`release`][`date`],
      addedToWatchlist: this.userDetails[`watchlist`],
      alreadyWatched: this.userDetails[`already_watched`],
      addedToFavorite: this.userDetails[`favorite`],
      watchingDate: this.userDetails[`watching_date`],
    };
  }

  static parseMovie(data) {
    return new Movie(data).getData();
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }
}
