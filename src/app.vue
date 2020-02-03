<template>
  <div id="app">
    <header class="header">
      <h1 class="header__logo logo">Cinemaddict</h1>

      <Profile />
    </header>

    <main class="main">
      <Navigation />

      <Sort @click="setSortType" />

      <Films v-bind:sortType="sortType" v-bind:movies="movies" />
    </main>


    <footer class="footer">
      <section class="footer__logo logo logo--smaller">Cinemaddict</section>
      <section class="footer__statistics">
        <p>130 291 movies inside</p>
      </section>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';
import {generateString} from './utils/common.js';
import Films from './components/films.vue';
import Navigation from './components/navigation.vue';
import Sort from './components/sort.vue';
import Profile from './components/profile.vue';
import MovieModel from './models/movie';

const URL = `https://htmlacademy-es-10.appspot.com/cinemaddict`;
const AUTHORIZATION = `Basic ${generateString(6)}`;

export default {
  name: `app`,
  data() {
    return {
      movies: [],
      sortType: `default`
    };
  },
  methods: {
    setSortType(sortType) {
      this.sortType = sortType;
    }
  },
  components: {
    Films,
    Navigation,
    Sort,
    Profile
  },
  mounted() {
    axios
      .get(`${URL}/movies`, {headers: {Authorization: AUTHORIZATION}})
      .then((movies) => (this.movies = movies.data.map((movie) => new MovieModel(movie))));
  }
};
</script>
