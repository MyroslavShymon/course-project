<template>
  <div class="d-flex pr-4">
    <div class="align-center d-flex">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon x-small v-bind="attrs" v-on="on" class="mr-1">
            <v-icon class="text--primary">mdi-plus</v-icon>
          </v-btn>
          <v-icon
            v-on="on"
            size="7"
            style="transform: rotate(180deg)"
            class="mt-1 text--primary"
            >mdi-triangle
          </v-icon>
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
              color="first_structure_color"
            >
              <v-list-item-title
                class="caption font-weight-bold d-flex text--primary"
                >{{
                  $t("add") + " " + $t(`menu.${item.text}`)
                }}</v-list-item-title
              >
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "ProfileMenuList",
  data() {
    return {
      items: [
        { text: "notes" },
        { text: "reminder" },
        { text: "documents" },
        { text: "plans" },
      ],
    };
  },
})
export default class Add extends Vue {}
</script>
