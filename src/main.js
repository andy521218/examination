import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Pagination,Table,TableColumn} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/rest.css"
import "./assets/css/base.scss"

Vue.use(Pagination);
Vue.use(Table);
Vue.use(TableColumn)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
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
