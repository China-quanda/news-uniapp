"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const static_images_base64Pic = require("../../static/images/base64Pic.js");
const utils_validate = require("../../utils/validate.js");
const api_verifyCode = require("../../api/verifyCode.js");
const store_user = require("../../store/user.js");
const store_app = require("../../store/app.js");
const utils_router = require("../../utils/router.js");
const utils_prompt = require("../../utils/prompt.js");
if (!Array) {
  const _easycom_my_nav_bar2 = common_vendor.resolveComponent("my-nav-bar");
  _easycom_my_nav_bar2();
}
const _easycom_my_nav_bar = () => "../../components/my-nav-bar/my-nav-bar.js";
if (!Math) {
  _easycom_my_nav_bar();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const appStore = store_app.useAppStore();
    const userStore = store_user.useUserStore();
    let tips = common_vendor.ref("获取验证码");
    let type = common_vendor.ref(1);
    let loading = common_vendor.ref(false);
    let codeLoading = common_vendor.ref(false);
    let time = common_vendor.ref(1e3 * 60);
    let form = common_vendor.reactive({
      account: null,
      password: null,
      code: null
    });
    const handlePrivacy = () => {
      let site = appStore.agreements[0];
      utils_router.router.push(`/pages/common/webview/index?title=${site.title}&url=${site.url}`);
    };
    const handleUserAgrement = () => {
      let site = appStore.agreements[1];
      utils_router.router.push(`/pages/common/webview/index?title=${site.title}&url=${site.url}`);
    };
    const formSubmit = (e) => {
      console.log("form发生了submit事件，携带数据为：" + JSON.stringify(e.detail.value));
      var formdata = e.detail.value;
      common_vendor.index.showModal({
        content: "表单数据内容：" + JSON.stringify(formdata),
        showCancel: false
      });
    };
    const formReset = (e) => {
      console.log("清空数据", e);
    };
    let interval = common_vendor.ref();
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
      if (!utils_validate.isMobile(form.account) && !utils_validate.isEmail(form.account))
        return utils_prompt.prompt.msg("请输入有效的账号");
      utils_prompt.prompt.loading("正在获取验证码");
      codeLoading.value = true;
      api_verifyCode.getVerifyCode({ account: form.account }).then((res) => {
        console.log("res", res);
        utils_prompt.prompt.msg("验证码已发送");
        interval.value = setInterval(() => {
          intervalFn();
        }, 1e3);
      }).catch((e) => {
        codeLoading.value = false;
      }).finally(() => {
        utils_prompt.prompt.hideLoading();
      });
    };
    const oauths = common_vendor.ref([]);
    const initProvider = async () => {
      common_vendor.index.getProvider({
        service: "oauth",
        success(res) {
          console.log("providers", res.providers.length);
          if (!res.providers.length)
            return console.error("没有获取到服务供应商");
          if (res.errMsg !== "getProvider:ok")
            return console.error(res.errMsg);
          oauths.value = res.providers.map((item) => {
            if (item.id === "univerify")
              appUniverifyLogin();
            return providerinfo(item);
          });
          console.log("oauths", oauths.value.length);
        },
        fail: (fail) => {
          console.error("getProvider-fail", fail);
        }
      });
      function providerinfo(item) {
        let platform = "";
        platform = "MP-WEIXIN";
        let info = {
          provider: item.id,
          description: item.description,
          platform,
          icon: "",
          color: ""
        };
        if (item.id === "univerify") {
          info.icon = "icon-shouji";
          info.color = "#000";
        }
        if (item.id === "weixin") {
          info.icon = "icon-weixin";
          info.color = "rgb(74, 221, 51)";
        }
        if (item.id === "qq") {
          info.icon = "icon-qq";
          info.color = "rgb(87, 139, 222)";
        }
        if (item.id === "sinaweibo") {
          info.icon = "icon-xinlangweibo";
          info.color = "rgb(244, 94, 75)";
        }
        if (item.id === "google") {
          info.icon = "icon-guge";
          info.color = "rgb(244, 94, 75)";
        }
        if (item.id === "facebook") {
          info.icon = "icon-facebook";
          info.color = "rgb(244, 94, 75)";
        }
        if (item.id === "apple") {
          info.icon = "icon-xinlangweibo";
          info.color = "#000";
        }
        if (item.id === "github") {
          info.icon = "icon-github";
          info.color = "rgb(10, 24, 54)";
        }
        return info;
      }
    };
    const oauthLogin = (row) => {
      if (row.platform === "WEB") {
        if (row.provider === "github") {
          window.location.href = `https://github.com/login/oauth/authorize?client_id=88f028142403410abfef&redirect_uri=http://127.0.0.1:1024/pages/login/login`;
        }
        if (row.provider === "weixin") {
          window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxea473f283d5e6785&redirect_uri=http://127.0.0.1:1024/pages/login/login&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
        }
      }
      if (row.platform === "MP-WEIXIN") {
        mpWeixinLogin(row.provider);
      }
      if (row.platform === "APP-PLUS") {
        if (row.provider === "univerify") {
          appUniverifyLogin();
        } else {
          appLogin(row.provider);
        }
      }
    };
    const appLogin = (provider) => {
      common_vendor.index.login({
        provider,
        success(res) {
          console.log(`${provider}-login-res`, res);
          common_vendor.index.getUserInfo({
            provider,
            success(info) {
              console.log(`${provider}-getUserInfo-res`, info);
            },
            fail(fail) {
              console.log(`${provider}-getUserInfo-fail`, fail);
              if (fail.errMsg.includes("尚未获取oauth授权"))
                console.log("尚未获取oauth授权");
            }
          });
        },
        fail(fail) {
          console.log(`${provider}-login-fail`, fail);
          if (fail.errMsg.includes("用户取消") || fail.errMsg === "login:fail 用户取消")
            console.log("用户取消登录");
          if (fail.errMsg === "login:fail Authentication failed")
            console.log("用户拒绝登录");
          common_vendor.index.showToast({
            title: "登录失败！",
            icon: "none"
          });
        }
      });
    };
    const appUniverifyLogin = () => {
      common_vendor.index.preLogin({
        provider: "univerify",
        success(res) {
          common_vendor.index.login({
            provider: "univerify",
            univerifyStyle: {
              fullScreen: true,
              // 是否全屏显示，默认值： false
              backgroundColor: "#ffffff",
              // 授权页面背景颜色，默认值：#ffffff
              // backgroundImage: 'static/images/login/login-bg.jpg', // 全屏显示的背景图片，默认值："" （仅支持本地图片，只有全屏显示时支持）
              icon: {
                path: "static/images/login.png",
                // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo
                width: "180px",
                //图标宽度 默认值：60px
                height: "70px"
                //图标高度 默认值：60px
              },
              closeIcon: {
                path: "static/xxx.png"
                // 自定义关闭按钮，仅支持本地图片。 HBuilderX3.3.7+版本支持
              },
              phoneNum: {
                color: "#202020"
                // 手机号文字颜色 默认值：#202020
              },
              slogan: {
                color: "#BBBBBB"
                //  slogan 字体颜色 默认值：#BBBBBB
              },
              authButton: {
                normalColor: "#3479f5",
                // 授权按钮正常状态背景颜色 默认值：#3479f5
                highlightColor: "#2861c5",
                // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）
                disabledColor: "#73aaf5",
                // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）
                textColor: "#ffffff",
                // 授权按钮文字颜色 默认值：#ffffff
                title: "本机号码一键登录",
                // 授权按钮文案 默认值：“本机号码一键登录”
                borderRadius: "24px"
                // 授权按钮圆角 默认值："24px" （按钮高度的一半）
              },
              otherLoginButton: {
                visible: true,
                // 是否显示其他登录按钮，默认值：true
                normalColor: "",
                // 其他登录按钮正常状态背景颜色 默认值：透明
                highlightColor: "",
                // 其他登录按钮按下状态背景颜色 默认值：透明
                textColor: "#656565",
                // 其他登录按钮文字颜色 默认值：#656565
                title: "其他登录方式",
                // 其他登录方式按钮文字 默认值：“其他登录方式”
                borderColor: "",
                //边框颜色 默认值：透明（仅iOS支持）
                borderRadius: "0px"
                // 其他登录按钮圆角 默认值："24px" （按钮高度的一半）
              },
              privacyTerms: {
                defaultCheckBoxState: true,
                // 条款勾选框初始状态 默认值： true
                isCenterHint: false,
                //未勾选服务条款时点击登录按钮的提示是否居中显示 默认值: false (3.7.13+ 版本支持)
                uncheckedImage: "",
                // 可选 条款勾选框未选中状态图片（仅支持本地图片 建议尺寸 24x24px）(3.2.0+ 版本支持)
                checkedImage: "",
                // 可选 条款勾选框选中状态图片（仅支持本地图片 建议尺寸24x24px）(3.2.0+ 版本支持)
                checkBoxSize: 12,
                // 可选 条款勾选框大小
                textColor: "#BBBBBB",
                // 文字颜色 默认值：#BBBBBB
                termsColor: "#5496E3",
                //  协议文字颜色 默认值： #5496E3
                prefix: "我已阅读并同意",
                // 条款前的文案 默认值：“我已阅读并同意”
                suffix: "并使用本机号码登录",
                // 条款后的文案 默认值：“并使用本机号码登录”
                privacyItems: [
                  // 自定义协议条款，最大支持2个，需要同时设置url和title. 否则不生效
                  {
                    url: "https://",
                    // 点击跳转的协议详情页面
                    title: "用户服务协议"
                    // 协议名称
                  }
                ]
              }
              // buttons: {
              // 	// 自定义页面下方按钮仅全屏模式生效（3.1.14+ 版本支持）
              // 	iconWidth: '45px', // 图标宽度（高度等比例缩放） 默认值：45px
              // 	list: [
              // 		{
              // 			provider: 'apple',
              // 			iconPath: '/static/logo.png' // 图标路径仅支持本地图片
              // 		},
              // 		{
              // 			provider: 'weixin',
              // 			iconPath: '/static/logo.png' // 图标路径仅支持本地图片
              // 		},
              // 		{
              // 			provider: 'qq',
              // 			iconPath: '/static/logo.png' // 图标路径仅支持本地图片
              // 		}
              // 	]
              // }
            },
            success(res2) {
              console.log("login - res", res2);
              console.log(res2.authResult);
              common_vendor.index.closeAuthView();
            },
            fail(fail) {
              console.log("login fail", fail);
              if (fail.code === 30002)
                console.log("用户点击了其他登录方式");
              if (fail.code === 30003)
                console.log("用户关闭验证界面");
              if (fail.code === "30008") {
                return console.log("用户点击了自定义按钮", fail.code, fail.provider);
              }
            }
          });
        },
        fail(fail) {
          console.log("preLogin fail", fail);
          let errMsg = "预登录失败,设备不支持/未开启数据流量/其他原因!";
          if (fail.code === 30005) {
            if (fail.errMsg.includes("无SIM卡"))
              errMsg = "预登录失败,无SIM卡!";
            common_vendor.index.showToast({
              title: errMsg,
              icon: "none",
              duration: "1500"
            });
          }
        }
      });
    };
    const mpWeixinLogin = (provider) => {
      common_vendor.index.login({
        provider,
        success({ code }) {
          console.log(`${provider}-login-res.code`, code);
        },
        fail(fail) {
          console.log(`${provider}-login-fail`, fail);
          common_vendor.index.showToast({
            title: "登录失败！",
            icon: "none"
          });
        }
      });
    };
    common_vendor.onLoad((params) => {
      initProvider();
      console.log("params", params);
    });
    const submit = (type2) => {
      if (type2 == 1)
        localLogin();
      if (type2 == 2)
        smsLogin();
      if (type2 == 3)
        resetPassword();
    };
    const localLogin = () => {
      if (!utils_validate.isMobile(form.account) && !utils_validate.isEmail(form.account))
        return utils_prompt.prompt.msg("请输入有效的账号");
      if (!form.password)
        return utils_prompt.prompt.msg("请输入新密码");
      loading.value = true;
      userStore.localLogin(form).then(() => {
        userStore.getUserInfo().then(() => {
          utils_router.router.back();
        });
      }).finally(() => {
        loading.value = false;
      });
    };
    const smsLogin = () => {
      if (!utils_validate.isMobile(form.account) && !utils_validate.isEmail(form.account))
        return utils_prompt.prompt.msg("请输入有效的账号");
      if (!form.code)
        return utils_prompt.prompt.msg("请输入验证码");
      loading.value = true;
      userStore.smsLogin(form).then(() => {
        userStore.getUserInfo().then(() => {
          utils_router.router.back();
        });
      }).finally(() => {
        loading.value = false;
      });
    };
    const resetPassword = () => {
      if (!utils_validate.isMobile(form.account) && !utils_validate.isEmail(form.account))
        return utils_prompt.prompt.msg("请输入有效的账号");
      if (!form.code)
        return utils_prompt.prompt.msg("请输入验证码");
      if (!form.password)
        return utils_prompt.prompt.msg("请输入新密码");
      loading.value = true;
      userStore.smsUpdatePassword(form).then(() => {
        utils_prompt.prompt.msg("重置密码成功,正在为您登录中...");
        setTimeout(() => {
          userStore.getUserInfo().then(() => {
            type.value = 1;
            utils_router.router.back();
          });
        }, 1500);
      }).finally(() => {
        loading.value = false;
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => common_vendor.unref(utils_router.router).back()),
        b: common_vendor.p({
          bgColor: "transparent",
          leftIcon: "icon-cha"
        }),
        c: common_assets._imports_0$2,
        d: common_vendor.unref(type) == 1
      }, common_vendor.unref(type) == 1 ? {
        e: common_vendor.o(($event) => common_vendor.isRef(type) ? type.value = 2 : type = 2)
      } : {}, {
        f: common_vendor.unref(type) == 2
      }, common_vendor.unref(type) == 2 ? {
        g: common_vendor.o(($event) => common_vendor.isRef(type) ? type.value = 1 : type = 1)
      } : {}, {
        h: common_vendor.unref(type) == 3
      }, common_vendor.unref(type) == 3 ? {
        i: common_vendor.o(($event) => common_vendor.isRef(type) ? type.value = 1 : type = 1)
      } : {}, {
        j: common_vendor.unref(type) == 1
      }, common_vendor.unref(type) == 1 ? {
        k: common_vendor.unref(form).account,
        l: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(form).account = $event.detail.value, {
          trim: true
        })),
        m: common_vendor.unref(form).password,
        n: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(form).password = $event.detail.value, {
          trim: true
        }))
      } : {}, {
        o: common_vendor.unref(type) == 2
      }, common_vendor.unref(type) == 2 ? {
        p: common_vendor.unref(form).account,
        q: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(form).account = $event.detail.value, {
          trim: true
        })),
        r: common_vendor.unref(form).code,
        s: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(form).code = $event.detail.value, {
          trim: true
        })),
        t: common_vendor.t(common_vendor.unref(tips)),
        v: common_vendor.unref(codeLoading) ? 1 : "",
        w: common_vendor.o(getCode)
      } : {}, {
        x: common_vendor.unref(type) == 3
      }, common_vendor.unref(type) == 3 ? {
        y: common_vendor.unref(form).account,
        z: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(form).account = $event.detail.value, {
          trim: true
        })),
        A: common_vendor.unref(form).code,
        B: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(form).code = $event.detail.value, {
          trim: true
        })),
        C: common_vendor.t(common_vendor.unref(tips)),
        D: common_vendor.unref(codeLoading) ? 1 : "",
        E: common_vendor.o(getCode),
        F: common_vendor.unref(form).password,
        G: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(form).password = $event.detail.value, {
          trim: true
        }))
      } : {}, {
        H: common_vendor.o(formSubmit),
        I: common_vendor.o(formReset),
        J: common_vendor.unref(type) != 3
      }, common_vendor.unref(type) != 3 ? {
        K: common_vendor.t(!common_vendor.unref(loading) ? "登 录" : "登录中...")
      } : {}, {
        L: common_vendor.unref(type) == 3
      }, common_vendor.unref(type) == 3 ? {
        M: common_vendor.t(!common_vendor.unref(loading) ? "重设密码" : "重设密码中...")
      } : {}, {
        N: common_vendor.unref(loading) ? 1 : "",
        O: common_vendor.o(($event) => submit(common_vendor.unref(type))),
        P: common_vendor.unref(type) != 3
      }, common_vendor.unref(type) != 3 ? {
        Q: common_vendor.o(($event) => common_vendor.isRef(type) ? type.value = 3 : type = 3)
      } : {}, {
        R: common_vendor.unref(type) == 3
      }, common_vendor.unref(type) == 3 ? {
        S: common_vendor.o(($event) => common_vendor.isRef(type) ? type.value = 1 : type = 1)
      } : {}, {
        T: common_vendor.unref(type) != 3
      }, common_vendor.unref(type) != 3 ? {} : {}, {
        U: common_vendor.unref(type) != 3
      }, common_vendor.unref(type) != 3 ? {
        V: common_vendor.f(common_vendor.unref(oauths), (item, k0, i0) => {
          return {
            a: item.icon,
            b: common_vendor.n(item.icon),
            c: item.color,
            d: item.color,
            e: common_vendor.o(($event) => oauthLogin(item), item.icon)
          };
        })
      } : {}, {
        W: common_vendor.unref(type) != 3
      }, common_vendor.unref(type) != 3 ? {
        X: common_vendor.o(handleUserAgrement),
        Y: common_vendor.o(handlePrivacy)
      } : {}, {
        Z: `url(${common_vendor.unref(static_images_base64Pic.login).background})`
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
