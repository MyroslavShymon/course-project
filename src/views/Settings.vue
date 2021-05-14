<template>
  <v-col cols="8" md="8" class="pl-0">
    <v-card>
      <v-toolbar flat color="secondary">
        <v-toolbar-title class="black--text">{{
          $t("profileMenuList.settings")
        }}</v-toolbar-title>
      </v-toolbar>
      <v-tabs vertical class="text--primary" color="secondary">
        <v-tab
          class="d-flex justify-start text--primary"
          color="secondary"
          v-for="item of items"
          :key="item.text"
        >
          <v-icon left class="text--primary">{{ item.icon }}</v-icon>
          {{ $t(`${item.text}`) }}
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <p>
                Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi
                ac felis. Etiam feugiat lorem non metus. Sed a libero.
              </p>

              <p>
                Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel,
                lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis
                non, nunc. Aliquam lobortis. Aliquam lobortis. Suspendisse non
                nisl sit amet velit hendrerit rutrum.
              </p>

              <p class="mb-0">
                Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu.
                Pellentesque libero tortor, tincidunt et, tincidunt eget, semper
                nec, quam. Phasellus blandit leo ut odio.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <Theme />
        </v-tab-item>
        <v-tab-item>
          <Language />
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-col>
</template>

<script lang="ts">
// import { component } from "node_modules/vue/types/umd";
import { Component, Vue } from "vue-property-decorator";

import Theme from "@/components/app/Header/Setting/Theme.vue";
import Language from "@/components/app/Header/Setting/Language.vue";

@Component({
  name: "Settings",
  components: { Theme, Language },
  data() {
    return {
      items: [
        { text: "Edit Profile", icon: "mdi-account" },
        { text: "Theme", icon: "mdi-theme-light-dark" },
        { text: "Language", icon: "mdi-earth" },
      ] as { text: string; icon: string }[],
    };
  },
})
export default class Settings extends Vue {}
</script>

<style lang="scss"></style>
