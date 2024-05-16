"use strict";
const common_vendor = require("../common/vendor.js");
const utils_storage = require("../utils/storage.js");
common_vendor.defineStore("bluetooth", {
  // unistorage: true, // 是否持久化
  unistorage: {
    // true
    key: "bluetooth",
    // 缓存的键，默认为该 store 的 id，这里是 bluetooth,
    paths: ["connection", "BLEInformation.deviceId"],
    // 需要缓存的路径，这里设置 connection 和 BLEInformation 下的 data 会被缓存
    // 初始化恢复前触发
    // beforeRestore(ctx) {},
    // 初始化恢复后触发
    // afterRestore(ctx) {},
    serializer: {
      // 序列化，默认为 JSON.stringify
      serialize(v) {
        return JSON.stringify(v);
      },
      // 反序列化，默认为 JSON.parse
      deserialize(v) {
        return JSON.parse(v);
      }
    }
  },
  state: () => ({
    test: "1111",
    // BLEInformation: {
    // 	platform: sysinfo.platform || "",
    // 	deviceId: "",
    // 	name: "",
    // 	writeCharaterId: "",
    // 	writeServiceId: "",
    // 	notifyCharaterId: "",
    // 	notifyServiceId: "",
    // 	readCharaterId: "",
    // 	readServiceId: "",
    // },
    BLEInformation: utils_storage.storage.get("BLE") || {
      platform: "",
      deviceId: "",
      name: "",
      writeCharaterId: "",
      writeServiceId: "",
      notifyCharaterId: "",
      notifyServiceId: "",
      readCharaterId: "",
      readServiceId: ""
    },
    connection: utils_storage.storage.get("BLEconnection") || false
  }),
  getters: {},
  actions: {
    // 设置蓝牙信息
    SET_BLE_INFO(info) {
      this.BLEInformation = { ...this.info, info };
      utils_storage.storage.set("BLE", { ...this.info, info });
    },
    // 设置蓝牙连接状态
    SET_CONNECTION_STATE(state) {
      this.connection = state;
      utils_storage.storage.set("BLEconnection", state);
    },
    //错误码提示
    errorCodeTip(code) {
      let errMsg = {
        1e4: "未初始化蓝牙适配器",
        10001: "当前蓝牙适配器不可用",
        10002: "没有找到指定设备",
        10003: "连接失败",
        10004: "没有找到指定服务",
        10005: "没有找到指定特征值",
        10006: "当前连接已断开",
        10007: "当前特征值不支持此操作",
        10008: "其余所有系统上报的异常",
        10009: "Android 系统特有，系统版本低于 4.3 不支持 蓝牙",
        10010: "已连接",
        10011: "配对设备需要配对码",
        10012: "连接超时",
        10013: "连接 deviceId 为空或者是格式不正确",
        10004: "没有找到指定服务",
        10004: "没有找到指定服务",
        10004: "没有找到指定服务",
        10004: "没有找到指定服务",
        10004: "没有找到指定服务"
      };
      let msg = errMsg[code] || "蓝牙未知异常";
      common_vendor.index.showToast({ title: msg, icon: "none" });
    },
    // 自动连接蓝牙
    connectionBLE() {
      var _a;
      if (!((_a = this.BLEInformation) == null ? void 0 : _a.deviceId))
        return this.SET_CONNECTION_STATE(false);
      common_vendor.index.openBluetoothAdapter({
        success() {
          common_vendor.index.getBluetoothAdapterState({
            success(res2) {
              if (!res2.available)
                return common_vendor.index.showModal({ title: "提示", content: "本机蓝牙不可用", showCancel: false });
              if (res2.discovering)
                common_vendor.index.stopBluetoothDevicesDiscovery();
              common_vendor.index.createBLEConnection({
                deviceId: this.BLEInformation.deviceId,
                success() {
                  this.SET_CONNECTION_STATE(true);
                },
                fail(fail3) {
                  this.SET_CONNECTION_STATE(false);
                },
                complete() {
                  common_vendor.index.hideLoading();
                }
              });
            },
            fail(fail2) {
              this.errorCodeTip(fail2.errCode);
            }
          });
        },
        fail(fail1) {
          if (fail1.errCode == 10001) {
            common_vendor.index.showModal({ title: "提示", content: "蓝牙初始化失败，请打开蓝牙", showCancel: false });
          } else {
            this.errorCodeTip(fail1.errCode);
          }
        }
      });
    },
    // 监听蓝牙连接状态
    onBLEConnectionState() {
      var _a;
      if (!((_a = this.BLEInformation) == null ? void 0 : _a.deviceId))
        return this.SET_CONNECTION_STATE(false);
      common_vendor.index.onBLEConnectionStateChange((res) => {
        var _a2;
        if (res.deviceId !== ((_a2 = this.BLEInformation) == null ? void 0 : _a2.deviceId) || !res.connected)
          return this.SET_CONNECTION_STATE(false);
      });
      common_vendor.index.getConnectedBluetoothDevices({
        success(res) {
          var _a2, _b;
          if (!res.devices.length)
            return this.SET_CONNECTION_STATE(false);
          if (((_a2 = res.devices[0]) == null ? void 0 : _a2.deviceId) !== ((_b = this.BLEInformation) == null ? void 0 : _b.deviceId))
            return this.SET_CONNECTION_STATE(false);
          this.SET_CONNECTION_STATE(true);
        },
        fail(e) {
          this.SET_CONNECTION_STATE(false);
        }
      });
    }
  }
});
