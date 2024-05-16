"use strict";
const plugins_pinia = require("./pinia.js");
const locale_index = require("../locale/index.js");
const initPlugins = (app) => {
  app.use(plugins_pinia.pinia);
  app.use(locale_index.i18n);
};
exports.initPlugins = initPlugins;
