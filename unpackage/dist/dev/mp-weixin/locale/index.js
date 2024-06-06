"use strict";
const common_vendor = require("../common/vendor.js");
const message$1 = {
  hello: "{msg} world"
};
const en = {
  "tabbar.home": "home",
  "tabbar.qa": "qa",
  "tabbar.mine": "mine",
  "pages.home": "home",
  "pages.mine": "mine",
  "index.language-change-confirm": "Applying this setting will restart the app",
  "locale.auto": "System",
  "locale.en": "English",
  "locale.zh-hans": "简体中文",
  "locale.zh-hant": "繁体中文",
  "locale.ja": "日语",
  "index.scene": "Scene",
  "index.company": "Company Profile",
  "index.package": "Package",
  "index.details": "Details",
  "index.title": "Hello i18n",
  "index.home": "Home",
  "index.component": "Component",
  "index.api": "API",
  "index.schema": "Schema",
  "index.demo": "uni-app globalization",
  "index.demo-description": "Include uni-framework, manifest.json, pages.json, tabbar, Page, Component, API, Schema",
  "index.detail": "Detail",
  "index.language": "Language",
  "index.language-info": "Settings",
  "index.system-language": "System language",
  "index.application-language": "Application language",
  "word.whole": "whole",
  "word.download": "Download Records",
  "word.preservation": "Transfer to my mobile phone",
  "word.forward": "Forward to friends",
  "me.WeChat": "WeChat name",
  "me.message": "Message feedback",
  "me.myDownloads": "My Downloads",
  "me.contact": "contact us",
  "me.logout": "Log out",
  "api.message": "Message",
  "schema.name": "Name",
  "schema.add": "Add",
  "schema.add-success": "Add success",
  message: message$1
};
const message = {
  hello: "{msg} 我的"
};
const zhHans = {
  "tabbar.home": "首页",
  "tabbar.qa": "问答",
  "tabbar.mine": "我的",
  "pages.home": "首页",
  "pages.mine": "我的",
  "index.language-change-confirm": "应用此设置将重启App",
  "locale.auto": "系统",
  "locale.en": "English",
  "locale.zh-hans": "简体中文",
  "index.scene": "场景",
  "index.company": "公司介绍",
  "index.package": "产品包",
  "index.details": "详情",
  "word.whole": "全部",
  "word.download": "下载记录",
  "word.preservation": "转存到我的手机",
  "word.forward": "转发给朋友",
  "me.WeChat": "微信名",
  "me.message": "留言反馈",
  "me.myDownloads": "我的下载",
  "me.contact": "联系我们",
  "me.logout": "退出登录",
  message
};
const i18nConfig = {
  locale: common_vendor.index.getLocale(),
  // 获取已设置的语言
  messages: {
    en,
    //英文
    "zh-Hans": zhHans
    //简体中文
    // 'zh-Hant': zhHant //繁体中文
  }
};
const i18n = common_vendor.createI18n(i18nConfig);
const t = i18n.global.t;
const locale = i18n.global.locale;
const setLocale = (lang) => {
  const systemInfo = common_vendor.index.getSystemInfoSync();
  if (systemInfo.osName === "android") {
    common_vendor.index.showModal({
      content: t("index.language-change-confirm"),
      success: (res) => {
        if (res.confirm) {
          common_vendor.index.setLocale(lang);
        }
      }
    });
  } else {
    common_vendor.index.setLocale(lang);
    i18n.global.locale = lang;
  }
};
const getLocale = () => {
  return i18n.global.locale || common_vendor.index.getLocale();
};
exports.getLocale = getLocale;
exports.i18n = i18n;
exports.locale = locale;
exports.setLocale = setLocale;
exports.t = t;
