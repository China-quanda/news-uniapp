"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "my-nav-bar",
  props: {
    bgColor: {
      type: String,
      default: "#fff"
    },
    title: {
      type: String,
      default: ""
    },
    leftText: {
      type: String,
      default: ""
    },
    rightText: {
      type: String,
      default: ""
    },
    leftIcon: {
      type: String,
      default: "icon-xiangzuojiantou"
    },
    rightIcon: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#000000"
    },
    fixed: {
      type: Boolean,
      default: false
    },
    statusBar: {
      type: Boolean,
      default: true
    },
    shadow: {
      // 微信小程序不支持
      type: Boolean,
      default: false
    },
    border: {
      // 微信小程序不支持
      type: Boolean,
      default: false
    },
    height: {
      type: [Number, String],
      default: "44px"
    },
    leftWidth: {
      type: [String, Number],
      default: "40px"
    },
    rightWidth: {
      type: [String, Number],
      default: "40px"
    }
  },
  emits: ["clickLeft", "clickRight", "clickCenter"],
  setup(__props, { emit: __emit }) {
    common_vendor.useCssVars((_ctx) => ({
      "3a747dda": common_vendor.unref(navBarHeight),
      "5b9d4dec": common_vendor.unref(statusBarHeight),
      "4324b178": props.bgColor,
      "376269a5": props.leftWidth,
      "4566fbb8": props.rightWidth,
      "c9396b9e": common_vendor.unref(navRightWidth),
      "0a28d209": props.color
    }));
    const props = __props;
    const emit = __emit;
    const onClickLeft = () => {
      emit("clickLeft");
    };
    const onClickRight = () => {
      emit("clickRight");
    };
    const onClickCenter = () => {
      emit("clickCenter");
    };
    const statusBarHeight = common_vendor.ref("0px");
    const navBarHeight = common_vendor.ref("0px");
    const navRightWidth = common_vendor.ref("0px");
    const wxmenuButtonInfo = common_vendor.ref({});
    const systemInfo = common_vendor.ref({});
    const init = () => {
      navBarHeight.value = props.height;
      systemInfo.value = common_vendor.index.getSystemInfoSync();
      statusBarHeight.value = systemInfo.value.statusBarHeight + "px";
      wxmenuButtonInfo.value = common_vendor.index.getMenuButtonBoundingClientRect();
      navRightWidth.value = (wxmenuButtonInfo.value.width || 0) + 10 + "px";
      navBarHeight.value = ((wxmenuButtonInfo.value.top || 0) - (systemInfo.value.statusBarHeight || 0)) * 2 + (wxmenuButtonInfo.value.height || 0) + "px";
      common_vendor.index.setNavigationBarTitle({
        title: props.title
      });
    };
    common_vendor.onMounted(() => {
      init();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.fixed
      }, __props.fixed ? {} : {}, {
        b: __props.leftIcon
      }, __props.leftIcon ? {
        c: common_vendor.n(__props.leftIcon)
      } : {}, {
        d: __props.leftText
      }, __props.leftText ? {
        e: common_vendor.t(__props.leftText)
      } : {}, {
        f: common_vendor.o(onClickLeft),
        g: __props.title
      }, __props.title ? {
        h: common_vendor.t(__props.title)
      } : {}, {
        i: common_vendor.o(onClickCenter),
        j: __props.rightIcon
      }, __props.rightIcon ? {
        k: common_vendor.n(__props.rightIcon)
      } : {}, {
        l: __props.rightText
      }, __props.rightText ? {
        m: common_vendor.t(__props.rightText)
      } : {}, {
        n: common_vendor.o(onClickRight),
        o: __props.border ? 1 : "",
        p: __props.fixed ? 1 : "",
        q: __props.shadow ? 1 : "",
        r: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-75ed7c30"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/components/my-nav-bar/my-nav-bar.vue"]]);
wx.createComponent(Component);
