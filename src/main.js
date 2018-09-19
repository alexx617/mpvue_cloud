import Vue from 'vue'
import App from './App'
import store from '@/store'
import util from 'utils/util';
import './styles/base.css'

Vue.config.productionTip = false
App.store = store
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
Object.assign(Vue.prototype, util);