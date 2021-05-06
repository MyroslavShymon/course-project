<template>
  <v-col cols="7" sm="7" md="4" class="pa-0">
    <v-text-field
      solo-inverted
      flat
      hide-details
      :label="$t('search') + '...'"
      prepend-inner-icon="search"
      color="secondary"
    ></v-text-field>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Search",
})
export default class Search extends Vue {}
</script>
