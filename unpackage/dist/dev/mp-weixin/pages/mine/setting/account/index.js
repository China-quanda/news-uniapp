"use strict";
const common_vendor = require("../../../../common/vendor.js");
const utils_prompt = require("../../../../utils/prompt.js");
const utils_router = require("../../../../utils/router.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const tapPhone = () => {
      let content = "更换已绑定的手机号码 当前绑定的手机号码为：186****8151";
      utils_prompt.prompt.confirm({
        content,
        confirmText: "更换"
      }).then(() => {
        utils_router.router.push("replace?title=手机号");
      }).catch(() => {
      });
    };
    const tapEmail = () => {
      let content = "更换已绑定的邮箱 当前绑定的邮箱为：186****8151@qq.com";
      utils_prompt.prompt.confirm({
        content,
        confirmText: "更换"
      }).then(() => {
        utils_router.router.push("replace?title=邮箱");
      }).catch(() => {
      });
    };
    const tapPassword = () => {
      let content = "修改登录密码 讲给手机：186****8151发送验证码";
      utils_prompt.prompt.confirm({
        content,
        confirmText: "确认"
      }).then(() => {
        utils_router.router.push("replace?title=登录密码");
      }).catch(() => {
      });
    };
    let weixinStatus = common_vendor.ref(false);
    let qqStatus = common_vendor.ref(false);
    let userInfo = common_vendor.reactive({});
    return (_ctx, _cache) => {
      var _a, _b;
      return {
        a: common_vendor.o(tapPhone),
        b: common_vendor.t(((_a = common_vendor.unref(userInfo)) == null ? void 0 : _a.email) ? (_b = common_vendor.unref(userInfo)) == null ? void 0 : _b.email : "去绑定"),
        c: common_vendor.o(tapEmail),
        d: common_vendor.o(tapPassword),
        e: common_vendor.unref(weixinStatus),
        f: common_vendor.unref(qqStatus),
        g: common_vendor.unref(qqStatus),
        h: common_vendor.o(($event) => common_vendor.unref(utils_router.router).push("delAccount")),
        i: common_vendor.o(($event) => common_vendor.unref(utils_router.router).push("./device/login-device")),
        j: common_vendor.o(($event) => common_vendor.unref(utils_router.router).push("./security/index"))
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-81008e1e"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/setting/account/index.vue"]]);
wx.createPage(MiniProgramPage);
