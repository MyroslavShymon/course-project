<template>
  <footer class="footer">
    <ul class="footer__list">
      <li
        v-for="language of languages"
        :key="language.language"
        :class="{ footer__item_active: language.active }"
        class="footer__item"
      >
        {{ language.language }}
      </li>
    </ul>
    <hr />
    <ul class="footer__list">
      <li class="footer__item">
        <router-link to="/">Task</router-link>
      </li>
      <li class="footer__item">
        <router-link to="/reminder">Reminder</router-link>
      </li>
      <li>3</li>
    </ul>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyStore } from "@/store/store/store";
import { useStore } from "vuex-simple";

import ILang from "@/store/interfaces/ILang";

@Component
export default class Footer extends Vue {
  private store: MyStore = useStore(this.$store);

  private get languages(): ILang[] {
    return this.store.languages;
  }
}
</script>

<style lang="scss" scoped>
.footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: $white;
  padding: 5px 0;
  &__list {
    display: flex;
    width: 60%;
    margin: 0 auto;
  }
  hr {
    margin: 10px 0;
  }
  &__item {
    cursor: pointer;
    margin: 0 8px;
    &:first-child {
      margin: 0 8px 0 0;
    }
    &:hover {
      text-decoration: underline;
    }
    &_active {
      color: $grey-lightest-text;
      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
