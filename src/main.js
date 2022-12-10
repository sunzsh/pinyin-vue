import Vue from 'vue'
import App from './App.vue'
import LongPress from './longpress.js'
Vue.use(LongPress, {time: 500})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
