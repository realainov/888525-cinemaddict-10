<template>
  <article class="film-card">
    <h3 class="film-card__title"> {{ title }} </h3>
    <p class="film-card__rating"> {{ totalRating }} </p>
    <p class="film-card__info">
      <span class="film-card__year"> {{ date }} </span>
      <span class="film-card__duration"> {{ runtime }} </span>
      <span class="film-card__genre"> {{ genre }} </span>
    </p>
    <img :src="poster" alt="" class="film-card__poster" @click="openPopup">
    <p class="film-card__description"> {{ description }} </p>
    <a class="film-card__comments">{{ commentsQuantity }} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>
</template>

<script>
export default {
  name: `FilmCard`,
  props: [
    `movie`
  ],
  data() {
    const runtime = this.movie.filmInfo.runtime;

    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    return {
      commentsQuantity: this.movie.comments.length,
      title: this.movie.filmInfo.title,
      totalRating: this.movie.filmInfo.totalRating,
      genre: this.movie.filmInfo.genre ? this.movie.filmInfo.genre[0] : ``,
      poster: this.movie.filmInfo.poster,
      date: new Date(this.movie.filmInfo.release.date).getFullYear(),
      runtime: `${hours ? `${hours}H` : ``} ${minutes ? `${minutes}M` : ``}`,
      description: this.movie.filmInfo.description.length < 140 ? this.movie.filmInfo.description : `${this.movie.filmInfo.description.substring(0, 140)}...`
    };
  },
  methods: {
    openPopup() {
      this.$parent.$parent.$emit(`click`, this.movie);
    }
  }
};
</script>
