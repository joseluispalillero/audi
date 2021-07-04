import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import BootstrapVue from 'bootstrap-vue'
import vuetify from './plugins/vuetify'

import '@/assets/scss/index.scss'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

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

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
