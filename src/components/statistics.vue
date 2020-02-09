<template>
  <section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label"> {{ profileStatus }} </span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters" @change="setTimeRange">
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
        <p class="statistic__item-text">{{ alreadyWatchedQuantity }} <span class="statistic__item-description">movies</span></p>
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
import lodash from 'lodash';
import {isThisTimeRange} from '../utils/common.js';

export default {
  name: `Statistics`,
  props: [
    `movies`
  ],
  data() {
    return {
      filteredWatchedMovies: []
    };
  },
  watch: {
    allWatchedMovies() {
      this.filteredWatchedMovies = this.allWatchedMovies;
    }
  },
  computed: {
    allAlreadyWatchedQuantity() {
      return this.allWatchedMovies.length;
    },
    alreadyWatchedQuantity() {
      return this.filteredWatchedMovies.length;
    },
    allWatchedMovies() {
      return this.movies.filter((movie) => movie.userDetails.alreadyWatched);
    },
    totalDuration() {
      const totalRuntime = this.filteredWatchedMovies.reduce((sum, watchedMovie) => {
        return sum + watchedMovie.filmInfo.runtime;
      }, 0);

      const hours = Math.floor(totalRuntime / 60);
      const minutes = totalRuntime % 60;

      return {hours, minutes};
    },
    favoriteGenre() {
      const genres = [].concat(...this.filteredWatchedMovies.map((watchedMovie) => watchedMovie.filmInfo.genre));

      const reps = genres.reduce((sum, genre) => {
        const newCount = (sum[genre] || 0) + 1;

        return {...sum, [genre]: newCount};
      }, {});

      const maxTimes = lodash.max(Object.values(reps));

      let favoriteGenre = Object.entries(reps).find(([, val]) => val === maxTimes);

      [favoriteGenre] = favoriteGenre ? favoriteGenre : ``;

      return favoriteGenre;
    },
    profileStatus() {
      if (this.allAlreadyWatchedQuantity === 0) {
        return ``;
      } else if (this.allAlreadyWatchedQuantity > 0 && this.allAlreadyWatchedQuantity < 11) {
        return `Novice`;
      } else if (this.allAlreadyWatchedQuantity > 10 && this.allAlreadyWatchedQuantity < 21) {
        return `Fan`;
      } else {
        return `Movie Buff`;
      }
    }
  },
  methods: {
    filterMovies(range) {
      this.filteredWatchedMovies = this.allWatchedMovies.filter((watchedMovie) => {
        const watchingDate = watchedMovie.userDetails.watchingDate;

        return isThisTimeRange(watchingDate, range);
      });
    },
    setTimeRange(evt) {
      switch (evt.target.value) {
        case `all-time`:
          this.filteredWatchedMovies = this.allWatchedMovies.slice();

          break;
        case `today`:
          this.filterMovies(`days`);

          break;
        case `week`:
          this.filterMovies(`weeks`);

          break;
        case `month`:
          this.filterMovies(`months`);

          break;
        case `year`:
          this.filterMovies(`years`);

          break;
      }
    }
  }
};
</script>
