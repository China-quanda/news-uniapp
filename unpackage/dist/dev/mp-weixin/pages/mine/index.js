"use strict";
const common_vendor = require("../../common/vendor.js");
const store_user = require("../../store/user.js");
const utils_storage = require("../../utils/storage.js");
const utils_router = require("../../utils/router.js");
const utils_prompt = require("../../utils/prompt.js");
const api_user = require("../../api/user.js");
if (!Array) {
  const _easycom_my_nav_bar2 = common_vendor.resolveComponent("my-nav-bar");
  _easycom_my_nav_bar2();
}
const _easycom_my_nav_bar = () => "../../components/my-nav-bar/my-nav-bar.js";
if (!Math) {
  _easycom_my_nav_bar();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userStore = store_user.useUserStore();
    common_vendor.onLoad(() => {
    });
    let userInfo = common_vendor.reactive({});
    common_vendor.ref(0);
    common_vendor.ref([]);
    common_vendor.reactive({
      pageNum: 1,
      pageSize: 10
    });
    common_vendor.ref([{ name: "全部" }, { name: "文章" }, { name: "视频" }, { name: "问答" }, { name: "小视频" }, { name: "微头条" }]);
    let twoGridList = common_vendor.ref([
      {
        icon: "icon-pinglun",
        text: "评论",
        url: "/pages/mine/content/index",
        type: "comment"
      },
      {
        icon: "icon-shoucang",
        text: "收藏",
        url: "/pages/mine/content/index",
        type: "collect"
      },
      {
        icon: "icon-xiazai",
        text: "下载",
        url: "./download/index"
      },
      {
        icon: "icon-lishi",
        text: "历史",
        url: "/pages/mine/content/index",
        type: "history"
      },
      {
        icon: "icon-xiaoxi",
        text: "消息",
        url: "./message/index"
      },
      {
        icon: "icon-dianzan",
        text: "点赞",
        url: "/pages/mine/content/index",
        type: "like"
      },
      {
        icon: "icon-jubao",
        text: "举报",
        url: "/pages/mine/content/index",
        type: "report"
      },
      {
        icon: "icon-quanbu",
        text: "全部",
        url: "./allService"
      }
    ]);
    const tapScan = () => {
      console.log("tapScan");
      if (!utils_storage.storage.get("token"))
        return utils_prompt.prompt.msg("请登录后再扫码！");
      common_vendor.index.scanCode({
        success: (res) => {
          console.log("条码类型：" + res.scanType);
          console.log("条码内容：" + res.result);
          let result = JSON.parse(res.result);
          if (result.type == "login") {
            api_user.qrScannedLogin({ qrcodeId: result.qrcodeId }).then((qrRes) => {
              console.log(qrRes);
              utils_storage.storage.set("qrCode", { ...result, ...qrRes });
              utils_router.router.push({ url: "/pages/login/confirmLogin" });
            }).catch((err) => {
              console.log(err);
            });
          }
        }
      });
    };
    let goToPublish = () => {
      utils_prompt.prompt.msg("请先登录");
    };
    let toLogin = () => {
      utils_router.router.push("/pages/login/login");
    };
    const tapItem = (row) => {
      console.log(row);
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
      var _a, _b, _c, _d, _e;
      return common_vendor.e({
        a: common_vendor.unref(userStore).token
      }, common_vendor.unref(userStore).token ? {
        b: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(goToPublish) && common_vendor.unref(goToPublish)(...args)
        )
      } : {}, {
        c: common_vendor.o(($event) => common_vendor.unref(utils_router.router).push("/pages/mine/setting/index")),
        d: common_vendor.unref(userStore).token ? "60px" : "",
        e: common_vendor.o(tapScan),
        f: common_vendor.p({
          ["bg-color"]: "transparent"
        }),
        g: common_vendor.unref(userStore).token
      }, common_vendor.unref(userStore).token ? {
        h: common_vendor.unref(userStore).avatar,
        i: common_vendor.t(common_vendor.unref(userStore).username || "你的maya"),
        j: common_vendor.t(((_a = common_vendor.unref(userInfo)) == null ? void 0 : _a.myFocus) || 0),
        k: common_vendor.t(((_b = common_vendor.unref(userInfo)) == null ? void 0 : _b.myFans) || 0),
        l: common_vendor.t(((_c = common_vendor.unref(userInfo)) == null ? void 0 : _c.praise) || 0),
        m: common_vendor.t(((_d = common_vendor.unref(userInfo)) == null ? void 0 : _d.introduce) || "它很懒，什么都没介绍。"),
        n: common_vendor.t(((_e = common_vendor.unref(userInfo)) == null ? void 0 : _e.city) || "未知"),
        o: common_vendor.o(($event) => common_vendor.unref(utils_prompt.prompt).msg("暂时未开发此功能")),
        p: common_vendor.o(($event) => common_vendor.unref(utils_router.router).push("/pages/mine/setting/profile/index")),
        q: common_vendor.o(($event) => common_vendor.unref(utils_prompt.prompt).msg("暂时未开发此功能"))
      } : {
        r: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(toLogin) && common_vendor.unref(toLogin)(...args)
        )
      }, {
        s: common_vendor.f(common_vendor.unref(twoGridList), (item, index, i0) => {
          return {
            a: common_vendor.n(item.icon),
            b: common_vendor.t(item.text),
            c: index,
            d: common_vendor.o(($event) => tapItem(item), index)
          };
        }),
        t: !common_vendor.unref(userStore).token
      }, !common_vendor.unref(userStore).token ? common_vendor.e({
        v: common_vendor.unref(userStore).token
      }, common_vendor.unref(userStore).token ? {
        w: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(goToPublish) && common_vendor.unref(goToPublish)(...args)
        )
      } : {
        x: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(toLogin) && common_vendor.unref(toLogin)(...args)
        )
      }) : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-569e925a"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/index.vue"]]);
wx.createPage(MiniProgramPage);
