import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import VueResourece from 'vue-resource';
import { routes } from './routes';
import store from './stores/store';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.use(VueResourece);
Vue.http.options.root = 'http://localhost:3000/api/';
Vue.http.interceptors.push((req) => {
  req.headers.set('Authorization', store.state.jwt)
});

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
