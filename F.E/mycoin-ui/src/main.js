import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import router from './router'

Vue.use(VueResource);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
  
  render: h => h(App)
})
