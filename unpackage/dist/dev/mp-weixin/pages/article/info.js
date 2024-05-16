"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (infoArticleItem + articleComment + infoAction)();
}
const infoArticleItem = () => "./components/info-article-item.js";
const articleComment = () => "./components/article-comment.js";
const infoAction = () => "./components/info-action.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "info",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "a349126e": common_vendor.unref(navBarheight),
      "acf9a626": common_vendor.unref(navBarPaddingTopheight),
      "e2bd283a": common_vendor.unref(menuButtonWidth),
      "6b1c9c84": common_vendor.unref(safeAreaBottomHeight)
    }));
    const pageTitle = common_vendor.ref("文章详情页");
    const showNavBarAuthor = common_vendor.ref(false);
    const articleCommentRef = common_vendor.ref();
    const navBarheight = common_vendor.ref("0px");
    const navBarPaddingTopheight = common_vendor.ref("0px");
    const menuButtonWidth = common_vendor.ref("0px");
    const safeAreaBottomHeight = common_vendor.ref("0px");
    const getPlaceholder = () => {
      var _a;
      const systemInfo = common_vendor.index.getSystemInfoSync();
      safeAreaBottomHeight.value = (((_a = systemInfo.safeAreaInsets) == null ? void 0 : _a.bottom) || 0) + 15 + "px";
      const menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
      navBarheight.value = (systemInfo.safeArea.top || 0) + (menuButtonInfo.height || 0) + 10 + "px";
      navBarPaddingTopheight.value = (systemInfo.safeArea.top || 0) + "px";
      menuButtonWidth.value = menuButtonInfo.width + 15 + "px";
    };
    const onClickComment = () => {
      articleCommentRef.value.popupOpen();
    };
    const back = () => {
      common_vendor.index.navigateBack();
    };
    common_vendor.onLoad(() => {
      getPlaceholder();
      common_vendor.index.setNavigationBarTitle({
        title: pageTitle.value
      });
    });
    const scroll = (e) => {
      const query = common_vendor.index.createSelectorQuery();
      query.select(".article-user").boundingClientRect((data) => {
        if (!data)
          return console.error("data is null");
        if (Number(data.top) - 44 <= 0) {
          showNavBarAuthor.value = true;
        } else {
          showNavBarAuthor.value = false;
        }
      }).exec();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(back),
        b: !common_vendor.unref(showNavBarAuthor)
      }, !common_vendor.unref(showNavBarAuthor) ? {
        c: common_vendor.t(common_vendor.unref(pageTitle))
      } : {}, {}, {
        d: common_vendor.sr(articleCommentRef, "e8340613-4", {
          "k": "articleCommentRef"
        }),
        e: common_vendor.p({
          articleId: 1
        }),
        f: common_vendor.o(onClickComment),
        g: common_vendor.p({
          id: 1,
          info: {
            commentCount: 0,
            collectCount: 0,
            likeCount: 0
          },
          fixed: true
        }),
        h: common_vendor.o(scroll),
        i: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e8340613"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/article/info.vue"]]);
wx.createPage(MiniProgramPage);
