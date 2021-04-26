import Vue from "vue";
import Vuex from "vuex";

import initialState from "./initial-state";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: initialState,
  mutations,
  actions
});
