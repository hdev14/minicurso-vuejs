import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/index.css';
//import 'bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import router from './router'

Vue.config.productionTip = false

Vue.use(VueToast,{
  position: 'top'
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
