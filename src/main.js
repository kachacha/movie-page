import Vue from 'vue';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import router from './Router/router'
import store from "./Vuex";
import Api from "./request/index"
import vuescroll from "vuescroll"; //引入vuescroll
import "vuescroll/dist/vuescroll.css"; //引入vuescroll样式
// 引入 Element 组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 滚动条
Vue.use(vuescroll);//使用
// 将Api对象绑定在vue实例的原型上
Vue.prototype.$Api = Api
Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(Vuex);

//vuex
// axios.defaults.headers.get['Access-Control-Allow-Headers'] = 'x-requested-with,content-type';
// axios.defaults.headers.get['Content-Type'] = "application/x-www-form-urlencoded";

new Vue({
  router,
  store,
  Api,
  render: h => h(App),
}).$mount('#app');
