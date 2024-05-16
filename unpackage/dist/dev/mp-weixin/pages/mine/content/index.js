"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_router = require("../../../utils/router.js");
const utils_prompt = require("../../../utils/prompt.js");
if (!Array) {
  const _easycom_my_nav_bar2 = common_vendor.resolveComponent("my-nav-bar");
  _easycom_my_nav_bar2();
}
const _easycom_my_nav_bar = () => "../../../components/my-nav-bar/my-nav-bar.js";
if (!Math) {
  (_easycom_my_nav_bar + collect + comment + history + like + report)();
}
const collect = () => "./components/collect.js";
const comment = () => "./components/comment.js";
const like = () => "./components/like.js";
const history = () => "./components/history.js";
const report = () => "./components/report.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.onLoad((query) => {
      if (query.type)
        type.value = query.type;
    });
    let type = common_vendor.ref("");
    let tabsList = common_vendor.reactive([{ name: "收藏" }, { name: "评论" }, { name: "历史" }, { name: "点赞" }, { name: "举报" }, { name: "推送" }, { name: "预约" }]);
    const clickTabs = (item) => {
      if (item.name == "收藏") {
        type.value = "collect";
      } else if (item.name == "评论") {
        type.value = "comment";
      } else if (item.name == "历史") {
        type.value = "history";
      } else if (item.name == "点赞") {
        type.value = "like";
      } else if (item.name == "举报") {
        type.value = "report";
      } else if (item.name == "推送") {
        utils_prompt.prompt.msg("推送 功能未开发");
      } else if (item.name == "预约") {
        utils_prompt.prompt.msg("预约 功能未开发");
      }
    };
    const search = () => {
      console.log("点击搜索");
      utils_router.router.push("/pages/search/index");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(search),
        b: common_vendor.t("管理"),
        c: common_vendor.o(($event) => common_vendor.unref(utils_router.router).back()),
        d: common_vendor.p({
          title: "我的内容",
          leftWidth: "30px",
          rightWidth: "50px",
          fixed: true
        }),
        e: common_vendor.f(common_vendor.unref(tabsList), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item.name,
            c: common_vendor.o(($event) => clickTabs(item), item.name)
          };
        }),
        f: common_vendor.unref(type) === "collect"
      }, common_vendor.unref(type) === "collect" ? {} : common_vendor.unref(type) === "comment" ? {} : common_vendor.unref(type) === "history" ? {} : common_vendor.unref(type) === "like" ? {} : common_vendor.unref(type) === "report" ? {} : {}, {
        g: common_vendor.unref(type) === "comment",
        h: common_vendor.unref(type) === "history",
        i: common_vendor.unref(type) === "like",
        j: common_vendor.unref(type) === "report"
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f37139f"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/content/index.vue"]]);
wx.createPage(MiniProgramPage);
