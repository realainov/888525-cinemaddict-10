<template>
  <section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button" @click="closePopup">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" :src="poster" alt="">

            <p class="film-details__age"> {{ ageRating }}+ </p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title"> {{ title }} </h3>
                <p class="film-details__title-original"> {{ alternativeTitle }} </p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating"> {{ totalRating }} </p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell"> {{ director }} </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell"> {{ writers }} </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell"> {{ actors }} </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell"> {{ releaseDate }} </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell"> {{ runtime }} </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell"> {{ country }} </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term"> {{ genres.length === 1 ? `Genre` : `Genres` }} </td>
                <td class="film-details__cell">
                  <span class="film-details__genre" v-for="(genre, index) in genres" :key="index"> {{ genre }} </span>
                </td>
              </tr>
            </table>

            <p class="film-details__film-description"> {{ description }} </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
          <label
            for="watchlist"
            class="film-details__control-label film-details__control-label--watchlist"
            :class="{'film-details__control-label--active': movie.userDetails.watchlist}"
            @click="addToWatchlist"
          >
            Add to watchlist
          </label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
          <label
            for="watched"
            class="film-details__control-label film-details__control-label--watched"
            :class="{'film-details__control-label--active': movie.userDetails.alreadyWatched}"
            @click="markAsWatched"
          >
            Already watched
          </label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
          <label
            for="favorite"
            class="film-details__control-label film-details__control-label--favorite"
            :class="{'film-details__control-label--active': movie.userDetails.favorite}"
            @click="markAsFavorite"
          >
            Add to favorites
          </label>
        </section>
      </div>

      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count"> {{ commentsQuantity }} </span></h3>

          <ul class="film-details__comments-list">
            <li class="film-details__comment" v-for="(comment, index) in comments" :key="comment.id">
            <span class="film-details__comment-emoji">
              <img :src="`images/emoji/${comment.emotion}.png`" width="55" height="55" alt="emoji">
            </span>
              <div>
                <p class="film-details__comment-text"> {{ comment.comment }} </p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author"> {{ comment.author }} </span>
                  <span class="film-details__comment-day"> {{ formatDateTime(comment.date) }} </span>
                  <button class="film-details__comment-delete" @click.prevent="deleteComment(index)">Delete</button>
                </p>
              </div>
            </li>
          </ul>

          <div class="film-details__new-comment" @keydown.enter.prevent="addComment">
            <div for="add-emoji" class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>
</template>

<script>
import Comment from '../models/comment.js';
import {formatDate, formatDateTime} from '../utils/common';
import axios from "axios";

export default {
  name: `FilmDetails`,
  props: [
    `movie`
  ],
  data() {
    const runtime = this.movie.filmInfo.runtime;

    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    return {
      ageRating: this.movie.filmInfo.ageRating,
      alternativeTitle: this.movie.filmInfo.alternativeTitle,
      comments: null,
      commentsQuantity: this.movie.comments.length,
      country: this.movie.filmInfo.release.releaseCountry,
      description: this.movie.filmInfo.description,
      director: this.movie.filmInfo.director,
      genres: this.movie.filmInfo.genre,
      poster: this.movie.filmInfo.poster,
      releaseDate: formatDate(this.movie.filmInfo.release.date),
      runtime: `${hours ? `${hours}H` : ``} ${minutes ? `${minutes}M` : ``}`,
      title: this.movie.filmInfo.title,
      totalRating: this.movie.filmInfo.totalRating
    };
  },
  computed: {
    writers() {
      return this.movie.filmInfo.writers.join(`, `);
    },
    actors() {
      return this.movie.filmInfo.actors.join(`, `);
    }
  },
  methods: {
    closePopup() {
      this.$emit(`close`, null);
    },
    addToWatchlist() {
      this.movie.userDetails.watchlist = !this.movie.userDetails.watchlist;
    },
    markAsWatched() {
      this.movie.userDetails.alreadyWatched = !this.movie.userDetails.alreadyWatched;
    },
    markAsFavorite() {
      this.movie.userDetails.favorite = !this.movie.userDetails.favorite;
    },
    addComment(evt) {
      const element = evt.currentTarget;

      const commentElement = element.querySelector(`.film-details__comment-input`);
      const emotionElement = Array.from(element.querySelectorAll(`.film-details__emoji-item`)).find((el) => el.checked === true);

      if (emotionElement) {
        const newComment = new Comment({
          comment: commentElement.value,
          emotion: emotionElement.value,
          date: new Date()
        });

        axios({
          method: `post`,
          url: `comments/${this.movie.id}`,
          data: newComment
        })
          .then((response) => {
            this.comments = response.data.comments;
            this.commentsQuantity = this.comments.length;
          })
          .then(() => {
            commentElement.value = ``;
            emotionElement.checked = false;
          });
      }
    },
    deleteComment(index) {
      axios({
        method: `delete`,
        url: `comments/${this.comments[index].id}`
      })
      .then(() => {
        this.comments = [].concat(this.comments.slice(0, index), this.comments.slice(index + 1));
        this.commentsQuantity = this.comments.length;
      });
    },
    formatDate,
    formatDateTime
  },
  created() {
    window.addEventListener(`keydown`, (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        this.closePopup();
      }
    });
  },
  watch: {
    movie: {
      handler(renewedMovie) {
        axios({
          method: `put`,
          url: `/movies/${renewedMovie.id}`,
          data: renewedMovie.toRAW()
        });
      },
      deep: true
    }
  },
  mounted() {
    axios({
      method: `get`,
      url: `/comments/${this.movie.id}`
    })
      .then((comments) => (this.comments = comments.data.map((comment) => new Comment(comment))));
  }
};
</script>
