"use strict";
const common_vendor = require("../../../../common/vendor.js");
const api_articleCollect = require("../../../../api/articleCollect.js");
if (!Math) {
  (homeArticleItem + infoAction)();
}
const homeArticleItem = () => "../../../article/components/home-article-item.js";
const infoAction = () => "../../../article/components/info-action.js";
const __default__ = { name: "collect" };
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  setup(__props) {
    const list = common_vendor.ref([]);
    let query = common_vendor.reactive({
      pageNum: 1,
      pageSize: 10,
      total: 0
    });
    const loadUserCollectList = async (pageNum = 1) => {
      const result = await api_articleCollect.getUserCollectList(query);
      list.value = pageNum > 1 ? list.value.concat(result.data.list) : result.data.list;
      query.pageNum = result.data.pagination;
      query.pageSize = result.data.pageSize;
      query.total = result.data.total;
    };
    common_vendor.onMounted(() => {
      loadUserCollectList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(4, (item, index, i0) => {
          return {
            a: "75c663c4-0-" + i0,
            b: "75c663c4-1-" + i0,
            c: common_vendor.p({
              info: item.article
            }),
            d: index
          };
        }),
        b: common_vendor.p({
          type: 1,
          isGzUser: true
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/content/components/collect.vue"]]);
wx.createComponent(Component);
