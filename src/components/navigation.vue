<template>
  <nav class="main-navigation">
    <a
      href="#all"
      class="main-navigation__item"
      :class="{'main-navigation__item--active': filterType === `all`}"
      @click="setFilterType(`all`, movies)"
    >
      All movies
    </a>
    <a
      href="#watchlist"
      class="main-navigation__item"
      :class="{'main-navigation__item--active': filterType === `watchlist`}"
      @click="setFilterType(`watchlist`, watchlistQuantity)"
    >
      Watchlist
      <span class="main-navigation__item-count"> {{ watchlistQuantity }} </span>
    </a>
    <a
      href="#history"
      class="main-navigation__item"
      :class="{'main-navigation__item--active': filterType === `history`}"
      @click="setFilterType(`history`, historyQuantity)"
    >
      History
      <span class="main-navigation__item-count"> {{ historyQuantity }} </span>
    </a>
    <a
      href="#favorites"
      class="main-navigation__item"
      :class="{'main-navigation__item--active': filterType === `favorite`}"
      @click="setFilterType(`favorite`, favoriteQuantity)"
    >
      Favorites
      <span class="main-navigation__item-count"> {{ favoriteQuantity }} </span>
    </a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>
</template>

<script>
export default {
  name: `Navigation`,
  props: [
    `movies`
  ],
  data() {
    return {
      filterType: `all`
    };
  },
  computed: {
    watchlistQuantity() {
      return this.movies.filter((movie) => movie.userDetails.watchlist).length;
    },
    historyQuantity() {
      return this.movies.filter((movie) => movie.userDetails.alreadyWatched).length;
    },
    favoriteQuantity() {
      return this.movies.filter((movie) => movie.userDetails.favorite).length;
    }
  },
  methods: {
    setFilterType(filterType, filteredMoviesQuantity) {
      if (filteredMoviesQuantity) {
        this.$emit(`click`, filterType);

        this.filterType = filterType;
      }
    }
  }
};
</script>
