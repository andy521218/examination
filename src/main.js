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

Vue.component('i-switch', Switch);


Vue.config.productionTip = false

// router.addRoutes(admin)

router.beforeEach((to, from, next) => {
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
        "teachertuser",
        "teacherclass",
        "teacherstudent",
        "teachercase",
        "teacherrelease",
        "teacherstatistics"
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
