"use strict";
const utils_request = require("../utils/request.js");
const smsLogin = (data) => {
  return utils_request.request({
    url: "/user/smsLogin",
    method: "POST",
    data
  });
};
const getUserInfo = () => {
  return utils_request.request({
    url: "/user/getUserInfo",
    method: "GET"
  });
};
const localLogin = (data) => {
  return utils_request.request({
    url: "/user/localLogin",
    method: "POST",
    data
  });
};
const smsUpdatePassword = (data) => {
  return utils_request.request({
    url: "/user/smsUpdatePassword",
    method: "POST",
    data
  });
};
const qrScannedLogin = (data) => {
  return utils_request.request({
    url: "/app/qrCode/scanned",
    method: "post",
    data
  });
};
const qrConfirmLogin = (data) => {
  return utils_request.request({
    url: "/app/qrCode/confirm",
    method: "post",
    data
  });
};
const qrCancelLogin = (data) => {
  return utils_request.request({
    url: "/app/qrCode/cancel",
    method: "post",
    data
  });
};
exports.getUserInfo = getUserInfo;
exports.localLogin = localLogin;
exports.qrCancelLogin = qrCancelLogin;
exports.qrConfirmLogin = qrConfirmLogin;
exports.qrScannedLogin = qrScannedLogin;
exports.smsLogin = smsLogin;
exports.smsUpdatePassword = smsUpdatePassword;
