<template>
  <nav class="navigation" :class="showNavigation">
    <div class="menu">
      <md-button
        class="md-button menu__item"
        v-for="(link, index) of routers"
        :key="index"
        :disabled="link.disabled"
      >
        <router-link
          :to="link.link"
          class="menu__item_link"
          active-class="menu__item_active"
          exact
        >
          <div class="menu__img">
            <md-icon>{{ link.icon }}</md-icon>
          </div>
          <div class="menu__text">{{ link.text }}</div>
        </router-link></md-button
      >
    </div>
    <!-- <md-drawer :md-active.sync="showNavigation" md-swipeable> </md-drawer> -->
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyStore } from "@/store/store/store";
import { useStore } from "vuex-simple";
@Component({
  data() {
    return {
      routers: [
        { text: "Замітки", link: "/", icon: "task" }, //checklist
        {
          text: "Нагадування",
          link: "/reminder",
          icon: "timelapse",
        },
        {
          text: "Документи",
          link: "/documents",
          icon: "text_snippet",
          disabled: "",
        },
        {
          text: "Плани",
          link: "/plans",
          icon: "format_list_numbered",
          disabled: "",
        },
        { text: "Чати", link: "/chats", icon: "groups", disabled: "" },
        {
          text: "Менеджер витрат",
          link: "/manager",
          icon: "paid",
          disabled: "",
        },
        {
          text: "Календар",
          link: "/calendar",
          icon: "event",
          disabled: "",
        },
        { text: "Архів", link: "/archive", icon: "archive", disabled: "" },
        { text: "Корзина", link: "/been", icon: "delete", disabled: "" },
        { text: "Login", link: "/login" },
      ],
    };
  },
})
export default class NavBar extends Vue {
  public store: MyStore = useStore(this.$store);
  private get showNavigation() {
    return {
      transformTranslateX100: !this.store.menuOpened,
      transformTranslateX0: this.store.menuOpened,
    };
  }
}
</script>

<style lang="scss">
@import "./NavBar.scss";
</style>
