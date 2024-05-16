"use strict";
const common_vendor = require("../../../../common/vendor.js");
const utils_prompt = require("../../../../utils/prompt.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../../../node-modules/@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "replace",
  setup(__props) {
    common_vendor.onLoad((o) => {
      title.value = `${o.title}`;
      common_vendor.index.setNavigationBarTitle({
        title: `更换${o.title}`
      });
    });
    let tips = common_vendor.ref("获取验证码");
    let time = common_vendor.ref(6e4);
    let title = common_vendor.ref("");
    let status = common_vendor.ref(1);
    let codeLoading = common_vendor.ref(false);
    common_vendor.reactive({});
    let form = common_vendor.reactive({
      account: null,
      code: null
    });
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
        return utils_prompt.prompt.msg("请输入有效的账号");
      utils_prompt.prompt.loading("正在获取验证码");
      codeLoading.value = true;
      getVerifyCode({ account: form.account }).then((res) => {
        console.log("res", res);
        utils_prompt.prompt.msg("验证码已发送");
        status.value = 2;
        interval.value = setInterval(() => {
          intervalFn();
        }, 1e3);
      }).catch((e) => {
        codeLoading.value = false;
      }).finally(() => {
        utils_prompt.prompt.hideLoading();
      });
    };
    const verifyCode = () => {
      status.value = 3;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(status) == 1
      }, common_vendor.unref(status) == 1 ? {
        b: common_vendor.t(common_vendor.unref(title)),
        c: common_vendor.o(($event) => common_vendor.unref(form).account = $event),
        d: common_vendor.p({
          type: "text",
          placeholder: `请输入原${common_vendor.unref(title)}`,
          trim: true,
          modelValue: common_vendor.unref(form).account
        }),
        e: common_vendor.o(getCode),
        f: common_vendor.t(common_vendor.unref(title))
      } : common_vendor.unref(status) == 2 ? {
        h: common_vendor.o(($event) => common_vendor.unref(form).code = $event),
        i: common_vendor.p({
          type: "number",
          placeholder: "请输入验证码",
          trim: true,
          modelValue: common_vendor.unref(form).code
        }),
        j: common_vendor.t(common_vendor.unref(tips)),
        k: common_vendor.unref(codeLoading),
        l: common_vendor.o(getCode),
        m: common_vendor.o(verifyCode)
      } : common_vendor.unref(status) == 3 ? {
        o: common_vendor.t(common_vendor.unref(title)),
        p: common_vendor.o(($event) => common_vendor.unref(form).account = $event),
        q: common_vendor.p({
          type: "text",
          placeholder: `请输入${common_vendor.unref(title)}`,
          trim: true,
          modelValue: common_vendor.unref(form).account
        }),
        r: common_vendor.o(getCode)
      } : common_vendor.unref(status) == 4 ? {
        t: common_vendor.o(($event) => common_vendor.unref(form).code = $event),
        v: common_vendor.p({
          type: "number",
          placeholder: "请输入验证码",
          trim: true,
          modelValue: common_vendor.unref(form).code
        }),
        w: common_vendor.t(common_vendor.unref(tips)),
        x: common_vendor.unref(codeLoading),
        y: common_vendor.o(getCode),
        z: common_vendor.o(($event) => common_vendor.unref(form).account = $event),
        A: common_vendor.p({
          type: "text",
          placeholder: `请输入${common_vendor.unref(title)}`,
          trim: true,
          modelValue: common_vendor.unref(form).account
        }),
        B: common_vendor.o(verifyCode)
      } : {}, {
        g: common_vendor.unref(status) == 2,
        n: common_vendor.unref(status) == 3,
        s: common_vendor.unref(status) == 4
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4304dd3b"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/setting/account/replace.vue"]]);
wx.createPage(MiniProgramPage);
