"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "pay",
  setup(__props) {
    const wechatPay = () => {
      console.log("pay");
      common_vendor.index.login({
        provider: "weixin",
        success({ code }) {
          common_vendor.index.request({
            url: "http://192.168.0.107:7001/api/weChatMp/login",
            method: "POST",
            data: { code },
            success(lres) {
              const openId = lres.data.data.openId;
              console.log("lres - openId", openId);
              common_vendor.index.request({
                url: "http://192.168.0.107:7001/api/weChatMp/order",
                method: "POST",
                data: { openId },
                success(ores) {
                  console.log("ores", ores.data);
                  common_vendor.index.requestPayment({
                    provider: "wxpay",
                    orderInfo: ores.data,
                    timeStamp: ores.data.timeStamp,
                    nonceStr: ores.data.nonceStr,
                    package: ores.data.package,
                    signType: ores.data.signType,
                    paySign: ores.data.paySign,
                    success(payres) {
                      console.log("payres", payres);
                      common_vendor.index.showModal({
                        title: "支付成功",
                        content: "支付成功",
                        showCancel: false,
                        success() {
                          common_vendor.index.navigateBack();
                        }
                      });
                    },
                    fail(parerr) {
                      console.log("parerr", parerr, JSON.stringify(parerr));
                    }
                  });
                },
                fail(oerr) {
                  console.log("lerr", oerr);
                }
              });
            },
            fail(lerr) {
              console.log("lerr", lerr);
            }
          });
        },
        fail(loginErr) {
          console.log("loginErr", loginErr);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(wechatPay)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/pay/pay.vue"]]);
wx.createPage(MiniProgramPage);
