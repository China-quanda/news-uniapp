"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const utils_router = require("../../../../../utils/router.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login-device",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => common_vendor.unref(utils_router.router).push("device-info"))
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-10ee109e"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/setting/account/device/login-device.vue"]]);
wx.createPage(MiniProgramPage);
