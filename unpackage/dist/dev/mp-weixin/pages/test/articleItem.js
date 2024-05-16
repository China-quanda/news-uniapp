"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  homeArticleItem();
}
const homeArticleItem = () => "../article/components/home-article-item.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "articleItem",
  setup(__props) {
    const type = common_vendor.ref(1);
    const isGzUser = common_vendor.ref(false);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: common_vendor.unref(type),
          isGzUser: common_vendor.unref(isGzUser)
        }),
        b: common_vendor.p({
          type: common_vendor.unref(type),
          isGzUser: common_vendor.unref(isGzUser)
        }),
        c: common_vendor.o(($event) => isGzUser.value = !common_vendor.unref(isGzUser)),
        d: common_vendor.o(($event) => type.value = 0),
        e: common_vendor.o(($event) => type.value = 1),
        f: common_vendor.o(($event) => type.value = 2),
        g: common_vendor.o(($event) => type.value = 3)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-21a0f76c"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/test/articleItem.vue"]]);
wx.createPage(MiniProgramPage);
