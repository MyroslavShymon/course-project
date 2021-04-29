<template>
  <div class="restoration-password-wrapper">
    <div class="login-block__inner">
      <md-content class="form-wrapper flex-direction-column">
        <h3>Restoration Password</h3>
        <span class="form__underline"></span>
        <validation-observer v-slot="{ invalid }" class="form">
          <form
            class="md-layout form__inner flex-direction-column"
            @submit.prevent="validatePerson"
          >
            <p>
              Please enter your email or mobile number to search for your
              account.
            </p>

            <div class="form__inputs-wrapper">
              <MobileInput />
            </div>
            <span class="form__underline"></span>
            <div class="form__button-wrapper">
              <router-link to="/login">
                <md-button class="md-raised md-primary btn-second">
                  Back
                </md-button>
              </router-link>
              <ButtonSubmit
                btnName="Login"
                :invalid="invalid"
                :btnShow="btnShow"
              />
            </div>
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
import { required, regex as phoneNumber } from "vee-validate/dist/rules";
import { MyStore } from "@/store/store/store";

import MobileInput from "@/components/inputs/MobileInput.vue";
import ButtonSubmit from "@/components/form/ButtonSubmit.vue";

setInteractionMode("eager");
extend("required", {
  ...required,
  message: "You may not left {_field_} empty",
});
extend("phoneNumber", {
  ...phoneNumber,
  message: "Please enter a valid phone number",
});
@Component({
  data() {
    return {
      phone: 0,
    };
  },
  components: {
    MobileInput,
    ValidationObserver,
    ButtonSubmit,
  },
})
export default class RestorationPassword extends Vue {
  public store: MyStore = useStore(this.$store);
  private phone!: number;
  private get btnShow(): boolean {
    this.phone = this.store.phone;

    if (this.phone === 0) {
      return true;
    } else if (this.store.validPhone === true) {
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
.login {
  &-block {
    width: 60%;
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin: 0 auto;
  }
}
.form {
  padding: 0 0 10px 0;
  width: 100%;
  align-content: center;
  p {
    width: 90%;
    margin: 10px auto 0 auto;
    color: #232323;
    font-size: 20px;
  }
  &__button-wrapper {
    display: flex;
    margin: 10px 0 0 0;
    justify-content: flex-end;
    width: 90%;
    align-self: center;
    .btn-second {
      margin: 0 10px 0 0;
    }
  }
  &__inputs-wrapper {
    width: 90%;
    align-self: center;
    padding: 0;
  }
  &-wrapper {
    margin: 0 auto;
    width: 35%;
    h3 {
      margin: 20px 0 0 0;
      width: 90%;
    }
  }
  &__underline {
    width: 100%;
    display: block;
    margin: 30px 0 0 0;
    border-bottom: 1px solid white;
    border-top: 1px solid #00000069;
  }
}
</style>
