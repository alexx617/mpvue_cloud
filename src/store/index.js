// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import userMsg from './modules/userMsg'
// import vuetron from 'vuetron';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    userMsg,
  },
  // plugins: [vuetron.VuetronVuex()]
});

export default store
