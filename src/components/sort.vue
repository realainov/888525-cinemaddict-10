<template>
  <ul class="sort">
    <li><a
      href="#"
      class="sort__button"
      :class="{'sort__button--active': sortType === `default`}"
      @click="setSortType(`default`)
      ">
      Sort by default
    </a></li>
    <li><a
      href="#"
      class="sort__button"
      :class="{'sort__button--active': sortType === `date`}"
      @click="setSortType(`date`)
      ">
      Sort by date
    </a></li>
    <li><a
      href="#"
      class="sort__button"
      :class="{'sort__button--active': sortType === `rating`}"
      @click="setSortType(`rating`)
      ">
      Sort by rating
    </a></li>
  </ul>
</template>

<script>
export default {
  name: `Sort`,
  data() {
    return {
      sortType: `default`
    };
  },
  methods: {
    setSortType(sortType) {
      this.$emit(`click`, sortType);

      this.sortType = sortType;
    }
  }
};
</script>
