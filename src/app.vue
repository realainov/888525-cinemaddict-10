<template>
  <div id="app">
    <header class="header">
      <h1 class="header__logo logo">Cinemaddict</h1>

      <Profile :movies="movies" />
    </header>

    <main class="main">
      <Navigation @click="setActiveNavigationItem" :movies="movies" />

      <Sort @click="setSortType" />

      <Films :sortType="sortType" :filterType="filterType" :movies="movies" v-show="activeComponent === `Films`" @click="setCurrentMovie" />
      <Statistics :movies="movies" v-show="activeComponent === `Statistics`" />
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
import {generateString} from './utils/common.js';
import Films from './components/films.vue';
import Navigation from './components/navigation.vue';
import Sort from './components/sort.vue';
import Profile from './components/profile.vue';
import FilmDetails from './components/film-details.vue';
import Statistics from './components/statistics.vue';
import Movie from './models/movie.js';

axios.defaults.baseURL = `https://htmlacademy-es-10.appspot.com/cinemaddict`;
axios.defaults.headers = {
  [`Authorization`]: `Basic ${generateString(6)}`,
  [`Content-Type`]: `application/json`
};

export default {
  name: `app`,
  data() {
    return {
      movies: [],
      sortType: `default`,
      filterType: `all`,
      currentMovie: null,
      activeComponent: `Films`
    };
  },
  methods: {
    setSortType(sortType) {
      this.sortType = sortType;
    },
    setActiveNavigationItem(activeNavigationItem) {
      switch (activeNavigationItem) {
        case `stats`:
          this.activeComponent = `Statistics`;

          break;
        default:
          this.activeComponent = `Films`;
          this.filterType = activeNavigationItem;
      }
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
    FilmDetails,
    Statistics
  },
  mounted() {
    axios({
      method: `get`,
      url: `/movies`
    })
      .then((movies) => (this.movies = movies.data.map((movie) => new Movie(movie))));
  }
};
</script>
