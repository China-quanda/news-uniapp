"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_my_nav_bar2 = common_vendor.resolveComponent("my-nav-bar");
  _easycom_my_nav_bar2();
}
const _easycom_my_nav_bar = () => "../../components/my-nav-bar/my-nav-bar.js";
if (!Math) {
  _easycom_my_nav_bar();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const editStatus = common_vendor.ref(false);
    const myChannel = common_vendor.ref([
      {
        name: "photo",
        title: "关注"
      },
      {
        name: "lock",
        title: "推荐"
      },
      {
        name: "star",
        title: "郴州"
      },
      {
        name: "hourglass",
        title: "房产"
      },
      {
        name: "home",
        title: "美食"
      },
      {
        name: "star",
        title: "科技"
      },
      {
        name: "photo",
        title: "股票"
      },
      {
        name: "lock",
        title: "家居"
      }
    ]);
    common_vendor.ref([
      {
        title: "热门精选",
        data: [
          {
            name: "photo",
            title: "微头条"
          },
          {
            name: "lock",
            title: "直播"
          },
          {
            name: "star",
            title: "问答"
          },
          {
            name: "hourglass",
            title: "热点"
          },
          {
            name: "home",
            title: "视频"
          },
          {
            name: "home",
            title: "小视频"
          },
          {
            name: "home",
            title: "图片"
          },
          {
            name: "home",
            title: "娱乐"
          },
          {
            name: "home",
            title: "科技"
          },
          {
            name: "home",
            title: "军事"
          },
          {
            name: "home",
            title: "国际"
          },
          {
            name: "home",
            title: "健康"
          },
          {
            name: "home",
            title: "数码"
          },
          {
            name: "home",
            title: "手机"
          },
          {
            name: "home",
            title: "游戏"
          },
          {
            name: "home",
            title: "历史"
          },
          {
            name: "home",
            title: "搞笑"
          },
          {
            name: "home",
            title: "情感"
          },
          {
            name: "home",
            title: "三农"
          }
        ]
      },
      {
        title: "生活娱乐",
        data: [
          {
            name: "photo",
            title: "健身"
          },
          {
            name: "lock",
            title: "综艺"
          },
          {
            name: "star",
            title: "时尚"
          },
          {
            name: "hourglass",
            title: "养生"
          },
          {
            name: "home",
            title: "旅游"
          },
          {
            name: "home",
            title: "宠物"
          },
          {
            name: "home",
            title: "收藏"
          },
          {
            name: "home",
            title: "星座"
          }
        ]
      },
      {
        title: "体育财经",
        data: [
          {
            name: "photo",
            title: "钓鱼"
          },
          {
            name: "lock",
            title: "财经"
          },
          {
            name: "star",
            title: "体育"
          },
          {
            name: "hourglass",
            title: "NBA"
          },
          {
            name: "home",
            title: "彩票"
          }
        ]
      },
      {
        title: "科教文艺",
        data: [
          {
            name: "photo",
            title: "动物"
          },
          {
            name: "lock",
            title: "传媒"
          },
          {
            name: "star",
            title: "国风"
          },
          {
            name: "hourglass",
            title: "教育"
          },
          {
            name: "home",
            title: "文化"
          },
          {
            name: "home",
            title: "科学"
          },
          {
            name: "home",
            title: "辟谣"
          },
          {
            name: "home",
            title: "正能量"
          }
        ]
      },
      {
        title: "其他",
        data: [
          {
            name: "photo",
            title: "党媒推荐"
          },
          {
            name: "lock",
            title: "热榜"
          },
          {
            name: "star",
            title: "政法"
          },
          {
            name: "hourglass",
            title: "台海"
          },
          {
            name: "home",
            title: "漫画"
          },
          {
            name: "home",
            title: "口述电影"
          },
          {
            name: "home",
            title: "动漫"
          },
          {
            name: "home",
            title: "生活"
          }
        ]
      }
    ]);
    const tapMyChannel = (row, index) => {
      if (editStatus.value)
        ;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          fixed: true,
          leftIcon: "icon-cha"
        }),
        b: common_vendor.t(common_vendor.unref(editStatus) ? "点击删除频道" : "点击进入频道"),
        c: common_vendor.t(common_vendor.unref(editStatus) ? "完成" : "编辑"),
        d: common_vendor.o(($event) => editStatus.value = !common_vendor.unref(editStatus)),
        e: common_vendor.f(common_vendor.unref(myChannel), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item.title === "推荐" ? 1 : "",
            c: index,
            d: common_vendor.o(($event) => tapMyChannel(), index)
          };
        }),
        f: common_vendor.unref(editStatus),
        g: common_vendor.unref(editStatus) ? 1 : "",
        h: common_vendor.f(common_vendor.unref(myChannel), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index,
            c: common_vendor.o(($event) => tapMyChannel(), index)
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-09f7f959"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/channel/index.vue"]]);
wx.createPage(MiniProgramPage);
