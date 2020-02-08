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
                <p class="film-details__user-rating" v-if="userRating">Your rate {{ userRating }} </p>
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
          <input
            type="checkbox"
            class="film-details__control-input visually-hidden"
            id="watchlist"
            name="watchlist"
            :checked="watchlist"
          >
          <label
            for="watchlist"
            class="film-details__control-label film-details__control-label--watchlist"
            @click.prevent="addToWatchlist"
          >
            Add to watchlist
          </label>

          <input
            type="checkbox"
            class="film-details__control-input visually-hidden"
            id="watched"
            name="watched"
            :checked="alreadyWatched"
          >
          <label
            for="watched"
            class="film-details__control-label film-details__control-label--watched"
            @click.prevent="markAsWatched"
          >
            Already watched
          </label>

          <input
            type="checkbox"
            class="film-details__control-input visually-hidden"
            id="favorite"
            name="favorite"
            :checked="favorite"
          >
          <label
            for="favorite"
            class="film-details__control-label film-details__control-label--favorite"
            @click.prevent="markAsFavorite"
          >
            Add to favorites
          </label>
        </section>
      </div>

      <div class="form-details__middle-container" v-if="alreadyWatched">
        <section class="film-details__user-rating-wrap">
          <div class="film-details__user-rating-controls">
            <button class="film-details__watched-reset" type="button" @click="resetUserRating">Undo</button>
          </div>

          <div class="film-details__user-score">
            <div class="film-details__user-rating-poster">
              <img :src="poster" alt="film-poster" class="film-details__user-rating-img">
            </div>

            <section class="film-details__user-rating-inner">
              <h3 class="film-details__user-rating-title"> {{ title }} </h3>

              <p class="film-details__user-rating-feelings">How you feel it?</p>

              <div class="film-details__user-rating-score" @change="setUserRating">
                <input
                  type="radio"
                  name="score"
                  class="film-details__user-rating-input visually-hidden"
                  value="1"
                  id="rating-1"
                  :checked="userRating === 1"
                >
                <label class="film-details__user-rating-label" for="rating-1">1</label>

                <input
                  type="radio"
                  name="score"
                  class="film-details__user-rating-input visually-hidden"
                  value="2"
                  id="rating-2"
                  :checked="userRating === 2"
                >
                <label class="film-details__user-rating-label" for="rating-2">2</label>

                <input
                  type="radio"
                  name="score"
                  class="film-details__user-rating-input visually-hidden"
                  value="3"
                  id="rating-3"
                  :checked="userRating === 3"
                >
                <label class="film-details__user-rating-label" for="rating-3">3</label>

                <input
                  type="radio"
                  name="score"
                  class="film-details__user-rating-input visually-hidden"
                  value="4"
                  id="rating-4"
                  :checked="userRating === 4"
                >
                <label class="film-details__user-rating-label" for="rating-4">4</label>

                <input
                  type="radio"
                  name="score"
                  class="film-details__user-rating-input visually-hidden"
                  value="5"
                  id="rating-5"
                  :checked="userRating === 5"
                >
                <label class="film-details__user-rating-label" for="rating-5">5</label>

                <input
                  type="radio"
                  name="score"
                  class="film-details__user-rating-input visually-hidden"
                  value="6"
                  id="rating-6"
                  :checked="userRating === 6"
                >
                <label class="film-details__user-rating-label" for="rating-6">6</label>

                <input
                  type="radio"
                  name="score"
                  class="film-details__user-rating-input visually-hidden"
                  value="7"
                  id="rating-7"
                  :checked="userRating === 7"
                >
                <label class="film-details__user-rating-label" for="rating-7">7</label>

                <input
                  type="radio"
                  name="score"
                  class="film-details__user-rating-input visually-hidden"
                  value="8"
                  id="rating-8"
                  :checked="userRating === 8"
                >
                <label class="film-details__user-rating-label" for="rating-8">8</label>

                <input
                  type="radio"
                  name="score"
                  class="film-details__user-rating-input visually-hidden"
                  value="9"
                  id="rating-9"
                  :checked="userRating === 9"
                >
                <label class="film-details__user-rating-label" for="rating-9">9</label>

              </div>
            </section>
          </div>
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
            <div for="add-emoji" class="film-details__add-emoji-label">
              <img v-if="emotion" :src="`images/emoji/${emotion}.png`" width="55" height="55" alt="emoji">
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list" @change="addEmotion">
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
import axios from 'axios';
import he from 'he';
import lodash from 'lodash';

export default {
  name: `FilmDetails`,
  props: [
    `movie`
  ],
  data() {
    return {
      comments: null,
      emotion: null,
      test: null
    };
  },
  computed: {
    ageRating() {
      return this.movie.filmInfo.ageRating;
    },
    alreadyWatched() {
      return this.movie.userDetails.alreadyWatched;
    },
    alternativeTitle() {
      return this.movie.filmInfo.alternativeTitle;
    },
    country() {
      return this.movie.filmInfo.release.releaseCountry;
    },
    commentsQuantity() {
      if (this.comments) {
        return this.comments.length;
      }

      return this.movie.comments.length;
    },
    description() {
      return this.movie.filmInfo.description;
    },
    director() {
      return this.movie.filmInfo.director;
    },
    genres() {
      return this.movie.filmInfo.genre;
    },
    favorite() {
      return this.movie.userDetails.favorite;
    },
    poster() {
      return this.movie.filmInfo.poster;
    },
    releaseDate() {
      return formatDate(this.movie.filmInfo.release.date);
    },
    runtime() {
      const runtime = this.movie.filmInfo.runtime;

      const hours = Math.floor(runtime / 60);
      const minutes = runtime % 60;

      return `${hours ? `${hours}H` : ``} ${minutes ? `${minutes}M` : ``}`;
    },
    title() {
      return this.movie.filmInfo.title;
    },
    totalRating() {
      return this.movie.filmInfo.totalRating;
    },
    userRating() {
      return this.movie.userDetails.personalRating;
    },
    watchlist() {
      return this.movie.userDetails.watchlist;
    },
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
      this.sendData({
        userDetails: {
          watchlist: !this.movie.userDetails.watchlist
        }
      });
    },
    markAsWatched() {
      this.sendData({
        userDetails: {
          alreadyWatched: !this.movie.userDetails.alreadyWatched,
          personalRating: !this.movie.userDetails.alreadyWatched ? 0 : this.movie.userDetails.personalRating
        }
      });
    },
    markAsFavorite() {
      this.sendData({
        userDetails: {
          favorite: !this.movie.userDetails.favorite
        }
      });
    },
    addEmotion(evt) {
      this.emotion = evt.target.value;
    },
    addComment(evt) {
      const element = evt.currentTarget;

      const commentElement = element.querySelector(`.film-details__comment-input`);
      const emotionElement = Array.from(element.querySelectorAll(`.film-details__emoji-item`)).find((el) => el.checked === true);

      if (emotionElement) {
        const newComment = new Comment({
          comment: he.decode(commentElement.value),
          emotion: emotionElement.value,
          date: new Date()
        });

        axios({
          method: `post`,
          url: `comments/${this.movie.id}`,
          data: newComment
        })
          .then((response) => (this.comments = response.data.comments))
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
      });
    },
    setUserRating(evt) {
      this.sendData({
        userDetails: {
          personalRating: +evt.target.value
        }
      });
    },
    resetUserRating() {
      this.sendData({
        userDetails: {
          personalRating: 0
        }
      });
    },
    disabledForm(isDisabledForm) {
      const formControlsElements = this.$el.querySelectorAll(`input, textarea, button`);

      formControlsElements.forEach((formControlElement) => {
        formControlElement.disabled = isDisabledForm;
      });
    },
    sendData(newData) {
      this.disabledForm(true);

      let newMovie = lodash.cloneDeep(this.movie);

      newMovie = lodash.merge(newMovie, newData);

      axios({
        method: `put`,
        url: `/movies/${newMovie.id}`,
        data: newMovie.toRAW()
      })
        .then(() => {
          lodash.merge(this.movie, newData);

          this.disabledForm(false);
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
  mounted() {
    axios({
      method: `get`,
      url: `/comments/${this.movie.id}`
    })
      .then((comments) => (this.comments = comments.data.map((comment) => new Comment(comment))));
  }
};
</script>
