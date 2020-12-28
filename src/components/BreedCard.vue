<template>
  <v-card class="rounded-xl" color="secondary">
    <v-dialog v-model="dialog" persistent max-width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-img
          :src="breedUrl"
          cover
          eager
          height="270"
          class="img-size ma-auto"
          v-bind="attrs"
          v-on="on"
        ></v-img>
      </template>
      <v-card>
        <v-img
          :src="breedUrl"
          cover
          width="500"
          height="50%"
          max-height="100vh"
          max-width="100vw"
          :alt="breedName"
        ></v-img>
        <v-card-title class="text-h4">
          <span class="breed-name">
            {{ breedName }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-row class="mt-2" align="center" justify="center">
            <template v-for="(info, index) in catInfo">
              <v-col cols="6" md="6" xs="6" :key="index">
                <h5 class="text-h5 mb-2 font-weight-bold text-right">
                  {{ info.title }}
                </h5>
              </v-col>
              <v-col cols="6" md="6" xs="6" :key="index">
                <v-progress-linear
                  :value="breedData[info.property] * 20"
                  :color="info.color"
                  class="white--text"
                ></v-progress-linear>
              </v-col>
            </template>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <a
            :href="breedData.wikipedia_url"
            target="_blank"
            class="no-underline"
          >
            <v-btn text color="primary">
              WIKI
            </v-btn>
          </a>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="12">
        <v-card-text class="white--text text-h5">
          <span class="breed-name pb-0">
            {{ breedName }}
          </span>
        </v-card-text>
        <v-card-text
          class="white--text pt-0 d-flex align-center justify-space-between"
        >
          <span class="breed-name">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="red" v-bind="attrs" v-on="on">
                  fas fa-heart
                </v-icon>
              </template>
              <span>Life span</span>
            </v-tooltip>
            {{ breedData.life_span }} Years
          </span>
          <v-btn text @click="dialog = true" color="warning">
            Know More
          </v-btn>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'BreedCard',
  props: {
    breedName: {
      default: 'breed name',
    },
    breedUrl: {
      default: 'breed url',
    },
    breedData: {
      default: 'breed data',
    },
  },
  data() {
    return {
      dialog: false,
      catInfo: [
        {
          property: 'child_friendly',
          title: 'Child Friendly',
          color: 'red',
        },
        {
          property: 'intelligence',
          title: 'Intelligence',
          color: 'green',
        },
        {
          property: 'energy_level',
          title: 'Energy Level',
          color: 'primary',
        },
        {
          property: 'affection_level',
          title: 'Affection Level',
          color: 'warning',
        },

        {
          property: 'social_needs',
          title: 'Social Needs',
          color: 'info',
        },

        {
          property: 'stranger_friendly',
          title: 'Stranger Friendly',
          color: 'indigo',
        },
      ],
    };
  },
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

  .breed-name {
    font-family: 'Inter', sans-serif;
  }
</style>
