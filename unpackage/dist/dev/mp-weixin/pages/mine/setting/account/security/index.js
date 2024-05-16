"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const utils_router = require("../../../../../utils/router.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => common_vendor.unref(utils_router.router).push("security-lock?type=lock&title=账号锁定")),
        b: common_vendor.o(($event) => common_vendor.unref(utils_router.router).push("security-lock?type=unlock&title=解除锁定"))
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c073f0fd"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/setting/account/security/index.vue"]]);
wx.createPage(MiniProgramPage);
