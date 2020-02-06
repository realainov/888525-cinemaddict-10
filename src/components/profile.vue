<template>
  <section class="header__profile profile">
    <p class="profile__rating"> {{ profileStatus }} </p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
</template>

<script>
export default {
  name: `Profile`,
  props: [
    `movies`
  ],
  computed: {
    alreadyWatchedQuantity() {
      return this.movies.reduce((sum, movie) => sum + +movie.userDetails.alreadyWatched, 0);
    },
    profileStatus() {
      if (this.alreadyWatchedQuantity === 0) {
        return ``;
      } else if (this.alreadyWatchedQuantity > 0 && this.alreadyWatchedQuantity < 11) {
        return `Novice`;
      } else if (this.alreadyWatchedQuantity > 10 && this.alreadyWatchedQuantity < 21) {
        return `Fan`;
      } else {
        return `Movie Buff`;
      }
    }
  }
};
</script>
