"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_search = require("../../../api/search.js");
const __default__ = { name: "search-history" };
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  emits: ["onClick", "onRefresh"],
  setup(__props, { emit: __emit }) {
    const isDel = common_vendor.ref(false);
    const emit = __emit;
    const delAll = async () => {
      await api_search.destroyUserAllSearchHistory();
      emit("onRefresh");
      isDel.value = false;
    };
    const delItem = async (row) => {
      await api_search.destroyUserOneSearchHistory(row.id);
      emit("onRefresh");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isDel.value
      }, isDel.value ? {
        b: common_vendor.o(delAll),
        c: common_vendor.o(($event) => isDel.value = false)
      } : {
        d: common_vendor.o(($event) => isDel.value = true)
      }, {
        e: common_vendor.f(__props.list, (item, index, i0) => {
          return {
            a: common_vendor.t(item.keywords),
            b: common_vendor.o(($event) => emit("onClick", item), index),
            c: common_vendor.o(($event) => delItem(item), index),
            d: index
          };
        }),
        f: isDel.value
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6e7c64aa"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/search/components/search-history.vue"]]);
wx.createComponent(Component);
