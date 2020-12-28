<template>
  <!-- App.vue -->

  <v-app class="bg-color">
    <v-app-bar
      fixed
      color="accent"
      dark
      shrink-on-scroll
      prominent
      elevate-on-scroll
      scroll-threshold="100"
      app
    >
      <h1 class="ma-auto">Kitties</h1>

      <v-spacer></v-spacer>
    </v-app-bar>
    <!-- Sizes your content based upon application components -->
    <v-main app>
      <!-- Provides the application the proper gutter -->
      <v-container>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
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
.bg-color {
  background-color: #262E39 !important;
}
</style>
