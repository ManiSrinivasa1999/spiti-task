<template>
  <v-container fluid>
    <v-data-iterator
      :items="breedsData"
      :search="search"
      :page="page"
      :items-per-page.sync="breedsDataPerPage"
      :sort-desc="sortDesc"
      light
      hide-default-footer
    >
      <template v-slot:header>
        <v-row align="center" justify="end">
          <v-col cols="12" md="4" sm="12" xs="12">
            <v-toolbar color="transparent" flat class="mb-3">
              <v-text-field
                v-model="search"
                clearable
                hide-details
                solo
                background-color="secondary lighten-5"
                append-icon="fas fa-search"
                label="Search"
              ></v-text-field>
            </v-toolbar>
          </v-col>
        </v-row>
      </template>
      <template v-slot:default="props">
        <v-card color="primary">
          <v-card-text class="white--text text-h5 text-center titlecolor"> </v-card-text>
          <v-row>
            <v-col
              cols="12"
              xl="2"
              lg="3"
              md="3"
              sm="10"
              v-for="(breed, i) in props.items"
              :key="i"
            >
              <v-container fluid>
                <v-card color="secondary darken-1">
                  <v-card-text class="mt-4 text-center text-h6 titlecolor">
                    {{ breed.name }}
                  </v-card-text>
                  <v-divider light></v-divider>
                  <v-card-text class="text-h6 mt-4 text-center white--text">
                    {{ breed.id }}
                  </v-card-text>
                </v-card>
              </v-container>
            </v-col>
          </v-row>
        </v-card>
      </template>
      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Breeds per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark text color="primary" class="ml-2" v-bind="attrs" v-on="on">
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
          <v-btn fab dark color="blue darken-3" class="mr-1" @click="formerPage">
            <v-icon>fas fa-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
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
      breedsDataPerPage: 4,
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
.titlecolor {
  color: #e0f7fa !important;
}
</style>
