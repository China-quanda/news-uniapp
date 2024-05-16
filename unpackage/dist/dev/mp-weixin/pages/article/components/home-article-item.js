"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "home-article-item",
  props: {
    // 类型 0:无图片；1:一张图片-右侧小图；2:一张图片-一张大图；3:三张小图排一行
    type: {
      type: Number,
      default: 1
    },
    // 是否显示关注的用户
    isGzUser: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({}, {
        a: __props.isGzUser && __props.type !== 1
      }, __props.isGzUser && __props.type !== 1 ? {} : {}, {
        b: __props.type === 0
      }, __props.type === 0 ? {} : {}, {
        c: __props.type === 1
      }, __props.type === 1 ? common_vendor.e({
        d: __props.isGzUser
      }, __props.isGzUser ? {} : {}, {
        e: common_vendor.n(__props.isGzUser ? "ellipsis2" : "ellipsis3")
      }) : {}, {
        f: __props.type === 2
      }, __props.type === 2 ? {} : {}, {
        g: __props.type === 3
      }, __props.type === 3 ? {} : {}, {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ca43cbb2"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/article/components/home-article-item.vue"]]);
wx.createComponent(Component);
