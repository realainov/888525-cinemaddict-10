<template>
  <nav class="main-navigation">
    <a
      href="#all"
      class="main-navigation__item"
      :class="{'main-navigation__item--active': activeNavigationItem === `all`}"
      @click.prevent="setActiveNavigationItem(`all`, !movies)"
    >
      All movies
    </a>
    <a
      href="#watchlist"
      class="main-navigation__item"
      :class="{'main-navigation__item--active': activeNavigationItem === `watchlist`}"
      @click.prevent="setActiveNavigationItem(`watchlist`, !watchlistQuantity)"
    >
      Watchlist
      <span class="main-navigation__item-count"> {{ watchlistQuantity }} </span>
    </a>
    <a
      href="#history"
      class="main-navigation__item"
      :class="{'main-navigation__item--active': activeNavigationItem === `history`}"
      @click.prevent="setActiveNavigationItem(`history`, !historyQuantity)"
    >
      History
      <span class="main-navigation__item-count"> {{ historyQuantity }} </span>
    </a>
    <a
      href="#favorites"
      class="main-navigation__item"
      :class="{'main-navigation__item--active': activeNavigationItem === `favorite`}"
      @click.prevent="setActiveNavigationItem(`favorite`, !favoriteQuantity)"
    >
      Favorites
      <span class="main-navigation__item-count"> {{ favoriteQuantity }} </span>
    </a>
    <a
      href="#stats"
      class="main-navigation__item main-navigation__item--additional"
      :class="{'main-navigation__item--active': activeNavigationItem === `stats`}"
      @click.prevent="setActiveNavigationItem(`stats`, false)"
    >
      Stats
    </a>
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
      activeNavigationItem: `all`
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
    setActiveNavigationItem(activeNavigationItem, isDisabled) {
      if (!isDisabled) {
        this.$emit(`click`, activeNavigationItem);

        this.activeNavigationItem = activeNavigationItem;
      }
    }
  }
};
</script>
