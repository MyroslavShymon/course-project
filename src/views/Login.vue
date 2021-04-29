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
            <ButtonSubmit
              btnName="Login"
              :invalid="invalid"
              :btnShow="btnShow"
            />
            <RouterText
              link="/restoration-password"
              text="Forgot the password?"
            />
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
import { useStore } from "vuex-simple";
import { Component, Vue } from "vue-property-decorator";
import { extend, setInteractionMode, ValidationObserver } from "vee-validate";
import { required, min, email } from "vee-validate/dist/rules";
import { MyStore } from "@/store/store/store";

import EmailInput from "@/components/inputs/EmailInput.vue";
import PasswordInput from "@/components/inputs/PasswordInput.vue";
import ButtonSubmit from "@/components/form/ButtonSubmit.vue";
import RouterText from "@/components/form/RouterText.vue";

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
    ButtonSubmit,
    RouterText,
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
  }
}
</script>

<style lang="scss">
.login {
  &-block {
    width: 60%;
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin: 0 auto;
    &__inner {
      display: flex;
      width: 100%;
      justify-content: space-between;
      .form-wrapper {
        margin: 30px auto 0 auto;
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
}
.form {
  &__forgot {
    margin: 25px 0 0 0;
  }
  &__inputs-wrapper {
    background: white;
  }
}
</style>
