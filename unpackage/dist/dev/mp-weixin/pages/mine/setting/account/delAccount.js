"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../../../node-modules/@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "delAccount",
  setup(__props) {
    let tips = common_vendor.ref("获取验证码");
    let time = common_vendor.ref(6e4);
    common_vendor.ref("");
    let status = common_vendor.ref(1);
    let codeLoading = common_vendor.ref(false);
    common_vendor.reactive({});
    let form = common_vendor.reactive({
      account: null,
      code: null
    });
    const toCode = () => {
      status.value = 2;
    };
    let interval = common_vendor.ref(null);
    let intervalFn = () => {
      if (time.value == 1e3) {
        clearInterval(interval.value);
        codeLoading.value = false;
        tips.value = `获取验证码`;
        time.value = 6e4;
        return;
      }
      time.value = time.value - 1e3;
      tips.value = `${time.value / 1e3}s 后再获取`;
    };
    const getCode = () => {
      if (!isMobile(form.account) && !isEmail(form.account))
        return prompt.msg("请输入有效的账号");
      prompt.loading("正在获取验证码");
      codeLoading.value = true;
      getVerifyCode({ account: form.account }).then((res) => {
        console.log("res", res);
        prompt.msg("验证码已发送");
        status.value = 2;
        interval.value = setInterval(() => {
          intervalFn();
        }, 1e3);
      }).catch((e) => {
        codeLoading.value = false;
      }).finally(() => {
        prompt.hideLoading();
      });
    };
    const verifyCode = () => {
      status.value = 3;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(status) == 1
      }, common_vendor.unref(status) == 1 ? {
        b: common_vendor.o(toCode)
      } : common_vendor.unref(status) == 2 ? {
        d: common_vendor.o(($event) => common_vendor.unref(form).code = $event),
        e: common_vendor.p({
          type: "number",
          placeholder: "请输入验证码",
          trim: true,
          modelValue: common_vendor.unref(form).code
        }),
        f: common_vendor.t(common_vendor.unref(tips)),
        g: common_vendor.unref(codeLoading),
        h: common_vendor.o(getCode),
        i: common_vendor.o(verifyCode)
      } : {}, {
        c: common_vendor.unref(status) == 2
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-be033e5c"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/setting/account/delAccount.vue"]]);
wx.createPage(MiniProgramPage);
