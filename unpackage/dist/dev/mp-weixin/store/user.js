"use strict";
const common_vendor = require("../common/vendor.js");
const api_user = require("../api/user.js");
const useUserStore = common_vendor.defineStore("userStore", {
  unistorage: {
    key: "userStore",
    // paths: ['appName', 'version'], 
    serializer: {
      serialize(v) {
        return JSON.stringify(v);
      },
      deserialize(v) {
        return JSON.parse(v);
      }
    }
  },
  state: () => ({
    username: "",
    token: "",
    avatar: "",
    userInfo: {},
    roles: [],
    menus: [],
    permissions: []
  }),
  getters: {},
  actions: {
    getUserInfo() {
      return new Promise((resolve, reject) => {
        api_user.getUserInfo().then(({ data: { user, token } }) => {
          this.username = user.username;
          this.userInfo = user;
          this.token = token;
          this.avatar = "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg";
          resolve({ user, token });
        }).catch(() => {
          reject();
        });
      });
    },
    logout() {
      return new Promise((resolve) => {
        this.username = "";
        this.userInfo = {};
        this.token = "";
        this.avatar = "";
        resolve({ message: "退出登录成功" });
      });
    },
    // 验证码登录 and 注册
    smsLogin(data) {
      return new Promise((resolve, reject) => {
        api_user.smsLogin(data).then((res) => {
          this.token = res.data;
          resolve(res.data);
        }).catch(() => {
          reject();
        });
      });
    },
    // 本地账户密码登录 and 注册
    localLogin(data) {
      return new Promise((resolve, reject) => {
        api_user.localLogin(data).then((res) => {
          this.token = res.data;
          resolve(res.data);
        }).catch(() => {
          reject();
        });
      });
    },
    // 本地账户密码登录 and 注册
    smsUpdatePassword(data) {
      return new Promise((resolve, reject) => {
        api_user.smsUpdatePassword(data).then((res) => {
          this.token = res.data;
          resolve(res.data);
        }).catch(() => {
          reject();
        });
      });
    }
  }
});
exports.useUserStore = useUserStore;
