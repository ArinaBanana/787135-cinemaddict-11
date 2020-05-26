export default class MovieAdapter {
  constructor(data) {
    this.id = data[`id`];
    this.comments = data[`comments`];

    this.title = data[`film_info`][`title`];
    this.originalTitle = data[`film_info`][`alternative_title`];
    this.poster = {
      url: data[`film_info`][`poster`],
    };
    this.description = data[`film_info`][`description`];
    this.rating = data[`film_info`][`total_rating`];
    this.duration = data[`film_info`][`runtime`];
    this.genres = data[`film_info`][`genre`];
    this.creators = {
      director: data[`film_info`][`director`],
      writers: data[`film_info`][`writers`],
      actors: data[`film_info`][`actors`],
      country: data[`film_info`][`release`][`release_country`],
    };
    this.ageRating = data[`film_info`][`age_rating`];
    this.releaseDate = data[`film_info`][`release`][`date`];

    this.addedToWatchlist = data[`user_details`][`watchlist`];
    this.alreadyWatched = data[`user_details`][`already_watched`];
    this.addedToFavorite = data[`user_details`][`favorite`];
    this.watchingDate = data[`user_details`][`watching_date`];
  }

  toRaw() {
    return {
      "id": this.id,
      "comments": this.comments,
      "film_info": {
        "title": this.title,
        "alternative_title": this.originalTitle,
        "total_rating": this.rating,
        "poster": this.poster.url,
        "age_rating": this.ageRating,
        "director": this.creators.director,
        "writers": this.creators.writers,
        "actors": this.creators.actors,
        "release": {
          "date": this.releaseDate,
          "release_country": this.creators.country,
        },
        "runtime": this.duration,
        "genre": this.genres,
        "description": this.description,
      },
      "user_details": {
        "watchlist": this.addedToWatchlist,
        "already_watched": this.alreadyWatched,
        "watching_date": this.watchingDate,
        "favorite": this.addedToFavorite,
      },
    };
  }

  static parseMovie(data) {
    return new MovieAdapter(data);
  }

  static parseMovies(data) {
    return data.map(MovieAdapter.parseMovie);
  }

  static clone(data) {
    return new MovieAdapter(data.toRaw());
  }
}
