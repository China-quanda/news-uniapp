"use strict";
const utils_request = require("../utils/request.js");
const getArticleCtegoryList = (query) => {
  return utils_request.request({
    url: "/article/ctegory",
    method: "GET",
    params: query
  });
};
exports.getArticleCtegoryList = getArticleCtegoryList;
