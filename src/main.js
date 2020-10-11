import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
// 导入icon
import '@/icons/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css';
import './router/premit'

// 高德地图
import "./plugins/aMap"

Vue.config.productionTip = false;
Vue.use(ElementUI);
// 添加事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
