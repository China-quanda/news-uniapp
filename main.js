import App from './App'


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

try {
  function isPromise(obj) {
    return (
      !!obj &&
      (typeof obj === "object" || typeof obj === "function") &&
      typeof obj.then === "function"
    );
  }

  // 统一 vue2 API Promise 化返回格式与 vue3 保持一致
  uni.addInterceptor({
    returnValue(res) {
      if (!isPromise(res)) {
        return res;
      }
      return new Promise((resolve, reject) => {
        res.then((res) => {
          if (res[0]) {
            reject(res[0]);
          } else {
            resolve(res[1]);
          }
        });
      });
    },
  });
} catch (error) { }

const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
// 国际化 json 文件，文件内容详见下面的示例
import { createSSRApp } from 'vue'
import { initPlugins } from "./plugins";
import '@/utils/mixin' // mixin
// import './permission' // permission
import 'uno.css'
export function createApp() {
  const app = createSSRApp(App)
  initPlugins(app)
  // 挂载到全局的每一个Vue实例上
  // app.config.globalProperties.$http = myRequest
  return {
    app,
  }
}
// #endif