"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "search-advice",
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    },
    keyword: {
      type: String,
      default: ""
    }
  },
  emits: ["onClick"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const highlight = (str) => {
      return str;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.list, (advice, index, i0) => {
          return {
            a: highlight(advice),
            b: index,
            c: common_vendor.o(($event) => emit("onClick", advice), index)
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f40c3399"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/search/components/search-advice.vue"]]);
wx.createComponent(Component);
