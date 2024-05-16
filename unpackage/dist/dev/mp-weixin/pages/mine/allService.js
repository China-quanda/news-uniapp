"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_router = require("../../utils/router.js");
const utils_prompt = require("../../utils/prompt.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "allService",
  setup(__props) {
    let serviceList = common_vendor.ref([
      {
        title: "精选工具",
        data: [
          {
            text: "下载管理",
            icon: "icon-xiazai",
            url: "/pages/mine/download/index",
            type: "download"
          },
          { text: "客服中心", icon: "icon-kefu" },
          { text: "大字模式", icon: "icon-zitifangda" },
          { text: "夜间模式", icon: "icon-yejian" },
          { text: "消息", icon: "icon-xiaoxi" }
        ]
      },
      {
        title: "创作中心",
        data: [
          { text: "创作首页", icon: "icon-chuangzuo" },
          { text: "数据助手", icon: "icon-shujukanban" },
          { text: "收益提现", icon: "icon-licaishouyi" },
          { text: "活动广场", icon: "icon-huodong" }
        ]
      },
      {
        title: "我的内容",
        data: [
          {
            text: "浏览历史",
            icon: "icon-lishi",
            url: "/pages/mine/content/index",
            type: "history"
          },
          {
            text: "评论",
            icon: "icon-pinglun",
            url: "/pages/mine/content/index",
            type: "comment"
          },
          {
            text: "点赞",
            icon: "icon-dianzan",
            url: "/pages/mine/content/index",
            type: "like"
          },
          {
            text: "收藏",
            icon: "icon-shoucang",
            url: "/pages/mine/content/index",
            type: "collect"
          },
          {
            icon: "icon-jubao",
            text: "举报",
            url: "/pages/mine/content/index",
            type: "report"
          }
        ]
      },
      {
        title: "我的服务",
        data: [
          { text: "钱包", icon: "icon-xiazai" },
          { text: "借钱", icon: "icon-pinglun" },
          { text: "免流量", icon: "icon-dianzan" },
          { text: "我的订单", icon: "icon-shoucang" },
          { text: "优惠券", icon: "icon-shoucang" },
          { text: "地址管理", icon: "icon-shoucang" },
          { text: "任务", icon: "icon-shoucang" }
        ]
      }
    ]);
    const tapItem = (row) => {
      if (row.url) {
        if (row.type) {
          utils_router.router.push(`${row.url}?type=${row.type}`);
        } else {
          utils_router.router.push(`${row.url}`);
        }
      } else {
        return utils_prompt.prompt.msg(`${row.text} 功能未实现`);
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(serviceList), (service, k0, i0) => {
          return {
            a: common_vendor.t(service.title),
            b: common_vendor.f(service.data, (item, index, i1) => {
              return {
                a: common_vendor.n(item.icon),
                b: common_vendor.t(item.text),
                c: index,
                d: common_vendor.o(($event) => tapItem(item), index)
              };
            }),
            c: service.title
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ca6f6c41"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/allService.vue"]]);
wx.createPage(MiniProgramPage);
