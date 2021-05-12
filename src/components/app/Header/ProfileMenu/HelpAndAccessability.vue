<template>
  <div>
    <router-link
      to="help_center"
      style="text-decoration: none; width: 100%"
      class="d-flex justify-start text--primary"
    >
      <v-btn
        depressed
        small
        tile
        style="text-decoration: none; width: 100%"
        class="d-flex justify-start text--primary px-2"
        color="third_structure_color"
      >
        <v-icon small class="pr-2">{{ item.icon }}</v-icon>
        {{ $t(`profileMenuList.${item.text}`) }}
      </v-btn>
    </router-link>

    <transition name="fade">
      <div v-show="upHere">
        <div class="d-flex justify-space-between flex-wrap">
          <router-link
            to="help_center"
            style="text-decoration: none; width: 100%"
            class="d-flex justify-start text--primary"
          >
            <v-btn
              depressed
              small
              tile
              color="transparent"
              class="text--primary d-flex justify-start px-2 flex-grow-1"
              style="text-decoration: none"
            >
              <v-icon small>mdi-help-circle</v-icon>
              <div class="ml-2 caption">{{ $t("Help center") }}</div>
            </v-btn>
          </router-link>
          <v-dialog v-model="dialog" max-width="600px" :retain-focus="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                depressed
                small
                v-bind="attrs"
                v-on="on"
                tile
                color="transparent"
                class="text--primary d-flex justify-start px-2 flex-grow-1"
                style="text-decoration: none"
                fill
              >
                <v-icon small>mdi-message-alert</v-icon>
                <div class="ml-2 caption">{{ $t("Report a problem") }}</div>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ $t("Report a problem") }}</span>
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-btn small fab text @click="dialog = false">
                    <v-icon x-large color="accent">mdi-close</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card-title>
              <form action="post" @submit.prevent="sendProblem">
                <v-card-text>
                  <v-container class="px-0">
                    <v-row>
                      <v-col cols="12" sm="6" md="11">
                        <v-combobox
                          clearable
                          dense
                          multiple
                          outlined
                          persistent-hint
                          :items="items"
                          v-model="chosedItems"
                          :rules="rulesComboInput"
                          ref="chosedItems"
                        ></v-combobox>
                        <v-textarea
                          name="input-7-1"
                          :label="$t('Enter the explanation here')"
                          :hint="
                            $t(
                              'Enter your concerns, tips, or questions in this field'
                            )
                          "
                          clearable
                          :rules="rulesTextInput"
                          v-model.trim="text"
                          required
                        ></v-textarea>
                        <v-alert type="success" v-if="success" class="mt-5">
                          {{ $t("Succes") }}!!!
                        </v-alert>
                        <v-alert type="error" v-if="error" class="mt-5">
                          {{ $t("Inputs are required") }}
                        </v-alert>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions class="px-6">
                  <v-spacer></v-spacer>
                  <v-btn color="accent" text type="submit">
                    {{ $t("Send") }}
                  </v-btn>
                </v-card-actions>
              </form>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { ValidationEvaluation, ValidationProperties } from "vue/types/vue";
import { Validation, validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

@Component({
  name: "ProfileMenuData",
  mixins: [validationMixin],
  validations: {
    chosedItems: { required },
    text: { required, minLength: minLength(4) },
  },
  data() {
    return {
      dialog: false,
      items: [this.$t("Concerns"), this.$t("Tips"), this.$t("Questions")],
      chosedItems: [],
      text: "",
      success: false,
      error: false,
    };
  },
})
export default class ProfileMenuData extends Vue {
  private text: string = "";
  private chosedItems: Array<string> = [];

  private get rulesTextInput(): Array<
    string | (Validation & ValidationProperties<any> & ValidationEvaluation)
  > {
    return [
      (this.$v.text.$dirty && this.$v.text.minLength) ||
        `${this.$t("The minimum number of characters is")} ${
          this.$v.text.$params.minLength.min
        } ${this.$t("you scored")} ${this.$v.text.$model.length}`,
      (this.$v.text.$dirty && this.$v.text.required) ||
        `${this.$t("This field is required")}.`,
    ];
  }
  private get rulesComboInput(): Array<
    string | (Validation & ValidationProperties<any> & ValidationEvaluation)
  > {
    return [
      (this.$v.chosedItems.$dirty && this.$v.chosedItems.required) ||
        `${this.$t("This field is required")}.`,
    ];
  }

  @Prop() private item!: { text: string; icon: string; hover: boolean };
  @Prop(Boolean) private upHere!: boolean;
  private sendProblem() {
    this.$v.$touch();
    if (!this.$v.$invalid) {
      this.$data.success = true;
      this.$data.error = false;
      this.chosedItems = [];
      this.text = "";
      return;
    }
    if (this.$v.$invalid) {
      this.$data.error = true;
    }
  }
  created() {
    this.$v.$touch();
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  transition: opacity 1s;
  opacity: 0;
}
</style>
