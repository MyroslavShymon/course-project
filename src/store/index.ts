import Vue from "vue";
import Vuex from "vuex";

import { createVuexStore } from "vuex-simple";

import { MyStore } from "./store/store";

Vue.use(Vuex);

// create our module class instance
const instance = new MyStore();

// create and export our store
export default createVuexStore(instance, {
  strict: false,
  modules: {},
  plugins: [],
});

// instance is now bound to the store: we can now call our mutations, getters and such as we would normally with our class instance
// instance.bar.foo2.increment();
// instance.bar.foo2.increment();

// instance.persons.getUsers();

// console.log(instance.bar.foo2);
// console.log(instance.bar.total);
// instance.Person.getUsers();
