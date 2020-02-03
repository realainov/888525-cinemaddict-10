<template>
  <section :class="!isExtra ? `films-list` : `films-list--extra`">
      <h2 class="films-list__title" :class="[!isExtra ? `visually-hidden` : ``]"> {{ title }}</h2>

      <div class="films-list__container">
        <FilmCard v-for="movie in sortMovies().slice(0, counter)" :key="movie.id" v-bind:movie="movie" />
      </div>

      <ShowMore v-if="!isExtra" v-show="counter < movies.length" @click.native="counter += 5" />
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
    `sortType`
  ],
  methods: {
    sortMovies() {
      switch (this.sortType) {
        case `date`:
          return this.movies.slice().sort((a, b) => new Date(b.filmInfo.release.date) - new Date(a.filmInfo.release.date));
        case `rating`:
          return this.movies.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
        case `comment`:
          return this.movies.slice().sort((a, b) => b.comments.length - a.comments.length);
        default:
          return this.movies.slice();
      }
    }
  },
  data() {
    return {
      counter: +this.quantity
    };
  }
};
</script>
