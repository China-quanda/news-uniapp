"use strict";
require("../common/vendor.js");
const getAppVersion = (version) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(3);
      resolve({
        "msg": "操作成功",
        "code": 200,
        "data": {
          "version": "1.0.0",
          "url": "#",
          "update": true
        }
      });
    }, 1500);
  });
};
exports.getAppVersion = getAppVersion;
