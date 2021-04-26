<template>
  <header class="header">
    <div class="header__logo-wrapper">
      <!-- <div class="burger-menu">
        <div class="burger-menu__item"></div>
        <div class="burger-menu__item"></div>
        <div class="burger-menu__item"></div>
      </div> -->
      <md-button class="md-icon-button">
        <md-icon>menu</md-icon>
      </md-button>
      <router-link to="/" class="header__logo">ToDoList+</router-link>
    </div>
    <div class="header__inner">
      <form method="get" action="" class="search">
        <a class="search__loupe search-img"></a>
        <input
          type="search"
          name="search"
          placeholder="Пошук..."
          class="search__main search_passive"
        />
        <div class="search__images-wrapper">
          <a class="search__nine-grid search-img"></a>
          <a class="search__close search-img"></a>
        </div>
      </form>

      <div>aaaaaaaaaaaaaaaaaaaaaaa</div>
    </div>
  </header>
</template>

<style lang="scss">
@import "./Header.scss";
</style>
