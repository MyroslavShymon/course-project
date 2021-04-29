<template>
  <div class="form-header-auth">
    <span class="logo">ToDoList+</span>
    <validation-observer v-slot="{ invalid }">
      <form class="md-layout form__inner" @submit.prevent="validatePerson">
        <div class="form__inputs-wrapper">
          <EmailInput class="margin-right-10" />
          <PasswordInput class="margin-right-10" />
        </div>
        <ButtonSubmit
          btnName="Login"
          :invalid="invalid"
          :btnShow="btnShow"
          class="margin-right-10"
        />
        <RouterText
          link="/restoration-password"
          text="Forgot the password?"
          class="margin-right-10"
        />
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
export default class HeaderAuth extends Vue {
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

<style lang="scss" scoped>
.form {
  &-header-auth {
    grid-area: header;
    box-shadow: 0px 5px 5px -5px rgba(34, 60, 80, 0.6);
    position: sticky;
    top: 0;
    display: grid;
    grid-template-columns: 3fr 4fr;
    align-items: center;
    height: 74px;
  }
  &__forgot {
    margin: 0;
  }
  &__inner {
    align-items: center;
    justify-content: flex-end;
  }
  &__inputs-wrapper {
    display: flex;
    background: none;
  }
}
.logo {
  margin-left: 23px;
}
.margin-right-10 {
  margin-right: 10px !important;
}
.md-button.md-theme-default.md-raised:not([disabled]).md-primary {
  color: $black;
  background-color: $main-yellow;
}
</style>
