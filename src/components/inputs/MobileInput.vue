<template>
  <validation-provider
    v-slot="{ errors, valid }"
    name="Phone Number"
    :rules="{
      required: true,
      phoneNumber: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    }"
  >
    <md-field
      :state="valid"
      :class="{
        'md-invalid': readClasses && !valid,
      }"
    >
      <label for="phone">Phone Number:</label>
      <md-input
        name="phone"
        id="phone"
        autocomplete="phone"
        v-model.trim="phone"
        required
        placeholder="Enter phone"
      />
      <!-- :disabled="sending" -->
      <span style="display: none"
        >{{ phoneOut }}{{ (validPhone = valid) }}</span
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
export default class MobileInput extends Vue {
  public phone = 0;
  private declarated!: boolean;
  public validPhone = false;
  // @Prop() private invalid!: invalid;
  public store: MyStore = useStore(this.$store);

  private get readClasses(): boolean {
    if (this.declarated === undefined && this.phone === 0) {
      this.declarated = true;
      return false;
    } else {
      this.declarated === true && this.phone === 0;
      return true;
    }
  }

  public get phoneOut(): number {
    this.store.phone = this.phone;
    this.store.validPhone = this.validPhone;
    return this.store.phone;
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
