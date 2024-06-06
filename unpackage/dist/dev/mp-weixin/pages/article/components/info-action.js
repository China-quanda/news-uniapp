"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "info-action",
  props: {
    type: { default: "article" },
    info: {},
    safeAreaInsetBottom: { type: Boolean, default: true },
    placeholder: { type: Boolean, default: true },
    fixed: { type: Boolean, default: false },
    border: { type: Boolean, default: false }
  },
  emits: ["change", "onRefresh", "onClickShare", "onClickLike", "onClickComment", "onClickCollect"],
  setup(__props, { emit: __emit }) {
    common_vendor.useCssVars((_ctx) => ({
      "2bd306ae": common_vendor.unref(safeAreaInsetsBottomHeight)
    }));
    const emit = __emit;
    const porps = __props;
    const safeAreaInsetsBottomHeight = common_vendor.ref("0px");
    common_vendor.watchEffect(() => {
      var _a;
      if (porps.fixed && porps.safeAreaInsetBottom) {
        const systemInfo = common_vendor.index.getSystemInfoSync();
        safeAreaInsetsBottomHeight.value = (((_a = systemInfo.safeAreaInsets) == null ? void 0 : _a.bottom) || 0) + "px";
      }
    });
    const clickItem = (value) => {
      if (value === "share")
        handleShare();
      if (value === "like")
        handleLike();
      if (value === "comment")
        handleComment();
      if (value === "collect")
        handleCollect();
    };
    const like = common_vendor.ref(false);
    const handleLike = async () => {
      emit("change", "like");
    };
    const collect = common_vendor.ref(false);
    const handleCollect = async () => {
      emit("change", "collect");
    };
    const handleShare = () => {
      emit("change", "share");
    };
    const handleComment = () => {
      emit("onClickComment");
      emit("change", "comment");
    };
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(_ctx.info.commentCount ? _ctx.info.commentCount : "评论"),
        b: common_vendor.o(($event) => clickItem("comment")),
        c: common_vendor.n(common_vendor.unref(collect) ? "icon-shoucang1" : "icon-shoucang"),
        d: common_vendor.unref(collect) ? "#728ae9" : "#8a8a8a",
        e: common_vendor.t(_ctx.info.collectCount ? _ctx.info.collectCount : "收藏"),
        f: common_vendor.o(($event) => clickItem("collect")),
        g: common_vendor.n(common_vendor.unref(like) ? "icon-dianzan_kuai" : "icon-dianzan"),
        h: common_vendor.unref(like) ? "#728ae9" : "#8a8a8a",
        i: common_vendor.t(_ctx.info.likeCount ? _ctx.info.likeCount : "点赞"),
        j: common_vendor.o(($event) => clickItem("like")),
        k: common_vendor.o(($event) => clickItem("share")),
        l: common_vendor.n(_ctx.fixed ? "is-fixed" : ""),
        m: common_vendor.n(_ctx.border ? "is-border" : ""),
        n: _ctx.fixed && _ctx.placeholder
      }, _ctx.fixed && _ctx.placeholder ? {} : {}, {
        o: _ctx.fixed && _ctx.safeAreaInsetBottom
      }, _ctx.fixed && _ctx.safeAreaInsetBottom ? {} : {}, {
        p: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7a0707fd"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/article/components/info-action.vue"]]);
wx.createComponent(Component);
