import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'view-design/dist/styles/iview.css'
import "./assets/css/rest.css"
import "./assets/css/base.scss"
import { Switch } from 'view-design';
// import admin from './router/admin'
// import user from './router/user'
// import teacher from './router/teacher'

Vue.component('i-switch', Switch);


Vue.config.productionTip = false




router.beforeEach((to, from, next) => {
  to.name=='index'?store.state.flag=false:store.state.flag=true
  if (/user/.test(to.name)) {
    store.state.menu = ["个人信息", "修改密码", "学习记录", "考试成绩", "数据统计"],
      store.state.routerData = [
        "usercenter",
        "userpassword",
        "userrecord",
        "userachievement",
        "userstatistics",
      ]   
  }
  if (/admin/.test(to.name)) {
    store.state.menu = ["教师管理", "编制管理", "数据管理", "内容管理", "LOGO修改","算分逻辑"],
      store.state.routerData = [
        "adminmaster",
        "adminorganization",
        "adminstatistics",
        "admincontent",
        "adminlogo",
        "adminnumber"
      ]
  }

  if (/teacher/.test(to.name)) {
    store.state.menu = ["账号管理", "班级管理", "学生成绩", "案例管理", "发布考试","数据分析"],
      store.state.routerData = [
        "teacheruser",
        "teacherclass",
        "teacherstudent",
        "teachercase",
        "teacherrelease",
        "teacherstatistics"
      ]
  }

  if (/message/.test(to.name)) {
    store.state.menu = ["问题讨论", "问题提问", "我的问题", "我的私信"],
      store.state.routerData = [
        "messageforum",
        "messagepublish",
        "messagemy",
        "messageprivate",
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
