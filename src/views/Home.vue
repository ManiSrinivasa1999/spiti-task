<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3">
        <v-card class="sticky-pos rounded-xl" color="secondary">
          <v-card-title class="white--text">
            Search & Filter
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="search"
              rounded
              clearable
              hide-details
              filled
              dark
              append-icon="fas fa-search"
              label="Search"
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="9">
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
          <template v-slot:default="props">
            <v-row>
              <v-col
                cols="12"
                xl="3" lg="4" md="6" sm="10" v-for="(breed, i) in props.items" :key="i">
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
      </v-col>
    </v-row>
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
      keys: [
        'Name',
        'Life Span',
        'Energy Level',
        'Child Friendly',
      ],
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
    filteredKeys() {
      return this.keys.filter((key) => key !== 'Name');
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

.no-underline {
  text-decoration: none !important;
}

.sticky-pos {
  position: sticky !important;
  top: 100px !important;
}
</style>
