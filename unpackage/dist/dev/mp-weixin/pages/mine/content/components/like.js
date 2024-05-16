"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Math) {
  (homeArticleItem + infoAction)();
}
const infoAction = () => "../../../article/components/info-action.js";
const homeArticleItem = () => "../../../article/components/home-article-item.js";
const __default__ = { name: "like" };
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
            a: "4b9c065a-0-" + i0,
            b: common_vendor.p({
              info: item.article
            }),
            c: "4b9c065a-1-" + i0,
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
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/content/components/like.vue"]]);
wx.createComponent(Component);
