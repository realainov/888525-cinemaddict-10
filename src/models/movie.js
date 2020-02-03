export default class MovieModel {
  constructor(movie) {
    this.id = movie[`id`];
    this.comments = movie[`comments`];
    this.filmInfo = {
      title: movie[`film_info`][`title`],
      alternativeTitle: movie[`film_info`][`alternative_title`],
      totalRating: movie[`film_info`][`total_rating`],
      poster: movie[`film_info`][`poster`],
      ageRating: movie[`film_info`][`age_rating`],
      director: movie[`film_info`][`director`],
      writers: movie[`film_info`][`writers`],
      actors: movie[`film_info`][`actors`],
      release: {
        date: movie[`film_info`][`release`][`date`],
        releaseCountry: movie[`film_info`][`release`][`release_country`]
      },
      runtime: movie[`film_info`][`runtime`],
      genre: movie[`film_info`][`genre`],
      description: movie[`film_info`][`description`]
    };
    this.userDetails = {
      personalRating: movie[`user_details`][`personal_rating`],
      watchlist: movie[`user_details`][`watchlist`],
      alreadyWatched: movie[`user_details`][`already_watched`],
      watchingDate: movie[`user_details`][`watching_date`],
      favorite: movie[`user_details`][`favorite`]
    };
  }

  toRAW() {
    return {
      'id': this.id,
      'comments': this.comments,
      'film_info': {
        'title': this.filmInfo.title,
        'alternative_title': this.filmInfo.alternativeTitle,
        'total_rating': this.filmInfo.totalRating,
        'poster': this.filmInfo.poster,
        'age_rating': this.filmInfo.ageRating,
        'director': this.filmInfo.director,
        'writers': this.filmInfo.writers,
        'actors': this.filmInfo.actors,
        'release': {
          'date': this.filmInfo.release.date,
          'release_country': this.filmInfo.release.releaseCountry
        },
        'runtime': this.filmInfo.runtime,
        'genre': this.filmInfo.genre,
        'description': this.filmInfo.description
      },
      'user_details': {
        'personal_rating': this.userDetails.personalRating,
        'watchlist': this.userDetails.watchlist,
        'already_watched': this.userDetails.alreadyWatch,
        'watching_date': this.userDetails.watchingDate,
        'favorite': this.userDetails.favorite
      }
    };
  }
}
