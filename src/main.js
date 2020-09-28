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
// import user from "./router/user"

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
  
  if (store.state.authority=='STUDENT') {
    store.state.menuData =  [
      {
      title:'个人信息',
      router:'usercenter',
      item:''
    },
    {
      title:'修改密码',
      router:'userpassword',
      item:''
    },
    {
      title:'学习记录',
      router:'userrecord',
      item:''
    },
    {
      title:'考试成绩',
      router:'userachievement',
      item:''
    },
    {
      title:'数据统计',
      router:'userstatistics',
      item:''
    }
    ]
  }


  if (store.state.authority=='ADMIN') {
    store.state.menuData = [
      {
      title:'教师管理',
      item:'',
      show:false,
      router:'adminmaster',
          itemRouter:'',
    },
    {
      title:'编制管理',
      item:'',
      show:false,
      router:'adminorganization',
          itemRouter:''
    },
    {
      title:'数据管理',
      item:'',
      show:false,
      router:'adminstatistics',
      itemRouter:''
    },
    {
      title:'内容管理',
      item:['望诊诊断','闻诊诊断','切诊诊断','病名诊断','治则治法','方剂方药'],
      show:false,
      router:'admincontent',
          itemRouter:['adminlook','adminhear','adminpulse','adminname','admintreatment','adminprescription'],
    },
    {
      title:'LOGO修改',
      item:'',
      show:false,
      router:'adminlogo',
      itemRouter:''
    },
    {
      title:'算分逻辑',
      item:'',
      show:false,
      router:'adminnumber',
      itemRouter:''
    },
  ]
  }

  if (store.state.authority=='TEACHER') {
    store.state.menuData=  [
      {
      title:'账号管理',
      router:'teacheruser',
      item:''
    },
    {
      title:'班级管理',
      router:'teacherclass',
      item:''
    },
    {
      title:'学生成绩',
      router:'teacherstudent',
      item:''
    },
    {
      title:'案例管理',
      router:'teachercase',
      item:''
    },
    {
      title:'发布考试',
      router:'teacherrelease',
      item:''
    },
    {
      title:'数据分析',
      router:'teacherstatistics',
      item:''
    }
  ]
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
