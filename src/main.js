import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.css'
//引入elment-ui

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入全局的样式文件
import './styles/index.less'




Vue.use(ElementUI)
//关闭生产环境提示 
Vue.config.productionTip = false


//创建vue根实列
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
