import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vuetify.config.silent = false
Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)