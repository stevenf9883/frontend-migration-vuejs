<template>
  <body>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <a class="navbar-brand" href="#">{{ msg }}</a>
    </nav>
    <div class="container">
      <div class="text-center " v-if="isLoading">
        <button class="btn " type="button" disabled>
          <span
            class="spinner-border "
            style="width: 3rem; height: 3rem;"
            role="status"
            aria-hidden="true"
          ></span>
          <span style="font-size:30px;">
            Loading moive list...
          </span>
        </button>
      </div>

      <form v-else>
        <div class="form-group">
          <label for="input-title-ch">Title in Chinese</label>
          <input
            type="text"
            class="form-control"
            placeholder="金牌特務"
            v-bind:class="{ 'is-invalid': isSubmit && title_chError }"
            v-model="title_ch"
          />
          <div class="invalid-feedback">
            {{ title_chErrMsg }}
          </div>
        </div>
        <div class="form-group">
          <label for="input-title-eng">Title in English</label>
          <input
            type="text"
            class="form-control"
            placeholder="Kingsman"
            v-bind:class="{ 'is-invalid': isSubmit && title_engError }"
            v-model="title_eng"
          />
          <div class="invalid-feedback">
            {{ title_engErrMsg }}
          </div>
        </div>
        <div class="form-group">
          <label for="input-intro">Intro</label>
          <input
            type="text"
            class="form-control"
            placeholder="Intro:是一部於2015年上映，由英國、美國合拍的諜報喜劇動作片..."
            v-bind:class="{ 'is-invalid': isSubmit && introError }"
            v-model="intro"
          />
          <div class="invalid-feedback">
            {{ introErrMsg }}
          </div>
        </div>
        <div
          id="button-insert"
          class="btn btn-primary"
          @click="create_movie_div_item"
        >
          Insert
        </div>
        <hr />
        <ul id="list-movie" class="list-group">
          <MovieList
            v-for="(movie_info, index) in movies_info"
            :movie_info="movie_info"
            :key="index"
          />
        </ul>
      </form>

      <!-- <ul id="list-movie" class="list-group">
        </ul> -->
    </div>
  </body>
</template>

<script>
// import $ from "jquery";
import axios from "axios";
import MovieList from "./MovieList";
// import { cors, movie } from "../service/api";

export default {
  name: "MyMovies",
  components: {
    MovieList,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      movies_info: {},
      isLoading: true,
      isSubmit: false,
      title_ch: String,
      title_chError: false,
      title_chErrMsg: String,
      title_eng: String,
      title_engError: false,
      title_engErrMsg: String,
      intro: String,
      introError: false,
      introErrMsg: String,
    };
  },
  mounted() {
    this.infoQuery();
    this.clean_form_data();
  },
  watch: {
    title_ch: function() {
      this.validateTitle_ch();
    },
    title_eng: function() {
      // var isText = /^[a-zA-Z0-9]+$/;
      this.validateTitle_eng();
    },
    intro: function() {
      this.validateIntro();
    },
  },
  methods: {
    create_movie_div_item() {
      if (!this.isSubmit) this.validateTitle_ch();
      this.validateTitle_eng();
      this.validateIntro();
      this.isSubmit = true;
      const { title_chError, title_engError, introError } = this;

      if (!title_chError && !title_engError && !introError) {
        this.movies_info.unshift({
          ch_name: this.title_ch,
          eng_name: this.title_eng,
          intro: this.intro,
        });

        this.clean_form_data();
      }
    },
    clean_form_data() {
      this.title_ch = "";
      this.title_eng = "";
      this.intro = "";
      this.isSubmit = false;
    },
    infoQuery() {
      var vm = this;
      axios
        .get("/movie/list.php")
        .then(function(response) {
          vm.isLoading = false;
          vm.movies_info = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    validateIntro() {
      if (this.intro.trim() == "") {
        this.introError = true;
        this.introErrMsg = "不可為空";
      } else if (!this.intro.startsWith("Intro")) {
        this.introError = true;
        this.introErrMsg = "必須以開頭 Intro";
      } else if (this.intro.length < 10 || this.intro.length > 255) {
        this.introError = true;
        this.introErrMsg = "長度必須在10到255之間";
      } else {
        this.introError = false;
        this.introErrMsg = "";
      }
    },
    validateTitle_ch() {
      if (this.title_ch.trim() == "") {
        this.title_chError = true;
        this.title_chErrMsg = "不可為空";
      } else if (this.title_ch.length > 50) {
        this.title_chError = true;
        this.title_chErrMsg = "請勿超過50個字";
      } else {
        this.title_chError = false;
        this.title_chError = "";
      }
    },
    validateTitle_eng() {
      var isText = /^[^$%^&*]*$/;

      if (this.title_eng.trim() == "") {
        this.title_engError = true;
        this.title_engErrMsg = "不可為空";
      } else if (!isText.test(this.title_eng)) {
        this.title_engError = true;
        this.title_engErrMsg = "不包括以下符號 $, %, ^, &, *";
      } else if (this.title_eng.length > 100) {
        this.title_engError = true;
        this.title_engErrMsg = "請勿超過100個字";
      } else {
        this.title_engError = false;
        this.title_engErrMsg = "";
      }
    },
  },
};
</script>

<style>
@import "../lib/custom/css/custom.css";
</style>
