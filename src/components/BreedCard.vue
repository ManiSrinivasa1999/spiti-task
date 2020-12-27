<template>
 <v-card class="text-center">
    <img :src="breedUrl" contain height="240px" width="280px" class="img-size" />
    <v-card-text class="text-center text-h5 black--text">
      <span class="breed-name">
        {{ breedName }}
      </span>
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
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
.img-size {
  border-radius: 100%;
  border: 10px;
  max-width: 75%;
  max-height: 500px;
}

.breed-name {
  font-family: 'Permanent Marker', cursive !important;
}
</style>
