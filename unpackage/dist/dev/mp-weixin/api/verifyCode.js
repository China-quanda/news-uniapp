"use strict";
const utils_request = require("../utils/request.js");
const getVerifyCode = (data) => {
  return utils_request.request({
    url: "/verifyCode/createVerifyCode",
    method: "POST",
    data
  });
};
exports.getVerifyCode = getVerifyCode;
