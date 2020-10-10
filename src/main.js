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
import VueAxios from "vue-axios"
import admin from "./router/admin"
import teacher from "./router/teacher"
import user from "./router/user"

Vue.component('i-switch', Switch);
Vue.use(VueAxios,axios);
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
  return Promise.reject(reason);
});

axios.defaults.validateStatus = function (status) {
  return /^(2|3)\d{2}$/.test(status);
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
        if(authority=='STUEDNT'){
          router.addRoutes(user)
        }
        router.push(to.path)
 }
  if (/message/.test(to.name)) {
    store.state.menuData =  [
      {
      title:'问题讨论',
      router:'messageforum',
      item:''
    },
    {
      title:'问题提问',
      router:'messagepublish',
      item:''
    },
    {
      title:'我的问题',
      router:'messagemy',
      item:''
    },
    {
      title:'我的私信',
      router:'messageprivate',
      item:''
    },
  ]

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
