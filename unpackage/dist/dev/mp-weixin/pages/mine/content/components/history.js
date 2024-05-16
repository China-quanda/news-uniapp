"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _component_info_action = common_vendor.resolveComponent("info-action");
  _component_info_action();
}
if (!Math) {
  homeArticleItem();
}
const homeArticleItem = () => "../../../article/components/home-article-item.js";
const __default__ = { name: "history" };
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  setup(__props) {
    common_vendor.ref([]);
    common_vendor.reactive({
      pageNum: 1,
      pageSize: 10,
      total: 0
    });
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(4, (item, index, i0) => {
          return {
            a: "6ba18c88-0-" + i0,
            b: common_vendor.p({
              info: item.article
            }),
            c: "6ba18c88-1-" + i0,
            d: common_vendor.p({
              info: item.article
            }),
            e: index
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/content/components/history.vue"]]);
wx.createComponent(Component);
