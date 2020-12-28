<template>
  <v-container fluid>
    <v-data-iterator
      :items="filteredBreedsData"
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
        <v-row justify="end">
          <v-col cols="12" md="6" sm="12" xs="12">
            <router-link to="/" class="text-h2 font-weight-bold mb-5 warning--text no-underline">
              <span class="heading ma-3">
                Cat Breeds
              </span>
            </router-link>
          </v-col>
          <v-col cols="12" md="6" sm="12" xs="12">
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
          <v-col cols="12" xl="3" lg="4" md="6" sm="10" v-for="(breed, i) in props.items" :key="i">
            <v-container fluid>
              <BreedCard
                :breedName='breed.name'
                :breedUrl='breed.url'
                :breedData='breed.data'
              />
            </v-container>
          </v-col>
        </v-row>
      </template>
      <template v-slot:footer>
        <v-row class="mt-2 ml-2" align="center" justify="center">
          <span class="white--text" v-if="$vuetify.breakpoint.mdAndUp">Breeds per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text color="white" class="ml-2" v-bind="attrs" v-on="on">
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
            class="mr-4 white--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn fab dark small class="mr-1" @click="formerPage">
            <v-icon>fas fa-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark small class="ml-1 mr-4 mb-1" @click="nextPage">
            <v-icon>fas fa-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
      <template v-slot:loading>
        <v-progress-linear
          indeterminate
          color="info"
        ></v-progress-linear>
        <h3 class="text-h3 ma-3 text-center font-weight-bold all-slots warning--text">
          Loading.....
        </h3>
        <v-img
          class="ma-auto"
          src="../assets/loading.svg"
          height="50vh"
          width="50vw"
          contain
        >
        </v-img>
      </template>
      <template v-slot:no-results>
        <h3 class="text-h3 ma-3 text-center font-weight-bold all-slots warning--text">
          Results Not Found
        </h3>
        <v-img
          class="ma-auto"
          src="../assets/noresults.svg"
          height="50vh"
          width="50vw"
          contain
        >
        </v-img>
      </template>
      <template v-slot:no-data>
        <h3 class="text-h3 ma-3 text-center font-weight-bold all-slots warning--text">
          No Data available. Retry after 2 min.
        </h3>
        <v-img
          class="ma-auto"
          src="../assets/nodata.svg"
          height="50vh"
          width="50vw"
          contain
        >
        </v-img>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
import axios from 'axios';
import BreedCard from '@/components/BreedCard.vue';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const noImage = require('@/assets/noresults.svg');

export default {
  name: 'Home',
  components: {
    BreedCard,
  },
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
      error: false,
    };
  },
  mounted() {
    axios
      .get('https://api.thecatapi.com/v1/breeds')
      .then(this.setBreedsData)
      .catch(() => {
        this.error = true;
        this.loading = false;
      });
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
    filteredBreedsData() {
      const breeds = [];
      this.breedsData.forEach((breed) => {
        if ('image' in breed) {
          breeds.push({
            name: breed.name,
            url: breed.image.url,
            data: {
              ...breed,
            },
            // lifeSpan: breed.life_span,
            // energyLevel: breed.energy_level,
            // childFriendly: breed.child_friendly,
          });
        } else {
          breeds.push({
            name: breed.name,
            url: noImage,
            data: {
              // lifeSpan: breed.life_span,
              // energyLevel: breed.energy_level,
              // childFriendly: breed.child_friendly,
              ...breed,
            },
          });
        }
      });
      return breeds;
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

.heading {
  font-family: 'Inter', sans-serif;
}

.all-slots {
  font-family: 'Inter', sans-serif;
}

.img-size {
  border-radius: 100%;
  border: 10px;
}

.no-underline {
  text-decoration: none !important;
}
</style>
