<template>
  <div class="d-flex pr-4">
    <div class="align-center d-flex">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon x-small v-bind="attrs" v-on="on">
            <v-icon class="text--primary">mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            style="width: 100%; min-height: 0"
            class="d-flex justify-start px-0"
          >
            <v-btn
              depressed
              small
              tile
              style="width: 100%"
              class="justify-start"
              color="default_0"
            >
              <v-list-item-title
                class="caption font-weight-bold d-flex text--primary"
                >{{ item.text }}</v-list-item-title
              >
            </v-btn>
          </v-list-item>
        </v-list>
        <!-- {{ $t(`profileMenuList.${item.text}`) }} -->
      </v-menu>
    </div>
    <v-icon
      size="7"
      style="transform: rotate(180deg)"
      class="mt-1 pr-1 text--primary"
      >mdi-triangle
    </v-icon>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "ProfileMenuList",
  data() {
    return {
      items: [
        { text: "Add notes" },
        { text: "Add reminds" },
        { text: "Add documents" },
        { text: "Add plans" },
      ],
    };
  },
})
export default class Add extends Vue {}
</script>
