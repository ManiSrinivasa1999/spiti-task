<template>
  <v-card class="text-center">
    <img
      :src="breedUrl"
      contain
      height="240px"
      width="240px"
      class="img-size ma-2"
    />
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
  },
  dialog: false,
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap");
.img-size {
  border-radius: 100% !important;
  border: 10px;
  max-width: 75%;
  max-height: 500px;
}

.breed-name {
  font-family: "Permanent Marker", cursive !important;
}
</style>
