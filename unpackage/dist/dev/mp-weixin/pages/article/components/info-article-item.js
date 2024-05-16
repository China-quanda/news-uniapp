"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "info-article-item",
  setup(__props) {
    const isPic = common_vendor.ref(true);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isPic)
      }, common_vendor.unref(isPic) ? {} : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c45bd66a"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/article/components/info-article-item.vue"]]);
wx.createComponent(Component);
