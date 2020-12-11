<template>
  <div class="article-preview">
    <li class="list-group-item">
      <div class="movie-item">
        <h3>{{movie_info.ch_name}}</h3>
        <h4>{{movie_info.eng_name}}</h4>
        <div class="movie-intro">{{movie_info.intro}}</div>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name: "MovieList",
  props: {
    movie_info: { type: Object, required: true },
  },
};
</script>
