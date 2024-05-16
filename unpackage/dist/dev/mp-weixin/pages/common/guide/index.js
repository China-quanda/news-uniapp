"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const store_app = require("../../../store/app.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "0e5198fe": safeAreaInsetsBottom,
      "911ed082": common_vendor.unref(safeAreaInsetsTop)
    }));
    const appStore = store_app.useAppStore();
    const safeAreaInsetsBottom = appStore.systemInfo.safeAreaInsets.bottom + "px";
    let safeAreaInsetsTop = "15px";
    const menuButton = common_vendor.index.getMenuButtonBoundingClientRect();
    safeAreaInsetsTop = menuButton.height + appStore.systemInfo.safeAreaInsets.top + 15 + "px";
    let current = common_vendor.ref(0);
    const swiperChange = (e) => {
      current.value = e.detail.current;
    };
    let isChecked = common_vendor.ref(false);
    const checkboxChange = (e) => {
      isChecked.value = e.detail.value.length ? true : false;
    };
    const handlePrivacy = () => {
      let site = appStore.agreements[0];
      common_vendor.index.navigateTo({ url: `/pages/common/webview/index?title=${site.title}&url=${site.url}` });
    };
    const handleUserAgrement = () => {
      let site = appStore.agreements[1];
      common_vendor.index.navigateTo({ url: `/pages/common/webview/index?title=${site.title}&url=${site.url}` });
    };
    const openApp = () => {
      if (!isChecked.value) {
        current.value = 3;
        return common_vendor.index.showToast({
          title: "请先勾选同意并接受",
          icon: "none"
        });
      }
      appStore.launchFlag = true;
      appStore.loadExecution();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0,
        b: common_assets._imports_1,
        c: common_assets._imports_2,
        d: common_assets._imports_3,
        e: common_vendor.o(swiperChange),
        f: common_vendor.unref(current),
        g: common_vendor.unref(current) !== 3
      }, common_vendor.unref(current) !== 3 ? {
        h: common_vendor.o(openApp)
      } : {}, {
        i: common_vendor.unref(current) === 3
      }, common_vendor.unref(current) === 3 ? {
        j: common_vendor.o(openApp),
        k: common_vendor.unref(isChecked),
        l: common_vendor.o(checkboxChange),
        m: common_vendor.o(handlePrivacy),
        n: common_vendor.o(handleUserAgrement)
      } : {}, {
        o: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4ddeaa10"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/common/guide/index.vue"]]);
wx.createPage(MiniProgramPage);
