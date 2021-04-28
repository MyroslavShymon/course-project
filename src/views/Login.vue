<template>
  <div class="login-block">
    <div class="login-block__inner">
      <div>
        <span class="logo">ToDoList+</span>
        <div class="login-block__recent">
          <h3>Recent Logins</h3>
          <span class="login-block__description"
            >Click your picture or add an account.</span
          >
        </div>
      </div>
      <md-content class="form-wrapper flex-direction-column">
        <h3>Login</h3>
        <validation-observer v-slot="{ invalid }" class="form">
          <form
            class="md-layout form__inner flex-direction-column"
            @submit.prevent="validatePerson"
          >
            <div class="form__inputs-wrapper">
              <EmailInput />
              <PasswordInput />
            </div>
            <md-button
              type="submit"
              class="md-raised md-primary"
              variant="success"
              :disabled="invalid && btnShow"
              >Login</md-button
            >
            <!-- make router link in future -->
            <span class="form__forgot">Forgot the password?</span>
            <hr />
            <md-button class="md-raised md-primary btn-second">
              Register
            </md-button>
          </form>
        </validation-observer>
      </md-content>
    </div>
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
    this.store.isAuth = true;
    console.log("validatePerson");
  }
}
</script>

<style lang="scss">
.login-block {
  display: flex;
  width: 60%;
  justify-content: space-between;
  align-content: center;
  &__inner {
    display: flex;
    width: 100%;
    justify-content: space-between;
    .form-wrapper {
      margin: 30px 0 0 0;
    }
  }
  &__recent {
    display: flex;
    flex-direction: column;
  }
  &__description {
    color: $grey-lightest-text;
    font-weight: 700;
  }
}
.form__forgot {
  margin: 25px 0 0 0;
}
.form__inputs-wrapper {
  background: white;
}
</style>
