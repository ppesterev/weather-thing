import Vue from "vue";
import App from "./components//App.vue";
import store from "./store";

import MQ from "vue-match-media/src";
Vue.use(MQ);

Vue.config.productionTip = false;

new Vue({
  store,
  mq: {
    dropMap: "(max-width: 560px)",
    collapseLists: "(max-width: 900px)"
  },
  render: (h) => h(App)
}).$mount("#app");
