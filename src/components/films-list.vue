<template>
  <section :class="!isExtra ? `films-list` : `films-list--extra`">
      <h2 class="films-list__title" :class="[!isExtra ? `visually-hidden` : ``]"> {{ title }}</h2>

      <div class="films-list__container">
        <FilmCard v-for="movie in sortMovies().slice(0, counter)" :key="movie.id" v-bind:movie="movie" />
      </div>

      <ShowMore v-if="!isExtra" v-show="counter < filteredMovies.length" @click.native="counter += 5" />
    </section>
</template>

<script>
import FilmCard from './film-card.vue';
import ShowMore from './show-more.vue';

export default {
  name: `FilmsList`,
  components: {
    FilmCard,
    ShowMore
  },
  props: [
    `isExtra`,
    `movies`,
    `quantity`,
    `title`,
    `sortType`,
    `filterType`
  ],
  methods: {
    sortMovies() {
      switch (this.sortType) {
        case `date`:
          return this.filteredMovies.slice().sort((a, b) => new Date(b.filmInfo.release.date) - new Date(a.filmInfo.release.date));
        case `rating`:
          return this.filteredMovies.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
        case `comments`:
          return this.filteredMovies.slice().sort((a, b) => b.comments.length - a.comments.length);
        default:
          return this.filteredMovies.slice();
      }
    },
    filterMovies() {
      switch (this.filterType) {
        case `all`:
          return this.movies.slice();
        case `watchlist`:
          return this.movies.filter((movie) => movie.userDetails.watchlist);
        case `history`:
          return this.movies.filter((movie) => movie.userDetails.alreadyWatched);
        case `favorite`:
          return this.movies.filter((movie) => movie.userDetails.favorite);
        default:
          return this.movies.slice();
      }
    }
  },
  data() {
    return {
      counter: +this.quantity
    };
  },
  computed: {
    filteredMovies() {
      return this.filterMovies();
    }
  }
};
</script>
