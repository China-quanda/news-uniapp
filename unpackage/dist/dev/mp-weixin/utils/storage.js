"use strict";
const common_vendor = require("../common/vendor.js");
const storage = {
  /**
   * @description 获取 从本地缓存中同步获取指定 key 对应的内容。
   * @param {string} name name
   * @example get('name')
   * @return any
   */
  get: (name) => {
    try {
      const data = common_vendor.index.getStorageSync(name);
      return data ? JSON.parse(data) : false;
    } catch (e) {
      const data = common_vendor.index.getStorageSync(name);
      return data ? data : false;
    }
  },
  /**
   * @description 设置 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
   * @param {string} name name
   * @param {any} value value
   * @example set('name','value')
   */
  set: (name, value) => {
    try {
      if (typeof value === "object") {
        value = JSON.stringify(value);
      }
      common_vendor.index.setStorageSync(name, value);
    } catch (e) {
      common_vendor.index.setStorageSync(name, value);
    }
  },
  /**
   * @description 删除 从本地缓存中同步移除指定 key。
   * @param {string} name name
   * @example remove('name')
   */
  remove: (name) => {
    common_vendor.index.removeStorageSync(name);
  },
  /**
   * @description 获取所有 同步获取当前 storage 的相关信息。
   * @example getAll()
   * @return any
   */
  getAll: () => {
    try {
      return common_vendor.index.getStorageInfoSync();
    } catch (e) {
    }
  },
  /**
   * @description 清除所有 同步清理本地数据缓存。
   * @example clear()
   */
  clear: () => {
    try {
      common_vendor.index.clearStorageSync();
    } catch (e) {
    }
  }
};
exports.storage = storage;
