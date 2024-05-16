"use strict";
const common_vendor = require("../../../common/vendor.js");
const __default__ = { name: "search-hot" };
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  emits: ["onClick"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.list, (item, index, i0) => {
          return {
            a: common_vendor.t(item.keywords),
            b: index,
            c: common_vendor.o(($event) => emit("onClick", item), index)
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-42fcbe26"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/search/components/search-hot.vue"]]);
wx.createComponent(Component);
