<template>
  <v-card class="text-center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="700"
    >
      <template v-slot:activator="{ on, attrs }">
        <img
          :src="breedUrl"
          contain
          height="240px"
          width="240px"
          class="img-size ma-2"
          v-bind="attrs"
          v-on="on"
        />
      </template>
      <v-card>
        <img
          :src="breedUrl"
          contain
          width="100%"
          height="500"
        />
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
                :value="breedChildFriendly*20"
                color="blue"
              >
                {{ breedChildFriendly }}
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
                :value="breedEnergyLevel*20"
                color="green"
              >
                {{ breedEnergyLevel }}
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
      <span class="breed-name"> Lifespan: {{ breedSpan }} </span>
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
    breedSpan: {
      default: 'breed life span',
    },
    breedEnergyLevel: {
      default: 'breed energy level',
    },
    breedChildFriendly: {
      default: 'breed child friendly',
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
@import url("https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap");
.img-size {
  border-radius: 100% !important;
  border: 10px;
}

.breed-name {
  font-family: "Permanent Marker", cursive !important;
}
</style>
