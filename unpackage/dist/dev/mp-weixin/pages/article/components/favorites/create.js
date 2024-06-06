"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...{
    name: "CreateFavoritesPopup"
  },
  __name: "create",
  emits: ["addSuccess"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const isShow = common_vendor.ref(true);
    const popupRef = common_vendor.ref();
    const submitLoading = common_vendor.ref(false);
    const form = common_vendor.reactive({
      name: "",
      desc: "",
      isPublic: true
    });
    const changeRadio = (e) => {
      form.isPublic = e.detail.value == "true" ? true : false;
    };
    const formSubmit = async () => {
      if (submitLoading.value || !form.name)
        return;
      console.log("formdata", form);
      submitLoading.value = true;
      await addFavorite();
      submitLoading.value = false;
      close();
      emit("addSuccess");
    };
    function open() {
      var _a;
      (_a = popupRef.value) == null ? void 0 : _a.open();
    }
    function close() {
      var _a;
      (_a = popupRef.value) == null ? void 0 : _a.close();
      form.name = "";
      form.desc = "";
      form.isPublic = true;
      setTimeout(() => {
        isShow.value = false;
        setTimeout(() => {
          isShow.value = true;
        }, 350);
      }, 350);
    }
    function addFavorite(time = 350) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([]);
        }, time);
      });
    }
    __expose({
      open,
      close
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isShow)
      }, common_vendor.unref(isShow) ? {
        b: common_vendor.o(close),
        c: common_vendor.n(!common_vendor.unref(submitLoading) && common_vendor.unref(form).name ? "text-blue-5" : "text-blue-3"),
        d: common_vendor.o(formSubmit),
        e: common_vendor.unref(form).name,
        f: common_vendor.o(($event) => common_vendor.unref(form).name = $event.detail.value),
        g: common_vendor.unref(form).desc,
        h: common_vendor.o(($event) => common_vendor.unref(form).desc = $event.detail.value),
        i: common_vendor.o(changeRadio),
        j: common_vendor.o(formSubmit)
      } : {}, {
        k: common_vendor.sr(popupRef, "a2698d1a-0", {
          "k": "popupRef"
        }),
        l: common_vendor.p({
          type: "bottom",
          isMaskClick: false,
          ["border-radius"]: "10px 10px 0 0"
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a2698d1a"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/article/components/favorites/create.vue"]]);
wx.createComponent(Component);
