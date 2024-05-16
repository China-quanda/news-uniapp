"use strict";
const common_vendor = require("../../../common/vendor.js");
const store_user = require("../../../store/user.js");
const store_app = require("../../../store/app.js");
const utils_router = require("../../../utils/router.js");
const utils_prompt = require("../../../utils/prompt.js");
require("../../../store/bluetooth.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userStore = store_user.useUserStore();
    const appStore = store_app.useAppStore();
    const promptToneChecked = common_vendor.ref(false);
    const promptToneChange = (e) => {
      promptToneChecked.value = e.detail.value;
    };
    const onExit = () => {
      userStore.logout();
      utils_prompt.prompt.msg("退出成功");
      setTimeout(() => {
        utils_router.router.reLaunch(appStore.homeUrl);
      }, 1500);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => common_vendor.unref(utils_router.router).push("/pages/mine/setting/profile/index")),
        b: common_vendor.o(($event) => common_vendor.unref(utils_router.router).push("/pages/mine/setting/account/index")),
        c: common_vendor.o(($event) => common_vendor.unref(utils_router.router).push("/pages/mine/setting/privacy/index")),
        d: common_vendor.unref(promptToneChecked),
        e: common_vendor.o(promptToneChange),
        f: common_vendor.t(common_vendor.unref(appStore).systemInfo.appVersion),
        g: !common_vendor.unref(userStore).token
      }, !common_vendor.unref(userStore).token ? {
        h: common_vendor.o(($event) => onExit())
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d9df6a80"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/setting/index.vue"]]);
wx.createPage(MiniProgramPage);
