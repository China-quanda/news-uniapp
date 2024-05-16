"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_router = require("../../utils/router.js");
const api_search = require("../../api/search.js");
const api_article = require("../../api/article.js");
if (!Array) {
  const _easycom_my_nav_bar2 = common_vendor.resolveComponent("my-nav-bar");
  _easycom_my_nav_bar2();
}
const _easycom_my_nav_bar = () => "../../components/my-nav-bar/my-nav-bar.js";
if (!Math) {
  (_easycom_my_nav_bar + searchAdvice + searchHistory + searchHot)();
}
const searchHot = () => "./components/search-hot.js";
const searchAdvice = () => "./components/search-advice.js";
const searchHistory = () => "./components/search-history.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.ref("");
    const searchHotList = common_vendor.ref([]);
    const searchHistoryList = common_vendor.ref([]);
    const searchAdviceList = common_vendor.ref([]);
    const handleBack = () => {
      utils_router.router.back();
    };
    const clickHotSearch = (row) => {
      searchArticleQuery.keywords = row.keywords;
      loadArticleList();
    };
    const tapAdvice = (keyword) => {
      searchAdviceList.value = [];
      searchArticleQuery.keywords = keyword;
      loadArticleList();
    };
    const searchArticleQuery = common_vendor.reactive({
      keywords: "",
      pageNum: 1,
      pageSize: 10,
      total: 0,
      Loading: true
    });
    const searchArticleList = common_vendor.ref([]);
    const loadArticleList = async (pageNum = 1) => {
      const result = await api_article.getArticleList(searchArticleQuery);
      searchArticleList.value = pageNum > 1 ? searchArticleList.value.concat(result.data.list) : result.data.list;
      searchArticleQuery.pageNum = result.data.pagination;
      searchArticleQuery.pageSize = result.data.pageSize;
      searchArticleQuery.total = result.data.total;
      loadUserSearchHistoryList();
    };
    const loadUserSearchHistoryList = () => {
      api_search.getUserSearchHistoryList({ pageSize: 12 }).then((res) => {
        searchHistoryList.value = res.data.list;
      });
    };
    const loadsearchAdviceList = async () => {
      searchAdviceList.value = [];
      const result = await api_search.getAdvicelist(searchArticleQuery.keywords);
      searchAdviceList.value = result.data;
    };
    common_vendor.onMounted(() => {
    });
    common_vendor.watch(() => searchArticleQuery.keywords, (n, o) => {
      searchArticleList.value = [];
      searchAdviceList.value = [];
      loadsearchAdviceList();
    });
    const showHistory = common_vendor.computed(() => {
      if (!searchArticleQuery.keywords && searchHistoryList.value.length) {
        return true;
      } else {
        return false;
      }
    });
    const showHot = common_vendor.computed(() => {
      if (!searchArticleQuery.keywords && searchHotList.value.length) {
        return true;
      } else {
        return false;
      }
    });
    const showAdvice = common_vendor.computed(() => {
      if (searchArticleQuery.keywords && searchAdviceList.value.length && !searchArticleList.value.length) {
        return true;
      } else {
        return false;
      }
    });
    common_vendor.computed(() => {
      if (searchArticleQuery.keywords && searchArticleList.value.length) {
        return true;
      } else {
        return false;
      }
    });
    const clearIcon = () => {
      searchArticleQuery.keywords = "";
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(loadArticleList),
        b: searchArticleQuery.keywords,
        c: common_vendor.o(common_vendor.m(($event) => searchArticleQuery.keywords = $event.detail.value, {
          trim: true
        })),
        d: searchArticleQuery.keywords,
        e: common_vendor.o(clearIcon),
        f: common_vendor.o(loadArticleList),
        g: common_vendor.p({
          rightText: "搜索",
          clickLeft: handleBack,
          leftWidth: "23px",
          rightWidth: "35px",
          fixed: true
        })
      }, {
        h: showAdvice.value,
        i: common_vendor.o(tapAdvice),
        j: common_vendor.p({
          keyword: searchArticleQuery.keywords,
          list: searchAdviceList.value
        }),
        k: showHistory.value,
        l: common_vendor.o(clickHotSearch),
        m: common_vendor.o(loadUserSearchHistoryList),
        n: common_vendor.p({
          list: searchHistoryList.value
        }),
        o: showHot.value,
        p: common_vendor.o(clickHotSearch),
        q: common_vendor.p({
          list: searchHotList.value
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dab939d"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/search/index.vue"]]);
wx.createPage(MiniProgramPage);
