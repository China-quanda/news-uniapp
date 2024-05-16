"use strict";
const utils_request = require("../utils/request.js");
const getArticleList = (query) => {
  return utils_request.request({
    url: "/article",
    method: "GET",
    params: query
  });
};
exports.getArticleList = getArticleList;
