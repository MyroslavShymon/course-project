<template>
  <div class="form-header-auth">
    <span class="logo">ToDoList+</span>
    <validation-observer v-slot="{ invalid }">
      <form class="md-layout form__inner">
        <div class="form__inputs-wrapper">
          <EmailInput class="margin-right-10" />
          <PasswordInput class="margin-right-10" />
        </div>
        <md-button
          type="submit"
          class="margin-right-10 md-raised md-primary"
          variant="success"
          :disabled="invalid && btnShow"
          >Login</md-button
        >
        <!-- make router link in future -->
        <span class="form__forgot margin-right-10">Forgot the password?</span>
      </form>
    </validation-observer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { extend, setInteractionMode, ValidationObserver } from "vee-validate";
import { required, min, email } from "vee-validate/dist/rules";
import { MyStore } from "@/store/store/store";
import { useStore } from "vuex-simple";

import EmailInput from "@/components/inputs/EmailInput.vue";
import PasswordInput from "@/components/inputs/PasswordInput.vue";

setInteractionMode("eager");
extend("required", {
  ...required,
  message: "You may not left {_field_} empty",
});
extend("min", {
  ...min,
  message: "{_field_} should not exceed {length} characters",
});
extend("email", {
  ...email,
  message: "{_value_} is not a valid email",
});
@Component({
  data() {
    return {
      email: "",
      password: "",
    };
  },
  components: {
    EmailInput,
    PasswordInput,
    ValidationObserver,
  },
})
export default class Login extends Vue {
  public store: MyStore = useStore(this.$store);
  private email!: string;
  private password!: string;
  private get btnShow(): boolean {
    this.email = this.store.user.email;
    this.password = this.store.user.password;

    if (this.email.length === 0 || this.password.length === 0) {
      return true;
    } else if (this.password.length >= 6 && this.store.validEmail === true) {
      return false;
    } else {
      return true;
    }
  }
  private validatePerson() {
    console.log("validatePerson");
  }
}
</script>

<style lang="scss" scoped>
.logo {
  margin-left: 23px;
}
.form-header-auth {
  grid-area: header;
  box-shadow: 0px 5px 5px -5px rgba(34, 60, 80, 0.6);
  position: sticky;
  top: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}
.form__forgot {
  margin: 0;
}
.margin-right-10 {
  margin-right: 10px !important;
}
.form__inner {
  align-items: center;
  justify-content: flex-end;
}
.form__inputs-wrapper {
  display: flex;
}
.md-button.md-theme-default.md-raised:not([disabled]).md-primary {
  color: $black;
  background-color: $main-yellow;
}
</style>
