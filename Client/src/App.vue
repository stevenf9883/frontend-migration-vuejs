<template>
  <div id="app">
    <head>
    <title>My Movies</title>
     </head>
    <MyMovies msg="My Movie List"/>
   
  </div>
</template>

<script>
import MyMovies from './components/MyMovies.vue'


export default {
  name: 'App',
  components: {
    MyMovies
  }
}

</script>
<style >
@import './lib/bootstrap/css/bootstrap.min.css';
</style>