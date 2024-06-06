"use strict";
const common_vendor = require("../../common/vendor.js");
const store_articleCtegory = require("../../store/articleCtegory.js");
const locale_index = require("../../locale/index.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  (_easycom_uni_icons2 + _easycom_uni_badge2)();
}
const _easycom_uni_icons = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
const _easycom_uni_badge = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-badge/uni-badge.js";
if (!Math) {
  (navSearchBar + _easycom_uni_icons + _easycom_uni_badge)();
}
const navSearchBar = () => "./components/nav-search-bar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "home",
  setup(__props) {
    const articleCtegoryStore = store_articleCtegory.useArticleCtegoryStore();
    let query = common_vendor.reactive({
      articleCategoryId: null
    });
    common_vendor.onLoad(() => {
      articleCtegoryStore.loadArticleCtegoryList();
    });
    common_vendor.onShow(async () => {
      if (query.articleCategoryId !== articleCtegoryStore.ctegorId) {
        query.articleCategoryId = articleCtegoryStore.ctegorId;
      }
    });
    const handleClickArticleCtegory = (item, index) => {
      if (query.articleCategoryId === item.id)
        return;
      query.articleCategoryId = articleCtegoryStore.ctegorId = item.id;
    };
    const handleClickHamburger = () => {
      common_vendor.index.navigateTo({
        url: "/channel"
      });
    };
    const name = common_vendor.ref(locale_index.t("locale.auto"));
    let lang = common_vendor.ref("");
    common_vendor.onLoad(() => {
      const systemInfo = common_vendor.index.getSystemInfoSync();
      const systemLocale = systemInfo.osLanguage;
      console.log("systemLocale", systemLocale);
      let applicationLocale = common_vendor.index.getLocale();
      console.log("applicationLocale", applicationLocale);
      common_vendor.index.onLocaleChange((e) => {
        applicationLocale = e.locale;
        console.log("onLocaleChange-applicationLocale", applicationLocale);
      });
    });
    common_vendor.onMounted(() => {
      console.log("当前语言为：", locale_index.getLocale());
      lang.value = locale_index.getLocale();
      console.log("name", name.value);
      console.log("tt", locale_index.t("message.hello", { msg: "hello" }));
      console.log("locale", locale_index.locale);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(articleCtegoryStore).myCtegoryList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item.id === common_vendor.unref(articleCtegoryStore).ctegorId ? 1 : "",
            c: item.id,
            d: common_vendor.o(($event) => handleClickArticleCtegory(item), item.id)
          };
        }),
        b: common_vendor.p({
          type: "bars"
        }),
        c: common_vendor.o(handleClickHamburger),
        d: common_vendor.o(_ctx.bindClick),
        e: common_vendor.p({
          type: "success"
        }),
        f: common_vendor.p({
          type: "primary",
          inverted: true
        }),
        g: common_vendor.t(_ctx.$t("locale.auto")),
        h: common_vendor.o(($event) => common_vendor.unref(locale_index.setLocale)("en")),
        i: common_vendor.o(($event) => common_vendor.unref(locale_index.setLocale)("zh-Hans")),
        j: common_vendor.t(_ctx.$t("message.hello", {
          msg: "hello"
        }))
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07e72d3c"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
