"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "nav-search-bar",
  setup(__props) {
    const statusBarHeight = common_vendor.ref(0);
    let menuButtonInfo = common_vendor.reactive({});
    const searchBarHeight = common_vendor.ref(44);
    const searchBarRight = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      statusBarHeight.value = common_vendor.index.getSystemInfoSync().statusBarHeight;
      menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
      searchBarHeight.value = (menuButtonInfo.top - statusBarHeight.value) * 2 + menuButtonInfo.height;
      searchBarRight.value = menuButtonInfo.width + 10;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(statusBarHeight) + "px",
        b: common_vendor.unref(searchBarRight) + "px",
        c: common_vendor.unref(searchBarRight) ? "10px" : "",
        d: common_vendor.unref(searchBarHeight) + "px",
        e: common_vendor.unref(statusBarHeight) + common_vendor.unref(searchBarHeight) + "px"
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/home/components/nav-search-bar.vue"]]);
wx.createComponent(Component);
