"use strict";
const utils_request = require("../utils/request.js");
const getUserSearchHistoryList = (query) => {
  return utils_request.request({
    url: "/article/search/getUserSearchHistory",
    method: "GET",
    params: query
  });
};
const destroyUserOneSearchHistory = (ids) => {
  return utils_request.request({
    url: "/article/search/destroyUserOneSearchHistory",
    method: "POST",
    data: {
      ids
    }
  });
};
const destroyUserAllSearchHistory = () => {
  return utils_request.request({
    url: "/article/search/destroyUserAllSearchHistory",
    method: "POST"
  });
};
const getAdvicelist = (msg) => {
  return utils_request.request({
    url: "/article/search/getAdvicelist",
    method: "GET",
    params: {
      msg
    }
  });
};
exports.destroyUserAllSearchHistory = destroyUserAllSearchHistory;
exports.destroyUserOneSearchHistory = destroyUserOneSearchHistory;
exports.getAdvicelist = getAdvicelist;
exports.getUserSearchHistoryList = getUserSearchHistoryList;
