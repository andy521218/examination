import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'view-design/dist/styles/iview.css'
import "./assets/css/rest.css"
import "./assets/css/base.scss"
import { Switch ,Message} from 'view-design';
import axios from "axios"
import http from "../src/http/http"
import upload from "../src/http/upload"
import VueAxios from "vue-axios"
import admin from "./router/admin"
import teacher from "./router/teacher"
import user from "./router/user"
import qs from "qs";
import filters from './filters'


Vue.component('i-switch', Switch);
Vue.use(VueAxios,axios);

Vue.use(filters)
Vue.prototype.http = http
Vue.prototype.qs = qs
Vue.prototype.upload = upload
Vue.prototype.$Message=Message
Vue.config.productionTip = false

axios.defaults.baseURL = '/api';
axios.defaults.timeout=8000;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data) {
  let ret = ''
  for (let it in data) {
   ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
 }]

axios.interceptors.response.use(function onFulfilled(response) {
  return response.data;
}, function onRejected(reason) {
  Message.error('连接服务器超时')
  return Promise.reject(reason.data);
});

axios.defaults.validateStatus = function (status) {
 if(status=='401') return  Message.error('长时间未操作,请重新登入!')
 return /^(2|3|4)\d{2}$/.test(status);
}

axios.defaults.withCredentials = true;

router.beforeEach((to, from, next) => {
  to.name=='index'?store.state.flag=false:store.state.flag=true
  var authority=localStorage.getItem('authority')
 if(to.name==from.name && !!authority){
        if(authority=='ADMIN'){
          router.addRoutes(admin)
        }
        if(authority=='TEACHER'){
          router.addRoutes(teacher)
        }
        if(authority=='STUDENT'){
          router.addRoutes(user)
        }
        router.push(to.path)
 }
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
