<template>
  <v-col cols="12" md="5">
    <v-card class="pa-4">
      <h1>{{ $t("Register") }}</h1>
      <h4 class="text--secondary">{{ $t("It's quick and easy.") }}</h4>
      <form @submit.prevent="login">
        <div class="d-flex">
          <v-text-field
            :label="$t('user.Username')"
            required
            color="primary"
            :rules="rulesUserNameInput"
            v-model.trim="username"
          ></v-text-field>
          <span class="mx-1"></span>
          <v-text-field
            :label="$t('user.Name')"
            required
            color="primary"
            :rules="rulesNameInput"
            v-model.trim="name"
          ></v-text-field>
          <span class="mx-1"></span>
          <v-text-field
            :label="$t('user.Surname')"
            required
            color="primary"
            :rules="rulesSurnameInput"
            v-model.trim="surname"
          ></v-text-field>
        </div>
        <div class="d-flex">
          <v-text-field
            :label="$t('user.E-mail')"
            required
            color="primary"
            :rules="rulesEmailInput"
            v-model.trim="email"
          ></v-text-field>
          <span class="mx-1"></span>
          <v-text-field
            :label="$t('user.Phone number')"
            required
            color="primary"
            :rules="rulesPhoneNumberInput"
            v-model.trim="phoneNumber"
          ></v-text-field>
        </div>
        <v-text-field
          :label="$t('Password')"
          required
          color="primary"
          :rules="rulesPasswordInput"
          v-model.trim="password"
        ></v-text-field>
        <v-text-field
          :label="$t('user.Confirm Password')"
          required
          color="primary"
          :rules="rulesConfirmPasswordInput"
          v-model.trim="confirmPassword"
        ></v-text-field>
        <v-btn
          color="secondary color_black"
          block
          type="submit"
          :disabled="this.$v.$invalid"
        >
          {{ $t("Register") }}
        </v-btn>
        <v-alert v-if="error" type="success" class="mt-2">{{
          $t(`${error}`)
        }}</v-alert>
        <v-divider class="mt-4"></v-divider>
        <router-link to="login" class="text-decoration-none">
          <v-btn color="secondary mt-4 color_black" block>
            {{ $t("Log in") }}
          </v-btn>
        </router-link>
      </form>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { MyStore } from "@/store/store/store";
import { useStore } from "vuex-simple";
import User from "@/store/modules/User";

import { ValidationEvaluation, ValidationProperties } from "vue/types/vue";
import { Validation, validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";

import Logo from "@/components/app/Logo.vue";
import { AxiosResponse } from "node_modules/axios";

@Component({
  name: "Login",
  mixins: [validationMixin],
  components: {
    Logo,
  },
  validations: {
    password: { required, minLength: minLength(6) },
    confirmPassword: { required, minLength: minLength(6) },
    email: { required, email },
    username: { required },
    name: { required },
    surname: { required },
    phoneNumber: {
      required,
      phoneValid(value: string): boolean {
        return /((\+)?\b(8|38)?(0[\d]{2}))([\d-]{5,8})([\d]{2})/.test(value);
      },
    },
  },
  data() {
    return {
      password: "",
      email: "",
      username: "",
      name: "",
      surname: "",
      phoneNumber: "",
      confirmPassword: "",
      error: "",
    };
  },
})
export default class Register extends Vue {
  private store: MyStore = useStore(this.$store);

  private get rulesUserNameInput(): Array<
    string | (Validation & ValidationProperties<any> & ValidationEvaluation)
  > {
    return [
      (this.$v.username.$dirty && this.$v.username.required) ||
        `${this.$t("This field is required")}.`,
    ];
  }
  private get rulesPhoneNumberInput(): Array<
    string | (Validation & ValidationProperties<any> & ValidationEvaluation)
  > {
    return [
      (this.$v.phoneNumber.$dirty && this.$v.phoneNumber.required) ||
        `${this.$t("This field is required")}.`,
      (this.$v.phoneNumber.$dirty && this.$v.phoneNumber.phoneValid) ||
        `This phone number is not valid ${this.$v.phoneNumber.$model}`,
    ];
  }
  private get rulesNameInput(): Array<
    string | (Validation & ValidationProperties<any> & ValidationEvaluation)
  > {
    return [
      (this.$v.name.$dirty && this.$v.name.required) ||
        `${this.$t("This field is required")}.`,
    ];
  }
  private get rulesSurnameInput(): Array<
    string | (Validation & ValidationProperties<any> & ValidationEvaluation)
  > {
    return [
      (this.$v.surname.$dirty && this.$v.surname.required) ||
        `${this.$t("This field is required")}.`,
    ];
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
  private get rulesConfirmPasswordInput(): Array<
    string | (Validation & ValidationProperties<any> & ValidationEvaluation)
  > {
    return [
      (this.$v.confirmPassword.$dirty && this.$v.confirmPassword.minLength) ||
        `${this.$t("The minimum number of characters is")} ${
          this.$v.confirmPassword.$params.minLength.min
        } ${this.$t("you scored")} ${this.$v.confirmPassword.$model.length}`,
      (this.$v.confirmPassword.$dirty && this.$v.confirmPassword.required) ||
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
      this.$data.error = "";
      this.store.user = new User(
        this.$data.email,
        this.$data.password,
        this.$data.username,
        this.$data.name,
        this.$data.surname,
        this.$data.phoneNumber,
        this.$data.confirmPassword
      );
      this.store.auth
        .register(this.store.user)
        .then((res: AxiosResponse<any>) => {
          this.$data.error = this.store.auth.error;

          if (res.data.success) {
            console.log("Succes", this.store.user);
            this.$router.push("/login");
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
