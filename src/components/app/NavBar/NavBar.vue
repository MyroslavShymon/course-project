<template>
  <nav class="navigation">
    <div class="menu">
      <md-button
        class="md-button menu__item"
        v-for="(link, index) of routers"
        :key="index"
      >
        <router-link
          :to="link.link"
          class="menu__item_link"
          active-class="menu__item_active"
        >
          <div class="menu__img">
            <md-icon>{{ link.icon }}</md-icon>
          </div>
          <div class="menu__text">{{ link.text }}</div>
        </router-link></md-button
      >
    </div>
    <md-drawer :md-active.sync="showNavigation" md-swipeable>
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">My App name</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <md-icon>move_to_inbox</md-icon>
          <span class="md-list-item-text">Inbox</span>
        </md-list-item>

        <md-list-item>
          <md-icon>send</md-icon>
          <span class="md-list-item-text">Sent Mail</span>
        </md-list-item>

        <md-list-item>
          <md-icon>delete</md-icon>
          <span class="md-list-item-text">Trash</span>
        </md-list-item>

        <md-list-item>
          <md-icon>error</md-icon>
          <span class="md-list-item-text">Spam</span>
        </md-list-item>
      </md-list>
    </md-drawer>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  data() {
    return {
      showNavigation: false,
      routers: [
        { text: "Замітки", link: "/task", icon: "task" }, //checklist
        { text: "Нагадування", link: "/reminder", icon: "timelapse" },
        { text: "Документи", link: "/documents", icon: "text_snippet" },
        { text: "Плани", link: "/plans", icon: "format_list_numbered" },
        { text: "Чати", link: "/chats", icon: "groups" },
        { text: "Менеджер витрат", link: "/manager", icon: "paid" },
        { text: "Календар", link: "/calendar", icon: "event" },
        { text: "Архів", link: "/archive", icon: "archive" },
        { text: "Корзина", link: "/been", icon: "delete" },
        { text: "About", link: "/about" },
      ],
    };
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "./NavBar.scss";
</style>
