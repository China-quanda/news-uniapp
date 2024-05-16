"use strict";
const common_vendor = require("../../../../common/vendor.js");
const utils_router = require("../../../../utils/router.js");
const __default__ = { name: "comment" };
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  setup(__props) {
    let list = common_vendor.ref([]);
    common_vendor.ref(0);
    common_vendor.ref("https://img01.yzcdn.cn/vant/cat.jpeg");
    common_vendor.reactive({
      pageNum: 1,
      pageSize: 10
    });
    common_vendor.onMounted(() => {
    });
    const goToUser = (id) => {
      console.log("id", id);
    };
    const goToArticle = (id) => {
      console.log("id", id);
      utils_router.router.push(`/pages/article/info?articleId=${id}`);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(4, (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => goToUser(1), index),
            b: common_vendor.o(($event) => goToUser(1), index),
            c: common_vendor.o(($event) => goToUser(1), index),
            d: common_vendor.o(($event) => goToArticle(1), index),
            e: common_vendor.o(($event) => goToArticle(1), index),
            f: index
          };
        }),
        b: !common_vendor.unref(list).length
      }, !common_vendor.unref(list).length ? {} : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ba2f5cae"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/content/components/comment.vue"]]);
wx.createComponent(Component);
