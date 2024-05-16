"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "report",
  setup(__props) {
    let list = common_vendor.ref([
      {
        article: {
          title: "title"
        },
        status: 1,
        type: 1,
        remark: "remark",
        createTime: "createTime"
      }
    ]);
    common_vendor.reactive({
      pageNum: 1,
      pageSize: 10,
      total: 0
    });
    const typeDict = (val) => {
      const map = {
        0: "其他问题",
        1: "标题夸张",
        2: "低俗色情",
        3: "错别字多",
        4: "旧闻重复",
        5: "广告软文",
        6: "内容不实",
        7: "涉嫌违法犯罪",
        8: "侵权"
      };
      return map[val] || "未知";
    };
    const statusDict = (val) => {
      const map = {
        0: "审核失败",
        1: "审核中",
        2: "审核完成,内容未违规",
        3: "审核完成,内容违规已删除该文章"
      };
      return map[val] || "未知";
    };
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(list), (item, index, i0) => {
          return {
            a: common_vendor.t(item.article.title),
            b: common_vendor.t(statusDict(item.status)),
            c: common_vendor.t(item.remark),
            d: common_vendor.t(item.createTime),
            e: common_vendor.t(typeDict(item.type)),
            f: index
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6d0a3e75"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/content/components/report.vue"]]);
wx.createComponent(Component);
