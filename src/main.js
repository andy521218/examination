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
  
  // if (store.state.authority=='STUDENT') {
  //   store.state.menuData =  [
  //     {
  //     title:'个人信息',
  //     router:'usercenter',
  //     item:''
  //   },
  //   {
  //     title:'修改密码',
  //     router:'userpassword',
  //     item:''
  //   },
  //   {
  //     title:'学习记录',
  //     router:'userrecord',
  //     item:''
  //   },
  //   {
  //     title:'考试成绩',
  //     router:'userachievement',
  //     item:''
  //   },
  //   {
  //     title:'数据统计',
  //     router:'userstatistics',
  //     item:''
  //   }
  //   ]
  //   console.log(user) 
  //   router.addRoutes(user)
  // }
  // if (/admin/.test(to.name)) {
  //   store.state.menu = [
  //     {
  //     title:'教师管理',
  //     item:'',
  //     show:false
  //   },
  //   {
  //     title:'编制管理',
  //     item:'',
  //     show:false
  //   },
  //   {
  //     title:'数据管理',
  //     item:'',
  //     show:false
  //   },
  //   {
  //     title:'内容管理',
  //     item:['望诊诊断','闻诊诊断','切诊诊断','病名诊断','治则治法','方剂方药'],
  //     show:false
  //   },
  //   {
  //     title:'LOGO修改',
  //     item:'',
  //     show:false
  //   },
  //   {
  //     title:'算分逻辑',
  //     item:'',
  //     show:false
  //   },
  // ],
  //     store.state.routerData = [
  //       {
  //         router:'adminmaster',
  //         itemRouter:'',
  //       },
  //       {
  //         router:'adminorganization',
  //         itemRouter:''
  //       },
  //       {
  //         router:'adminstatistics',
  //         itemRouter:''
  //       },
  //       {
  //         router:'admincontent',
  //         itemRouter:['adminlook','adminhear','adminpulse','adminname','admintreatment','adminprescription'],
  //       },
  //       {
  //         router:'adminlogo',
  //         itemRouter:''
  //       },
  //       {
  //         router:'adminnumber',
  //         itemRouter:''
  //       },
  //     ]
  // }

  // if (/teacher/.test(to.name)) {
  //   store.state.menu =  [
  //     {
  //     title:'账号管理',
  //     item:''
  //   },
  //   {
  //     title:'班级管理',
  //     item:''
  //   },
  //   {
  //     title:'学生成绩',
  //     item:''
  //   },
  //   {
  //     title:'案例管理',
  //     item:''
  //   },
  //   {
  //     title:'发布考试',
  //     item:''
  //   },
  //   {
  //     title:'数据分析',
  //     item:''
  //   }
  // ]
  // store.state.routerData = [
  //   {
  //     router:'teacheruser',
  //     itemRouter:''
  //   },
  //   {
  //     router:'teacherclass',
  //     itemRouter:''
  //   },
  //   {
  //     router:'teacherstudent',
  //     itemRouter:''
  //   },
  //   {
  //     router:'teachercase',
  //     itemRouter:''
  //   },
  //   {
  //     router:'teacherrelease',
  //     itemRouter:''
  //   },
  //   {
  //     router:'teacherstatistics',
  //     itemRouter:''
  //   },
  // ] 
  // }

  // if (/message/.test(to.name)) {
  //   store.state.menu = ["问题讨论", "问题提问", "我的问题", "我的私信"],
  //   store.state.menu =  [
  //     {
  //     title:'问题讨论',
  //     item:''
  //   },
  //   {
  //     title:'问题提问',
  //     item:''
  //   },
  //   {
  //     title:'我的问题',
  //     item:''
  //   },
  //   {
  //     title:'我的私信',
  //     item:''
  //   },
  // ]
  // store.state.routerData = [
  //   {
  //     router:'messageforum',
  //     itemRouter:''
  //   },
  //   {
  //     router:'messagepublish',
  //     itemRouter:''
  //   },
  //   {
  //     router:'messagemy',
  //     itemRouter:''
  //   },
  //   {
  //     router:'messageprivate',
  //     itemRouter:''
  //   },
  // ] 
     
  // }
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
