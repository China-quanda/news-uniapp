"use strict";
const common_vendor = require("../../../../common/vendor.js");
const utils_router = require("../../../../utils/router.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    let showGender = common_vendor.ref(false);
    let showBirthday = common_vendor.ref(false);
    let showCity = common_vendor.ref(false);
    common_vendor.ref(false);
    common_vendor.ref(false);
    common_vendor.ref("");
    common_vendor.reactive([["男", "女"]]);
    common_vendor.reactive([["中国", "美国"], ["深圳", "厦门", "上海", "拉萨"]]);
    let userInfo = common_vendor.reactive({});
    const uploadBgImg = () => {
      common_vendor.index.chooseImage({
        count: 1,
        //默认9
        success: function(res) {
          this.file = res.tempFilePaths[0];
          console.log(res.tempFilePaths[0]);
          this.showBackgroundImage = true;
        }
      });
    };
    const uploadAvatarImg = () => {
      common_vendor.index.chooseImage({
        count: 1,
        //默认9
        success: function(res) {
          this.file = res.tempFilePaths[0];
          console.log(res.tempFilePaths[0]);
          this.showAvatar = true;
        }
      });
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      return {
        a: common_vendor.unref(userInfo).avatar ? common_vendor.unref(userInfo).avatar : "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
        b: common_vendor.o(uploadAvatarImg),
        c: common_vendor.t(((_a = common_vendor.unref(userInfo)) == null ? void 0 : _a.nickname) ? common_vendor.unref(userInfo).nickname : "待完善"),
        d: common_vendor.o(($event) => common_vendor.unref(utils_router.router).push("./edit?title=用户名&type=textarea&valueData=123")),
        e: common_vendor.t(((_b = common_vendor.unref(userInfo)) == null ? void 0 : _b.introduce) ? common_vendor.unref(userInfo).introduce : "待完善"),
        f: common_vendor.o(($event) => common_vendor.unref(utils_router.router).push("./edit?title=简介&type=input&valueData=123")),
        g: common_vendor.t(((_c = common_vendor.unref(userInfo)) == null ? void 0 : _c.background_image) ? "去更换" : "去设置"),
        h: common_vendor.o(uploadBgImg),
        i: common_vendor.t(((_d = common_vendor.unref(userInfo)) == null ? void 0 : _d.gender) ? common_vendor.unref(userInfo).gender : "待完善"),
        j: common_vendor.o(($event) => common_vendor.isRef(showGender) ? showGender.value = true : showGender = true),
        k: common_vendor.t(((_e = common_vendor.unref(userInfo)) == null ? void 0 : _e.birthday) ? common_vendor.unref(userInfo).birthday : "待完善"),
        l: common_vendor.o(($event) => common_vendor.isRef(showBirthday) ? showBirthday.value = true : showBirthday = true),
        m: common_vendor.t(((_f = common_vendor.unref(userInfo)) == null ? void 0 : _f.city) ? common_vendor.unref(userInfo).city : "待完善"),
        n: common_vendor.o(($event) => common_vendor.isRef(showCity) ? showCity.value = true : showCity = true),
        o: common_vendor.t(((_g = common_vendor.unref(userInfo)) == null ? void 0 : _g.school) ? common_vendor.unref(userInfo).school : "待完善"),
        p: common_vendor.o(($event) => common_vendor.unref(utils_router.router).push(`./edit?title=学校&type=input&valueData=${common_vendor.unref(userInfo).school}`)),
        q: common_vendor.t(((_h = common_vendor.unref(userInfo)) == null ? void 0 : _h.profession) ? common_vendor.unref(userInfo).profession : "待完善"),
        r: common_vendor.o(($event) => common_vendor.unref(utils_router.router).push(`./edit?title=职业&type=input&valueData=${common_vendor.unref(userInfo).profession}`))
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-17db42f7"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/setting/profile/index.vue"]]);
wx.createPage(MiniProgramPage);
