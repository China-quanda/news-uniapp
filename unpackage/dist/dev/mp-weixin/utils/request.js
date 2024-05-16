"use strict";
const common_vendor = require("../common/vendor.js");
const utils_storage = require("./storage.js");
const utils_mixin = require("./mixin.js");
const request = (config) => {
  var _a;
  if (config.data && config.data.Loading || config.params && ((_a = config.params) == null ? void 0 : _a.Loading)) {
    common_vendor.index.showLoading({ title: "加载中" });
    let time = 0;
    var myInterval = setInterval(() => {
      time = time + 1e3;
      if (time >= 6e3)
        common_vendor.index.showLoading({ title: "当前网络较慢" });
    }, 1e3);
  }
  if (config.params) {
    let url = config.url + "?" + utils_mixin.tansParams(config.params);
    url = url.slice(0, -1);
    config.url = url;
  }
  const token = utils_storage.storage.get("userStore") ? utils_storage.storage.get("userStore").token : null;
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      // url: config.baseUrl || 'http://192.168.43.245:7001/api/app' + config.url,
      url: config.baseUrl || "http://127.0.0.1:7001/api/app" + config.url,
      method: config.method || "get",
      timeout: config.timeout || 1e4,
      data: config.data,
      header: {
        Authorization: `Bearer ${token}`,
        ...config.header
      },
      dataType: "json",
      success: (res) => {
        if (res.errMsg != "request:ok") {
          reject("请求失败");
          return common_vendor.index.showToast({ title: res.errMsg, icon: "none", duration: 2e3 });
        }
        if (res.data.code == 200 || res.data.code == 0) {
          resolve(res.data);
        } else if (res.data.code == 400) {
          console.log(res);
          reject("400");
          return common_vendor.index.showToast({ icon: "none", title: res.data.message });
        } else if (res.data.code == 401) {
          reject("401");
          common_vendor.index.showToast({ icon: "none", title: "认证失败,请重新登录" });
          setTimeout(() => {
            common_vendor.index.reLaunch({ url: "/pages/index/login" });
          }, 1500);
        } else if (res.data.code == 403) {
          reject("403");
          return common_vendor.index.showToast({ icon: "none", title: "无权限操作" });
        } else {
          reject(res.data);
          common_vendor.index.showToast({ title: res.data.message, icon: "none", duration: 2e3 });
        }
      },
      fail: (error) => {
        console.log("error", error);
        common_vendor.index.showToast({ title: "请求失败,请稍后再试", icon: "none", duration: 2e3 });
        reject(error);
      },
      complete: (res) => {
        var _a2;
        if (config.data && config.data.Loading || config.params && ((_a2 = config.params) == null ? void 0 : _a2.Loading)) {
          common_vendor.index.hideLoading();
          clearInterval(myInterval);
        }
        if (res.statusCode == "500") {
          reject("服务器开小差了,请稍后再试");
          common_vendor.index.showToast({
            title: "服务器开小差了,请稍后再试",
            icon: "none",
            duration: 2e3
          });
        }
      }
    });
  });
};
exports.request = request;
