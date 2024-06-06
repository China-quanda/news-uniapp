"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup + common_vendor.unref(CreateFavorites))();
}
const CreateFavorites = () => "./create.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...{
    name: "FavoritesPopup"
  },
  __name: "list",
  props: {
    articleId: {
      type: Number,
      default: true
    }
  },
  setup(__props, { expose: __expose }) {
    const popupRef = common_vendor.ref();
    const createFavoritesRef = common_vendor.ref();
    const openCreateFavorites = () => {
      var _a;
      (_a = createFavoritesRef.value) == null ? void 0 : _a.open();
    };
    const loading = common_vendor.ref(false);
    const submitLoading = common_vendor.ref(false);
    const list = common_vendor.ref([]);
    const selectList = common_vendor.ref([]);
    const clickItem = (item) => {
      item.isChecked = !item.isChecked;
      if (selectList.value.includes(item.id)) {
        if (!item.isChecked) {
          selectList.value = selectList.value.filter((fid) => fid != item.id);
        }
      } else {
        selectList.value.push(item.id);
      }
    };
    const submit = async () => {
      if (selectList.value.length === 0 || submitLoading.value)
        return;
      submitLoading.value = true;
      await getList();
      submitLoading.value = false;
      close();
      common_vendor.index.showToast({
        title: "收藏成功",
        icon: "success"
      });
    };
    function open() {
      var _a;
      (_a = popupRef.value) == null ? void 0 : _a.open();
      loadList();
    }
    function close() {
      var _a;
      (_a = popupRef.value) == null ? void 0 : _a.close();
    }
    const loadList = async () => {
      console.log("loadList");
      loading.value = true;
      list.value = [];
      const reslut = await getList();
      list.value = reslut;
      loading.value = false;
      list.value.forEach((item) => {
        if (item.isChecked === true) {
          selectList.value.push(item.id);
        }
      });
    };
    function getList(time = 350) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 1,
              name: "娱乐",
              count: 398,
              isPublic: true,
              isChecked: true
            },
            {
              id: 2,
              name: "股票",
              count: 323,
              isPublic: true,
              isChecked: true
            },
            {
              id: 3,
              name: "后端",
              count: 398,
              isPublic: false,
              isChecked: false
            },
            {
              id: 4,
              name: "饭菜",
              count: 398,
              isPublic: true,
              isChecked: false
            },
            {
              id: 5,
              name: "提神",
              count: 398,
              isPublic: false,
              isChecked: false
            },
            {
              id: 6,
              name: "提神",
              count: 398,
              isPublic: true,
              isChecked: false
            },
            {
              id: 7,
              name: "提神",
              count: 398,
              isPublic: true,
              isChecked: false
            },
            {
              id: 8,
              name: "提神",
              count: 398,
              isPublic: true,
              isChecked: false
            },
            {
              id: 9,
              name: "提神",
              count: 398,
              isPublic: true,
              isChecked: false
            },
            {
              id: 10,
              name: "提神",
              count: 398,
              isPublic: true,
              isChecked: false
            }
          ]);
        }, time);
      });
    }
    __expose({
      open,
      close
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(openCreateFavorites),
        b: common_vendor.unref(list).length
      }, common_vendor.unref(list).length ? {
        c: common_vendor.f(common_vendor.unref(list), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.count),
            c: common_vendor.t(item.isPublic ? "公开" : "私密"),
            d: item.id + "",
            e: item.isChecked,
            f: common_vendor.o(($event) => clickItem(item), index),
            g: index
          };
        })
      } : {
        d: common_vendor.t(common_vendor.unref(loading) ? "数据加载中" : "暂无收藏")
      }, {
        e: common_vendor.unref(selectList).length === 0 || common_vendor.unref(submitLoading),
        f: common_vendor.unref(submitLoading),
        g: common_vendor.o(submit),
        h: common_vendor.sr(popupRef, "4328f121-0", {
          "k": "popupRef"
        }),
        i: common_vendor.p({
          type: "bottom",
          ["border-radius"]: "10px 10px 0 0"
        }),
        j: common_vendor.sr(createFavoritesRef, "4328f121-1", {
          "k": "createFavoritesRef"
        }),
        k: common_vendor.o(loadList)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4328f121"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/article/components/favorites/list.vue"]]);
wx.createComponent(Component);
