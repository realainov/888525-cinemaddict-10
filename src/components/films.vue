<template>
  <section class="films">
    <FilmsList :movies="movies" quantity="5" :sort-type="sortType" :filter-type="filterType" :title="title" :is-empty="!this.movies.length" />
    <FilmsList :movies="movies" v-if="isPresenceRating" quantity="2" sort-type="rating" title="Top rated" is-extra="true" />
    <FilmsList :movies="movies" v-if="isPresenceComments" quantity="2" sort-type="comments" title="Most commented" is-extra="true" />
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
    },
    title() {
      return this.movies.length ? `All movies. Upcoming` : `There are no movies in our database`;
    }
  }
};
</script>
