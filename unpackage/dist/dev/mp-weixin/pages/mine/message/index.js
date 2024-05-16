"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const utils_router = require("../../../utils/router.js");
if (!Array) {
  const _easycom_my_nav_bar2 = common_vendor.resolveComponent("my-nav-bar");
  _easycom_my_nav_bar2();
}
const _easycom_my_nav_bar = () => "../../../components/my-nav-bar/my-nav-bar.js";
if (!Math) {
  _easycom_my_nav_bar();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const rightClick = () => {
      utils_router.router.push("/pages/mine/setting/message/index");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => common_vendor.unref(utils_router.router).back()),
        b: common_vendor.o(rightClick),
        c: common_vendor.p({
          title: "消息私信",
          rightText: "设置",
          fixed: true
        }),
        d: common_assets._imports_0$1,
        e: common_assets._imports_0$1,
        f: common_assets._imports_0$1,
        g: common_assets._imports_0$1,
        h: common_assets._imports_0$1,
        i: common_assets._imports_0$1,
        j: common_assets._imports_0$1,
        k: common_assets._imports_0$1,
        l: common_assets._imports_0$1,
        m: common_assets._imports_0$1,
        n: common_assets._imports_0$1,
        o: common_assets._imports_0$1
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-900b976d"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/message/index.vue"]]);
wx.createPage(MiniProgramPage);
