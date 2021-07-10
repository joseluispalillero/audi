import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import BootstrapVue from 'bootstrap-vue'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'

import '@/assets/scss/index.scss'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(Vuex)

Vue.filter('strStatus', function (value) {
  switch(value) {
    case 0:
      return 'Inactivo'
    case 1:
      return 'Activo'
    case 2:
      return 'Eliminado'
  }
})

const store = new Vuex.Store({
  state: {
   message: ''
  },
})

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app')
