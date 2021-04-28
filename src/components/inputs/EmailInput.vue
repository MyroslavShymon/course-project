<template>
  <validation-provider
    v-slot="{ errors, valid }"
    name="Email"
    rules="required|email"
  >
    <md-field
      :state="valid"
      :class="{
        'md-invalid': readClasses && !valid,
      }"
    >
      <label for="email">Email address:</label>
      <md-input
        name="email"
        id="email"
        autocomplete="email"
        v-model.trim="email"
        type="email"
        required
        placeholder="Enter email"
      />
      <!-- :disabled="sending" -->
      <span style="display: none"
        >{{ emailNameOut }}{{ (validEmail = valid) }}</span
      >
    </md-field>
    <div :state="valid">
      <span class="error" v-for="(error, index) in errors" :key="index">
        {{ error }}
      </span>
    </div>
  </validation-provider>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ValidationProvider } from "vee-validate";
import { MyStore } from "@/store/store/store";
import { useStore } from "vuex-simple";

@Component({
  components: {
    ValidationProvider,
  },
})
export default class EmailInput extends Vue {
  public email = "";
  public validEmail = false;
  private declarated!: boolean;
  public store: MyStore = useStore(this.$store);

  private get readClasses(): boolean {
    if (this.declarated === undefined && this.email === "") {
      this.declarated = true;
      return false;
    } else {
      this.declarated === true && this.email === "";
      return true;
    }
  }

  public get emailNameOut(): boolean {
    this.store.user.email = this.email;
    this.store.validEmail = this.validEmail;

    return this.store.validEmail;
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
