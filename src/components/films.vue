<template>
  <section class="films">
    <FilmsList v-bind:movies="movies" quantity="5" v-bind:sort-type="sortType" v-bind:filter-type="filterType" title="All movies. Upcoming" />
    <FilmsList v-bind:movies="movies" v-if="isPresenceRating" quantity="2" sort-type="rating" title="Top rated" is-extra="true" />
    <FilmsList v-bind:movies="movies" v-if="isPresenceComments" quantity="2" sort-type="comments" title="Most commented" is-extra="true" />
  </section>
</template>

<script>
import FilmsList from './films-list.vue';

export default {
  name: `Films`,
  components: {
    FilmsList
  },
  props: [
    `movies`,
    `sortType`,
    `filterType`
  ],
  computed: {
    isPresenceRating() {
      return this.movies.every((movie) => movie.filmInfo.totalRating > 0);
    },
    isPresenceComments() {
      return this.movies.every((movie) => movie.comments);
    }
  }
};
</script>
