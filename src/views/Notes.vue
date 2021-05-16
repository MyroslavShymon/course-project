<template>
  <div>Notes<Logo /></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyStore } from "@/store/store/store";
import { useStore } from "vuex-simple";
import Logo from "@/components/app/Logo.vue";

@Component({
  components: {
    Logo,
  },
})
export default class Notes extends Vue {
  // private store: MyStore = useStore(this.$store);
  // mounted() {
  //   this.store.auth.getProfile();
  // }
}
</script>
