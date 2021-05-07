<template>
  <div>Notes<Logo /></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Logo from "@/components/app/Logo.vue";

@Component({
  components: {
    Logo,
  },
})
export default class Task extends Vue {}
</script>
