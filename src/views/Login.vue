<template>
  <v-col cols="12" md="8" class="form-wrapper d-flex align-self-center">
    <v-col class="pt-0">
      <Logo />
      <div style="height: 100%">
        <h2>{{ $t("Recent Logins") }}</h2>
        <h4 class="text--secondary">
          {{ $t("Click your picture or add an account") }}
        </h4>
        <div class="d-flex mt-3">
          <div
            style="
              width: 120px;
              height: 160px;
              word-wrap: break-word;
              cursor: pointer;
            "
            class="mr-4 rounded-lg background_primary pt-8"
            v-for="recentLoginItem of recentLogins.slice(0, 3)"
            :key="recentLoginItem"
            @click="setEmail(recentLoginItem)"
          >
            {{ recentLoginItem }}
          </div>
        </div>
      </div>
    </v-col>
    <v-col md="5">
      <v-card class="pa-4">
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
            :disabled="this.$v.$invalid"
          >
            {{ $t("Log in") }}
          </v-btn>

          <v-alert v-if="error" type="success" class="mt-2">{{
            $t(`errors.${error}`)
          }}</v-alert>

          <router-link to="forgot-password" class="mt-4 email-forgot d-block">
            {{ $t("Forgot Password?") }}
          </router-link>

          <v-divider class="mt-4"></v-divider>

          <router-link to="register" class="text-decoration-none">
            <v-btn color="secondary mt-4 color_black" block>
              {{ $t("Register") }}
            </v-btn>
          </router-link>
        </form>
      </v-card>
    </v-col>
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
import Logo from "@/components/app/Logo.vue";

@Component({
  name: "Login",
  mixins: [validationMixin],
  components: {
    Logo,
  },
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
  private recentLogins: string[] = JSON.parse(localStorage.recentLogins);
  private password: string = "";
  private email: string = "";

  private setEmail(email: string) {
    this.email = email;
  }

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
            console.log("res.data login", res.data.user.email);

            // console.log(
            //   "this.recentLogins.indexOf(res.data.user.email)",
            //   this.recentLogins.indexOf(res.data.user.email)
            // );

            if (this.recentLogins.indexOf(res.data.user.email) === -1) {
              this.recentLogins.unshift(res.data.user.email);
              localStorage.recentLogins = JSON.stringify(this.recentLogins);
            }
            console.log(
              "this.store.auth.recentLogins",
              this.recentLogins,
              "JSON.parse",
              JSON.parse(localStorage.recentLogins)
            );

            // localStorage.recentLogins = JSON.stringify();

            // localStorage.recentLogins
            this.$router.push("/");
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
  &:hover {
    text-decoration-color: $primary;
  }
}
.form-wrapper {
  padding: 0 0 100px 0;
}
</style>
