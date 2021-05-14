<template>
  <v-col cols="12" md="3">
    <h2 class="text--primary">Login user</h2>
    <form @submit.prevent="login">
      <v-text-field
        label="E-mail"
        required
        color="secondary"
        :rules="rulesEmailInput"
        v-model.trim="email"
      ></v-text-field>
      <v-text-field
        label="Password"
        required
        color="secondary"
        :rules="rulesPasswordInput"
        v-model.trim="password"
      ></v-text-field>
      <v-btn color="primary" type="submit">Log in</v-btn>
    </form>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { ValidationEvaluation, ValidationProperties } from "vue/types/vue";
import { Validation, validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";

@Component({
  name: "Login",
  mixins: [validationMixin],
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
