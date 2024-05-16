"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_app = require("../../store/app.js");
const utils_storage = require("../../utils/storage.js");
const api_user = require("../../api/user.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "confirmLogin",
  setup(__props) {
    const { appName } = store_app.useAppStore();
    let loading = common_vendor.ref(false);
    let status = common_vendor.ref(0);
    let loginText = common_vendor.computed(() => {
      return loading.value ? "授权登录中...." : "授权登录";
    });
    let qrCode = utils_storage.storage.get("qrCode");
    let login = () => {
      if (loading.value)
        return;
      loading.value = true;
      api_user.qrConfirmLogin({ qrcodeId: qrCode.qrcodeId }).then((res) => {
        console.log(res);
        status.value = res.data.status;
      }).finally(() => {
        loading.value = false;
      });
    };
    let cancel = () => {
      if (status.value === 3)
        return;
      api_user.qrCancelLogin({ qrcodeId: qrCode.qrcodeId }).then((res) => {
        console.log(res);
      }).finally(() => {
      });
    };
    common_vendor.onUnload(() => {
      cancel();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$3,
        b: common_vendor.t(common_vendor.unref(appName)),
        c: common_vendor.unref(loading)
      }, common_vendor.unref(loading) ? {} : {}, {
        d: common_vendor.t(common_vendor.unref(loginText)),
        e: common_vendor.unref(loading) ? 1 : "",
        f: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(login) && common_vendor.unref(login)(...args)
        ),
        g: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(cancel) && common_vendor.unref(cancel)(...args)
        )
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7aef36b4"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/login/confirmLogin.vue"]]);
wx.createPage(MiniProgramPage);
