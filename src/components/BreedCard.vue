<template>
  <v-card class="text-center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-img
          :src="breedUrl"
          cover
          eager
          height="240px"
          width="240px"
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
        <v-card-title class="text-h3">
          <span class="breed-name">
            {{ breedName }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-row class="mt-2" align="center" justify="center">
            <v-col cols="6" class="text-center">
              <h5 class="text-h5 mb-2 font-weight-bold">
                Child Friendly (1 to 5)
              </h5>
              <v-progress-circular
                rotate="-90"
                :size="100"
                :width="10"
                :value="breedData.child_friendly*20"
                color="blue"
              >
                {{ breedData.child_friendly }}
              </v-progress-circular>
            </v-col>
            <v-col cols="6" class="text-center">
              <h5 class="text-h5 mb-2 font-weight-bold">
                Energy Level (1 to 5)
              </h5>
              <v-progress-circular
                rotate="-90"
                :size="100"
                :width="10"
                :value="breedData.energy_level*20"
                color="green"
              >
                {{ breedData.energy_level }}
              </v-progress-circular>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card-text class="text-center black--text text-h5">
      <span class="breed-name">
        {{ breedName }}
      </span>
    </v-card-text>
    <v-card-text class="text-center black--text text-h6">
      <span class="breed-name"> Lifespan: {{ breedData.life_span }} </span>
    </v-card-text>
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
    };
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
.img-size {
  border-radius: 100% !important;
  border: 10px;
}

.breed-name {
  font-family: 'Inter', sans-serif;
}
</style>
