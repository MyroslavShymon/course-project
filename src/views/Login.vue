<template>
  <v-col cols="12" md="8" class="form-wrapper d-flex align-self-center">
    <v-col class="pt-0">
      <Logo />
      <div>
        <h2>{{ $t("Recent Logins") }}</h2>
        <h4 class="text--secondary">
          {{ $t("Click your picture or add an account") }}
        </h4>
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
import Logo from "@/components/app/Logo.vue";
import UserToLogin from "@/store/modules/UserToLogin";
import { AxiosResponse } from "node_modules/axios";

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
      success: false,
      error: false,
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
      this.$data.success = true;
      this.$data.error = false;
      this.store.useLogin = new UserToLogin(
        this.$data.email,
        this.$data.password
      );
      this.store.auth
        .login(this.store.useLogin)
        .then((res: AxiosResponse<any>) => {
          if (res.data.success) {
            this.$router.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("Succes");
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
