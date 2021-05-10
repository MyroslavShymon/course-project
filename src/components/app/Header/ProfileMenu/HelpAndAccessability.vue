<template>
  <div>
    <v-btn
      depressed
      small
      tile
      style="text-decoration: none; width: 100%"
      class="d-flex justify-start text--primary px-2"
      color="default_0"
    >
      <v-icon small class="pr-2">{{ item.icon }}</v-icon>
      {{ $t(`profileMenuList.${item.text}`) }}
    </v-btn>

    <transition name="fade">
      <div v-show="upHere">
        <div class="d-flex justify-space-between flex-wrap">
          <v-btn
            depressed
            small
            tile
            color="transparent"
            class="text--primary d-flex justify-start px-2 flex-grow-1"
            style="text-decoration: none"
          >
            <v-icon small>mdi-help-circle</v-icon>
            <!-- Довідковий центр -->
            <div class="ml-2 caption">Help center</div>
          </v-btn>
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
                <!-- Повідомити про проблему -->
                <div class="ml-2 caption">Report a problem</div>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Report a problem</span>
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-btn small fab text @click="dialog = false">
                    <v-icon x-large color="accent">mdi-close</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card-title>
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
                        required
                        ref="chosedItems"
                      ></v-combobox>
                      <v-textarea
                        name="input-7-1"
                        label="Enter the explanation here"
                        hint="Enter your concerns, tips, or questions in this field"
                        clearable
                        :rules="rulesTextInput"
                        v-model.trim="text"
                        required
                      ></v-textarea>
                      <v-alert type="error" v-if="error" class="mt-5">
                        Fields are required!!!
                      </v-alert>
                      <v-alert type="success" v-if="success" class="mt-5">
                        Succes!!!
                      </v-alert>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions class="px-6">
                <v-spacer></v-spacer>
                <v-btn color="accent" text @click="sendProblem"> Send </v-btn>
              </v-card-actions>
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
      items: ["Concerns", "Tips", "Questions"],
      chosedItems: [],
      text: "",
      error: false,
      success: false,
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
        `Min ${this.$v.text.$params.minLength.min} characters`,
      (this.$v.text.$dirty && this.$v.text.required) ||
        "This field is required.",
    ];
  }
  private get rulesComboInput(): Array<
    string | (Validation & ValidationProperties<any> & ValidationEvaluation)
  > {
    return [
      (this.$v.chosedItems.$dirty && this.$v.chosedItems.required) ||
        "This field is required.",
    ];
  }

  @Prop() private item!: { text: string; icon: string; hover: boolean };
  @Prop(Boolean) private upHere!: boolean;
  private sendProblem() {
    this.$v.$touch();
    if (!this.$v.$invalid) {
      this.$data.error = false;
      this.$data.success = true;
      console.log("sendProblem", this.chosedItems, this.text, this.$v);
      this.chosedItems = [];
      this.text = "";
      return;
    }
    // this.rulesTextInput;
    if (this.$v.$invalid) {
      console.log(this.$v);
      this.$data.error = true;
      console.log("feiled");
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
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
