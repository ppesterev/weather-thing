import Vue from "vue";
import App from "./components//App.vue";
import store from "./store";

import MQ from "vue-match-media/src";
Vue.use(MQ);

Vue.config.productionTip = false;

new Vue({
  store,
  mq: {
    phone: "(max-width: 560px)",
    tablet: "(max-width: 900px)"
  },
  render: (h) => h(App)
}).$mount("#app");
