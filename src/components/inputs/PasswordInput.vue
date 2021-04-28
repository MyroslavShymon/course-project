<template>
  <validation-provider
    v-slot="{ errors, valid }"
    name="Password"
    rules="required|min:6"
  >
    <md-field
      :state="valid"
      :class="{
        'md-invalid': readClasses && !valid,
      }"
    >
      <label for="password">Password</label>
      <md-input
        name="password"
        id="password"
        autocomplete="password"
        v-model.trim="password"
      />
      <!-- :disabled="sending" -->
      <span style="display: none">{{ passwordOut }}</span>
    </md-field>
    <div :state="valid">
      <span class="error" v-for="(error, index) in errors" :key="index">
        {{ error }}
      </span>
    </div>
  </validation-provider>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ValidationProvider } from "vee-validate";
import { MyStore } from "@/store/store/store";
import { useStore } from "vuex-simple";

// type invalid = { invalid: boolean };
@Component({
  components: {
    ValidationProvider,
  },
})
export default class PasswordInput extends Vue {
  public password = "";
  private declarated!: boolean;
  // @Prop() private invalid!: invalid;
  public store: MyStore = useStore(this.$store);

  private get readClasses(): boolean {
    if (this.declarated === undefined && this.password === "") {
      this.declarated = true;
      return false;
    } else {
      this.declarated === true && this.password === "";
      return true;
    }
  }

  public get passwordOut(): string {
    this.store.user.password = this.password;
    return this.store.user.password;
  }
}
</script>

<style scoped>
.md-field {
  margin: 4px 0 4px;
}
.error {
  color: #ff5252;
}
</style>
