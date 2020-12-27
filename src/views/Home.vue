<template>
  <v-container fluid>
    <router-link to="/" class="text-h3 font-weight-bold mb-5 black--text no-underline">
      Cat Breeds
    </router-link>
    <v-data-iterator
      :items="breedsData"
      :search="search"
      :page="page"
      :items-per-page.sync="breedsDataPerPage"
      :sort-desc="sortDesc"
      light
      hide-default-footer
      :loading="loading"
      class="accent mt-4"
    >
      <template v-slot:header>
        <v-row align="center" justify="end">
          <v-col cols="12" md="5" sm="12" xs="12">
            <v-toolbar color="transparent" flat class="mb-3">
              <v-text-field
                v-model="search"
                clearable
                hide-details
                solo
                append-icon="fas fa-search"
                label="Search"
              ></v-text-field>
            </v-toolbar>
          </v-col>
        </v-row>
      </template>
      <template v-slot:default="props">
        <v-row>
          <v-col cols="12" xl="3" lg="3" md="6" sm="10" v-for="(breed, i) in props.items" :key="i">
            <v-container fluid>
              <v-card class="text-center">
                <img :src="breed.image.url" contain height="200px" width="240px" class="img-size" />
                <v-card-text class="mt-4 text-center text-h6 black--text">
                  {{ breed.name }}
                </v-card-text>
              </v-card>
            </v-container>
          </v-col>
        </v-row>
      </template>
      <template v-slot:footer>
        <v-row class="mt-2 ml-2" align="center" justify="center">
          <span class="black--text" v-if="$vuetify.breakpoint.mdAndUp">Breeds per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark text color="secondary" class="ml-2" v-bind="attrs" v-on="on">
                {{ breedsDataPerPage }}
                <v-icon>fas fa-caret-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in breedsDataPerPageArray"
                :key="index"
                @click="updatebreedsDataPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn fab dark class="mr-1" @click="formerPage">
            <v-icon>fas fa-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark class="ml-1 mr-4 mb-1" @click="nextPage">
            <v-icon>fas fa-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      breedsDataPerPageArray: [4, 8, 12],
      search: '',
      sortDesc: true,
      sortBy: 'name',
      success: true,
      page: 1,
      loading: true,
      breedsDataPerPage: 8,
      breedsData: [],
    };
  },
  mounted() {
    axios
      .get('https://api.thecatapi.com/v1/breeds')
      .then(this.setBreedsData)
      .catch();
  },
  methods: {
    setBreedsData(response) {
      this.breedsData = response.data;
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updatebreedsDataPerPage(number) {
      this.breedsDataPerPage = number;
    },
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.breedsData.length / this.breedsDataPerPage);
    },
  },
};
</script>

<style lang="scss" scoped>
.img-size {
  border-radius: 50%;
  display: inline-block;
  margin: 15px;
  border: 2px solid #333;
  max-width: 55%;
  max-height: 400px;
}

.no-underline {
  text-decoration: none !important;
}
</style>