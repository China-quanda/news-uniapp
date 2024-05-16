"use strict";
const common_vendor = require("../../../../common/vendor.js");
const utils_router = require("../../../../utils/router.js");
const utils_prompt = require("../../../../utils/prompt.js");
if (!Array) {
  const _easycom_my_nav_bar2 = common_vendor.resolveComponent("my-nav-bar");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  (_easycom_my_nav_bar2 + _easycom_uni_easyinput2)();
}
const _easycom_my_nav_bar = () => "../../../../components/my-nav-bar/my-nav-bar.js";
const _easycom_uni_easyinput = () => "../../../../node-modules/@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_my_nav_bar + _easycom_uni_easyinput)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "edit",
  setup(__props) {
    common_vendor.ref(false);
    common_vendor.ref(false);
    let value = common_vendor.ref(null);
    let valueData = common_vendor.ref(null);
    let title = common_vendor.ref("编辑资料");
    let type = common_vendor.ref("input");
    common_vendor.onLoad((o) => {
      value.value = o.valueData;
      valueData.value = o.valueData;
      title.value = o.title;
      type.value = o.type;
    });
    const placeholder = common_vendor.computed(() => {
      return `请输入${title.value}`;
    });
    const isEditValue = common_vendor.computed(() => {
      if (!value.value)
        return false;
      if (valueData.value == value.value)
        return false;
      return true;
    });
    const rightClick = () => {
      if (!value.value)
        return utils_prompt.prompt.msg(placeholder);
      if (valueData.value == value.value)
        return utils_prompt.prompt.msg(`您未修改${title.value}`);
      utils_router.router.back();
    };
    const leftClick = () => {
      if (value.value && value.value == valueData.value)
        return utils_router.router.back();
      if (!value.value && value.value == valueData.value)
        return utils_router.router.back();
      if (!value.value && value.value != valueData.value)
        return common_vendor.index.showModal({
          title: `编辑${title.value}提示`,
          content: "直接返回修改不会生效.是否提交修改？",
          confirmText: "提交",
          cancelText: "直接返回",
          success(result) {
            if (result.confirm) {
              rightClick();
            } else if (result.cancel) {
              utils_router.router.back();
            }
          }
        });
      if (value.value && value.value != valueData.value)
        return common_vendor.index.showModal({
          title: `编辑${title.value}提示`,
          content: "直接返回修改不会生效.是否提交修改？",
          confirmText: "提交",
          cancelText: "直接返回",
          success(result) {
            if (result.confirm) {
              rightClick();
            } else if (result.cancel) {
              utils_router.router.back();
            }
          }
        });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(leftClick),
        b: common_vendor.o(rightClick),
        c: common_vendor.n(common_vendor.unref(isEditValue) ? "" : "right-text"),
        d: common_vendor.p({
          title: "编辑" + common_vendor.unref(title),
          rightText: "提交"
        }),
        e: common_vendor.unref(type) == "input"
      }, common_vendor.unref(type) == "input" ? {
        f: common_vendor.o(($event) => common_vendor.isRef(value) ? value.value = $event : value = $event),
        g: common_vendor.p({
          type: "text",
          placeholder: common_vendor.unref(placeholder),
          trim: true,
          focus: true,
          modelValue: common_vendor.unref(value)
        })
      } : {}, {
        h: common_vendor.unref(type) == "textarea"
      }, common_vendor.unref(type) == "textarea" ? {
        i: common_vendor.unref(placeholder),
        j: common_vendor.unref(value),
        k: common_vendor.unref(value),
        l: common_vendor.o(($event) => common_vendor.isRef(value) ? value.value = $event.detail.value : value = $event.detail.value)
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-addd1d6b"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/setting/profile/edit.vue"]]);
wx.createPage(MiniProgramPage);
