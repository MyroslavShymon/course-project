<template>
  <div>
    <div class="home">Task</div>
    <input type="text" v-model="password" />
    <input type="text" v-model="email" />
    <button @click="dataShow"></button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import User from "@/store/modules/User";
import { MyStore } from "@/store/store/store";
import { useStore } from "vuex-simple";

@Component({
  data() {
    return {
      email: "",
      password: "",
    };
  },
})
export default class Task extends Vue {
  private email!: string;
  private password!: string;
  public store: MyStore = useStore(this.$store);
  dataShow() {
    this.store.user.password = this.password;
    this.store.user.email = this.email;
  }
}
</script>
