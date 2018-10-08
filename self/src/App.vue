<template>
  <div id="app">
    <Home></Home>
  </div>
</template>

<script>
import Home from "./components/Home.vue";
export default {
  name: 'App',
  components:{
    Home,
  }
}
</script>

<style>
  html,body{
    height: 100%;
  }
  #app{
    height: 100%;
  }
</style>
