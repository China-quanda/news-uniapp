"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_app = require("./store/app.js");
const plugins_index = require("./plugins/index.js");
if (!Math) {
  "./pages/mine/index.js";
  "./pages/common/guide/index.js";
  "./pages/mine/allService.js";
  "./pages/mine/download/index.js";
  "./pages/mine/message/index.js";
  "./pages/mine/setting/index.js";
  "./pages/mine/setting/message/index.js";
  "./pages/mine/setting/privacy/index.js";
  "./pages/mine/setting/profile/index.js";
  "./pages/mine/setting/profile/edit.js";
  "./pages/mine/setting/account/index.js";
  "./pages/mine/setting/account/replace.js";
  "./pages/mine/setting/account/delAccount.js";
  "./pages/mine/setting/account/device/login-device.js";
  "./pages/mine/setting/account/device/device-info.js";
  "./pages/mine/setting/account/security/index.js";
  "./pages/mine/setting/account/security/security-lock.js";
  "./pages/mine/content/index.js";
  "./pages/mine/mine.js";
  "./pages/search/index.js";
  "./pages/login/login.js";
  "./pages/login/confirmLogin.js";
  "./pages/channel/index.js";
  "./pages/article/info.js";
  "./pages/test/articleItem.js";
  "./pages/home/home.js";
  "./pages/pay/pay.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    const appStore = store_app.useAppStore();
    common_vendor.onLaunch(() => {
      console.log("App Launch");
      appStore.loadExecution();
    });
    return () => {
    };
  }
});
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/quanda/Desktop/news_project/news-uniapp/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  plugins_index.initPlugins(app);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
