"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "security-lock",
  setup(__props) {
    let title = common_vendor.ref("");
    let type = common_vendor.ref("");
    common_vendor.onLoad((o) => {
      type.value = o.type;
      title.value = o.title;
      common_vendor.index.setNavigationBarTitle({
        title: title.value
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.n(common_vendor.unref(type) === "lock" ? "icon-jiesuo" : "icon-suoding"),
        b: common_vendor.t(common_vendor.unref(type) === "lock" ? "开启锁定保护" : "解除锁定保护"),
        c: common_vendor.unref(type) === "lock"
      }, common_vendor.unref(type) === "lock" ? {} : {}, {
        d: common_vendor.unref(type) === "unlock"
      }, common_vendor.unref(type) === "unlock" ? {} : {}, {
        e: common_vendor.t(common_vendor.unref(type) === "lock" ? "开启锁定保护" : "解除锁定保护")
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-720387f8"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/setting/account/security/security-lock.vue"]]);
wx.createPage(MiniProgramPage);
