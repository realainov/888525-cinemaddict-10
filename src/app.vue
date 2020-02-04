<template>
  <div id="app">
    <header class="header">
      <h1 class="header__logo logo">Cinemaddict</h1>

      <Profile />
    </header>

    <main class="main">
      <Navigation @click="setFilterType" v-bind:movies="movies" />

      <Sort @click="setSortType" />

      <Films v-bind:sortType="sortType" v-bind:filterType="filterType" v-bind:movies="movies" @click="openPopup" />
    </main>


    <footer class="footer">
      <section class="footer__logo logo logo--smaller">Cinemaddict</section>
      <section class="footer__statistics">
        <p>130 291 movies inside</p>
      </section>
    </footer>

    <FilmDetails v-bind:movie="currentMovie" v-show="!currentMovie.empty" />
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
import MovieModel from './models/movie';

const URL = `https://htmlacademy-es-10.appspot.com/cinemaddict`;
const AUTHORIZATION = `Basic ${generateString(6)}`;

export default {
  name: `app`,
  data() {
    return {
      movies: [],
      sortType: `default`,
      filterType: `all`,
      currentMovie: {
        empty: true,
        id: ``,
        comments: [],
        filmInfo: {
          title: ``,
          alternativeTitle: ``,
          totalRating: ``,
          poster: ``,
          ageRating: ``,
          director: ``,
          writers: [],
          actors: [],
          release: {
            date: ``,
            releaseCountry: ``
          },
          runtime: ``,
          genre: [],
          description: ``
        },
        userDetails: {
          personalRating: ``,
          watchlist: null,
          alreadyWatched: null,
          watchingDate: ``,
          favorite: null
        }
      }
    };
  },
  methods: {
    setSortType(sortType) {
      this.sortType = sortType;
    },
    setFilterType(filterType) {
      this.filterType = filterType;
    },
    openPopup(movie) {
      this.currentMovie = movie;
    }
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
      .then((movies) => (this.movies = movies.data.map((movie) => new MovieModel(movie))));
  }
};
</script>
