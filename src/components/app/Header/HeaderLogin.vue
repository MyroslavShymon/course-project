<template>
  <v-col md="12" class="pa-0">
    <v-dialog transition="dialog-top-transition" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="secondary color_black" block v-bind="attrs" v-on="on">
          {{ $t("Log in") }} {{ $t("and2") }} {{ $t("Register") }}
        </v-btn>
      </template>
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary ">
            <div class="color_black">
              {{ $t("Log in") }} {{ $t("and2") }} {{ $t("Register") }}
            </div>
          </v-toolbar>
          <v-card-text class="mt-6">
            <form @submit.prevent="login">
              <v-text-field
                label="E-mail"
                required
                color="primary"
                :rules="rulesEmailInput"
                v-model.trim="email"
              ></v-text-field>
              <v-text-field
                :label="$t('Password')"
                required
                color="primary"
                :rules="rulesPasswordInput"
                v-model.trim="password"
              ></v-text-field>
              <v-btn
                color="secondary color_black"
                block
                type="submit"
                :disabled="$v.$invalid"
              >
                {{ $t("Log in") }}
              </v-btn>

              <v-alert v-if="error" type="success" class="mt-2">{{
                $t(`${error}`)
              }}</v-alert>

              <router-link
                to="forgot-password"
                class="mt-4 email-forgot d-block"
              >
                {{ $t("Forgot Password?") }}
              </router-link>

              <v-divider class="mt-4"></v-divider>

              <router-link to="register" class="text-decoration-none">
                <v-btn color="secondary mt-4 color_black" block>
                  {{ $t("Register") }}
                </v-btn>
              </router-link>
            </form>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text color="primary" @click="dialog.value = false"
              >Close</v-btn
            >
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { ValidationEvaluation, ValidationProperties } from "vue/types/vue";
import { Validation, validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
import { MyStore } from "@/store/store/store";
import { useStore } from "vuex-simple";
import { AxiosResponse } from "node_modules/axios";

import UserToLogin from "@/store/modules/UserToLogin";

@Component({
  name: "HeaderLogin",
  mixins: [validationMixin],
  validations: {
    password: { required, minLength: minLength(6) },
    email: { required, email },
  },
  data() {
    return {
      password: "",
      email: "",
      error: "",
    };
  },
})
export default class Login extends Vue {
  private store: MyStore = useStore(this.$store);
  private password: string = "";
  private email: string = "";

  private get rulesPasswordInput(): Array<
    string | (Validation & ValidationProperties<any> & ValidationEvaluation)
  > {
    return [
      (this.$v.password.$dirty && this.$v.password.minLength) ||
        `${this.$t("The minimum number of characters is")} ${
          this.$v.password.$params.minLength.min
        } ${this.$t("you scored")} ${this.$v.password.$model.length}`,
      (this.$v.password.$dirty && this.$v.password.required) ||
        `${this.$t("This field is required")}.`,
    ];
  }
  private get rulesEmailInput(): Array<
    string | (Validation & ValidationProperties<any> & ValidationEvaluation)
  > {
    return [
      (this.$v.email.$dirty && this.$v.email.email) || `Is not Email.`,
      (this.$v.email.$dirty && this.$v.email.required) ||
        `${this.$t("This field is required")}.`,
    ];
  }

  private login() {
    this.$v.$touch();
    if (!this.$v.$invalid) {
      this.store.useLogin = new UserToLogin(
        this.$data.email,
        this.$data.password
      );
      this.store.auth
        .login(this.store.useLogin)
        .then((res: AxiosResponse<any>) => {
          this.$data.error = this.store.auth.error;

          if (res.data.success) {
            localStorage.isAuthOrganizer = true;
            console.log("this.$router", this.$route.name);
            if (this.$route.name == "Notes") {
              location.reload();
              this.$router.go(0);
            } else {
              console.log("2-if-this.$router", this.$route.name);
              this.$router.push("/");
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
.email-forgot {
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: 0.5s;
  text-align: center;
  color: $secondary;
  &:hover {
    text-decoration-color: $secondary;
  }
}
</style>
