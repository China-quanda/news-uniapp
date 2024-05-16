"use strict";
const utils_request = require("../utils/request.js");
const getUserCollectList = (query) => {
  return utils_request.request({
    url: "/article/collect/getUserCollectList",
    method: "GET",
    params: query
  });
};
exports.getUserCollectList = getUserCollectList;
