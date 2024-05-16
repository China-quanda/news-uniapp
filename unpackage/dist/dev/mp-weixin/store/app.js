"use strict";
const common_vendor = require("../common/vendor.js");
const api_app = require("../api/app.js");
const useAppStore = common_vendor.defineStore("appStore", {
  // unistorage: true, // 是否持久化
  unistorage: {
    // true
    key: "appStore",
    // 缓存的键，默认为该 store 的 id，这里是 appStore,
    paths: ["appName", "version", "launchFlag"],
    // 需要缓存的路径，这里设置 appName 和 version 下的 data 会被缓存
    // 初始化恢复前触发
    // beforeRestore(ctx) {},
    // 初始化恢复后触发
    // afterRestore(ctx) {},
    serializer: {
      // 序列化，默认为 JSON.stringify
      serialize(v) {
        return JSON.stringify(v);
      },
      // 反序列化，默认为 JSON.parse
      deserialize(v) {
        return JSON.parse(v);
      }
    }
  },
  state: () => ({
    launchFlag: false,
    systemInfo: common_vendor.index.getSystemInfoSync(),
    appName: "mayaApp",
    // 应用名称
    version: "1.0.0",
    // 应用版本
    logo: "/static/logo.png",
    // 应用logo
    site_url: "http://hnsilian.cn",
    // 官方网站
    homeUrl: "/pages/index/index",
    //首页地址
    request: {
      timeout: 1e4,
      dataType: "json",
      baseUrl: ""
      // 请求基本地址
    },
    // 政策协议
    agreements: [
      {
        title: "隐私政策",
        url: "/pages/privacyAgreement"
      },
      {
        title: "用户服务协议",
        url: "/pages/userAgreement"
      }
    ]
  }),
  getters: {},
  actions: {
    // 检测app是否需要更新版本
    checkUpdate() {
      api_app.getAppVersion(this.systemInfo.appVersion).then((result) => {
        console.log(result);
        if (!result.data.update)
          return;
        common_vendor.index.showModal({
          title: "新版本发布",
          content: "检查到当前有新版本,需要更新吗？",
          confirmText: "立即更新",
          success: (res) => {
            if (res.confirm) {
              common_vendor.index.showLoading({
                title: "正在下载"
              });
              common_vendor.index.downloadFile({
                url: result.data.url,
                success: (downloadResult) => {
                  if (downloadResult.statusCode === 200) {
                    common_vendor.index.showLoading({
                      title: "安装中.."
                    });
                    plus.runtime.install(downloadResult.tempFilePath, {
                      force: true
                    }, function() {
                      console.log("install success...");
                      common_vendor.index.setStorageSync("version", result.data.version);
                      common_vendor.index.hideLoading();
                      plus.runtime.restart();
                    }, function(e) {
                      console.log("e：" + JSON.stringify(e));
                      common_vendor.index.hideLoading();
                      common_vendor.index.showToast({
                        title: "安装失败:" + JSON.stringify(e),
                        duration: 1500
                      });
                    });
                  }
                }
              });
            } else if (res.cancel) {
              this.handleAppOut();
            }
          }
        });
      });
    },
    // 退出APP
    handleAppOut() {
      if (this.systemInfo.platform == "android") {
        plus.runtime.quit();
      } else {
        plus.ios.import("UIApplication").sharedApplication().performSelector("exit");
      }
    },
    /**
    * 获取本地存储中launchFlag的值
    * 若存在，说明不是首次启动，直接进入首页；
    * 若不存在，说明是首次启动，进入引导页；
    */
    loadExecution() {
      let url = this.launchFlag ? "/pages/home/home" : "/pages/common/guide/index";
      common_vendor.index.reLaunch({ url });
    }
  }
});
exports.useAppStore = useAppStore;
