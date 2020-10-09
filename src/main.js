


// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.use(VueCookies)
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.config.productionTip = false
/* eslint-disable no-new */

new Vue({
  render: h => h(App),
}).$mount('#app')

