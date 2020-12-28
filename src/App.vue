<template>
  <!-- App.vue -->

  <v-app class="bg-color">
    <v-app-bar
      fixed
      height="64px"
      color="accent"
      dark
      elevate-on-scroll
      scroll-threshold="100"
      app
    >
      <h1 class="ma-auto warning--text text-h3 font-weight-bold heading">
        Cat<span class="white--text">alogue</span>
      </h1>
    </v-app-bar>
    <!-- Sizes your content based upon application components -->
    <v-main app>
      <!-- Provides the application the proper gutter -->
      <v-container>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer color="accent" class="ma-auto">
      <h3 class="warning--text">
        Kitties Copyright &copy;2020
      </h3>
    </v-footer>
  </v-app>
</template>

<script>
import { dom } from '@fortawesome/fontawesome-svg-core';

export default {
  mounted() {
    dom.watch();
  },
};
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

  .heading {
    font-family: 'Inter', sans-serif;
  }
  .bg-color {
    background-color: #262e39 !important;
  }
</style>
