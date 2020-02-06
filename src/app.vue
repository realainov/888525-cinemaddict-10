<template>
  <div id="app">
    <header class="header">
      <h1 class="header__logo logo">Cinemaddict</h1>

      <Profile :movies="movies" />
    </header>

    <main class="main">
      <Navigation @click="setFilterType" :movies="movies" />

      <Sort @click="setSortType" />

      <Films :sortType="sortType" :filterType="filterType" :movies="movies" @click="setCurrentMovie" />
    </main>


    <footer class="footer">
      <section class="footer__logo logo logo--smaller">Cinemaddict</section>
      <section class="footer__statistics">
        <p>{{ movies.length }} movies inside</p>
      </section>
    </footer>

    <FilmDetails v-if="currentMovie" :movie="currentMovie" @close="setCurrentMovie"  />

  </div>
</template>

<script>
import axios from 'axios';
// import {generateString} from './utils/common.js';
import Films from './components/films.vue';
import Navigation from './components/navigation.vue';
import Sort from './components/sort.vue';
import Profile from './components/profile.vue';
import FilmDetails from './components/film-details.vue';
import Movie from './models/movie';

const URL = `https://htmlacademy-es-10.appspot.com/cinemaddict`;
const AUTHORIZATION = `Basic ieieuioeuio`;

export default {
  name: `app`,
  data() {
    return {
      movies: [],
      sortType: `default`,
      filterType: `all`,
      currentMovie: null
    };
  },
  methods: {
    setSortType(sortType) {
      this.sortType = sortType;
    },
    setFilterType(filterType) {
      this.filterType = filterType;
    },
    setCurrentMovie(movie) {
      this.currentMovie = movie;
    },
  },
  components: {
    Films,
    Navigation,
    Sort,
    Profile,
    FilmDetails
  },
  mounted() {
    axios
      .get(`${URL}/movies`, {headers: {Authorization: AUTHORIZATION}})
      .then((movies) => (this.movies = movies.data.map((movie) => new Movie(movie))));
  }
};
</script>
