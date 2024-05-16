"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const __default__ = { name: "article-comment" };
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: {
    articleId: {
      type: [Number, String]
      // required: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    }
  },
  emits: ["onClose", "onOpen", "onShowPost", "onChange"],
  setup(__props, { expose: __expose, emit: __emit }) {
    common_vendor.useCssVars((_ctx) => ({
      "4cb44537": common_vendor.unref(safeAreaInsetsBottomHeight),
      "02c3c03a": common_vendor.unref(keyboardheight),
      "a8b9c7b6": common_vendor.unref(placeholderheight)
    }));
    const placeholderheight = common_vendor.ref("0px");
    const safeAreaInsetsBottomHeight = common_vendor.ref("0px");
    common_vendor.ref("10px");
    let systemInfo = {};
    const init = () => {
      var _a;
      systemInfo = common_vendor.index.getSystemInfoSync();
      placeholderheight.value = systemInfo.statusBarHeight + "px";
      safeAreaInsetsBottomHeight.value = (((_a = systemInfo.safeAreaInsets) == null ? void 0 : _a.bottom) || 0) + "px";
      console.log("safeAreaInsetsBottomHeight", safeAreaInsetsBottomHeight.value);
      const menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
      placeholderheight.value = (menuButtonInfo.height || 0) + (systemInfo.statusBarHeight || 0) + 10 + "px";
    };
    const emit = __emit;
    const isFullScreen = common_vendor.ref(false);
    const popupRef = common_vendor.ref();
    const popupChange = (e) => {
      emit("onChange", e.show);
      if (!e.show) {
        emit("onClose");
      } else {
        emit("onOpen");
      }
    };
    const popupOpen = () => {
      console.log("onOpen");
      emit("onOpen");
      popupRef.value.open();
      init();
    };
    const popupClose = () => {
      emit("onClose");
      popupRef.value.close();
    };
    let showSendComment = common_vendor.ref(false);
    let showActionComment = common_vendor.ref(true);
    let commentContent = common_vendor.ref("");
    let commentPlaceholder = common_vendor.ref("美好的一天从评论开始~");
    common_vendor.reactive({
      pageNum: 1,
      // 分页页码
      pageSize: 50
      // 页面数据条数
    });
    common_vendor.reactive([]);
    common_vendor.ref(0);
    const ontapHuifu = (item) => {
      common_vendor.index.$emit("ontapHuifu", item);
    };
    const keyboardheight = common_vendor.ref("0px");
    const onSendKeyboard = (e) => {
      var _a;
      const { type } = e;
      if (type == "onFocus" || type === "focus") {
        showSendComment.value = true;
        showActionComment.value = false;
      }
      if (type == "onBlur" || type === "blur") {
        showSendComment.value = false;
        showActionComment.value = true;
      }
      keyboardheight.value = (((_a = systemInfo.safeAreaInsets) == null ? void 0 : _a.bottom) || 0) + (e.detail.height || 0) + "px";
    };
    const ontapLike = async (id) => {
      console.log(11);
    };
    common_vendor.onMounted(() => {
    });
    __expose({
      popupOpen,
      popupClose
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isFullScreen)
      }, common_vendor.unref(isFullScreen) ? {} : {}, {
        b: common_vendor.n(common_vendor.unref(isFullScreen) ? "icon-xiala" : "icon-xiangshang"),
        c: common_vendor.o(($event) => isFullScreen.value = !common_vendor.unref(isFullScreen)),
        d: common_vendor.o(popupClose),
        e: common_vendor.f(1, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.o(($event) => ontapHuifu(item), item),
            b: common_vendor.o(($event) => _ctx.$emit("onShowPost"), item),
            c: common_vendor.o(($event) => ontapLike(), item)
          }, {
            d: common_vendor.f(1, (i, k1, i1) => {
              return {
                a: common_vendor.o(($event) => ontapHuifu(item), i),
                b: common_vendor.o(($event) => _ctx.$emit("onShowPost"), i),
                c: common_vendor.o(($event) => ontapLike(), i),
                d: i
              };
            })
          }, {
            e: common_vendor.o(($event) => ontapLike(), item),
            f: common_vendor.o(($event) => ontapLike(), item),
            g: common_vendor.o(($event) => ontapLike(), item),
            h: item
          });
        }),
        f: common_vendor.unref(showSendComment)
      }, common_vendor.unref(showSendComment) ? {
        g: common_vendor.unref(commentContent) ? 1 : "",
        h: common_vendor.unref(commentPlaceholder),
        i: common_vendor.o(onSendKeyboard),
        j: common_vendor.o(onSendKeyboard),
        k: common_vendor.unref(commentContent),
        l: common_vendor.o(($event) => common_vendor.isRef(commentContent) ? commentContent.value = $event.detail.value : commentContent = $event.detail.value),
        m: common_vendor.unref(commentContent)
      } : {}, {
        n: common_vendor.t(common_vendor.unref(commentContent) ? common_vendor.unref(commentContent) : common_vendor.unref(commentPlaceholder)),
        o: common_vendor.unref(commentContent)
      }, common_vendor.unref(commentContent) ? {} : {}, {
        p: common_vendor.o(($event) => common_vendor.isRef(showSendComment) ? showSendComment.value = !common_vendor.unref(showSendComment) : showSendComment = !common_vendor.unref(showSendComment)),
        q: common_vendor.unref(showActionComment),
        r: __props.safeAreaInsetBottom
      }, __props.safeAreaInsetBottom ? {} : {}, {
        s: common_vendor.unref(isFullScreen) ? 1 : "",
        t: common_vendor.sr(popupRef, "a61c81ed-0", {
          "k": "popupRef"
        }),
        v: common_vendor.o(popupChange),
        w: common_vendor.s(_ctx.__cssVars()),
        x: common_vendor.p({
          type: "bottom",
          ["safe-area"]: false
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a61c81ed"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/article/components/article-comment.vue"]]);
wx.createComponent(Component);
