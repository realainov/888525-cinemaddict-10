<template>
  <section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label"> {{ profileStatus }} </span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">{{ watchedQuantity }} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">{{ totalDuration.hours }} <span class="statistic__item-description">h</span> {{ totalDuration.minutes }} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text"> {{ favoriteGenre }}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>
</template>

<script>
export default {
  name: `Statistics`,
  props: [
    `movies`
  ],
  data() {
    return {
      filteredMovies: this.watchedMovies
    };
  },
  computed: {
    watchedMovies() {
      return this.movies.filter((movie) => movie.userDetails.alreadyWatched);
    },
    alreadyWatchedQuantity() {
      return this.movies.reduce((sum, movie) => sum + +movie.userDetails.alreadyWatched, 0);
    },
    watchedQuantity() {
      return this.movies.filter((movie) => movie.userDetails.alreadyWatched).length;
    },
    totalDuration() {
      const totalRuntime = this.watchedMovies.reduce((sum, watchedMovie) => {
        return sum + watchedMovie.filmInfo.runtime;
      }, 0);

      const hours = Math.floor(totalRuntime / 60);
      const minutes = totalRuntime % 60;

      return {hours, minutes};
    },
    favoriteGenre() {
      const genres = [].concat(...this.watchedMovies.map((watchedMovie) => watchedMovie.filmInfo.genre));

      const reps = genres.reduce((sum, item) => {
        const newCount = (sum[item] || 0) + 1;
        return {...sum, [item]: newCount};
      }, {});

      const maxTimes = Math.max.apply(null, Object.values(reps));

      const [favoriteGenre] = Object.entries(reps).find(([, val]) => val === maxTimes);

      return favoriteGenre;
    },
    profileStatus() {
      if (this.alreadyWatchedQuantity === 0) {
        return ``;
      } else if (this.alreadyWatchedQuantity > 0 && this.alreadyWatchedQuantity < 11) {
        return `Novice`;
      } else if (this.alreadyWatchedQuantity > 10 && this.alreadyWatchedQuantity < 21) {
        return `Fan`;
      } else {
        return `Movie Buff`;
      }
    }
  }
};
</script>
