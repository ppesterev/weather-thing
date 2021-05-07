import Vue from "vue";
import Vuex from "vuex";

import initialState from "./initial-state";
import mutations from "./mutations";
import actions from "./actions";
import { syncStoragePlugin } from "./plugins";

Vue.use(Vuex);

export default new Vuex.Store({
  state: initialState,
  getters: {
    getUntrackedSearchResults: (state) =>
      state.search.results.filter(
        (result) =>
          !state.trackedLocations.find(
            (tracked) => tracked.woeid === result.woeid
          )
      )
  },
  mutations,
  actions,
  plugins: [syncStoragePlugin]
});
