<template>
  <section class="films">
    <FilmsList v-bind:movies="movies" quantity="5" v-bind:sort-type="sortType" title="All movies. Upcoming" />
    <FilmsList v-bind:movies="movies" quantity="2" sort-type="rating" title="Top rated" is-extra="true" />
    <FilmsList v-bind:movies="movies" quantity="2" sort-type="comments" title="Most commented" is-extra="true" />
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
    `sortType`
  ]
};
</script>
