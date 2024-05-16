if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const ON_SHOW = "onShow";
  const ON_LAUNCH = "onLaunch";
  const ON_LOAD = "onLoad";
  const ON_UNLOAD = "onUnload";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const onLaunch = /* @__PURE__ */ createHook(ON_LAUNCH);
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const onUnload = /* @__PURE__ */ createHook(ON_UNLOAD);
  const _sfc_main$K = /* @__PURE__ */ vue.defineComponent({
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
      vue.useCssVars((_ctx) => ({
        "75ed7c30-navBarHeight": vue.unref(navBarHeight),
        "75ed7c30-statusBarHeight": vue.unref(statusBarHeight),
        "75ed7c30-props.bgColor": props.bgColor,
        "75ed7c30-props.leftWidth": props.leftWidth,
        "75ed7c30-props.rightWidth": props.rightWidth,
        "75ed7c30-props.color": props.color
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
      const statusBarHeight = vue.ref("0px");
      const navBarHeight = vue.ref("0px");
      vue.ref("0px");
      vue.ref({});
      const systemInfo = vue.ref({});
      const init = () => {
        navBarHeight.value = props.height;
        systemInfo.value = uni.getSystemInfoSync();
        statusBarHeight.value = systemInfo.value.statusBarHeight + "px";
        uni.setNavigationBarTitle({
          title: props.title
        });
      };
      vue.onMounted(() => {
        init();
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "my-nav-bar" }, [
          vue.createCommentVNode(" 占位 "),
          __props.fixed ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "placeholder"
          })) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["my-nav-bar-wrap", { "is-border": __props.border, "is-fixed": __props.fixed, "is-shadow": __props.shadow }])
            },
            [
              vue.createElementVNode("view", {
                class: "my-nav-bar-left",
                onClick: onClickLeft
              }, [
                vue.renderSlot(_ctx.$slots, "left", {}, () => [
                  vue.createElementVNode("view", { class: "my-nav-bar-btn" }, [
                    __props.leftIcon ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 0,
                        class: vue.normalizeClass(["btn-icon iconfont", [__props.leftIcon]])
                      },
                      null,
                      2
                      /* CLASS */
                    )) : vue.createCommentVNode("v-if", true),
                    __props.leftText ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 1,
                        class: "btn-text"
                      },
                      vue.toDisplayString(__props.leftText),
                      1
                      /* TEXT */
                    )) : vue.createCommentVNode("v-if", true)
                  ])
                ], true)
              ]),
              vue.createElementVNode("view", {
                class: "my-nav-bar-center",
                onClick: onClickCenter
              }, [
                vue.renderSlot(_ctx.$slots, "default", {}, () => [
                  __props.title ? (vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: 0,
                      class: "my-nav-bar-title ellipsis1"
                    },
                    vue.toDisplayString(__props.title),
                    1
                    /* TEXT */
                  )) : vue.createCommentVNode("v-if", true)
                ], true)
              ]),
              vue.createElementVNode("view", {
                class: "my-nav-bar-right",
                onClick: onClickRight
              }, [
                vue.renderSlot(_ctx.$slots, "right", {}, () => [
                  vue.createElementVNode("view", { class: "my-nav-bar-btn" }, [
                    __props.rightIcon ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 0,
                        class: vue.normalizeClass(["btn-icon iconfont", [__props.rightIcon]])
                      },
                      null,
                      2
                      /* CLASS */
                    )) : vue.createCommentVNode("v-if", true),
                    __props.rightText ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 1,
                        class: "btn-text"
                      },
                      vue.toDisplayString(__props.rightText),
                      1
                      /* TEXT */
                    )) : vue.createCommentVNode("v-if", true)
                  ])
                ], true)
              ])
            ],
            2
            /* CLASS */
          )
        ]);
      };
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["__scopeId", "data-v-75ed7c30"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/components/my-nav-bar/my-nav-bar.vue"]]);
  var isVue2 = false;
  function set$1(target, key, val) {
    if (Array.isArray(target)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    }
    target[key] = val;
    return val;
  }
  function del(target, key) {
    if (Array.isArray(target)) {
      target.splice(key, 1);
      return;
    }
    delete target[key];
  }
  function getDevtoolsGlobalHook$1() {
    return getTarget$1().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget$1() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable$1 = typeof Proxy === "function";
  const HOOK_SETUP$1 = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET$1 = "plugin:settings:set";
  let supported;
  let perf;
  function isPerformanceSupported() {
    var _a;
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else if (typeof global !== "undefined" && ((_a = global.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
      supported = true;
      perf = global.perf_hooks.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
  }
  let ApiProxy$1 = class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = Object.assign({}, defaultSettings);
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        },
        now() {
          return now();
        }
      };
      if (hook) {
        hook.on(HOOK_PLUGIN_SETTINGS_SET$1, (pluginId, value) => {
          if (pluginId === this.plugin.id) {
            this.fallbacks.setSettings(value);
          }
        });
      }
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  };
  function setupDevtoolsPlugin$1(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget$1();
    const hook = getDevtoolsGlobalHook$1();
    const enableProxy = isProxyAvailable$1 && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP$1, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy$1(descriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor: descriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
   * pinia v2.1.7
   * (c) 2023 Eduardo San Martin Morote
   * @license MIT
   */
  let activePinia;
  const setActivePinia = (pinia2) => activePinia = pinia2;
  const piniaSymbol = Symbol("pinia");
  function isPlainObject$1(o) {
    return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  const IS_CLIENT = typeof window !== "undefined";
  const USE_DEVTOOLS = IS_CLIENT;
  const _global = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
  function bom(blob, { autoBom = false } = {}) {
    if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
    }
    return blob;
  }
  function download(url, name, opts) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = function() {
      saveAs(xhr.response, name, opts);
    };
    xhr.onerror = function() {
      console.error("could not download file");
    };
    xhr.send();
  }
  function corsEnabled(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, false);
    try {
      xhr.send();
    } catch (e) {
    }
    return xhr.status >= 200 && xhr.status <= 299;
  }
  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent("click"));
    } catch (e) {
      const evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  }
  const _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
  const isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
  const saveAs = !IS_CLIENT ? () => {
  } : (
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
    typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : (
      // Use msSaveOrOpenBlob as a second approach
      "msSaveOrOpenBlob" in _navigator ? msSaveAs : (
        // Fallback to using FileReader and a popup
        fileSaverSaveAs
      )
    )
  );
  function downloadSaveAs(blob, name = "download", opts) {
    const a = document.createElement("a");
    a.download = name;
    a.rel = "noopener";
    if (typeof blob === "string") {
      a.href = blob;
      if (a.origin !== location.origin) {
        if (corsEnabled(a.href)) {
          download(blob, name, opts);
        } else {
          a.target = "_blank";
          click(a);
        }
      } else {
        click(a);
      }
    } else {
      a.href = URL.createObjectURL(blob);
      setTimeout(function() {
        URL.revokeObjectURL(a.href);
      }, 4e4);
      setTimeout(function() {
        click(a);
      }, 0);
    }
  }
  function msSaveAs(blob, name = "download", opts) {
    if (typeof blob === "string") {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        const a = document.createElement("a");
        a.href = blob;
        a.target = "_blank";
        setTimeout(function() {
          click(a);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  }
  function fileSaverSaveAs(blob, name, opts, popup) {
    popup = popup || open("", "_blank");
    if (popup) {
      popup.document.title = popup.document.body.innerText = "downloading...";
    }
    if (typeof blob === "string")
      return download(blob, name, opts);
    const force = blob.type === "application/octet-stream";
    const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
    const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = function() {
        let url = reader.result;
        if (typeof url !== "string") {
          popup = null;
          throw new Error("Wrong reader.result type");
        }
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, "data:attachment/file;");
        if (popup) {
          popup.location.href = url;
        } else {
          location.assign(url);
        }
        popup = null;
      };
      reader.readAsDataURL(blob);
    } else {
      const url = URL.createObjectURL(blob);
      if (popup)
        popup.location.assign(url);
      else
        location.href = url;
      popup = null;
      setTimeout(function() {
        URL.revokeObjectURL(url);
      }, 4e4);
    }
  }
  function toastMessage(message2, type) {
    const piniaMessage = "🍍 " + message2;
    if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
      __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
    } else if (type === "error") {
      console.error(piniaMessage);
    } else if (type === "warn") {
      console.warn(piniaMessage);
    } else {
      console.log(piniaMessage);
    }
  }
  function isPinia(o) {
    return "_a" in o && "install" in o;
  }
  function checkClipboardAccess() {
    if (!("clipboard" in navigator)) {
      toastMessage(`Your browser doesn't support the Clipboard API`, "error");
      return true;
    }
  }
  function checkNotFocusedError(error) {
    if (error instanceof Error && error.message.toLowerCase().includes("document is not focused")) {
      toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
      return true;
    }
    return false;
  }
  async function actionGlobalCopyState(pinia2) {
    if (checkClipboardAccess())
      return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(pinia2.state.value));
      toastMessage("Global state copied to clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalPasteState(pinia2) {
    if (checkClipboardAccess())
      return;
    try {
      loadStoresState(pinia2, JSON.parse(await navigator.clipboard.readText()));
      toastMessage("Global state pasted from clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalSaveState(pinia2) {
    try {
      saveAs(new Blob([JSON.stringify(pinia2.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  let fileInput;
  function getFileOpener() {
    if (!fileInput) {
      fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
    }
    function openFile() {
      return new Promise((resolve, reject) => {
        fileInput.onchange = async () => {
          const files = fileInput.files;
          if (!files)
            return resolve(null);
          const file = files.item(0);
          if (!file)
            return resolve(null);
          return resolve({ text: await file.text(), file });
        };
        fileInput.oncancel = () => resolve(null);
        fileInput.onerror = reject;
        fileInput.click();
      });
    }
    return openFile;
  }
  async function actionGlobalOpenStateFile(pinia2) {
    try {
      const open2 = getFileOpener();
      const result = await open2();
      if (!result)
        return;
      const { text, file } = result;
      loadStoresState(pinia2, JSON.parse(text));
      toastMessage(`Global state imported from "${file.name}".`);
    } catch (error) {
      toastMessage(`Failed to import the state from JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  function loadStoresState(pinia2, state) {
    for (const key in state) {
      const storeState = pinia2.state.value[key];
      if (storeState) {
        Object.assign(storeState, state[key]);
      } else {
        pinia2.state.value[key] = state[key];
      }
    }
  }
  function formatDisplay(display) {
    return {
      _custom: {
        display
      }
    };
  }
  const PINIA_ROOT_LABEL = "🍍 Pinia (root)";
  const PINIA_ROOT_ID = "_root";
  function formatStoreForInspectorTree(store) {
    return isPinia(store) ? {
      id: PINIA_ROOT_ID,
      label: PINIA_ROOT_LABEL
    } : {
      id: store.$id,
      label: store.$id
    };
  }
  function formatStoreForInspectorState(store) {
    if (isPinia(store)) {
      const storeNames = Array.from(store._s.keys());
      const storeMap = store._s;
      const state2 = {
        state: storeNames.map((storeId) => ({
          editable: true,
          key: storeId,
          value: store.state.value[storeId]
        })),
        getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
          const store2 = storeMap.get(id);
          return {
            editable: false,
            key: id,
            value: store2._getters.reduce((getters, key) => {
              getters[key] = store2[key];
              return getters;
            }, {})
          };
        })
      };
      return state2;
    }
    const state = {
      state: Object.keys(store.$state).map((key) => ({
        editable: true,
        key,
        value: store.$state[key]
      }))
    };
    if (store._getters && store._getters.length) {
      state.getters = store._getters.map((getterName) => ({
        editable: false,
        key: getterName,
        value: store[getterName]
      }));
    }
    if (store._customProperties.size) {
      state.customProperties = Array.from(store._customProperties).map((key) => ({
        editable: true,
        key,
        value: store[key]
      }));
    }
    return state;
  }
  function formatEventData(events) {
    if (!events)
      return {};
    if (Array.isArray(events)) {
      return events.reduce((data, event) => {
        data.keys.push(event.key);
        data.operations.push(event.type);
        data.oldValue[event.key] = event.oldValue;
        data.newValue[event.key] = event.newValue;
        return data;
      }, {
        oldValue: {},
        keys: [],
        operations: [],
        newValue: {}
      });
    } else {
      return {
        operation: formatDisplay(events.type),
        key: formatDisplay(events.key),
        oldValue: events.oldValue,
        newValue: events.newValue
      };
    }
  }
  function formatMutationType(type) {
    switch (type) {
      case MutationType.direct:
        return "mutation";
      case MutationType.patchFunction:
        return "$patch";
      case MutationType.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let isTimelineActive = true;
  const componentStateTypes = [];
  const MUTATIONS_LAYER_ID = "pinia:mutations";
  const INSPECTOR_ID = "pinia";
  const { assign: assign$1 } = Object;
  const getStoreType = (id) => "🍍 " + id;
  function registerPiniaDevtools(app, pinia2) {
    setupDevtoolsPlugin$1({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app
    }, (api) => {
      if (typeof api.now !== "function") {
        toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
      }
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Pinia 🍍`,
        color: 15064968
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: "Pinia 🍍",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              actionGlobalCopyState(pinia2);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await actionGlobalPasteState(pinia2);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              actionGlobalSaveState(pinia2);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await actionGlobalOpenStateFile(pinia2);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Import the state from a JSON file"
          }
        ],
        nodeActions: [
          {
            icon: "restore",
            tooltip: 'Reset the state (with "$reset")',
            action: (nodeId) => {
              const store = pinia2._s.get(nodeId);
              if (!store) {
                toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
              } else if (typeof store.$reset !== "function") {
                toastMessage(`Cannot reset "${nodeId}" store because it doesn't have a "$reset" method implemented.`, "warn");
              } else {
                store.$reset();
                toastMessage(`Store "${nodeId}" reset.`);
              }
            }
          }
        ]
      });
      api.on.inspectComponent((payload, ctx) => {
        const proxy = payload.componentInstance && payload.componentInstance.proxy;
        if (proxy && proxy._pStores) {
          const piniaStores = payload.componentInstance.proxy._pStores;
          Object.values(piniaStores).forEach((store) => {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "state",
              editable: true,
              value: store._isOptionsAPI ? {
                _custom: {
                  value: vue.toRaw(store.$state),
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => store.$reset()
                    }
                  ]
                }
              } : (
                // NOTE: workaround to unwrap transferred refs
                Object.keys(store.$state).reduce((state, key) => {
                  state[key] = store.$state[key];
                  return state;
                }, {})
              )
            });
            if (store._getters && store._getters.length) {
              payload.instanceData.state.push({
                type: getStoreType(store.$id),
                key: "getters",
                editable: false,
                value: store._getters.reduce((getters, key) => {
                  try {
                    getters[key] = store[key];
                  } catch (error) {
                    getters[key] = error;
                  }
                  return getters;
                }, {})
              });
            }
          });
        }
      });
      api.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia2];
          stores = stores.concat(Array.from(pinia2._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      api.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia2 : pinia2._s.get(payload.nodeId);
          if (!inspectedStore) {
            return;
          }
          if (inspectedStore) {
            payload.state = formatStoreForInspectorState(inspectedStore);
          }
        }
      });
      api.on.editInspectorState((payload, ctx) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia2 : pinia2._s.get(payload.nodeId);
          if (!inspectedStore) {
            return toastMessage(`store "${payload.nodeId}" not found`, "error");
          }
          const { path } = payload;
          if (!isPinia(inspectedStore)) {
            if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
              path.unshift("$state");
            }
          } else {
            path.unshift("state");
          }
          isTimelineActive = false;
          payload.set(inspectedStore, path, payload.state.value);
          isTimelineActive = true;
        }
      });
      api.on.editComponentState((payload) => {
        if (payload.type.startsWith("🍍")) {
          const storeId = payload.type.replace(/^🍍\s*/, "");
          const store = pinia2._s.get(storeId);
          if (!store) {
            return toastMessage(`store "${storeId}" not found`, "error");
          }
          const { path } = payload;
          if (path[0] !== "state") {
            return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
          }
          path[0] = "$state";
          isTimelineActive = false;
          payload.set(store, path, payload.state.value);
          isTimelineActive = true;
        }
      });
    });
  }
  function addStoreToDevtools(app, store) {
    if (!componentStateTypes.includes(getStoreType(store.$id))) {
      componentStateTypes.push(getStoreType(store.$id));
    }
    setupDevtoolsPlugin$1({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app,
      settings: {
        logStoreChanges: {
          label: "Notify about new/deleted stores",
          type: "boolean",
          defaultValue: true
        }
        // useEmojis: {
        //   label: 'Use emojis in messages ⚡️',
        //   type: 'boolean',
        //   defaultValue: true,
        // },
      }
    }, (api) => {
      const now2 = typeof api.now === "function" ? api.now.bind(api) : Date.now;
      store.$onAction(({ after, onError, name, args }) => {
        const groupId = runningActionId++;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🛫 " + name,
            subtitle: "start",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args
            },
            groupId
          }
        });
        after((result) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              title: "🛬 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                result
              },
              groupId
            }
          });
        });
        onError((error) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              logType: "error",
              title: "💥 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                error
              },
              groupId
            }
          });
        });
      }, true);
      store._customProperties.forEach((name) => {
        vue.watch(() => vue.unref(store[name]), (newValue, oldValue) => {
          api.notifyComponentUpdate();
          api.sendInspectorState(INSPECTOR_ID);
          if (isTimelineActive) {
            api.addTimelineEvent({
              layerId: MUTATIONS_LAYER_ID,
              event: {
                time: now2(),
                title: "Change",
                subtitle: name,
                data: {
                  newValue,
                  oldValue
                },
                groupId: activeAction
              }
            });
          }
        }, { deep: true });
      });
      store.$subscribe(({ events, type }, state) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (!isTimelineActive)
          return;
        const eventData = {
          time: now2(),
          title: formatMutationType(type),
          data: assign$1({ store: formatDisplay(store.$id) }, formatEventData(events)),
          groupId: activeAction
        };
        if (type === MutationType.patchFunction) {
          eventData.subtitle = "⤵️";
        } else if (type === MutationType.patchObject) {
          eventData.subtitle = "🧩";
        } else if (events && !Array.isArray(events)) {
          eventData.subtitle = events.type;
        }
        if (events) {
          eventData.data["rawEvent(s)"] = {
            _custom: {
              display: "DebuggerEvent",
              type: "object",
              tooltip: "raw DebuggerEvent[]",
              value: events
            }
          };
        }
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: eventData
        });
      }, { detached: true, flush: "sync" });
      const hotUpdate = store._hotUpdate;
      store._hotUpdate = vue.markRaw((newStore) => {
        hotUpdate(newStore);
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🔥 " + store.$id,
            subtitle: "HMR update",
            data: {
              store: formatDisplay(store.$id),
              info: formatDisplay(`HMR update`)
            }
          }
        });
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
      });
      const { $dispose } = store;
      store.$dispose = () => {
        $dispose();
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
        api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store 🗑`);
      };
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed 🆕`);
    });
  }
  let runningActionId = 0;
  let activeAction;
  function patchActionForGrouping(store, actionNames, wrapWithProxy) {
    const actions = actionNames.reduce((storeActions, actionName) => {
      storeActions[actionName] = vue.toRaw(store)[actionName];
      return storeActions;
    }, {});
    for (const actionName in actions) {
      store[actionName] = function() {
        const _actionId = runningActionId;
        const trackedStore = wrapWithProxy ? new Proxy(store, {
          get(...args) {
            activeAction = _actionId;
            return Reflect.get(...args);
          },
          set(...args) {
            activeAction = _actionId;
            return Reflect.set(...args);
          }
        }) : store;
        activeAction = _actionId;
        const retValue = actions[actionName].apply(trackedStore, arguments);
        activeAction = void 0;
        return retValue;
      };
    }
  }
  function devtoolsPlugin({ app, store, options }) {
    if (store.$id.startsWith("__hot:")) {
      return;
    }
    store._isOptionsAPI = !!options.state;
    patchActionForGrouping(store, Object.keys(options.actions), store._isOptionsAPI);
    const originalHotUpdate = store._hotUpdate;
    vue.toRaw(store)._hotUpdate = function(newStore) {
      originalHotUpdate.apply(this, arguments);
      patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions), !!store._isOptionsAPI);
    };
    addStoreToDevtools(
      app,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      store
    );
  }
  function createPinia() {
    const scope = vue.effectScope(true);
    const state = scope.run(() => vue.ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia2 = vue.markRaw({
      install(app) {
        setActivePinia(pinia2);
        {
          pinia2._a = app;
          app.provide(piniaSymbol, pinia2);
          app.config.globalProperties.$pinia = pinia2;
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(app, pinia2);
          }
          toBeInstalled.forEach((plugin) => _p.push(plugin));
          toBeInstalled = [];
        }
      },
      use(plugin) {
        if (!this._a && !isVue2) {
          toBeInstalled.push(plugin);
        } else {
          _p.push(plugin);
        }
        return this;
      },
      _p,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */ new Map(),
      state
    });
    if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
      pinia2.use(devtoolsPlugin);
    }
    return pinia2;
  }
  function patchObject(newState, oldState) {
    for (const key in oldState) {
      const subPatch = oldState[key];
      if (!(key in newState)) {
        continue;
      }
      const targetValue = newState[key];
      if (isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        newState[key] = patchObject(targetValue, subPatch);
      } else {
        {
          newState[key] = subPatch;
        }
      }
    }
    return newState;
  }
  const noop = () => {
  };
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
      const idx = subscriptions.indexOf(callback);
      if (idx > -1) {
        subscriptions.splice(idx, 1);
        onCleanup();
      }
    };
    if (!detached && vue.getCurrentScope()) {
      vue.onScopeDispose(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  const fallbackRunWithContext = (fn) => fn();
  function mergeReactiveObjects(target, patchToApply) {
    if (target instanceof Map && patchToApply instanceof Map) {
      patchToApply.forEach((value, key) => target.set(key, value));
    }
    if (target instanceof Set && patchToApply instanceof Set) {
      patchToApply.forEach(target.add, target);
    }
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && target.hasOwnProperty(key) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        target[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target[key] = subPatch;
      }
    }
    return target;
  }
  const skipHydrateSymbol = Symbol("pinia:skipHydration");
  function shouldHydrate(obj) {
    return !isPlainObject$1(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign: assign$2 } = Object;
  function isComputed(o) {
    return !!(vue.isRef(o) && o.effect);
  }
  function createOptionsStore(id, options, pinia2, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia2.state.value[id];
    let store;
    function setup() {
      if (!initialState && !hot) {
        {
          pinia2.state.value[id] = state ? state() : {};
        }
      }
      const localState = hot ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        vue.toRefs(vue.ref(state ? state() : {}).value)
      ) : vue.toRefs(pinia2.state.value[id]);
      return assign$2(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        if (name in localState) {
          console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
        }
        computedGetters[name] = vue.markRaw(vue.computed(() => {
          setActivePinia(pinia2);
          const store2 = pinia2._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    store = createSetupStore(id, setup, options, pinia2, hot, true);
    return store;
  }
  function createSetupStore($id, setup, options = {}, pinia2, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign$2({ actions: {} }, options);
    if (!pinia2._e.active) {
      throw new Error("Pinia destroyed");
    }
    const $subscribeOptions = {
      deep: true
      // flush: 'post',
    };
    {
      $subscribeOptions.onTrigger = (event) => {
        if (isListening) {
          debuggerEvents = event;
        } else if (isListening == false && !store._hotUpdating) {
          if (Array.isArray(debuggerEvents)) {
            debuggerEvents.push(event);
          } else {
            console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
          }
        }
      };
    }
    let isListening;
    let isSyncListening;
    let subscriptions = [];
    let actionSubscriptions = [];
    let debuggerEvents;
    const initialState = pinia2.state.value[$id];
    if (!isOptionsStore && !initialState && !hot) {
      {
        pinia2.state.value[$id] = {};
      }
    }
    const hotState = vue.ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      {
        debuggerEvents = [];
      }
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia2.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia2.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      vue.nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia2.state.value[$id]);
    }
    const $reset = isOptionsStore ? function $reset2() {
      const { state } = options;
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign$2($state, newState);
      });
    } : (
      /* istanbul ignore next */
      () => {
        throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
      }
    );
    function $dispose() {
      scope.stop();
      subscriptions = [];
      actionSubscriptions = [];
      pinia2._s.delete($id);
    }
    function wrapAction(name, action) {
      return function() {
        setActivePinia(pinia2);
        const args = Array.from(arguments);
        const afterCallbackList = [];
        const onErrorCallbackList = [];
        function after(callback) {
          afterCallbackList.push(callback);
        }
        function onError(callback) {
          onErrorCallbackList.push(callback);
        }
        triggerSubscriptions(actionSubscriptions, {
          args,
          name,
          store,
          after,
          onError
        });
        let ret;
        try {
          ret = action.apply(this && this.$id === $id ? this : store, args);
        } catch (error) {
          triggerSubscriptions(onErrorCallbackList, error);
          throw error;
        }
        if (ret instanceof Promise) {
          return ret.then((value) => {
            triggerSubscriptions(afterCallbackList, value);
            return value;
          }).catch((error) => {
            triggerSubscriptions(onErrorCallbackList, error);
            return Promise.reject(error);
          });
        }
        triggerSubscriptions(afterCallbackList, ret);
        return ret;
      };
    }
    const _hmrPayload = /* @__PURE__ */ vue.markRaw({
      actions: {},
      getters: {},
      state: [],
      hotState
    });
    const partialStore = {
      _p: pinia2,
      // _s: scope,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => vue.watch(() => pinia2.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign$2({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store = vue.reactive(assign$2(
      {
        _hmrPayload,
        _customProperties: vue.markRaw(/* @__PURE__ */ new Set())
        // devtools custom properties
      },
      partialStore
      // must be added later
      // setupStore
    ));
    pinia2._s.set($id, store);
    const runWithContext = pinia2._a && pinia2._a.runWithContext || fallbackRunWithContext;
    const setupStore = runWithContext(() => pinia2._e.run(() => (scope = vue.effectScope()).run(setup)));
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (vue.isRef(prop) && !isComputed(prop) || vue.isReactive(prop)) {
        if (hot) {
          set$1(hotState.value, key, vue.toRef(setupStore, key));
        } else if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (vue.isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia2.state.value[$id][key] = prop;
          }
        }
        {
          _hmrPayload.state.push(key);
        }
      } else if (typeof prop === "function") {
        const actionValue = hot ? prop : wrapAction(key, prop);
        {
          setupStore[key] = actionValue;
        }
        {
          _hmrPayload.actions[key] = prop;
        }
        optionsForPlugin.actions[key] = prop;
      } else {
        if (isComputed(prop)) {
          _hmrPayload.getters[key] = isOptionsStore ? (
            // @ts-expect-error
            options.getters[key]
          ) : prop;
          if (IS_CLIENT) {
            const getters = setupStore._getters || // @ts-expect-error: same
            (setupStore._getters = vue.markRaw([]));
            getters.push(key);
          }
        }
      }
    }
    {
      assign$2(store, setupStore);
      assign$2(vue.toRaw(store), setupStore);
    }
    Object.defineProperty(store, "$state", {
      get: () => hot ? hotState.value : pinia2.state.value[$id],
      set: (state) => {
        if (hot) {
          throw new Error("cannot set hotState");
        }
        $patch(($state) => {
          assign$2($state, state);
        });
      }
    });
    {
      store._hotUpdate = vue.markRaw((newStore) => {
        store._hotUpdating = true;
        newStore._hmrPayload.state.forEach((stateKey) => {
          if (stateKey in store.$state) {
            const newStateTarget = newStore.$state[stateKey];
            const oldStateSource = store.$state[stateKey];
            if (typeof newStateTarget === "object" && isPlainObject$1(newStateTarget) && isPlainObject$1(oldStateSource)) {
              patchObject(newStateTarget, oldStateSource);
            } else {
              newStore.$state[stateKey] = oldStateSource;
            }
          }
          set$1(store, stateKey, vue.toRef(newStore.$state, stateKey));
        });
        Object.keys(store.$state).forEach((stateKey) => {
          if (!(stateKey in newStore.$state)) {
            del(store, stateKey);
          }
        });
        isListening = false;
        isSyncListening = false;
        pinia2.state.value[$id] = vue.toRef(newStore._hmrPayload, "hotState");
        isSyncListening = true;
        vue.nextTick().then(() => {
          isListening = true;
        });
        for (const actionName in newStore._hmrPayload.actions) {
          const action = newStore[actionName];
          set$1(store, actionName, wrapAction(actionName, action));
        }
        for (const getterName in newStore._hmrPayload.getters) {
          const getter = newStore._hmrPayload.getters[getterName];
          const getterValue = isOptionsStore ? (
            // special handling of options api
            vue.computed(() => {
              setActivePinia(pinia2);
              return getter.call(store, store);
            })
          ) : getter;
          set$1(store, getterName, getterValue);
        }
        Object.keys(store._hmrPayload.getters).forEach((key) => {
          if (!(key in newStore._hmrPayload.getters)) {
            del(store, key);
          }
        });
        Object.keys(store._hmrPayload.actions).forEach((key) => {
          if (!(key in newStore._hmrPayload.actions)) {
            del(store, key);
          }
        });
        store._hmrPayload = newStore._hmrPayload;
        store._getters = newStore._getters;
        store._hotUpdating = false;
      });
    }
    if (USE_DEVTOOLS) {
      const nonEnumerable = {
        writable: true,
        configurable: true,
        // avoid warning on devtools trying to display this property
        enumerable: false
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
        Object.defineProperty(store, p, assign$2({ value: store[p] }, nonEnumerable));
      });
    }
    pinia2._p.forEach((extender) => {
      if (USE_DEVTOOLS) {
        const extensions = scope.run(() => extender({
          store,
          app: pinia2._a,
          pinia: pinia2,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
        assign$2(store, extensions);
      } else {
        assign$2(store, scope.run(() => extender({
          store,
          app: pinia2._a,
          pinia: pinia2,
          options: optionsForPlugin
        })));
      }
    });
    if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
      console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
    }
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
  }
  function defineStore(idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === "function";
    if (typeof idOrOptions === "string") {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
    } else {
      options = idOrOptions;
      id = idOrOptions.id;
      if (typeof id !== "string") {
        throw new Error(`[🍍]: "defineStore()" must be passed a store id as its first argument.`);
      }
    }
    function useStore(pinia2, hot) {
      const hasContext = vue.hasInjectionContext();
      pinia2 = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      pinia2 || (hasContext ? vue.inject(piniaSymbol, null) : null);
      if (pinia2)
        setActivePinia(pinia2);
      if (!activePinia) {
        throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
      }
      pinia2 = activePinia;
      if (!pinia2._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia2);
        } else {
          createOptionsStore(id, options, pinia2);
        }
        {
          useStore._pinia = pinia2;
        }
      }
      const store = pinia2._s.get(id);
      if (hot) {
        const hotId = "__hot:" + id;
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia2, true) : createOptionsStore(hotId, assign$2({}, options), pinia2, true);
        hot._hotUpdate(newStore);
        delete pinia2.state.value[hotId];
        pinia2._s.delete(hotId);
      }
      if (IS_CLIENT) {
        const currentInstance = vue.getCurrentInstance();
        if (currentInstance && currentInstance.proxy && // avoid adding stores that are just built for hot module replacement
        !hot) {
          const vm = currentInstance.proxy;
          const cache2 = "_pStores" in vm ? vm._pStores : vm._pStores = {};
          cache2[id] = store;
        }
      }
      return store;
    }
    useStore.$id = id;
    return useStore;
  }
  const storage = {
    /**
     * @description 获取 从本地缓存中同步获取指定 key 对应的内容。
     * @param {string} name name
     * @example get('name')
     * @return any
     */
    get: (name) => {
      try {
        const data = uni.getStorageSync(name);
        return data ? JSON.parse(data) : false;
      } catch (e) {
        const data = uni.getStorageSync(name);
        return data ? data : false;
      }
    },
    /**
     * @description 设置 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
     * @param {string} name name
     * @param {any} value value
     * @example set('name','value')
     */
    set: (name, value) => {
      try {
        if (typeof value === "object") {
          value = JSON.stringify(value);
        }
        uni.setStorageSync(name, value);
      } catch (e) {
        uni.setStorageSync(name, value);
      }
    },
    /**
     * @description 删除 从本地缓存中同步移除指定 key。
     * @param {string} name name
     * @example remove('name')
     */
    remove: (name) => {
      uni.removeStorageSync(name);
    },
    /**
     * @description 获取所有 同步获取当前 storage 的相关信息。
     * @example getAll()
     * @return any
     */
    getAll: () => {
      try {
        return uni.getStorageInfoSync();
      } catch (e) {
      }
    },
    /**
     * @description 清除所有 同步清理本地数据缓存。
     * @example clear()
     */
    clear: () => {
      try {
        uni.clearStorageSync();
      } catch (e) {
      }
    }
  };
  function tansParams(params) {
    let result = "";
    for (const propName of Object.keys(params)) {
      const value = params[propName];
      var part = encodeURIComponent(propName) + "=";
      if (value !== null && value !== "" && typeof value !== "undefined") {
        if (typeof value === "object") {
          for (const key of Object.keys(value)) {
            if (value[key] !== null && value[key] !== "" && typeof value[key] !== "undefined") {
              let params2 = propName + "[" + key + "]";
              var subPart = encodeURIComponent(params2) + "=";
              result += subPart + encodeURIComponent(value[key]) + "&";
            }
          }
        } else {
          result += part + encodeURIComponent(value) + "&";
        }
      }
    }
    return result;
  }
  const request = (config) => {
    var _a;
    if (config.data && config.data.Loading || config.params && ((_a = config.params) == null ? void 0 : _a.Loading)) {
      uni.showLoading({ title: "加载中" });
      let time = 0;
      var myInterval = setInterval(() => {
        time = time + 1e3;
        if (time >= 6e3)
          uni.showLoading({ title: "当前网络较慢" });
      }, 1e3);
    }
    if (config.params) {
      let url = config.url + "?" + tansParams(config.params);
      url = url.slice(0, -1);
      config.url = url;
    }
    const token = storage.get("userStore") ? storage.get("userStore").token : null;
    return new Promise((resolve, reject) => {
      uni.request({
        // url: config.baseUrl || 'http://192.168.43.245:7001/api/app' + config.url,
        url: config.baseUrl || "http://127.0.0.1:7001/api/app" + config.url,
        method: config.method || "get",
        timeout: config.timeout || 1e4,
        data: config.data,
        header: {
          Authorization: `Bearer ${token}`,
          ...config.header
        },
        dataType: "json",
        success: (res) => {
          if (res.errMsg != "request:ok") {
            reject("请求失败");
            return uni.showToast({ title: res.errMsg, icon: "none", duration: 2e3 });
          }
          if (res.data.code == 200 || res.data.code == 0) {
            resolve(res.data);
          } else if (res.data.code == 400) {
            formatAppLog("log", "at utils/request.ts:43", res);
            reject("400");
            return uni.showToast({ icon: "none", title: res.data.message });
          } else if (res.data.code == 401) {
            reject("401");
            uni.showToast({ icon: "none", title: "认证失败,请重新登录" });
            setTimeout(() => {
              uni.reLaunch({ url: "/pages/index/login" });
            }, 1500);
          } else if (res.data.code == 403) {
            reject("403");
            return uni.showToast({ icon: "none", title: "无权限操作" });
          } else {
            reject(res.data);
            uni.showToast({ title: res.data.message, icon: "none", duration: 2e3 });
          }
        },
        fail: (error) => {
          formatAppLog("log", "at utils/request.ts:61", "error", error);
          uni.showToast({ title: "请求失败,请稍后再试", icon: "none", duration: 2e3 });
          reject(error);
        },
        complete: (res) => {
          var _a2;
          if (config.data && config.data.Loading || config.params && ((_a2 = config.params) == null ? void 0 : _a2.Loading)) {
            uni.hideLoading();
            clearInterval(myInterval);
          }
          if (res.statusCode == "500") {
            reject("服务器开小差了,请稍后再试");
            uni.showToast({
              title: "服务器开小差了,请稍后再试",
              icon: "none",
              duration: 2e3
            });
          }
        }
      });
    });
  };
  const smsLogin = (data) => {
    return request({
      url: "/user/smsLogin",
      method: "POST",
      data
    });
  };
  const getUserInfo = () => {
    return request({
      url: "/user/getUserInfo",
      method: "GET"
    });
  };
  const localLogin = (data) => {
    return request({
      url: "/user/localLogin",
      method: "POST",
      data
    });
  };
  const smsUpdatePassword = (data) => {
    return request({
      url: "/user/smsUpdatePassword",
      method: "POST",
      data
    });
  };
  const qrScannedLogin = (data) => {
    return request({
      url: "/app/qrCode/scanned",
      method: "post",
      data
    });
  };
  const qrConfirmLogin = (data) => {
    return request({
      url: "/app/qrCode/confirm",
      method: "post",
      data
    });
  };
  const qrCancelLogin = (data) => {
    return request({
      url: "/app/qrCode/cancel",
      method: "post",
      data
    });
  };
  const useUserStore = defineStore("userStore", {
    unistorage: {
      key: "userStore",
      // paths: ['appName', 'version'], 
      serializer: {
        serialize(v) {
          return JSON.stringify(v);
        },
        deserialize(v) {
          return JSON.parse(v);
        }
      }
    },
    state: () => ({
      username: "",
      token: "",
      avatar: "",
      userInfo: {},
      roles: [],
      menus: [],
      permissions: []
    }),
    getters: {},
    actions: {
      getUserInfo() {
        return new Promise((resolve, reject) => {
          getUserInfo().then(({ data: { user, token } }) => {
            this.username = user.username;
            this.userInfo = user;
            this.token = token;
            this.avatar = "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg";
            resolve({ user, token });
          }).catch(() => {
            reject();
          });
        });
      },
      logout() {
        return new Promise((resolve) => {
          this.username = "";
          this.userInfo = {};
          this.token = "";
          this.avatar = "";
          resolve({ message: "退出登录成功" });
        });
      },
      // 验证码登录 and 注册
      smsLogin(data) {
        return new Promise((resolve, reject) => {
          smsLogin(data).then((res) => {
            this.token = res.data;
            resolve(res.data);
          }).catch(() => {
            reject();
          });
        });
      },
      // 本地账户密码登录 and 注册
      localLogin(data) {
        return new Promise((resolve, reject) => {
          localLogin(data).then((res) => {
            this.token = res.data;
            resolve(res.data);
          }).catch(() => {
            reject();
          });
        });
      },
      // 本地账户密码登录 and 注册
      smsUpdatePassword(data) {
        return new Promise((resolve, reject) => {
          smsUpdatePassword(data).then((res) => {
            this.token = res.data;
            resolve(res.data);
          }).catch(() => {
            reject();
          });
        });
      }
    }
  });
  const router = {
    /**
     * 关闭当前页面，返回上一页面或多级页面
     * @param {Objct} payload 配置
     * @param {string} payload.url 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'，path为下一个页面的路径，下一个页面的onLoad函数可得到传递的参数 必填
     * @param {string} payload.animationType 窗口关闭的动画效果。 默认值：'pop-out'
     * @param {number} payload.animationDuration 窗口关闭动画的持续时间，单位为 ms。 默认值：300
     * @param {Objct} payload.events 页面间通信接口，用于监听被打开页面发送到当前页面的数据。2.8.9+ 开始支持。
     * @example push({url:'/pages/index/index'})
     */
    push: (payload) => {
      if (typeof payload === "object") {
        uni.navigateTo(payload);
      } else {
        uni.navigateTo({ url: payload });
      }
    },
    /**
     * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。 
     * 是否必填：必填
     * 注意： 如果调用了 uni.preloadPage(OBJECT) 不会关闭，仅触发生命周期 onHide
     * @param {string} url 需要跳转的 tabBar 页面的路径（需在 pages.json 的 tabBar 字段定义的页面），路径后不能带参数
     * @example tab({url:'/pages/index/index'})
     */
    tab: (url) => {
      uni.switchTab({ url });
    },
    /**
     * 关闭所有页面，打开到应用内的某个页面。 
     * 是否必填：必填
     * 注意： 如果调用了 uni.preloadPage(OBJECT) 不会关闭，仅触发生命周期 onHide
     * @param {string} url 需要跳转的应用内页面路径 , 路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'，如果跳转的页面路径是 tabBar 页面则不能带参数
     * @example reLaunch({url:'/pages/index/index'})
     */
    reLaunch: (url) => {
      uni.reLaunch({ url });
    },
    /**
     * 关闭当前页面，跳转到应用内的某个页面。
     * 是否必填：必填
     * @param {string} url 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'
     * @example redirect({url:'/pages/index/index'})
     */
    redirect: (url) => {
      uni.redirectTo({ url });
    },
    /**
     * 关闭当前页面，返回上一页面或多级页面
     * @param {Objct} payload 配置
     * @param {number} payload.delta 返回的页面数，如果 delta 大于现有页面数，则返回到首页。 默认值：1
     * @param {string} payload.animationType 窗口关闭的动画效果。 默认值：'pop-out'
     * @param {number} payload.animationDuration 窗口关闭动画的持续时间，单位为 ms。 默认值：300
     * @example redirect({delta:1})
     */
    back: (payload) => {
      if (typeof payload === "object") {
        uni.navigateBack(payload);
      } else {
        uni.navigateBack();
      }
    }
  };
  const prompt$1 = {
    /**
     * @description 显示消息提示框。
     * @param {string ｜ object} option ShowToastOptions or string
     * @example msg('您有新短消息') ｜ msg({
    			title: '您有新短消息',
    			icon: "none",
    			duration: 2000
    		})
     */
    msg: (option) => {
      if (typeof option === "object") {
        uni.showToast(option);
      } else {
        uni.showToast({
          title: option,
          icon: "none",
          duration: 2e3
        });
      }
    },
    /**
     * @description 显示错误消息提示框。
     * @param {string} content content
     * @example errorMsg('请求失败') 
     */
    errorMsg: (content) => {
      uni.showToast({
        title: content,
        icon: "error"
      });
    },
    /**
     * @description 显示成功消息提示框。
     * @param {string} content content
     * @example msgSuccess('操作成功') 
     */
    successMsg: (content) => {
      uni.showToast({
        title: content,
        icon: "success"
      });
    },
    /**
     * @description 隐藏提示框。
     * @example hideMsg() 
     */
    hideMsg: () => {
      uni.hideToast();
    },
    /**
     * @description 显示 loading 提示框, 需主动调用 hideLoading 才能关闭提示框。
     * @example loading('加载中') ｜ loading()
     */
    loading: (content) => {
      if (typeof content === "string") {
        uni.showLoading({
          title: content,
          mask: true
        });
      } else {
        uni.showLoading({
          title: "加载中",
          mask: true
        });
      }
    },
    /**
     * @description 隐藏 loading 提示框。
     * @example hideLoading() 
     */
    hideLoading: () => {
      uni.hideLoading();
    },
    /**
     * @description 显示模态弹窗，只有一个确定按钮
     * @example alert('撤销成功') ｜ alert({
    	 title:'系统提示',
    	 content:'撤销成功'
     }) 
     */
    alert: (option) => {
      if (typeof option === "object") {
        uni.showModal({
          title: option.title || "提示",
          content: option.content,
          confirmText: option.confirmText || "确定",
          showCancel: false
        });
      } else {
        uni.showModal({
          title: "提示",
          content: option,
          showCancel: false
        });
      }
    },
    /**
     * @description 确认窗体 显示模态弹窗，可以只有一个确定按钮，也可以同时有确定和取消按钮。类似于一个API整合了 html 中：alert、confirm。
     * @example confirm('确定要签到吗?').then(=>{
    	__f__('log','at utils/prompt.ts:112','点击了确认');
    	}).catch(() => {
    		 __f__('log','at utils/prompt.ts:114','点击了取消');
    	})
    	｜
    	confirm({
    	 title:'系统提示',
    	 content:'确认要撤销吗?',
    	 confirmText:'确定',
    	 cancelText:'取消'
     }).then(=>{
    	__f__('log','at utils/prompt.ts:123','点击了确认');
    	}).catch(() => {
    		 __f__('log','at utils/prompt.ts:125','点击了取消');
    	})
     */
    confirm: (option) => {
      return new Promise((resolve, reject) => {
        if (typeof option === "object") {
          uni.showModal({
            title: option.title || "",
            content: option.content,
            confirmText: option.confirmText || "确定",
            cancelText: option.cancelText || "取消",
            success(res) {
              if (res.confirm) {
                resolve(res.confirm);
              } else if (res.cancel) {
                reject(res.cancel);
              }
            }
          });
        } else {
          uni.showModal({
            title: "系统提示",
            content: option,
            cancelText: "取消",
            confirmText: "确定",
            success: function(res) {
              if (res.confirm) {
                resolve(res.confirm);
              } else if (res.cancel) {
                reject(res.cancel);
              }
            }
          });
        }
      });
    }
  };
  const _sfc_main$J = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const userStore = useUserStore();
      onLoad(() => {
      });
      let userInfo = vue.reactive({});
      vue.ref(0);
      vue.ref([]);
      vue.reactive({
        pageNum: 1,
        pageSize: 10
      });
      vue.ref([{ name: "全部" }, { name: "文章" }, { name: "视频" }, { name: "问答" }, { name: "小视频" }, { name: "微头条" }]);
      let twoGridList = vue.ref([
        {
          icon: "icon-pinglun",
          text: "评论",
          url: "/pages/mine/content/index",
          type: "comment"
        },
        {
          icon: "icon-shoucang",
          text: "收藏",
          url: "/pages/mine/content/index",
          type: "collect"
        },
        {
          icon: "icon-xiazai",
          text: "下载",
          url: "./download/index"
        },
        {
          icon: "icon-lishi",
          text: "历史",
          url: "/pages/mine/content/index",
          type: "history"
        },
        {
          icon: "icon-xiaoxi",
          text: "消息",
          url: "./message/index"
        },
        {
          icon: "icon-dianzan",
          text: "点赞",
          url: "/pages/mine/content/index",
          type: "like"
        },
        {
          icon: "icon-jubao",
          text: "举报",
          url: "/pages/mine/content/index",
          type: "report"
        },
        {
          icon: "icon-quanbu",
          text: "全部",
          url: "./allService"
        }
      ]);
      const tapScan = () => {
        formatAppLog("log", "at pages/mine/index.vue:154", "tapScan");
        if (!storage.get("token"))
          return prompt$1.msg("请登录后再扫码！");
        uni.scanCode({
          success: (res) => {
            formatAppLog("log", "at pages/mine/index.vue:161", "条码类型：" + res.scanType);
            formatAppLog("log", "at pages/mine/index.vue:162", "条码内容：" + res.result);
            let result = JSON.parse(res.result);
            if (result.type == "login") {
              qrScannedLogin({ qrcodeId: result.qrcodeId }).then((qrRes) => {
                formatAppLog("log", "at pages/mine/index.vue:166", qrRes);
                storage.set("qrCode", { ...result, ...qrRes });
                router.push({ url: "/pages/login/confirmLogin" });
              }).catch((err) => {
                formatAppLog("log", "at pages/mine/index.vue:170", err);
              });
            }
          }
        });
      };
      let goToPublish = () => {
        prompt$1.msg("请先登录");
      };
      let toLogin = () => {
        router.push("/pages/login/login");
      };
      const tapItem = (row) => {
        formatAppLog("log", "at pages/mine/index.vue:198", row);
        if (row.url) {
          if (row.type) {
            router.push(`${row.url}?type=${row.type}`);
          } else {
            router.push(`${row.url}`);
          }
        } else {
          return prompt$1.msg(`${row.text} 功能未实现`);
        }
      };
      return (_ctx, _cache) => {
        var _a, _b, _c, _d, _e;
        const _component_my_nav_bar = resolveEasycom(vue.resolveDynamicComponent("my-nav-bar"), __easycom_0$4);
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.createVNode(_component_my_nav_bar, {
            "bg-color": "transparent",
            onClickLeft: tapScan
          }, {
            left: vue.withCtx(() => [
              vue.createElementVNode("text", { class: "iconfont icon-saoyisao" })
            ]),
            right: vue.withCtx(() => [
              vue.createElementVNode(
                "view",
                {
                  class: "my-nav-bar-right",
                  style: vue.normalizeStyle({ width: vue.unref(userStore).token ? "60px" : "" })
                },
                [
                  vue.unref(userStore).token ? (vue.openBlock(), vue.createElementBlock("text", {
                    key: 0,
                    class: "iconfont icon-jiahao text-black",
                    onClick: _cache[0] || (_cache[0] = //@ts-ignore
                    (...args) => vue.unref(goToPublish) && vue.unref(goToPublish)(...args))
                  })) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode("text", {
                    class: "iconfont icon-set text-black text-18px",
                    onClick: _cache[1] || (_cache[1] = ($event) => vue.unref(router).push("/pages/mine/setting/index"))
                  })
                ],
                4
                /* STYLE */
              )
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "one" }, [
            vue.createElementVNode("view", null, [
              vue.unref(userStore).token ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "info"
              }, [
                vue.createElementVNode("view", { class: "info-one" }, [
                  vue.createElementVNode("view", { class: "logo" }, [
                    vue.createElementVNode("image", {
                      class: "w-70px h-70px",
                      src: vue.unref(userStore).avatar,
                      mode: "scaleToFill"
                    }, null, 8, ["src"])
                  ]),
                  vue.createElementVNode("view", { class: "info-name" }, [
                    vue.createElementVNode(
                      "view",
                      { class: "name" },
                      vue.toDisplayString(vue.unref(userStore).username || "你的maya"),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", null, [
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString(((_a = vue.unref(userInfo)) == null ? void 0 : _a.myFocus) || 0) + "关注",
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString(((_b = vue.unref(userInfo)) == null ? void 0 : _b.myFans) || 0) + "粉丝",
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString(((_c = vue.unref(userInfo)) == null ? void 0 : _c.praise) || 0) + "获赞",
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ]),
                vue.createElementVNode(
                  "view",
                  { class: "info-two" },
                  "介绍：" + vue.toDisplayString(((_d = vue.unref(userInfo)) == null ? void 0 : _d.introduce) || "它很懒，什么都没介绍。"),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "info-three" },
                  "IP 属地：" + vue.toDisplayString(((_e = vue.unref(userInfo)) == null ? void 0 : _e.city) || "未知"),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { class: "info-four" }, [
                  vue.createElementVNode("view", {
                    class: "button",
                    onClick: _cache[2] || (_cache[2] = ($event) => vue.unref(prompt$1).msg("暂时未开发此功能"))
                  }, [
                    vue.createElementVNode("text", { class: "iconfont icon-fenxiang" }),
                    vue.createElementVNode("text", { class: "text" }, "申请认证")
                  ]),
                  vue.createElementVNode("view", {
                    class: "button",
                    onClick: _cache[3] || (_cache[3] = ($event) => vue.unref(router).push("/pages/mine/setting/profile/index"))
                  }, [
                    vue.createElementVNode("text", { class: "iconfont icon-fenxiang" }),
                    vue.createElementVNode("text", { class: "text" }, "编辑资料")
                  ]),
                  vue.createElementVNode("view", {
                    class: "button button-mini",
                    onClick: _cache[4] || (_cache[4] = ($event) => vue.unref(prompt$1).msg("暂时未开发此功能"))
                  }, [
                    vue.createElementVNode("text", { class: "iconfont icon-fenxiang" })
                  ])
                ])
              ])) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "cover",
                onClick: _cache[5] || (_cache[5] = //@ts-ignore
                (...args) => vue.unref(toLogin) && vue.unref(toLogin)(...args))
              }, "登录"))
            ])
          ]),
          vue.createElementVNode("view", { class: "channel-list" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(vue.unref(twoGridList), (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "channel-item rd-4px",
                  key: index,
                  onClick: ($event) => tapItem(item)
                }, [
                  vue.createElementVNode(
                    "text",
                    {
                      class: vue.normalizeClass(["iconfont", item.icon])
                    },
                    null,
                    2
                    /* CLASS */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "item-text" },
                    vue.toDisplayString(item.text),
                    1
                    /* TEXT */
                  )
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          vue.createElementVNode("view", { class: "bottom" }, [
            !vue.unref(userStore).token ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "three"
            }, [
              vue.createElementVNode("view", null, [
                vue.createElementVNode("text", null, "“"),
                vue.createTextVNode(" 分享今天值得记录的瞬间 "),
                vue.createElementVNode("text", null, "”")
              ]),
              vue.unref(userStore).token ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "btn-publish",
                onClick: _cache[6] || (_cache[6] = //@ts-ignore
                (...args) => vue.unref(goToPublish) && vue.unref(goToPublish)(...args))
              }, "发布")) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "btn-publish",
                onClick: _cache[7] || (_cache[7] = //@ts-ignore
                (...args) => vue.unref(toLogin) && vue.unref(toLogin)(...args))
              }, "去登录"))
            ])) : (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "four"
            }, [
              vue.createCommentVNode(' <u-sticky bgColor="#fff">\n					<u-tabs :list="myList">\n					</u-tabs>\n				</u-sticky> ')
            ]))
          ]),
          vue.createCommentVNode(' <u-popup :show="isAllServiceShow" mode="right" @close="isAllServiceShow = false" @open="isAllServiceShow = true" >\n				<AllService @close="isAllServiceShow=false"/>\n		</u-popup> ')
        ]);
      };
    }
  });
  const PagesMineIndex = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["__scopeId", "data-v-569e925a"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/index.vue"]]);
  const _imports_0$3 = "/static/images/guide/guide-1.jpg";
  const _imports_1 = "/static/images/guide/guide-2.jpg";
  const _imports_2 = "/static/images/guide/guide-3.jpg";
  const _imports_3 = "/static/images/guide/guide-4.jpg";
  const getAppVersion = (version) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        formatAppLog("log", "at api/app.ts:11", 3);
        resolve({
          "msg": "操作成功",
          "code": 200,
          "data": {
            "version": "1.0.0",
            "url": "#",
            "update": true
          }
        });
      }, 1500);
    });
  };
  const useAppStore = defineStore("appStore", {
    // unistorage: true, // 是否持久化
    unistorage: {
      // true
      key: "appStore",
      // 缓存的键，默认为该 store 的 id，这里是 appStore,
      paths: ["appName", "version", "launchFlag"],
      // 需要缓存的路径，这里设置 appName 和 version 下的 data 会被缓存
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
      launchFlag: false,
      systemInfo: uni.getSystemInfoSync(),
      appName: "mayaApp",
      // 应用名称
      version: "1.0.0",
      // 应用版本
      logo: "/static/logo.png",
      // 应用logo
      site_url: "http://hnsilian.cn",
      // 官方网站
      homeUrl: "/pages/index/index",
      //首页地址
      request: {
        timeout: 1e4,
        dataType: "json",
        baseUrl: ""
        // 请求基本地址
      },
      // 政策协议
      agreements: [
        {
          title: "隐私政策",
          url: "/pages/privacyAgreement"
        },
        {
          title: "用户服务协议",
          url: "/pages/userAgreement"
        }
      ]
    }),
    getters: {},
    actions: {
      // 检测app是否需要更新版本
      checkUpdate() {
        getAppVersion(this.systemInfo.appVersion).then((result) => {
          formatAppLog("log", "at store/app.ts:52", result);
          if (!result.data.update)
            return;
          uni.showModal({
            title: "新版本发布",
            content: "检查到当前有新版本,需要更新吗？",
            confirmText: "立即更新",
            success: (res) => {
              if (res.confirm) {
                uni.showLoading({
                  title: "正在下载"
                });
                uni.downloadFile({
                  url: result.data.url,
                  success: (downloadResult) => {
                    if (downloadResult.statusCode === 200) {
                      uni.showLoading({
                        title: "安装中.."
                      });
                      plus.runtime.install(downloadResult.tempFilePath, {
                        force: true
                      }, function() {
                        formatAppLog("log", "at store/app.ts:73", "install success...");
                        uni.setStorageSync("version", result.data.version);
                        uni.hideLoading();
                        plus.runtime.restart();
                      }, function(e) {
                        formatAppLog("log", "at store/app.ts:78", "e：" + JSON.stringify(e));
                        uni.hideLoading();
                        uni.showToast({
                          title: "安装失败:" + JSON.stringify(e),
                          duration: 1500
                        });
                      });
                    }
                  }
                });
              } else if (res.cancel) {
                this.handleAppOut();
              }
            }
          });
        });
      },
      // 退出APP
      handleAppOut() {
        if (this.systemInfo.platform == "android") {
          plus.runtime.quit();
        } else {
          plus.ios.import("UIApplication").sharedApplication().performSelector("exit");
        }
      },
      /**
      * 获取本地存储中launchFlag的值
      * 若存在，说明不是首次启动，直接进入首页；
      * 若不存在，说明是首次启动，进入引导页；
      */
      loadExecution() {
        let url = this.launchFlag ? "/pages/home/home" : "/pages/common/guide/index";
        uni.reLaunch({ url });
      }
    }
  });
  const _sfc_main$I = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      vue.useCssVars((_ctx) => ({
        "4ddeaa10-safeAreaInsetsBottom": safeAreaInsetsBottom,
        "4ddeaa10-safeAreaInsetsTop": vue.unref(safeAreaInsetsTop)
      }));
      const appStore = useAppStore();
      const safeAreaInsetsBottom = appStore.systemInfo.safeAreaInsets.bottom + "px";
      let safeAreaInsetsTop = "0px";
      safeAreaInsetsTop = appStore.systemInfo.safeAreaInsets.top + 10 + "px";
      let current = vue.ref(0);
      const swiperChange = (e) => {
        current.value = e.detail.current;
      };
      let isChecked = vue.ref(false);
      const checkboxChange = (e) => {
        isChecked.value = e.detail.value.length ? true : false;
      };
      const handlePrivacy = () => {
        let site = appStore.agreements[0];
        uni.navigateTo({ url: `/pages/common/webview/index?title=${site.title}&url=${site.url}` });
      };
      const handleUserAgrement = () => {
        let site = appStore.agreements[1];
        uni.navigateTo({ url: `/pages/common/webview/index?title=${site.title}&url=${site.url}` });
      };
      const openApp = () => {
        if (!isChecked.value)
          return uni.showToast({
            title: "请先勾选同意并接受",
            icon: "none"
          });
        appStore.launchFlag = true;
        appStore.loadExecution();
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "guide" }, [
          vue.createElementVNode(
            "swiper",
            {
              class: "swiper",
              "indicator-dots": "",
              onChange: swiperChange
            },
            [
              vue.createElementVNode("swiper-item", { class: "swiper-item" }, [
                vue.createElementVNode("image", {
                  class: "image",
                  src: _imports_0$3,
                  mode: "aspectFill"
                })
              ]),
              vue.createElementVNode("swiper-item", { class: "swiper-item" }, [
                vue.createElementVNode("image", {
                  class: "image",
                  src: _imports_1,
                  mode: "aspectFill"
                })
              ]),
              vue.createElementVNode("swiper-item", { class: "swiper-item" }, [
                vue.createElementVNode("image", {
                  class: "image",
                  src: _imports_2,
                  mode: "aspectFill"
                })
              ]),
              vue.createElementVNode("swiper-item", { class: "swiper-item" }, [
                vue.createElementVNode("image", {
                  class: "image",
                  src: _imports_3,
                  mode: "aspectFill"
                })
              ])
            ],
            32
            /* NEED_HYDRATION */
          ),
          vue.unref(current) !== 3 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "right-top",
            onClick: openApp
          }, " 跳过 ")) : vue.createCommentVNode("v-if", true),
          vue.unref(current) === 3 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "bottom"
          }, [
            vue.createElementVNode("view", {
              class: "button",
              onClick: openApp
            }, [
              vue.createElementVNode("view", { class: "button-text" }, [
                vue.createElementVNode("text", null, "立"),
                vue.createElementVNode("text", null, "即"),
                vue.createElementVNode("text", null, "开"),
                vue.createElementVNode("text", null, "启")
              ])
            ]),
            vue.createElementVNode("view", { class: "privacy" }, [
              vue.createElementVNode(
                "checkbox-group",
                {
                  class: "checkbox-group",
                  onChange: checkboxChange
                },
                [
                  vue.createElementVNode("checkbox", {
                    checked: vue.unref(isChecked),
                    color: "#60a5fa",
                    style: { "transform": "scale(0.6)" }
                  }, null, 8, ["checked"])
                ],
                32
                /* NEED_HYDRATION */
              ),
              vue.createElementVNode("text", { class: "text" }, "同意并接受"),
              vue.createElementVNode("text", {
                class: "text text-blue",
                onClick: handlePrivacy
              }, "《服务协议》"),
              vue.createElementVNode("text", { class: "text" }, " 和 "),
              vue.createElementVNode("text", {
                class: "text text-blue",
                onClick: handleUserAgrement
              }, "《个人信息保护政策》")
            ])
          ])) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  });
  const PagesCommonGuideIndex = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["__scopeId", "data-v-4ddeaa10"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/common/guide/index.vue"]]);
  const _sfc_main$H = /* @__PURE__ */ vue.defineComponent({
    __name: "allService",
    setup(__props) {
      let serviceList = vue.ref([
        {
          title: "精选工具",
          data: [
            {
              text: "下载管理",
              icon: "icon-xiazai",
              url: "/pages/mine/download/index",
              type: "download"
            },
            { text: "客服中心", icon: "icon-kefu" },
            { text: "大字模式", icon: "icon-zitifangda" },
            { text: "夜间模式", icon: "icon-yejian" },
            { text: "消息", icon: "icon-xiaoxi" }
          ]
        },
        {
          title: "创作中心",
          data: [
            { text: "创作首页", icon: "icon-chuangzuo" },
            { text: "数据助手", icon: "icon-shujukanban" },
            { text: "收益提现", icon: "icon-licaishouyi" },
            { text: "活动广场", icon: "icon-huodong" }
          ]
        },
        {
          title: "我的内容",
          data: [
            {
              text: "浏览历史",
              icon: "icon-lishi",
              url: "/pages/mine/content/index",
              type: "history"
            },
            {
              text: "评论",
              icon: "icon-pinglun",
              url: "/pages/mine/content/index",
              type: "comment"
            },
            {
              text: "点赞",
              icon: "icon-dianzan",
              url: "/pages/mine/content/index",
              type: "like"
            },
            {
              text: "收藏",
              icon: "icon-shoucang",
              url: "/pages/mine/content/index",
              type: "collect"
            },
            {
              icon: "icon-jubao",
              text: "举报",
              url: "/pages/mine/content/index",
              type: "report"
            }
          ]
        },
        {
          title: "我的服务",
          data: [
            { text: "钱包", icon: "icon-xiazai" },
            { text: "借钱", icon: "icon-pinglun" },
            { text: "免流量", icon: "icon-dianzan" },
            { text: "我的订单", icon: "icon-shoucang" },
            { text: "优惠券", icon: "icon-shoucang" },
            { text: "地址管理", icon: "icon-shoucang" },
            { text: "任务", icon: "icon-shoucang" }
          ]
        }
      ]);
      const tapItem = (row) => {
        if (row.url) {
          if (row.type) {
            router.push(`${row.url}?type=${row.type}`);
          } else {
            router.push(`${row.url}`);
          }
        } else {
          return prompt$1.msg(`${row.text} 功能未实现`);
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.createCommentVNode(' <my-nav-bar title="全部服务" border :clickLeft="router.back" /> '),
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(vue.unref(serviceList), (service) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "Panel",
                key: service.title
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "Panel-title" },
                  vue.toDisplayString(service.title),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { class: "channel-list" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(service.data, (item, index) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: "channel-item rd-4px",
                        key: index,
                        onClick: ($event) => tapItem(item)
                      }, [
                        vue.createElementVNode(
                          "text",
                          {
                            class: vue.normalizeClass(["iconfont", item.icon])
                          },
                          null,
                          2
                          /* CLASS */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "item-text" },
                          vue.toDisplayString(item.text),
                          1
                          /* TEXT */
                        )
                      ], 8, ["onClick"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]);
      };
    }
  });
  const PagesMineAllService = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["__scopeId", "data-v-ca6f6c41"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/allService.vue"]]);
  const _sfc_main$G = {};
  function _sfc_render$8(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "download" }, [
      vue.createCommentVNode(' <u-empty mode="data"  text="暂无下载内容"/> '),
      vue.createElementVNode("text", { class: "iconfont icon-xiazai" }),
      vue.createElementVNode("text", { class: "text" }, "暂无下载内容")
    ]);
  }
  const PagesMineDownloadIndex = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["render", _sfc_render$8], ["__scopeId", "data-v-5d45996a"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/download/index.vue"]]);
  const _imports_0$2 = "/static/logo.png";
  const _sfc_main$F = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const rightClick = () => {
        router.push("/pages/mine/setting/message/index");
      };
      return (_ctx, _cache) => {
        const _component_my_nav_bar = resolveEasycom(vue.resolveDynamicComponent("my-nav-bar"), __easycom_0$4);
        return vue.openBlock(), vue.createElementBlock("view", { class: "message" }, [
          vue.createVNode(_component_my_nav_bar, {
            title: "消息私信",
            rightText: "设置",
            border: "",
            fixed: "",
            onClickLeft: _cache[0] || (_cache[0] = ($event) => vue.unref(router).back()),
            onClickRight: rightClick
          }),
          vue.createElementVNode("view", { class: "message-list" }, [
            vue.createElementVNode("view", { class: "message-item" }, [
              vue.createElementVNode("image", {
                class: "item-left",
                src: _imports_0$2,
                mode: "scaleToFill"
              }),
              vue.createElementVNode("view", { class: "item-center" }, [
                vue.createElementVNode("text", { class: "title" }, "评论和@"),
                vue.createElementVNode("text", { class: "desc" }, "小温暖 回复了你")
              ]),
              vue.createElementVNode("view", { class: "item-right" }, [
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", { class: "message-item" }, [
              vue.createElementVNode("image", {
                class: "item-left",
                src: _imports_0$2,
                mode: "scaleToFill"
              }),
              vue.createElementVNode("view", { class: "item-center" }, [
                vue.createElementVNode("text", { class: "title" }, "点赞"),
                vue.createElementVNode("text", { class: "desc" }, "你的maya 点赞了你的视频")
              ]),
              vue.createElementVNode("view", { class: "item-right" }, [
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", { class: "message-item" }, [
              vue.createElementVNode("image", {
                class: "item-left",
                src: _imports_0$2,
                mode: "scaleToFill"
              }),
              vue.createElementVNode("view", { class: "item-center" }, [
                vue.createElementVNode("text", { class: "title" }, "粉丝"),
                vue.createElementVNode("text", { class: "desc" }, "小温暖 关注了你")
              ]),
              vue.createElementVNode("view", { class: "item-right" }, [
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "message-list mt-6px" }, [
            vue.createElementVNode("view", { class: "message-item" }, [
              vue.createElementVNode("image", {
                class: "item-left",
                src: _imports_0$2,
                mode: "scaleToFill"
              }),
              vue.createElementVNode("view", { class: "item-center" }, [
                vue.createElementVNode("text", { class: "title" }, "闹闹的开心"),
                vue.createElementVNode("text", { class: "desc" }, "感谢关注！记得常来串门哦")
              ]),
              vue.createElementVNode("view", { class: "item-right" }, [
                vue.createElementVNode("text", { class: "time" }, "刚刚"),
                vue.createElementVNode("view", { class: "badge" }, "1")
              ])
            ]),
            vue.createElementVNode("view", { class: "message-item" }, [
              vue.createElementVNode("image", {
                class: "item-left",
                src: _imports_0$2,
                mode: "scaleToFill"
              }),
              vue.createElementVNode("view", { class: "item-center" }, [
                vue.createElementVNode("text", { class: "title" }, "创作通知"),
                vue.createElementVNode("text", { class: "desc" }, "邀请您参加热门话题讨论 快来看看吧")
              ]),
              vue.createElementVNode("view", { class: "item-right" }, [
                vue.createElementVNode("text", { class: "time" }, "04-30"),
                vue.createElementVNode("view", { class: "badge" }, "2")
              ])
            ]),
            vue.createElementVNode("view", { class: "message-item" }, [
              vue.createElementVNode("image", {
                class: "item-left",
                src: _imports_0$2,
                mode: "scaleToFill"
              }),
              vue.createElementVNode("view", { class: "item-center" }, [
                vue.createElementVNode("text", { class: "title" }, "活动通知"),
                vue.createElementVNode("text", { class: "desc" }, "官方@你签收五一明信片 🎑")
              ]),
              vue.createElementVNode("view", { class: "item-right" }, [
                vue.createElementVNode("text", { class: "time" }, "04-30"),
                vue.createElementVNode("view", { class: "badge" }, "2")
              ])
            ]),
            vue.createElementVNode("view", { class: "message-item" }, [
              vue.createElementVNode("image", {
                class: "item-left",
                src: _imports_0$2,
                mode: "scaleToFill"
              }),
              vue.createElementVNode("view", { class: "item-center" }, [
                vue.createElementVNode("text", { class: "title" }, "系统通知"),
                vue.createElementVNode("text", { class: "desc" }, "亲爱的头条用户你好，诚邀你填写问卷，你的真实体验、评价和建议对我们非常重要！")
              ]),
              vue.createElementVNode("view", { class: "item-right" }, [
                vue.createElementVNode("text", { class: "time" }, "04-22"),
                vue.createElementVNode("view", { class: "badge" }, "1")
              ])
            ]),
            vue.createElementVNode("view", { class: "message-item" }, [
              vue.createElementVNode("image", {
                class: "item-left",
                src: _imports_0$2,
                mode: "scaleToFill"
              }),
              vue.createElementVNode("view", { class: "item-center" }, [
                vue.createElementVNode("text", { class: "title" }, "头条小组"),
                vue.createElementVNode("text", { class: "desc" }, "亲爱的你的Maya，你加入的【 程序员摸鱼小组 】小组#为什么有些公司不招大龄程序员#话题正在热议中！")
              ]),
              vue.createElementVNode("view", { class: "item-right" }, [
                vue.createElementVNode("text", { class: "time" }, "04-02"),
                vue.createElementVNode("view", { class: "badge" }, "2")
              ])
            ]),
            vue.createElementVNode("view", { class: "message-item" }, [
              vue.createElementVNode("image", {
                class: "item-left",
                src: _imports_0$2,
                mode: "scaleToFill"
              }),
              vue.createElementVNode("view", { class: "item-center" }, [
                vue.createElementVNode("text", { class: "title" }, "订阅通知"),
                vue.createElementVNode("text", { class: "desc" }, "亲爱的你的Maya，极目新闻诚邀你参与话题 #雪龙2 号进入北极圈将开始科考作业#讨论")
              ]),
              vue.createElementVNode("view", { class: "item-right" }, [
                vue.createElementVNode("text", { class: "time" }, "2023-04-02"),
                vue.createElementVNode("view", { class: "badge" }, "1")
              ])
            ]),
            vue.createElementVNode("view", { class: "message-item" }, [
              vue.createElementVNode("image", {
                class: "item-left",
                src: _imports_0$2,
                mode: "scaleToFill"
              }),
              vue.createElementVNode("view", { class: "item-center" }, [
                vue.createElementVNode("text", { class: "title" }, "头条百科"),
                vue.createElementVNode("text", { class: "desc" }, "你的Maya，为了更好地传播知识，平台正着力打造一款全新且高质量的百科产品")
              ]),
              vue.createElementVNode("view", { class: "item-right" }, [
                vue.createElementVNode("text", { class: "time" }, "2023-04-02"),
                vue.createElementVNode("view", { class: "badge" }, "1")
              ])
            ]),
            vue.createElementVNode("view", { class: "message-item" }, [
              vue.createElementVNode("image", {
                class: "item-left",
                src: _imports_0$2,
                mode: "scaleToFill"
              }),
              vue.createElementVNode("view", { class: "item-center" }, [
                vue.createElementVNode("text", { class: "title" }, "审核通知"),
                vue.createElementVNode("text", { class: "desc" }, "亲爱的创造者，你对已发表文章《Vue3项目的两种方法创建方法》的修改已通过审核，内容正常推荐中。")
              ]),
              vue.createElementVNode("view", { class: "item-right" }, [
                vue.createElementVNode("text", { class: "time" }, "2023-04-02"),
                vue.createElementVNode("view", { class: "badge" }, "1")
              ])
            ]),
            vue.createElementVNode("view", { class: "message-item" }, [
              vue.createElementVNode("image", {
                class: "item-left",
                src: _imports_0$2,
                mode: "scaleToFill"
              }),
              vue.createElementVNode("view", { class: "item-center" }, [
                vue.createElementVNode("text", { class: "title" }, "陌生人消息"),
                vue.createElementVNode("text", { class: "desc" }, "你是个大可爱是打算发叔叔把咖啡就会崩溃啊大发")
              ]),
              vue.createElementVNode("view", { class: "item-right" }, [
                vue.createElementVNode("text", { class: "time" }, "11:11"),
                vue.createElementVNode("view", { class: "badge" }, "2")
              ])
            ])
          ])
        ]);
      };
    }
  });
  const PagesMineMessageIndex = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["__scopeId", "data-v-900b976d"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/message/index.vue"]]);
  defineStore("bluetooth", {
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
      BLEInformation: storage.get("BLE") || {
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
      connection: storage.get("BLEconnection") || false
    }),
    getters: {},
    actions: {
      // 设置蓝牙信息
      SET_BLE_INFO(info) {
        this.BLEInformation = { ...this.info, info };
        storage.set("BLE", { ...this.info, info });
      },
      // 设置蓝牙连接状态
      SET_CONNECTION_STATE(state) {
        this.connection = state;
        storage.set("BLEconnection", state);
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
        uni.showToast({ title: msg, icon: "none" });
      },
      // 自动连接蓝牙
      connectionBLE() {
        var _a;
        if (!((_a = this.BLEInformation) == null ? void 0 : _a.deviceId))
          return this.SET_CONNECTION_STATE(false);
        uni.openBluetoothAdapter({
          success() {
            uni.getBluetoothAdapterState({
              success(res2) {
                if (!res2.available)
                  return uni.showModal({ title: "提示", content: "本机蓝牙不可用", showCancel: false });
                if (res2.discovering)
                  uni.stopBluetoothDevicesDiscovery();
                uni.createBLEConnection({
                  deviceId: this.BLEInformation.deviceId,
                  success() {
                    this.SET_CONNECTION_STATE(true);
                  },
                  fail(fail3) {
                    this.SET_CONNECTION_STATE(false);
                  },
                  complete() {
                    uni.hideLoading();
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
              uni.showModal({ title: "提示", content: "蓝牙初始化失败，请打开蓝牙", showCancel: false });
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
        uni.onBLEConnectionStateChange((res) => {
          var _a2;
          if (res.deviceId !== ((_a2 = this.BLEInformation) == null ? void 0 : _a2.deviceId) || !res.connected)
            return this.SET_CONNECTION_STATE(false);
        });
        uni.getConnectedBluetoothDevices({
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
  const _sfc_main$E = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const userStore = useUserStore();
      const appStore = useAppStore();
      const promptToneChecked = vue.ref(false);
      const promptToneChange = (e) => {
        promptToneChecked.value = e.detail.value;
      };
      const onExit = () => {
        userStore.logout();
        prompt$1.msg("退出成功");
        setTimeout(() => {
          router.reLaunch(appStore.homeUrl);
        }, 1500);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.createElementVNode("view", { class: "gap" }),
          vue.createElementVNode("view", { class: "cell-group" }, [
            vue.createElementVNode("view", {
              class: "cell is-border",
              onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(router).push("/pages/mine/setting/profile/index"))
            }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "编辑资料")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", {
              class: "cell is-border",
              onClick: _cache[1] || (_cache[1] = ($event) => vue.unref(router).push("/pages/mine/setting/account/index"))
            }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "账号安全")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", {
              class: "cell",
              onClick: _cache[2] || (_cache[2] = ($event) => vue.unref(router).push("/pages/mine/setting/privacy/index"))
            }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "隐私设置")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "gap" }),
          vue.createElementVNode("view", { class: "cell-group" }, [
            vue.createElementVNode("view", { class: "cell is-border" }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "深色模式")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode("text", { class: "desc" }, "跟随系统"),
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", { class: "cell" }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "字体大小")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode("text", { class: "desc" }, "标准"),
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "gap" }),
          vue.createElementVNode("view", { class: "cell-group" }, [
            vue.createElementVNode("view", { class: "cell is-border" }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "清除缓存")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode("text", { class: "desc" }, "0B"),
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", { class: "cell is-border" }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "播放与网络设置")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", { class: "cell is-border" }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "推送通知设置")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", { class: "cell is-border" }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "安全浏览设置")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", { class: "cell" }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "提示音开关")
              ]),
              vue.createElementVNode("view", { class: "cell-right is-switch" }, [
                vue.createCommentVNode(" 微信小程序显示绿色 "),
                vue.createElementVNode("switch", {
                  checked: vue.unref(promptToneChecked),
                  onChange: promptToneChange
                }, null, 40, ["checked"])
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "gap" }),
          vue.createElementVNode("view", { class: "cell-group" }, [
            vue.createElementVNode("view", { class: "cell is-border" }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "隐私政策及简明版")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", { class: "cell is-border" }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "个人信息收集清单")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", { class: "cell" }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "第三方信息共享清单")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "gap" }),
          vue.createElementVNode("view", { class: "cell-group" }, [
            vue.createElementVNode("view", { class: "cell is-border" }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "检查版本")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode(
                  "text",
                  { class: "desc" },
                  vue.toDisplayString(vue.unref(appStore).systemInfo.appVersion),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", { class: "cell is-border" }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "关于头条")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", { class: "cell" }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "用户反馈")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "gap" }),
          !vue.unref(userStore).token ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "login-out",
            onClick: _cache[3] || (_cache[3] = ($event) => onExit())
          }, " 退出登录 ")) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { class: "gap" })
        ]);
      };
    }
  });
  const PagesMineSettingIndex = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["__scopeId", "data-v-d9df6a80"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/setting/index.vue"]]);
  const _sfc_main$D = {};
  function _sfc_render$7(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "message" }, [
      vue.createElementVNode("view", { class: "section" }, "互动消息"),
      vue.createElementVNode("view", { class: "cell-group" }, [
        vue.createElementVNode("view", { class: "cell is-border" }, [
          vue.createElementVNode("view", { class: "cell-left" }, [
            vue.createElementVNode("text", { class: "title" }, "评论")
          ]),
          vue.createElementVNode("view", { class: "cell-right" }, [
            vue.createElementVNode("text", { class: "desc" }, "所有人"),
            vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
          ])
        ]),
        vue.createElementVNode("view", { class: "cell is-border" }, [
          vue.createElementVNode("view", { class: "cell-left" }, [
            vue.createElementVNode("text", { class: "title" }, "新增粉丝")
          ]),
          vue.createElementVNode("view", { class: "cell-right" }, [
            vue.createElementVNode("text", { class: "desc" }, "所有人"),
            vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
          ])
        ]),
        vue.createElementVNode("view", { class: "cell is-border" }, [
          vue.createElementVNode("view", { class: "cell-left" }, [
            vue.createElementVNode("text", { class: "title" }, "点赞")
          ]),
          vue.createElementVNode("view", { class: "cell-right" }, [
            vue.createElementVNode("text", { class: "desc" }, "所有人"),
            vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
          ])
        ]),
        vue.createElementVNode("view", { class: "cell" }, [
          vue.createElementVNode("view", { class: "cell-left" }, [
            vue.createElementVNode("text", { class: "title" }, "@我")
          ]),
          vue.createElementVNode("view", { class: "cell-right" }, [
            vue.createElementVNode("text", { class: "desc" }, "所有人"),
            vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "section" }, "私信消息"),
      vue.createElementVNode("view", { class: "cell-group" }, [
        vue.createElementVNode("view", { class: "cell is-border" }, [
          vue.createElementVNode("view", { class: "cell-left" }, [
            vue.createElementVNode("text", { class: "title" }, "谁可以私信我")
          ]),
          vue.createElementVNode("view", { class: "cell-right" }, [
            vue.createElementVNode("text", { class: "desc" }, "默认"),
            vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
          ])
        ]),
        vue.createElementVNode("view", { class: "cell" }, [
          vue.createElementVNode("view", { class: "cell-left" }, [
            vue.createElementVNode("text", { class: "title" }, "陌生人消息")
          ]),
          vue.createElementVNode("view", { class: "cell-right" }, [
            vue.createElementVNode("text", { class: "desc" }, "聚合消息"),
            vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "section" }, "其他消息"),
      vue.createElementVNode("view", { class: "cell-group" }, [
        vue.createElementVNode("view", { class: "cell is-border" }, [
          vue.createElementVNode("view", { class: "cell-left" }, [
            vue.createElementVNode("text", { class: "title" }, "问答")
          ]),
          vue.createElementVNode("view", { class: "cell-right" }, [
            vue.createElementVNode("text", { class: "desc" }, "新回答与所有回答邀请"),
            vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
          ])
        ]),
        vue.createElementVNode("view", { class: "cell is-border" }, [
          vue.createElementVNode("view", { class: "cell-left" }, [
            vue.createElementVNode("text", { class: "title" }, "圈子")
          ]),
          vue.createElementVNode("view", { class: "cell-right" }, [
            vue.createElementVNode("text", { class: "desc" }, "默认"),
            vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
          ])
        ]),
        vue.createElementVNode("view", { class: "cell is-border" }, [
          vue.createElementVNode("view", { class: "cell-left" }, [
            vue.createElementVNode("text", { class: "title" }, "话题邀请")
          ]),
          vue.createElementVNode("view", { class: "cell-right" }, [
            vue.createElementVNode("text", { class: "desc" }, "默认"),
            vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
          ])
        ]),
        vue.createElementVNode("view", { class: "cell is-border" }, [
          vue.createElementVNode("view", { class: "cell-left" }, [
            vue.createElementVNode("text", { class: "title" }, "作者成长助手")
          ]),
          vue.createElementVNode("view", { class: "cell-right" }, [
            vue.createElementVNode("text", { class: "desc" }, "默认"),
            vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
          ])
        ]),
        vue.createElementVNode("view", { class: "cell is-border" }, [
          vue.createElementVNode("view", { class: "cell-left" }, [
            vue.createElementVNode("text", { class: "title" }, "创作通知")
          ]),
          vue.createElementVNode("view", { class: "cell-right" }, [
            vue.createElementVNode("text", { class: "desc" }, "默认"),
            vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
          ])
        ]),
        vue.createElementVNode("view", { class: "cell is-border" }, [
          vue.createElementVNode("view", { class: "cell-left" }, [
            vue.createElementVNode("text", { class: "title" }, "头条小组")
          ]),
          vue.createElementVNode("view", { class: "cell-right" }, [
            vue.createElementVNode("text", { class: "desc" }, "默认"),
            vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
          ])
        ]),
        vue.createElementVNode("view", { class: "cell is-border" }, [
          vue.createElementVNode("view", { class: "cell-left" }, [
            vue.createElementVNode("text", { class: "title" }, "活动通知")
          ]),
          vue.createElementVNode("view", { class: "cell-right" }, [
            vue.createElementVNode("text", { class: "desc" }, "默认"),
            vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
          ])
        ]),
        vue.createElementVNode("view", { class: "cell is-border" }, [
          vue.createElementVNode("view", { class: "cell-left" }, [
            vue.createElementVNode("text", { class: "title" }, "功能通知")
          ]),
          vue.createElementVNode("view", { class: "cell-right" }, [
            vue.createElementVNode("text", { class: "desc" }, "默认"),
            vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
          ])
        ]),
        vue.createElementVNode("view", { class: "cell is-border" }, [
          vue.createElementVNode("view", { class: "cell-left" }, [
            vue.createElementVNode("text", { class: "title" }, "订阅通知")
          ]),
          vue.createElementVNode("view", { class: "cell-right" }, [
            vue.createElementVNode("text", { class: "desc" }, "默认"),
            vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
          ])
        ]),
        vue.createElementVNode("view", { class: "cell is-border" }, [
          vue.createElementVNode("view", { class: "cell-left" }, [
            vue.createElementVNode("text", { class: "title" }, "头条号")
          ]),
          vue.createElementVNode("view", { class: "cell-right" }, [
            vue.createElementVNode("text", { class: "desc" }, "默认"),
            vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
          ])
        ]),
        vue.createElementVNode("view", { class: "cell is-border" }, [
          vue.createElementVNode("view", { class: "cell-left" }, [
            vue.createElementVNode("text", { class: "title" }, "头条百科")
          ]),
          vue.createElementVNode("view", { class: "cell-right" }, [
            vue.createElementVNode("text", { class: "desc" }, "默认"),
            vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
          ])
        ]),
        vue.createElementVNode("view", { class: "cell is-border" }, [
          vue.createElementVNode("view", { class: "cell-left" }, [
            vue.createElementVNode("text", { class: "title" }, "钱包通知")
          ]),
          vue.createElementVNode("view", { class: "cell-right" }, [
            vue.createElementVNode("text", { class: "desc" }, "默认"),
            vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
          ])
        ])
      ])
    ]);
  }
  const PagesMineSettingMessageIndex = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$7], ["__scopeId", "data-v-5640519e"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/setting/message/index.vue"]]);
  const _sfc_main$C = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      vue.ref(false);
      vue.ref(false);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "privacy" }, [
          vue.createElementVNode("view", { class: "Panel" }, [
            vue.createElementVNode("view", { class: "cell-group" }, [
              vue.createElementVNode("view", { class: "cell" }, [
                vue.createElementVNode("view", { class: "cell-left" }, [
                  vue.createElementVNode("text", { class: "title" }, "隐私设置"),
                  vue.createElementVNode("text", { class: "subtitle" }, "快速检查并选择适合你的隐私设置")
                ]),
                vue.createElementVNode("view", { class: "cell-right" }, [
                  vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
                ])
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "gap" }),
          vue.createElementVNode("view", { class: "Panel" }, [
            vue.createElementVNode("view", { class: "section" }, [
              vue.createElementVNode("text", null, "个人信息"),
              vue.createElementVNode("text", { class: "text-_a_8585e0 text-13px font-400" }, "信息管理指引")
            ]),
            vue.createElementVNode("view", { class: "cell-group" }, [
              vue.createElementVNode("view", { class: "cell is-border" }, [
                vue.createElementVNode("view", { class: "cell-left" }, [
                  vue.createElementVNode("text", { class: "title" }, "个人信息收集设置"),
                  vue.createElementVNode("text", { class: "subtitle" }, "管理个人收集权限和系统数据访问权限")
                ]),
                vue.createElementVNode("view", { class: "cell-right" }, [
                  vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
                ])
              ]),
              vue.createElementVNode("view", { class: "cell" }, [
                vue.createElementVNode("view", { class: "cell-left" }, [
                  vue.createElementVNode("text", { class: "title" }, "个人信息下载")
                ]),
                vue.createElementVNode("view", { class: "cell-right" }, [
                  vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
                ])
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "gap" }),
          vue.createElementVNode("view", { class: "Panel" }, [
            vue.createElementVNode("view", { class: "section" }, [
              vue.createElementVNode("text", null, "推荐内容")
            ]),
            vue.createElementVNode("view", { class: "cell-group" }, [
              vue.createElementVNode("view", { class: "cell is-border" }, [
                vue.createElementVNode("view", { class: "cell-left" }, [
                  vue.createElementVNode("text", { class: "title" }, "个性化推荐设置")
                ]),
                vue.createElementVNode("view", { class: "cell-right" }, [
                  vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
                ])
              ]),
              vue.createElementVNode("view", { class: "cell is-border" }, [
                vue.createElementVNode("view", { class: "cell-left" }, [
                  vue.createElementVNode("text", { class: "title" }, "内容屏蔽管理")
                ]),
                vue.createElementVNode("view", { class: "cell-right" }, [
                  vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
                ])
              ]),
              vue.createElementVNode("view", { class: "cell" }, [
                vue.createElementVNode("view", { class: "cell-left" }, [
                  vue.createElementVNode("text", { class: "title" }, "清除历史阅读兴趣"),
                  vue.createElementVNode("text", { class: "subtitle" }, "清除后，将无法根据历史兴趣记录推荐个性化资讯")
                ]),
                vue.createElementVNode("view", { class: "cell-right" }, [
                  vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
                ])
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "gap" }),
          vue.createElementVNode("view", { class: "Panel" }, [
            vue.createElementVNode("view", { class: "section" }, [
              vue.createElementVNode("text", null, "互动")
            ]),
            vue.createElementVNode("view", { class: "cell-group" }, [
              vue.createElementVNode("view", { class: "cell" }, [
                vue.createElementVNode("view", { class: "cell-left" }, [
                  vue.createElementVNode("text", { class: "title" }, "一键防护开关"),
                  vue.createElementVNode("text", { class: "subtitle" }, "开启后，将不接收未关注人的评论/转发/私信")
                ]),
                vue.createElementVNode("view", { class: "cell-right is-switch" }, [
                  vue.createCommentVNode(" 微信小程序显示绿色 "),
                  vue.createElementVNode("switch", { checked: false })
                ])
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "gap" }),
          vue.createElementVNode("view", { class: "Panel" }, [
            vue.createElementVNode("view", { class: "section" }, [
              vue.createElementVNode("text", null, "关系")
            ]),
            vue.createElementVNode("view", { class: "cell-group" }, [
              vue.createElementVNode("view", { class: "cell is-border" }, [
                vue.createElementVNode("view", { class: "cell-left" }, [
                  vue.createElementVNode("text", { class: "title" }, "把我推荐给可能认识的人"),
                  vue.createElementVNode("text", { class: "subtitle" }, "关闭后，不会因为你们认识，而把你推荐给对方")
                ]),
                vue.createElementVNode("view", { class: "cell-right is-switch" }, [
                  vue.createCommentVNode(" 微信小程序显示绿色 "),
                  vue.createElementVNode("switch", { checked: false })
                ])
              ]),
              vue.createElementVNode("view", { class: "cell is-border" }, [
                vue.createElementVNode("view", { class: "cell-left" }, [
                  vue.createElementVNode("text", { class: "title" }, "向我推荐可能认识的人"),
                  vue.createElementVNode("text", { class: "subtitle" }, "关闭后，将减少向你推荐可认识的人，包括你的通讯录或其他可能认识的人")
                ]),
                vue.createElementVNode("view", { class: "cell-right is-switch" }, [
                  vue.createCommentVNode(" 微信小程序显示绿色 "),
                  vue.createElementVNode("switch", { checked: false })
                ])
              ]),
              vue.createElementVNode("view", { class: "cell" }, [
                vue.createElementVNode("view", { class: "cell-left" }, [
                  vue.createElementVNode("text", { class: "title" }, "黑名单设置")
                ]),
                vue.createElementVNode("view", { class: "cell-right" }, [
                  vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
                ])
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "gap" }),
          vue.createElementVNode("view", { class: "Panel" }, [
            vue.createElementVNode("view", { class: "section" }, [
              vue.createElementVNode("text", null, "其他隐私设置")
            ]),
            vue.createElementVNode("view", { class: "cell-group" }, [
              vue.createElementVNode("view", { class: "cell is-border" }, [
                vue.createElementVNode("view", { class: "cell-left" }, [
                  vue.createElementVNode("text", { class: "title" }, "广告设置")
                ]),
                vue.createElementVNode("view", { class: "cell-right" }, [
                  vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
                ])
              ]),
              vue.createElementVNode("view", { class: "cell is-border" }, [
                vue.createElementVNode("view", { class: "cell-left" }, [
                  vue.createElementVNode("text", { class: "title" }, "草稿保存至云端"),
                  vue.createElementVNode("text", { class: "subtitle" }, "关闭后草稿箱将无法共享到其他设备")
                ]),
                vue.createElementVNode("view", { class: "cell-right is-switch" }, [
                  vue.createCommentVNode(" 微信小程序显示绿色 "),
                  vue.createElementVNode("switch", { checked: true })
                ])
              ]),
              vue.createElementVNode("view", { class: "cell" }, [
                vue.createElementVNode("view", { class: "cell-left" }, [
                  vue.createElementVNode("text", { class: "title" }, "提前上传作品，减少等待时间")
                ]),
                vue.createElementVNode("view", { class: "cell-right is-switch" }, [
                  vue.createCommentVNode(" 微信小程序显示绿色 "),
                  vue.createElementVNode("switch", { checked: true })
                ])
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "gap" }),
          vue.createElementVNode("view", { class: "Panel" }, [
            vue.createElementVNode("view", { class: "section" }, [
              vue.createElementVNode("text", null, "隐私说明")
            ]),
            vue.createElementVNode("view", { class: "cell-group" }, [
              vue.createElementVNode("view", { class: "cell is-border" }, [
                vue.createElementVNode("view", { class: "cell-left" }, [
                  vue.createElementVNode("text", { class: "title" }, "隐私政策及简明版")
                ]),
                vue.createElementVNode("view", { class: "cell-right" }, [
                  vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
                ])
              ]),
              vue.createElementVNode("view", { class: "cell is-border" }, [
                vue.createElementVNode("view", { class: "cell-left" }, [
                  vue.createElementVNode("text", { class: "title" }, "应用权限说明")
                ]),
                vue.createElementVNode("view", { class: "cell-right" }, [
                  vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
                ])
              ]),
              vue.createElementVNode("view", { class: "cell is-border" }, [
                vue.createElementVNode("view", { class: "cell-left" }, [
                  vue.createElementVNode("text", { class: "title" }, "个人信息搜集清单")
                ]),
                vue.createElementVNode("view", { class: "cell-right" }, [
                  vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
                ])
              ]),
              vue.createElementVNode("view", { class: "cell" }, [
                vue.createElementVNode("view", { class: "cell-left" }, [
                  vue.createElementVNode("text", { class: "title" }, "第三方信息共享清单")
                ]),
                vue.createElementVNode("view", { class: "cell-right" }, [
                  vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
                ])
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "gap" }),
          vue.createElementVNode("view", { class: "Panel" }, [
            vue.createElementVNode("view", { class: "section" }, [
              vue.createElementVNode("text", null, "常见问题")
            ]),
            vue.createElementVNode("view", { class: "cell-group" }, [
              vue.createElementVNode("view", { class: "cell is-border" }, [
                vue.createElementVNode("view", { class: "cell-left" }, [
                  vue.createElementVNode("text", { class: "title" }, "头条是否有窃听我的谈话内容")
                ]),
                vue.createElementVNode("view", { class: "cell-right" }, [
                  vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
                ])
              ]),
              vue.createElementVNode("view", { class: "cell is-border" }, [
                vue.createElementVNode("view", { class: "cell-left" }, [
                  vue.createElementVNode("text", { class: "title" }, "为什么会给我推送在其他应用搜索过的商品广告")
                ]),
                vue.createElementVNode("view", { class: "cell-right" }, [
                  vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
                ])
              ]),
              vue.createElementVNode("view", { class: "cell is-border" }, [
                vue.createElementVNode("view", { class: "cell-left" }, [
                  vue.createElementVNode("text", { class: "title" }, "不喜欢推荐的内容怎么办")
                ]),
                vue.createElementVNode("view", { class: "cell-right" }, [
                  vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
                ])
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "gap" })
        ]);
      };
    }
  });
  const PagesMineSettingPrivacyIndex = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__scopeId", "data-v-bd541bec"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/setting/privacy/index.vue"]]);
  const _sfc_main$B = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      let showGender = vue.ref(false);
      let showBirthday = vue.ref(false);
      let showCity = vue.ref(false);
      vue.ref(false);
      vue.ref(false);
      vue.ref("");
      vue.reactive([["男", "女"]]);
      vue.reactive([["中国", "美国"], ["深圳", "厦门", "上海", "拉萨"]]);
      let userInfo = vue.reactive({});
      const uploadBgImg = () => {
        uni.chooseImage({
          count: 1,
          //默认9
          success: function(res) {
            this.file = res.tempFilePaths[0];
            formatAppLog("log", "at pages/mine/setting/profile/index.vue:128", res.tempFilePaths[0]);
            this.showBackgroundImage = true;
          }
        });
      };
      const uploadAvatarImg = () => {
        uni.chooseImage({
          count: 1,
          //默认9
          success: function(res) {
            this.file = res.tempFilePaths[0];
            formatAppLog("log", "at pages/mine/setting/profile/index.vue:140", res.tempFilePaths[0]);
            this.showAvatar = true;
          }
        });
      };
      return (_ctx, _cache) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.createElementVNode("view", { class: "info" }, [
            vue.createElementVNode("view", {
              class: "info-img",
              onClick: uploadAvatarImg
            }, [
              vue.createElementVNode("image", {
                class: "avatar",
                src: vue.unref(userInfo).avatar ? vue.unref(userInfo).avatar : "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                mode: "scaleToFill"
              }, null, 8, ["src"]),
              vue.createElementVNode("text", { class: "info-click" }, "点击更换头像")
            ])
          ]),
          vue.createElementVNode("view", { class: "gap" }),
          vue.createElementVNode("view", { class: "cell-group" }, [
            vue.createElementVNode("view", {
              class: "cell is-border",
              onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(router).push("./edit?title=用户名&type=textarea&valueData=123"))
            }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "用户名")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode(
                  "text",
                  { class: "desc" },
                  vue.toDisplayString(((_a = vue.unref(userInfo)) == null ? void 0 : _a.nickname) ? vue.unref(userInfo).nickname : "待完善"),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", {
              class: "cell is-border",
              onClick: _cache[1] || (_cache[1] = ($event) => vue.unref(router).push("./edit?title=简介&type=input&valueData=123"))
            }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "简介")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode(
                  "text",
                  { class: "desc" },
                  vue.toDisplayString(((_b = vue.unref(userInfo)) == null ? void 0 : _b.introduce) ? vue.unref(userInfo).introduce : "待完善"),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", {
              class: "cell is-border",
              onClick: uploadBgImg
            }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "背景图")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode(
                  "text",
                  { class: "desc" },
                  vue.toDisplayString(((_c = vue.unref(userInfo)) == null ? void 0 : _c.background_image) ? "去更换" : "去设置"),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", {
              class: "cell is-border",
              onClick: _cache[2] || (_cache[2] = ($event) => vue.isRef(showGender) ? showGender.value = true : showGender = true)
            }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "性别")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode(
                  "text",
                  { class: "desc" },
                  vue.toDisplayString(((_d = vue.unref(userInfo)) == null ? void 0 : _d.gender) ? vue.unref(userInfo).gender : "待完善"),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", {
              class: "cell is-border",
              onClick: _cache[3] || (_cache[3] = ($event) => vue.isRef(showBirthday) ? showBirthday.value = true : showBirthday = true)
            }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "生日")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode(
                  "text",
                  { class: "desc" },
                  vue.toDisplayString(((_e = vue.unref(userInfo)) == null ? void 0 : _e.birthday) ? vue.unref(userInfo).birthday : "待完善"),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", {
              class: "cell is-border",
              onClick: _cache[4] || (_cache[4] = ($event) => vue.isRef(showCity) ? showCity.value = true : showCity = true)
            }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "所在地")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode(
                  "text",
                  { class: "desc" },
                  vue.toDisplayString(((_f = vue.unref(userInfo)) == null ? void 0 : _f.city) ? vue.unref(userInfo).city : "待完善"),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", {
              class: "cell is-border",
              onClick: _cache[5] || (_cache[5] = ($event) => vue.unref(router).push(`./edit?title=学校&type=input&valueData=${vue.unref(userInfo).school}`))
            }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "学校")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode(
                  "text",
                  { class: "desc" },
                  vue.toDisplayString(((_g = vue.unref(userInfo)) == null ? void 0 : _g.school) ? vue.unref(userInfo).school : "待完善"),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", {
              class: "cell is-border",
              onClick: _cache[6] || (_cache[6] = ($event) => vue.unref(router).push(`./edit?title=职业&type=input&valueData=${vue.unref(userInfo).profession}`))
            }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "职业")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode(
                  "text",
                  { class: "desc" },
                  vue.toDisplayString(((_h = vue.unref(userInfo)) == null ? void 0 : _h.profession) ? vue.unref(userInfo).profession : "待完善"),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ])
          ]),
          vue.createCommentVNode(" 编辑性别 "),
          vue.createCommentVNode(" 编辑生日 "),
          vue.createCommentVNode(" 编辑城市 "),
          vue.createCommentVNode(" 修改头像 "),
          vue.createCommentVNode(` <van-popup v-model="showAvatar" position="bottom"  class="update-photo-popup">
          <UpdatePhoto :file="file" @close="showAvatar=false" v-if="showAvatar" :type="'avatar'"/>
        </van-popup> `),
          vue.createCommentVNode(" 修改背景图 "),
          vue.createCommentVNode(` <van-popup v-model="showBackgroundImage" position="bottom"  class="update-photo-popup">
          <UpdatePhoto :file="file" @close="showBackgroundImage=false" v-if="showBackgroundImage" :type="'background_image'"/>
        </van-popup> `)
        ]);
      };
    }
  });
  const PagesMineSettingProfileIndex = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["__scopeId", "data-v-17db42f7"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/setting/profile/index.vue"]]);
  const fontData = [
    {
      "font_class": "arrow-down",
      "unicode": ""
    },
    {
      "font_class": "arrow-left",
      "unicode": ""
    },
    {
      "font_class": "arrow-right",
      "unicode": ""
    },
    {
      "font_class": "arrow-up",
      "unicode": ""
    },
    {
      "font_class": "auth",
      "unicode": ""
    },
    {
      "font_class": "auth-filled",
      "unicode": ""
    },
    {
      "font_class": "back",
      "unicode": ""
    },
    {
      "font_class": "bars",
      "unicode": ""
    },
    {
      "font_class": "calendar",
      "unicode": ""
    },
    {
      "font_class": "calendar-filled",
      "unicode": ""
    },
    {
      "font_class": "camera",
      "unicode": ""
    },
    {
      "font_class": "camera-filled",
      "unicode": ""
    },
    {
      "font_class": "cart",
      "unicode": ""
    },
    {
      "font_class": "cart-filled",
      "unicode": ""
    },
    {
      "font_class": "chat",
      "unicode": ""
    },
    {
      "font_class": "chat-filled",
      "unicode": ""
    },
    {
      "font_class": "chatboxes",
      "unicode": ""
    },
    {
      "font_class": "chatboxes-filled",
      "unicode": ""
    },
    {
      "font_class": "chatbubble",
      "unicode": ""
    },
    {
      "font_class": "chatbubble-filled",
      "unicode": ""
    },
    {
      "font_class": "checkbox",
      "unicode": ""
    },
    {
      "font_class": "checkbox-filled",
      "unicode": ""
    },
    {
      "font_class": "checkmarkempty",
      "unicode": ""
    },
    {
      "font_class": "circle",
      "unicode": ""
    },
    {
      "font_class": "circle-filled",
      "unicode": ""
    },
    {
      "font_class": "clear",
      "unicode": ""
    },
    {
      "font_class": "close",
      "unicode": ""
    },
    {
      "font_class": "closeempty",
      "unicode": ""
    },
    {
      "font_class": "cloud-download",
      "unicode": ""
    },
    {
      "font_class": "cloud-download-filled",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload-filled",
      "unicode": ""
    },
    {
      "font_class": "color",
      "unicode": ""
    },
    {
      "font_class": "color-filled",
      "unicode": ""
    },
    {
      "font_class": "compose",
      "unicode": ""
    },
    {
      "font_class": "contact",
      "unicode": ""
    },
    {
      "font_class": "contact-filled",
      "unicode": ""
    },
    {
      "font_class": "down",
      "unicode": ""
    },
    {
      "font_class": "bottom",
      "unicode": ""
    },
    {
      "font_class": "download",
      "unicode": ""
    },
    {
      "font_class": "download-filled",
      "unicode": ""
    },
    {
      "font_class": "email",
      "unicode": ""
    },
    {
      "font_class": "email-filled",
      "unicode": ""
    },
    {
      "font_class": "eye",
      "unicode": ""
    },
    {
      "font_class": "eye-filled",
      "unicode": ""
    },
    {
      "font_class": "eye-slash",
      "unicode": ""
    },
    {
      "font_class": "eye-slash-filled",
      "unicode": ""
    },
    {
      "font_class": "fire",
      "unicode": ""
    },
    {
      "font_class": "fire-filled",
      "unicode": ""
    },
    {
      "font_class": "flag",
      "unicode": ""
    },
    {
      "font_class": "flag-filled",
      "unicode": ""
    },
    {
      "font_class": "folder-add",
      "unicode": ""
    },
    {
      "font_class": "folder-add-filled",
      "unicode": ""
    },
    {
      "font_class": "font",
      "unicode": ""
    },
    {
      "font_class": "forward",
      "unicode": ""
    },
    {
      "font_class": "gear",
      "unicode": ""
    },
    {
      "font_class": "gear-filled",
      "unicode": ""
    },
    {
      "font_class": "gift",
      "unicode": ""
    },
    {
      "font_class": "gift-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-down",
      "unicode": ""
    },
    {
      "font_class": "hand-down-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-up",
      "unicode": ""
    },
    {
      "font_class": "hand-up-filled",
      "unicode": ""
    },
    {
      "font_class": "headphones",
      "unicode": ""
    },
    {
      "font_class": "heart",
      "unicode": ""
    },
    {
      "font_class": "heart-filled",
      "unicode": ""
    },
    {
      "font_class": "help",
      "unicode": ""
    },
    {
      "font_class": "help-filled",
      "unicode": ""
    },
    {
      "font_class": "home",
      "unicode": ""
    },
    {
      "font_class": "home-filled",
      "unicode": ""
    },
    {
      "font_class": "image",
      "unicode": ""
    },
    {
      "font_class": "image-filled",
      "unicode": ""
    },
    {
      "font_class": "images",
      "unicode": ""
    },
    {
      "font_class": "images-filled",
      "unicode": ""
    },
    {
      "font_class": "info",
      "unicode": ""
    },
    {
      "font_class": "info-filled",
      "unicode": ""
    },
    {
      "font_class": "left",
      "unicode": ""
    },
    {
      "font_class": "link",
      "unicode": ""
    },
    {
      "font_class": "list",
      "unicode": ""
    },
    {
      "font_class": "location",
      "unicode": ""
    },
    {
      "font_class": "location-filled",
      "unicode": ""
    },
    {
      "font_class": "locked",
      "unicode": ""
    },
    {
      "font_class": "locked-filled",
      "unicode": ""
    },
    {
      "font_class": "loop",
      "unicode": ""
    },
    {
      "font_class": "mail-open",
      "unicode": ""
    },
    {
      "font_class": "mail-open-filled",
      "unicode": ""
    },
    {
      "font_class": "map",
      "unicode": ""
    },
    {
      "font_class": "map-filled",
      "unicode": ""
    },
    {
      "font_class": "map-pin",
      "unicode": ""
    },
    {
      "font_class": "map-pin-ellipse",
      "unicode": ""
    },
    {
      "font_class": "medal",
      "unicode": ""
    },
    {
      "font_class": "medal-filled",
      "unicode": ""
    },
    {
      "font_class": "mic",
      "unicode": ""
    },
    {
      "font_class": "mic-filled",
      "unicode": ""
    },
    {
      "font_class": "micoff",
      "unicode": ""
    },
    {
      "font_class": "micoff-filled",
      "unicode": ""
    },
    {
      "font_class": "minus",
      "unicode": ""
    },
    {
      "font_class": "minus-filled",
      "unicode": ""
    },
    {
      "font_class": "more",
      "unicode": ""
    },
    {
      "font_class": "more-filled",
      "unicode": ""
    },
    {
      "font_class": "navigate",
      "unicode": ""
    },
    {
      "font_class": "navigate-filled",
      "unicode": ""
    },
    {
      "font_class": "notification",
      "unicode": ""
    },
    {
      "font_class": "notification-filled",
      "unicode": ""
    },
    {
      "font_class": "paperclip",
      "unicode": ""
    },
    {
      "font_class": "paperplane",
      "unicode": ""
    },
    {
      "font_class": "paperplane-filled",
      "unicode": ""
    },
    {
      "font_class": "person",
      "unicode": ""
    },
    {
      "font_class": "person-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled-copy",
      "unicode": ""
    },
    {
      "font_class": "phone",
      "unicode": ""
    },
    {
      "font_class": "phone-filled",
      "unicode": ""
    },
    {
      "font_class": "plus",
      "unicode": ""
    },
    {
      "font_class": "plus-filled",
      "unicode": ""
    },
    {
      "font_class": "plusempty",
      "unicode": ""
    },
    {
      "font_class": "pulldown",
      "unicode": ""
    },
    {
      "font_class": "pyq",
      "unicode": ""
    },
    {
      "font_class": "qq",
      "unicode": ""
    },
    {
      "font_class": "redo",
      "unicode": ""
    },
    {
      "font_class": "redo-filled",
      "unicode": ""
    },
    {
      "font_class": "refresh",
      "unicode": ""
    },
    {
      "font_class": "refresh-filled",
      "unicode": ""
    },
    {
      "font_class": "refreshempty",
      "unicode": ""
    },
    {
      "font_class": "reload",
      "unicode": ""
    },
    {
      "font_class": "right",
      "unicode": ""
    },
    {
      "font_class": "scan",
      "unicode": ""
    },
    {
      "font_class": "search",
      "unicode": ""
    },
    {
      "font_class": "settings",
      "unicode": ""
    },
    {
      "font_class": "settings-filled",
      "unicode": ""
    },
    {
      "font_class": "shop",
      "unicode": ""
    },
    {
      "font_class": "shop-filled",
      "unicode": ""
    },
    {
      "font_class": "smallcircle",
      "unicode": ""
    },
    {
      "font_class": "smallcircle-filled",
      "unicode": ""
    },
    {
      "font_class": "sound",
      "unicode": ""
    },
    {
      "font_class": "sound-filled",
      "unicode": ""
    },
    {
      "font_class": "spinner-cycle",
      "unicode": ""
    },
    {
      "font_class": "staff",
      "unicode": ""
    },
    {
      "font_class": "staff-filled",
      "unicode": ""
    },
    {
      "font_class": "star",
      "unicode": ""
    },
    {
      "font_class": "star-filled",
      "unicode": ""
    },
    {
      "font_class": "starhalf",
      "unicode": ""
    },
    {
      "font_class": "trash",
      "unicode": ""
    },
    {
      "font_class": "trash-filled",
      "unicode": ""
    },
    {
      "font_class": "tune",
      "unicode": ""
    },
    {
      "font_class": "tune-filled",
      "unicode": ""
    },
    {
      "font_class": "undo",
      "unicode": ""
    },
    {
      "font_class": "undo-filled",
      "unicode": ""
    },
    {
      "font_class": "up",
      "unicode": ""
    },
    {
      "font_class": "top",
      "unicode": ""
    },
    {
      "font_class": "upload",
      "unicode": ""
    },
    {
      "font_class": "upload-filled",
      "unicode": ""
    },
    {
      "font_class": "videocam",
      "unicode": ""
    },
    {
      "font_class": "videocam-filled",
      "unicode": ""
    },
    {
      "font_class": "vip",
      "unicode": ""
    },
    {
      "font_class": "vip-filled",
      "unicode": ""
    },
    {
      "font_class": "wallet",
      "unicode": ""
    },
    {
      "font_class": "wallet-filled",
      "unicode": ""
    },
    {
      "font_class": "weibo",
      "unicode": ""
    },
    {
      "font_class": "weixin",
      "unicode": ""
    }
  ];
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$A = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      },
      fontFamily: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: fontData
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v) => v.font_class === this.type);
        if (code) {
          return code.unicode;
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      },
      styleObj() {
        if (this.fontFamily !== "") {
          return `color: ${this.color}; font-size: ${this.iconSize}; font-family: ${this.fontFamily};`;
        }
        return `color: ${this.color}; font-size: ${this.iconSize};`;
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle($options.styleObj),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$6], ["__scopeId", "data-v-c50d4ede"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/node_modules/.pnpm/@dcloudio+uni-ui@1.5.2/node_modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue"]]);
  function obj2strClass(obj) {
    let classess = "";
    for (let key in obj) {
      const val = obj[key];
      if (val) {
        classess += `${key} `;
      }
    }
    return classess;
  }
  function obj2strStyle(obj) {
    let style = "";
    for (let key in obj) {
      const val = obj[key];
      style += `${key}:${val};`;
    }
    return style;
  }
  const _sfc_main$z = {
    name: "uni-easyinput",
    emits: ["click", "iconClick", "update:modelValue", "input", "focus", "blur", "confirm", "clear", "eyes", "change", "keyboardheightchange"],
    model: {
      prop: "modelValue",
      event: "update:modelValue"
    },
    options: {
      virtualHost: true
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      },
      formItem: {
        from: "uniFormItem",
        default: null
      }
    },
    props: {
      name: String,
      value: [Number, String],
      modelValue: [Number, String],
      type: {
        type: String,
        default: "text"
      },
      clearable: {
        type: Boolean,
        default: true
      },
      autoHeight: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: " "
      },
      placeholderStyle: String,
      focus: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: [Number, String],
        default: 140
      },
      confirmType: {
        type: String,
        default: "done"
      },
      clearSize: {
        type: [Number, String],
        default: 24
      },
      inputBorder: {
        type: Boolean,
        default: true
      },
      prefixIcon: {
        type: String,
        default: ""
      },
      suffixIcon: {
        type: String,
        default: ""
      },
      trim: {
        type: [Boolean, String],
        default: false
      },
      cursorSpacing: {
        type: Number,
        default: 0
      },
      passwordIcon: {
        type: Boolean,
        default: true
      },
      adjustPosition: {
        type: Boolean,
        default: true
      },
      primaryColor: {
        type: String,
        default: "#2979ff"
      },
      styles: {
        type: Object,
        default() {
          return {
            color: "#333",
            backgroundColor: "#fff",
            disableColor: "#F7F6F6",
            borderColor: "#e5e5e5"
          };
        }
      },
      errorMessage: {
        type: [String, Boolean],
        default: ""
      }
    },
    data() {
      return {
        focused: false,
        val: "",
        showMsg: "",
        border: false,
        isFirstBorder: false,
        showClearIcon: false,
        showPassword: false,
        focusShow: false,
        localMsg: "",
        isEnter: false
        // 用于判断当前是否是使用回车操作
      };
    },
    computed: {
      // 输入框内是否有值
      isVal() {
        const val = this.val;
        if (val || val === 0) {
          return true;
        }
        return false;
      },
      msg() {
        return this.localMsg || this.errorMessage;
      },
      // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，用户可以传入字符串数值
      inputMaxlength() {
        return Number(this.maxlength);
      },
      // 处理外层样式的style
      boxStyle() {
        return `color:${this.inputBorder && this.msg ? "#e43d33" : this.styles.color};`;
      },
      // input 内容的类和样式处理
      inputContentClass() {
        return obj2strClass({
          "is-input-border": this.inputBorder,
          "is-input-error-border": this.inputBorder && this.msg,
          "is-textarea": this.type === "textarea",
          "is-disabled": this.disabled,
          "is-focused": this.focusShow
        });
      },
      inputContentStyle() {
        const focusColor = this.focusShow ? this.primaryColor : this.styles.borderColor;
        const borderColor = this.inputBorder && this.msg ? "#dd524d" : focusColor;
        return obj2strStyle({
          "border-color": borderColor || "#e5e5e5",
          "background-color": this.disabled ? this.styles.disableColor : this.styles.backgroundColor
        });
      },
      // input右侧样式
      inputStyle() {
        const paddingRight = this.type === "password" || this.clearable || this.prefixIcon ? "" : "10px";
        return obj2strStyle({
          "padding-right": paddingRight,
          "padding-left": this.prefixIcon ? "" : "10px"
        });
      }
    },
    watch: {
      value(newVal) {
        this.val = newVal;
      },
      modelValue(newVal) {
        this.val = newVal;
      },
      focus(newVal) {
        this.$nextTick(() => {
          this.focused = this.focus;
          this.focusShow = this.focus;
        });
      }
    },
    created() {
      this.init();
      if (this.form && this.formItem) {
        this.$watch("formItem.errMsg", (newVal) => {
          this.localMsg = newVal;
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.focused = this.focus;
        this.focusShow = this.focus;
      });
    },
    methods: {
      /**
       * 初始化变量值
       */
      init() {
        if (this.value || this.value === 0) {
          this.val = this.value;
        } else if (this.modelValue || this.modelValue === 0 || this.modelValue === "") {
          this.val = this.modelValue;
        } else {
          this.val = null;
        }
      },
      /**
       * 点击图标时触发
       * @param {Object} type
       */
      onClickIcon(type) {
        this.$emit("iconClick", type);
      },
      /**
       * 显示隐藏内容，密码框时生效
       */
      onEyes() {
        this.showPassword = !this.showPassword;
        this.$emit("eyes", this.showPassword);
      },
      /**
       * 输入时触发
       * @param {Object} event
       */
      onInput(event) {
        let value = event.detail.value;
        if (this.trim) {
          if (typeof this.trim === "boolean" && this.trim) {
            value = this.trimStr(value);
          }
          if (typeof this.trim === "string") {
            value = this.trimStr(value, this.trim);
          }
        }
        if (this.errMsg)
          this.errMsg = "";
        this.val = value;
        this.$emit("input", value);
        this.$emit("update:modelValue", value);
      },
      /**
       * 外部调用方法
       * 获取焦点时触发
       * @param {Object} event
       */
      onFocus() {
        this.$nextTick(() => {
          this.focused = true;
        });
        this.$emit("focus", null);
      },
      _Focus(event) {
        this.focusShow = true;
        this.$emit("focus", event);
      },
      /**
       * 外部调用方法
       * 失去焦点时触发
       * @param {Object} event
       */
      onBlur() {
        this.focused = false;
        this.$emit("blur", null);
      },
      _Blur(event) {
        event.detail.value;
        this.focusShow = false;
        this.$emit("blur", event);
        if (this.isEnter === false) {
          this.$emit("change", this.val);
        }
        if (this.form && this.formItem) {
          const { validateTrigger } = this.form;
          if (validateTrigger === "blur") {
            this.formItem.onFieldChange();
          }
        }
      },
      /**
       * 按下键盘的发送键
       * @param {Object} e
       */
      onConfirm(e) {
        this.$emit("confirm", this.val);
        this.isEnter = true;
        this.$emit("change", this.val);
        this.$nextTick(() => {
          this.isEnter = false;
        });
      },
      /**
       * 清理内容
       * @param {Object} event
       */
      onClear(event) {
        this.val = "";
        this.$emit("input", "");
        this.$emit("update:modelValue", "");
        this.$emit("clear");
      },
      /**
       * 键盘高度发生变化的时候触发此事件
       * 兼容性：微信小程序2.7.0+、App 3.1.0+
       * @param {Object} event
       */
      onkeyboardheightchange(event) {
        this.$emit("keyboardheightchange", event);
      },
      /**
       * 去除空格
       */
      trimStr(str, pos = "both") {
        if (pos === "both") {
          return str.trim();
        } else if (pos === "left") {
          return str.trimLeft();
        } else if (pos === "right") {
          return str.trimRight();
        } else if (pos === "start") {
          return str.trimStart();
        } else if (pos === "end") {
          return str.trimEnd();
        } else if (pos === "all") {
          return str.replace(/\s+/g, "");
        } else if (pos === "none") {
          return str;
        }
        return str;
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-easyinput", { "uni-easyinput-error": $options.msg }]),
        style: vue.normalizeStyle($options.boxStyle)
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-easyinput__content", $options.inputContentClass]),
            style: vue.normalizeStyle($options.inputContentStyle)
          },
          [
            $props.prefixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
              key: 0,
              class: "content-clear-icon",
              type: $props.prefixIcon,
              color: "#c0c4cc",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.onClickIcon("prefix")),
              size: "22"
            }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true),
            vue.renderSlot(_ctx.$slots, "left", {}, void 0, true),
            $props.type === "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
              key: 1,
              class: vue.normalizeClass(["uni-easyinput__content-textarea", { "input-padding": $props.inputBorder }]),
              name: $props.name,
              value: $data.val,
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              disabled: $props.disabled,
              "placeholder-class": "uni-easyinput__placeholder-class",
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              autoHeight: $props.autoHeight,
              "cursor-spacing": $props.cursorSpacing,
              "adjust-position": $props.adjustPosition,
              onInput: _cache[1] || (_cache[1] = (...args) => $options.onInput && $options.onInput(...args)),
              onBlur: _cache[2] || (_cache[2] = (...args) => $options._Blur && $options._Blur(...args)),
              onFocus: _cache[3] || (_cache[3] = (...args) => $options._Focus && $options._Focus(...args)),
              onConfirm: _cache[4] || (_cache[4] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[5] || (_cache[5] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 42, ["name", "value", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "autoHeight", "cursor-spacing", "adjust-position"])) : (vue.openBlock(), vue.createElementBlock("input", {
              key: 2,
              type: $props.type === "password" ? "text" : $props.type,
              class: "uni-easyinput__content-input",
              style: vue.normalizeStyle($options.inputStyle),
              name: $props.name,
              value: $data.val,
              password: !$data.showPassword && $props.type === "password",
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              "placeholder-class": "uni-easyinput__placeholder-class",
              disabled: $props.disabled,
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              confirmType: $props.confirmType,
              "cursor-spacing": $props.cursorSpacing,
              "adjust-position": $props.adjustPosition,
              onFocus: _cache[6] || (_cache[6] = (...args) => $options._Focus && $options._Focus(...args)),
              onBlur: _cache[7] || (_cache[7] = (...args) => $options._Blur && $options._Blur(...args)),
              onInput: _cache[8] || (_cache[8] = (...args) => $options.onInput && $options.onInput(...args)),
              onConfirm: _cache[9] || (_cache[9] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[10] || (_cache[10] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 44, ["type", "name", "value", "password", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "confirmType", "cursor-spacing", "adjust-position"])),
            $props.type === "password" && $props.passwordIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 3 },
              [
                vue.createCommentVNode(" 开启密码时显示小眼睛 "),
                $options.isVal ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: $data.showPassword ? "eye-slash-filled" : "eye-filled",
                  size: 22,
                  color: $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onEyes
                }, null, 8, ["class", "type", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : $props.suffixIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 4 },
              [
                $props.suffixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: "content-clear-icon",
                  type: $props.suffixIcon,
                  color: "#c0c4cc",
                  onClick: _cache[11] || (_cache[11] = ($event) => $options.onClickIcon("suffix")),
                  size: "22"
                }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 5 },
              [
                $props.clearable && $options.isVal && !$props.disabled && $props.type !== "textarea" ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: "clear",
                  size: $props.clearSize,
                  color: $options.msg ? "#dd524d" : $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onClear
                }, null, 8, ["class", "size", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )),
            vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$5], ["__scopeId", "data-v-cd7f1d6e"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/node_modules/.pnpm/@dcloudio+uni-ui@1.5.2/node_modules/@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.vue"]]);
  const _sfc_main$y = /* @__PURE__ */ vue.defineComponent({
    __name: "edit",
    setup(__props) {
      vue.ref(false);
      vue.ref(false);
      let value = vue.ref(null);
      let valueData = vue.ref(null);
      let title = vue.ref("编辑资料");
      let type = vue.ref("input");
      onLoad((o) => {
        value.value = o.valueData;
        valueData.value = o.valueData;
        title.value = o.title;
        type.value = o.type;
      });
      const placeholder = vue.computed(() => {
        return `请输入${title.value}`;
      });
      const isEditValue = vue.computed(() => {
        if (!value.value)
          return false;
        if (valueData.value == value.value)
          return false;
        return true;
      });
      const rightClick = () => {
        if (!value.value)
          return prompt$1.msg(placeholder);
        if (valueData.value == value.value)
          return prompt$1.msg(`您未修改${title.value}`);
        router.back();
      };
      const leftClick = () => {
        if (value.value && value.value == valueData.value)
          return router.back();
        if (!value.value && value.value == valueData.value)
          return router.back();
        if (!value.value && value.value != valueData.value)
          return uni.showModal({
            title: `编辑${title.value}提示`,
            content: "直接返回修改不会生效.是否提交修改？",
            confirmText: "提交",
            cancelText: "直接返回",
            success(result) {
              if (result.confirm) {
                rightClick();
              } else if (result.cancel) {
                router.back();
              }
            }
          });
        if (value.value && value.value != valueData.value)
          return uni.showModal({
            title: `编辑${title.value}提示`,
            content: "直接返回修改不会生效.是否提交修改？",
            confirmText: "提交",
            cancelText: "直接返回",
            success(result) {
              if (result.confirm) {
                rightClick();
              } else if (result.cancel) {
                router.back();
              }
            }
          });
      };
      return (_ctx, _cache) => {
        const _component_my_nav_bar = resolveEasycom(vue.resolveDynamicComponent("my-nav-bar"), __easycom_0$4);
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$2);
        return vue.openBlock(), vue.createElementBlock("view", { class: "edit" }, [
          vue.createVNode(_component_my_nav_bar, {
            title: "编辑" + vue.unref(title),
            rightText: "提交",
            onClickLeft: leftClick,
            onClickRight: rightClick,
            border: "",
            class: vue.normalizeClass(vue.unref(isEditValue) ? "" : "right-text")
          }, null, 8, ["title", "class"]),
          vue.createElementVNode("view", { class: "container" }, [
            vue.unref(type) == "input" ? (vue.openBlock(), vue.createBlock(_component_uni_easyinput, {
              key: 0,
              type: "text",
              modelValue: vue.unref(value),
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(value) ? value.value = $event : value = $event),
              placeholder: vue.unref(placeholder),
              trim: "",
              focus: ""
            }, null, 8, ["modelValue", "placeholder"])) : vue.createCommentVNode("v-if", true),
            vue.unref(type) == "textarea" ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("textarea", {
              key: 1,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.isRef(value) ? value.value = $event : value = $event),
              placeholder: vue.unref(placeholder),
              focus: "",
              cursor: vue.unref(value)
            }, null, 8, ["placeholder", "cursor"])), [
              [vue.vModelText, vue.unref(value)]
            ]) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(' <u-modal\r\n				:show="showModal"\r\n				content="直接返回修改不会生效.是否提交修改？"\r\n				confirmText="提交"\r\n				cancelText="直接返回"\r\n				showCancelButton\r\n				@confirm="rightClick"\r\n				@cancel="close"\r\n			></u-modal> ')
          ])
        ]);
      };
    }
  });
  const PagesMineSettingProfileEdit = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__scopeId", "data-v-addd1d6b"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/setting/profile/edit.vue"]]);
  const _sfc_main$x = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const tapPhone = () => {
        let content = "更换已绑定的手机号码 当前绑定的手机号码为：186****8151";
        prompt$1.confirm({
          content,
          confirmText: "更换"
        }).then(() => {
          router.push("replace?title=手机号");
        }).catch(() => {
        });
      };
      const tapEmail = () => {
        let content = "更换已绑定的邮箱 当前绑定的邮箱为：186****8151@qq.com";
        prompt$1.confirm({
          content,
          confirmText: "更换"
        }).then(() => {
          router.push("replace?title=邮箱");
        }).catch(() => {
        });
      };
      const tapPassword = () => {
        let content = "修改登录密码 讲给手机：186****8151发送验证码";
        prompt$1.confirm({
          content,
          confirmText: "确认"
        }).then(() => {
          router.push("replace?title=登录密码");
        }).catch(() => {
        });
      };
      let weixinStatus = vue.ref(false);
      let qqStatus = vue.ref(false);
      let userInfo = vue.reactive({});
      return (_ctx, _cache) => {
        var _a, _b;
        return vue.openBlock(), vue.createElementBlock("view", { class: "account" }, [
          vue.createElementVNode("view", { class: "gap" }),
          vue.createElementVNode("view", { class: "cell-group" }, [
            vue.createElementVNode("view", {
              class: "cell is-border",
              onClick: tapPhone
            }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "手机号码")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode("text", { class: "desc" }, "186****8151"),
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", {
              class: "cell is-border",
              onClick: tapEmail
            }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "邮箱")
              ]),
              vue.createElementVNode("view", { class: "cell-right is-switch" }, [
                vue.createElementVNode(
                  "text",
                  { class: "desc" },
                  vue.toDisplayString(((_a = vue.unref(userInfo)) == null ? void 0 : _a.email) ? (_b = vue.unref(userInfo)) == null ? void 0 : _b.email : "去绑定"),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", {
              class: "cell is-border",
              onClick: tapPassword
            }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "修改密码")
              ]),
              vue.createElementVNode("view", { class: "cell-right is-switch" }, [
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", { class: "describe" }, "社交平台账号绑定"),
            vue.createElementVNode("view", { class: "cell is-border" }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "微信")
              ]),
              vue.createElementVNode("view", { class: "cell-right is-switch" }, [
                vue.createCommentVNode(" 微信小程序显示绿色 "),
                vue.createElementVNode("switch", { checked: vue.unref(weixinStatus) }, null, 8, ["checked"])
              ])
            ]),
            vue.createElementVNode("view", { class: "cell is-border" }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "QQ")
              ]),
              vue.createElementVNode("view", { class: "cell-right is-switch" }, [
                vue.createCommentVNode(" 微信小程序显示绿色 "),
                vue.createElementVNode("switch", { checked: vue.unref(qqStatus) }, null, 8, ["checked"])
              ])
            ]),
            vue.createElementVNode("view", { class: "cell is-border" }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "新浪微博")
              ]),
              vue.createElementVNode("view", { class: "cell-right is-switch" }, [
                vue.createCommentVNode(" 微信小程序显示绿色 "),
                vue.createElementVNode("switch", { checked: vue.unref(qqStatus) }, null, 8, ["checked"])
              ])
            ]),
            vue.createElementVNode("view", { class: "describe" }, "高级设置"),
            vue.createElementVNode("view", {
              class: "cell is-border",
              onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(router).push("delAccount"))
            }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "账号注销")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", {
              class: "cell is-border",
              onClick: _cache[1] || (_cache[1] = ($event) => vue.unref(router).push("./device/login-device"))
            }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "登录设备管理")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", {
              class: "cell is-border",
              onClick: _cache[2] || (_cache[2] = ($event) => vue.unref(router).push("./security/index"))
            }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "安全中心"),
                vue.createElementVNode("text", { class: "subtitle" }, "账户锁定或解除")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ])
          ])
        ]);
      };
    }
  });
  const PagesMineSettingAccountIndex = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__scopeId", "data-v-81008e1e"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/setting/account/index.vue"]]);
  const _sfc_main$w = /* @__PURE__ */ vue.defineComponent({
    __name: "replace",
    setup(__props) {
      onLoad((o) => {
        title.value = `${o.title}`;
        uni.setNavigationBarTitle({
          title: `更换${o.title}`
        });
      });
      let tips = vue.ref("获取验证码");
      let time = vue.ref(6e4);
      let title = vue.ref("");
      let status = vue.ref(1);
      let codeLoading = vue.ref(false);
      vue.reactive({});
      let form = vue.reactive({
        account: null,
        code: null
      });
      let interval = vue.ref(null);
      let intervalFn = () => {
        if (time.value == 1e3) {
          clearInterval(interval.value);
          codeLoading.value = false;
          tips.value = `获取验证码`;
          time.value = 6e4;
          return;
        }
        time.value = time.value - 1e3;
        tips.value = `${time.value / 1e3}s 后再获取`;
      };
      const getCode = () => {
        if (!isMobile(form.account) && !isEmail(form.account))
          return prompt$1.msg("请输入有效的账号");
        prompt$1.loading("正在获取验证码");
        codeLoading.value = true;
        getVerifyCode({ account: form.account }).then((res) => {
          formatAppLog("log", "at pages/mine/setting/account/replace.vue:89", "res", res);
          prompt$1.msg("验证码已发送");
          status.value = 2;
          interval.value = setInterval(() => {
            intervalFn();
          }, 1e3);
        }).catch((e) => {
          codeLoading.value = false;
        }).finally(() => {
          prompt$1.hideLoading();
        });
      };
      const verifyCode = () => {
        status.value = 3;
      };
      return (_ctx, _cache) => {
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$2);
        return vue.openBlock(), vue.createElementBlock("view", { class: "replace" }, [
          vue.createElementVNode("view", { class: "Panel" }, [
            vue.unref(status) == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "Panel-row"
            }, [
              vue.createElementVNode(
                "view",
                { class: "row-title" },
                "请输入原" + vue.toDisplayString(vue.unref(title)),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", { class: "row-input" }, [
                vue.createVNode(_component_uni_easyinput, {
                  type: "text",
                  modelValue: vue.unref(form).account,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(form).account = $event),
                  placeholder: `请输入原${vue.unref(title)}`,
                  trim: ""
                }, null, 8, ["modelValue", "placeholder"])
              ]),
              vue.createElementVNode("view", {
                class: "button",
                onClick: getCode
              }, "下一步"),
              vue.createElementVNode("view", { class: "bottom flex" }, [
                vue.createElementVNode(
                  "text",
                  { class: "text-_a_ccc" },
                  " 原" + vue.toDisplayString(vue.unref(title)) + "已忘记？",
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("text", { class: "tijiao text-_a_3c9cff" }, "提交反馈")
              ])
            ])) : vue.unref(status) == 2 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "Panel-row"
            }, [
              vue.createElementVNode("view", { class: "row-title" }, "请输入验证码"),
              vue.createElementVNode("view", {
                class: "row-input",
                style: { "display": "flex", "justify-content": "space-between", "align-items": "center" }
              }, [
                vue.createVNode(_component_uni_easyinput, {
                  type: "number",
                  modelValue: vue.unref(form).code,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.unref(form).code = $event),
                  placeholder: "请输入验证码",
                  trim: ""
                }, null, 8, ["modelValue"]),
                vue.createElementVNode("view", {
                  class: "button ml-10px py-4px",
                  disabled: vue.unref(codeLoading),
                  onClick: getCode
                }, vue.toDisplayString(vue.unref(tips)), 9, ["disabled"])
              ]),
              vue.createElementVNode("view", {
                class: "button",
                onClick: verifyCode
              }, "下一步")
            ])) : vue.unref(status) == 3 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 2,
              class: "Panel-row"
            }, [
              vue.createElementVNode(
                "view",
                { class: "row-title" },
                "请输入新" + vue.toDisplayString(vue.unref(title)),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", { class: "row-input" }, [
                vue.createVNode(_component_uni_easyinput, {
                  type: "text",
                  modelValue: vue.unref(form).account,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => vue.unref(form).account = $event),
                  placeholder: `请输入${vue.unref(title)}`,
                  trim: ""
                }, null, 8, ["modelValue", "placeholder"])
              ]),
              vue.createElementVNode("view", {
                class: "button",
                onClick: getCode
              }, "下一步")
            ])) : vue.unref(status) == 4 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 3,
              class: "Panel-row editPwd"
            }, [
              vue.createElementVNode("view", {
                class: "row-input",
                style: { "display": "flex", "align-items": "center" }
              }, [
                vue.createVNode(_component_uni_easyinput, {
                  type: "number",
                  modelValue: vue.unref(form).code,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => vue.unref(form).code = $event),
                  placeholder: "请输入验证码",
                  trim: ""
                }, null, 8, ["modelValue"]),
                vue.createElementVNode("view", {
                  class: "button ml-10px py-4px",
                  disabled: vue.unref(codeLoading),
                  onClick: getCode
                }, vue.toDisplayString(vue.unref(tips)), 9, ["disabled"])
              ]),
              vue.createElementVNode("view", { class: "row-input" }, [
                vue.createVNode(_component_uni_easyinput, {
                  type: "text",
                  modelValue: vue.unref(form).account,
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => vue.unref(form).account = $event),
                  placeholder: `请输入${vue.unref(title)}`,
                  trim: ""
                }, null, 8, ["modelValue", "placeholder"])
              ]),
              vue.createElementVNode("view", {
                class: "button",
                onClick: verifyCode
              }, "确定修改")
            ])) : vue.createCommentVNode("v-if", true)
          ])
        ]);
      };
    }
  });
  const PagesMineSettingAccountReplace = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["__scopeId", "data-v-4304dd3b"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/setting/account/replace.vue"]]);
  const _sfc_main$v = /* @__PURE__ */ vue.defineComponent({
    __name: "delAccount",
    setup(__props) {
      let tips = vue.ref("获取验证码");
      let time = vue.ref(6e4);
      vue.ref("");
      let status = vue.ref(1);
      let codeLoading = vue.ref(false);
      vue.reactive({});
      let form = vue.reactive({
        account: null,
        code: null
      });
      const toCode = () => {
        status.value = 2;
      };
      let interval = vue.ref(null);
      let intervalFn = () => {
        if (time.value == 1e3) {
          clearInterval(interval.value);
          codeLoading.value = false;
          tips.value = `获取验证码`;
          time.value = 6e4;
          return;
        }
        time.value = time.value - 1e3;
        tips.value = `${time.value / 1e3}s 后再获取`;
      };
      const getCode = () => {
        if (!isMobile(form.account) && !isEmail(form.account))
          return prompt.msg("请输入有效的账号");
        prompt.loading("正在获取验证码");
        codeLoading.value = true;
        getVerifyCode({ account: form.account }).then((res) => {
          formatAppLog("log", "at pages/mine/setting/account/delAccount.vue:92", "res", res);
          prompt.msg("验证码已发送");
          status.value = 2;
          interval.value = setInterval(() => {
            intervalFn();
          }, 1e3);
        }).catch((e) => {
          codeLoading.value = false;
        }).finally(() => {
          prompt.hideLoading();
        });
      };
      const verifyCode = () => {
        status.value = 3;
      };
      return (_ctx, _cache) => {
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$2);
        return vue.openBlock(), vue.createElementBlock("view", { class: "delAccount" }, [
          vue.createCommentVNode(' <u-navbar placeholder :title="title" :autoBack="true" border/> '),
          vue.createElementVNode("view", { class: "Panel" }, [
            vue.unref(status) == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: ""
            }, [
              vue.createElementVNode("view", { class: "my-20px" }, "为保证你的账号安全，在你提交的注销申请生效前，需同时满足以下条件："),
              vue.createElementVNode("view", { class: "Panel-item" }, [
                vue.createElementVNode("view"),
                vue.createElementVNode("view", { class: "Panel-title" }, "1.账号财产已结清"),
                vue.createElementVNode("view", { class: "Panel-con" }, [
                  vue.createElementVNode("text", { class: "Panel-desc" }, "没有资产、欠款、未结清的资金和虚拟权益本账号及通过本账号接入的第三方中没有未完成或存在争议的服务")
                ])
              ]),
              vue.createElementVNode("view", { class: "Panel-item" }, [
                vue.createElementVNode("view", { class: "Panel-title" }, "2.账号处于安全状态"),
                vue.createElementVNode("view", { class: "Panel-con" }, [
                  vue.createElementVNode("text", { class: "Panel-desc" }, "账号处于正常使用状态，无被盗风险")
                ])
              ]),
              vue.createElementVNode("view", { class: "Panel-item" }, [
                vue.createElementVNode("view", { class: "Panel-title" }, "3.账号权限解除"),
                vue.createElementVNode("view", { class: "Panel-con" }, [
                  vue.createElementVNode("text", { class: "Panel-desc" }, "账号已解除与其他产品的授权登录或绑定关系")
                ])
              ]),
              vue.createElementVNode("view", { class: "Panel-item on-border" }, [
                vue.createElementVNode("view", { class: "Panel-title" }, "4.账号无任何纠纷，包括投诉举报")
              ]),
              vue.createElementVNode("view", { class: "xieyi" }, [
                vue.createCommentVNode(' <u-radio-group v-model="value"> '),
                vue.createCommentVNode(' <u-radio shape="circle" label="我已阅读并同意"></u-radio><span>“注销协议”</span> '),
                vue.createCommentVNode(" </u-radio-group> ")
              ]),
              vue.createElementVNode("view", {
                class: "button",
                onClick: toCode
              }, "下一步")
            ])) : vue.unref(status) == 2 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "Panel-row"
            }, [
              vue.createElementVNode("view", { class: "h1" }, "请输入验证码"),
              vue.createElementVNode("view", {
                class: "row-input",
                style: { "display": "flex", "align-items": "center" }
              }, [
                vue.createVNode(_component_uni_easyinput, {
                  type: "number",
                  modelValue: vue.unref(form).code,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(form).code = $event),
                  placeholder: "请输入验证码",
                  trim: ""
                }, null, 8, ["modelValue"]),
                vue.createElementVNode("view", {
                  class: "button ml-10px",
                  disabled: vue.unref(codeLoading),
                  onClick: getCode
                }, vue.toDisplayString(vue.unref(tips)), 9, ["disabled"])
              ]),
              vue.createElementVNode("view", {
                class: "button",
                onClick: verifyCode
              }, "下一步")
            ])) : vue.createCommentVNode("v-if", true)
          ])
        ]);
      };
    }
  });
  const PagesMineSettingAccountDelAccount = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__scopeId", "data-v-be033e5c"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/setting/account/delAccount.vue"]]);
  const _sfc_main$u = /* @__PURE__ */ vue.defineComponent({
    __name: "login-device",
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "login-device" }, [
          vue.createElementVNode("view", { class: "tisi" }, [
            vue.createElementVNode("view", { class: "zaixian" }, "在线设备（10）"),
            vue.createElementVNode("view", { class: "miaosu" }, " 以下是近期登录的设备，若非本人操作，请及时移除。移除后账号将从这个设备登出，再次登录时需要进行身份验证。 ")
          ]),
          vue.createElementVNode("view", {
            class: "item",
            onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(router).push("device-info"))
          }, [
            vue.createElementVNode("view", { class: "title" }, [
              vue.createElementVNode("text", { class: "iconfont icon-shouji text-16px" }, "iPhone X")
            ]),
            vue.createElementVNode("view", { class: "con flex flex-col" }, [
              vue.createElementVNode("text", { class: "text-14px text-_a_ccc" }, "登录应用：今日头条"),
              vue.createElementVNode("text", { class: "text-14px text-_a_ccc" }, "最近活跃：2021-02-06 15:53"),
              vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou icon-view text-18px" })
            ])
          ])
        ]);
      };
    }
  });
  const PagesMineSettingAccountDeviceLoginDevice = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__scopeId", "data-v-10ee109e"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/setting/account/device/login-device.vue"]]);
  const _sfc_main$t = {};
  function _sfc_render$4(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "device-info" }, [
      vue.createElementVNode("view", { class: "gap" }),
      vue.createElementVNode("view", { class: "cell-group" }, [
        vue.createElementVNode("view", { class: "cell is-border" }, [
          vue.createElementVNode("view", { class: "cell-left" }, [
            vue.createElementVNode("text", { class: "title" }, "登录设备")
          ]),
          vue.createElementVNode("view", { class: "cell-right" }, [
            vue.createElementVNode("text", { class: "desc" }, "iPhone X")
          ])
        ]),
        vue.createElementVNode("view", { class: "cell is-border" }, [
          vue.createElementVNode("view", { class: "cell-left" }, [
            vue.createElementVNode("text", { class: "title" }, "最近活跃时间")
          ]),
          vue.createElementVNode("view", { class: "cell-right" }, [
            vue.createElementVNode("text", { class: "desc" }, "2021-02-06 15:53")
          ])
        ]),
        vue.createElementVNode("view", { class: "cell is-border" }, [
          vue.createElementVNode("view", { class: "cell-left" }, [
            vue.createElementVNode("text", { class: "title" }, "登录地点")
          ]),
          vue.createElementVNode("view", { class: "cell-right" }, [
            vue.createElementVNode("text", { class: "desc" }, "湖南省 郴州市")
          ])
        ]),
        vue.createElementVNode("view", { class: "cell is-border" }, [
          vue.createElementVNode("view", { class: "cell-left" }, [
            vue.createElementVNode("text", { class: "title" }, "登录方式")
          ]),
          vue.createElementVNode("view", { class: "cell-right" }, [
            vue.createElementVNode("text", { class: "desc" }, "手机APP")
          ])
        ]),
        vue.createElementVNode("view", { class: "cell" }, [
          vue.createElementVNode("view", { class: "cell-left" }, [
            vue.createElementVNode("text", { class: "title" }, "登录应用")
          ]),
          vue.createElementVNode("view", { class: "cell-right" }, [
            vue.createElementVNode("text", { class: "desc" }, "今日头条")
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "gap" }),
      vue.createElementVNode("view", { class: "login-out" }, "退出登录")
    ]);
  }
  const PagesMineSettingAccountDeviceDeviceInfo = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$4], ["__scopeId", "data-v-3f4f64e9"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/setting/account/device/device-info.vue"]]);
  const _sfc_main$s = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "security-index" }, [
          vue.createElementVNode("view", { class: "gap" }),
          vue.createElementVNode("view", { class: "cell-group" }, [
            vue.createElementVNode("view", {
              class: "cell is-border",
              onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(router).push("security-lock?type=lock&title=账号锁定"))
            }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "账号锁定")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ]),
            vue.createElementVNode("view", {
              class: "cell",
              onClick: _cache[1] || (_cache[1] = ($event) => vue.unref(router).push("security-lock?type=unlock&title=解除锁定"))
            }, [
              vue.createElementVNode("view", { class: "cell-left" }, [
                vue.createElementVNode("text", { class: "title" }, "解除锁定")
              ]),
              vue.createElementVNode("view", { class: "cell-right" }, [
                vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-14px text-_a_a3a6a8" })
              ])
            ])
          ])
        ]);
      };
    }
  });
  const PagesMineSettingAccountSecurityIndex = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-c073f0fd"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/setting/account/security/index.vue"]]);
  const _sfc_main$r = /* @__PURE__ */ vue.defineComponent({
    __name: "security-lock",
    setup(__props) {
      let title = vue.ref("");
      let type = vue.ref("");
      onLoad((o) => {
        type.value = o.type;
        title.value = o.title;
        uni.setNavigationBarTitle({
          title: title.value
        });
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "security" }, [
          vue.createElementVNode("view", { class: "dev-info" }, [
            vue.createElementVNode("view", { class: "Panel-con" }, [
              vue.createElementVNode(
                "text",
                {
                  class: vue.normalizeClass(["iconfont", vue.unref(type) === "lock" ? "icon-jiesuo" : "icon-suoding"])
                },
                null,
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "view",
                { class: "Panel-title" },
                vue.toDisplayString(vue.unref(type) === "lock" ? "开启锁定保护" : "解除锁定保护"),
                1
                /* TEXT */
              )
            ]),
            vue.unref(type) === "lock" ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "Panel-list"
            }, [
              vue.createElementVNode("view", { class: "Panel-row" }, [
                vue.createElementVNode("text", { class: "d" }, "·"),
                vue.createElementVNode("text", { class: "text-_a_626262" }, "遇到帐号被盗等紧急情况，可以通过锁定保护来防止坏人窃取隐私，盗取资金、发送垃圾短信等")
              ]),
              vue.createElementVNode("view", { class: "Panel-row" }, [
                vue.createElementVNode("text", { class: "d" }, "·"),
                vue.createElementVNode("text", { class: "text-_a_626262" }, "帐号锁定成功后，已经登录的所有设备会被强制退出登录，锁定期间所有登录方式都不允许登录")
              ]),
              vue.createElementVNode("view", { class: "Panel-row" }, [
                vue.createElementVNode("text", { class: "d" }, "·"),
                vue.createElementVNode("text", { class: "text-_a_626262" }, "只有锁定保护解除后才能正常登录帐号")
              ])
            ])) : vue.createCommentVNode("v-if", true),
            vue.unref(type) === "unlock" ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "Panel-list"
            }, [
              vue.createElementVNode("view", { class: "Panel-row" }, [
                vue.createElementVNode("text", { class: "d" }, "·"),
                vue.createElementVNode("text", { class: "text-_a_626262" }, "如果锁定前您的帐号存在可疑绑定或疑似盗号等问题，解除锁定保护成功后，帐号的绑定关系将会还原")
              ]),
              vue.createElementVNode("view", { class: "Panel-row" }, [
                vue.createElementVNode("text", { class: "d" }, "·"),
                vue.createElementVNode("text", { class: "text-_a_626262" }, "解除锁定保护帐号可以正常登录")
              ])
            ])) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode(
              "view",
              { class: "button" },
              vue.toDisplayString(vue.unref(type) === "lock" ? "开启锁定保护" : "解除锁定保护"),
              1
              /* TEXT */
            )
          ])
        ]);
      };
    }
  });
  const PagesMineSettingAccountSecuritySecurityLock = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-720387f8"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/setting/account/security/security-lock.vue"]]);
  const _sfc_main$q = /* @__PURE__ */ vue.defineComponent({
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
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 首页文章item "),
            vue.createElementVNode("view", { class: "item-box" }, [
              vue.createCommentVNode(" 标题 "),
              (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "item-title"
              }, "公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找网页的开源项目 再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。")),
              vue.createCommentVNode(" 用户 "),
              __props.isGzUser && __props.type !== 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "item-user"
              }, [
                vue.createElementVNode("image", {
                  class: "user-pic",
                  src: "https://img.yzcdn.cn/vant/cat.jpeg",
                  mode: "scaleToFill"
                }),
                vue.createElementVNode("text", { class: "user-name" }, "你的Maya")
              ])) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" 内容 "),
              vue.createElementVNode("view", { class: "item-content" }, [
                vue.createCommentVNode(" 无图片 "),
                __props.type === 0 ? (vue.openBlock(), vue.createElementBlock("text", {
                  key: 0,
                  class: "content-text"
                }, " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. ")) : vue.createCommentVNode("v-if", true),
                vue.createCommentVNode(" 一张图片-右侧小图 "),
                __props.type === 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 1,
                  class: "content-right-image"
                }, [
                  vue.createElementVNode("view", { class: "left-box" }, [
                    __props.isGzUser ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "item-user"
                    }, [
                      vue.createElementVNode("image", {
                        class: "user-pic",
                        src: "https://img.yzcdn.cn/vant/cat.jpeg",
                        mode: "scaleToFill"
                      }),
                      vue.createElementVNode("text", { class: "user-name" }, "你的Maya")
                    ])) : vue.createCommentVNode("v-if", true),
                    vue.createElementVNode(
                      "text",
                      {
                        class: vue.normalizeClass([__props.isGzUser ? "ellipsis2" : "ellipsis3", "left-text"])
                      },
                      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. ",
                      2
                      /* CLASS */
                    )
                  ]),
                  vue.createElementVNode("image", {
                    class: "right-image",
                    src: "https://img.yzcdn.cn/vant/cat.jpeg",
                    mode: "scaleToFill"
                  })
                ])) : vue.createCommentVNode("v-if", true),
                vue.createCommentVNode(" 一张图片-一张大图 "),
                __props.type === 2 ? (vue.openBlock(), vue.createElementBlock("image", {
                  key: 2,
                  class: "content-max-image",
                  src: "https://img.yzcdn.cn/vant/cat.jpeg",
                  mode: "scaleToFill"
                })) : vue.createCommentVNode("v-if", true),
                vue.createCommentVNode(" 三张小图排一行 "),
                __props.type === 3 ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 3,
                  class: "content-three-image"
                }, [
                  vue.createElementVNode("image", {
                    class: "image",
                    src: "https://img.yzcdn.cn/vant/cat.jpeg",
                    mode: "scaleToFill"
                  }),
                  vue.createElementVNode("image", {
                    class: "image",
                    src: "https://img.yzcdn.cn/vant/cat.jpeg",
                    mode: "scaleToFill"
                  }),
                  vue.createElementVNode("image", {
                    class: "image",
                    src: "https://img.yzcdn.cn/vant/cat.jpeg",
                    mode: "scaleToFill"
                  })
                ])) : vue.createCommentVNode("v-if", true)
              ]),
              vue.createCommentVNode(" 底部 "),
              (vue.openBlock(), vue.createElementBlock("view", {
                key: 2,
                class: "item-bottom"
              }, [
                vue.createElementVNode("view", { class: "bottom-left" }, [
                  vue.createElementVNode("view", { class: "item" }, [
                    vue.createElementVNode("text", { class: "iconfont icon-dianzan" }),
                    vue.createCommentVNode(" 查看 "),
                    vue.createElementVNode("text", { class: "text" }, "111")
                  ]),
                  vue.createElementVNode("view", { class: "item" }, [
                    vue.createElementVNode("text", { class: "iconfont icon-dianzan" }),
                    vue.createCommentVNode(" 赞 "),
                    vue.createElementVNode("text", { class: "text" }, "111")
                  ]),
                  vue.createElementVNode("view", { class: "item" }, [
                    vue.createElementVNode("text", { class: "iconfont icon-pinglun" }),
                    vue.createCommentVNode(" 评论 "),
                    vue.createElementVNode("text", { class: "text" }, "111")
                  ]),
                  vue.createElementVNode("view", { class: "item" }, [
                    vue.createElementVNode("text", { class: "iconfont icon-shoucang" }),
                    vue.createCommentVNode(" 收藏 "),
                    vue.createElementVNode("text", { class: "text" }, "111")
                  ]),
                  vue.createElementVNode("view", { class: "item" }, [
                    vue.createElementVNode("text", { class: "iconfont icon-lishi" }),
                    vue.createElementVNode("text", { class: "text" }, "18小时前")
                  ])
                ]),
                vue.createElementVNode("view", { class: "bottom-right" }, [
                  vue.createElementVNode("text", { class: "iconfont icon-gengduo1" })
                ])
              ]))
            ])
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        );
      };
    }
  });
  const homeArticleItem = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-ca43cbb2"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/article/components/home-article-item.vue"]]);
  const _sfc_main$p = /* @__PURE__ */ vue.defineComponent({
    __name: "info-action",
    props: {
      type: { type: String, required: false, default: "article" },
      info: { type: null, required: true },
      safeAreaInsetBottom: { type: Boolean, required: false, default: true },
      placeholder: { type: Boolean, required: false, default: true },
      fixed: { type: Boolean, required: false, default: false },
      border: { type: Boolean, required: false, default: false }
    },
    emits: ["change", "onRefresh", "onClickShare", "onClickLike", "onClickComment", "onClickCollect"],
    setup(__props, { emit: __emit }) {
      vue.useCssVars((_ctx) => ({
        "7a0707fd-safeAreaInsetsBottomHeight": vue.unref(safeAreaInsetsBottomHeight)
      }));
      const emit = __emit;
      const porps = __props;
      const safeAreaInsetsBottomHeight = vue.ref("0px");
      vue.watchEffect(() => {
        var _a;
        if (porps.fixed && porps.safeAreaInsetBottom) {
          const systemInfo = uni.getSystemInfoSync();
          safeAreaInsetsBottomHeight.value = (((_a = systemInfo.safeAreaInsets) == null ? void 0 : _a.bottom) || 0) + "px";
        }
      });
      const clickItem = (value) => {
        if (value === "like")
          handleLike();
        if (value === "comment")
          handleComment();
        if (value === "collect")
          handleCollect();
      };
      const like2 = vue.ref(false);
      const handleLike = async () => {
      };
      const collect2 = vue.ref(false);
      const handleCollect = async () => {
      };
      const handleComment = () => {
        emit("onClickComment");
      };
      vue.onMounted(() => {
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "article-info-action-container" }, [
          vue.createCommentVNode(" 操作盒子 "),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["action-wrapper", _ctx.fixed ? "is-fixed" : "", _ctx.border ? "is-border" : ""])
            },
            [
              vue.createElementVNode("view", {
                class: "action-item",
                onClick: _cache[0] || (_cache[0] = ($event) => clickItem("comment"))
              }, [
                vue.createElementVNode("text", { class: "iconfont icon-xiaoxi" }),
                vue.createElementVNode(
                  "text",
                  { class: "action-item-text" },
                  vue.toDisplayString(_ctx.info.commentCount ? _ctx.info.commentCount : "评论"),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", {
                class: "action-item",
                onClick: _cache[1] || (_cache[1] = ($event) => clickItem("collect"))
              }, [
                vue.createElementVNode(
                  "text",
                  {
                    class: vue.normalizeClass(["iconfont", [vue.unref(collect2) ? "icon-shoucang1" : "icon-shoucang"]]),
                    style: vue.normalizeStyle({ color: vue.unref(collect2) ? "#728ae9" : "#8a8a8a" })
                  },
                  null,
                  6
                  /* CLASS, STYLE */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "action-item-text" },
                  vue.toDisplayString(_ctx.info.collectCount ? _ctx.info.collectCount : "收藏"),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", {
                class: "action-item",
                onClick: _cache[2] || (_cache[2] = ($event) => clickItem("like"))
              }, [
                vue.createElementVNode(
                  "text",
                  {
                    class: vue.normalizeClass(["iconfont", [vue.unref(like2) ? "icon-dianzan_kuai" : "icon-dianzan"]]),
                    style: vue.normalizeStyle({ color: vue.unref(like2) ? "#728ae9" : "#8a8a8a" })
                  },
                  null,
                  6
                  /* CLASS, STYLE */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "action-item-text" },
                  vue.toDisplayString(_ctx.info.likeCount ? _ctx.info.likeCount : "点赞"),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", {
                class: "action-item",
                onClick: _cache[3] || (_cache[3] = ($event) => clickItem("share"))
              }, [
                vue.createElementVNode("text", { class: "iconfont icon-fenxiang" }),
                vue.createElementVNode("text", { class: "action-item-text" }, "分享")
              ])
            ],
            2
            /* CLASS */
          ),
          vue.createCommentVNode(" fixed定位固定在底部时，是否生成一个等高元素防止塌陷 "),
          _ctx.fixed && _ctx.placeholder ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "placeholder"
          })) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 是否为iPhoneX留出底部安全距离 "),
          _ctx.fixed && _ctx.safeAreaInsetBottom ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "safeArea-inset-bottom-height"
          })) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  });
  const infoAction = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-7a0707fd"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/article/components/info-action.vue"]]);
  const getUserCollectList = (query) => {
    return request({
      url: "/article/collect/getUserCollectList",
      method: "GET",
      params: query
    });
  };
  const __default__$6 = { name: "collect" };
  const _sfc_main$o = /* @__PURE__ */ vue.defineComponent({
    ...__default__$6,
    setup(__props) {
      const list = vue.ref([]);
      let query = vue.reactive({
        pageNum: 1,
        pageSize: 10,
        total: 0
      });
      const loadUserCollectList = async (pageNum = 1) => {
        const result = await getUserCollectList(query);
        list.value = pageNum > 1 ? list.value.concat(result.data.list) : result.data.list;
        query.pageNum = result.data.pagination;
        query.pageSize = result.data.pageSize;
        query.total = result.data.total;
      };
      vue.onMounted(() => {
        loadUserCollectList();
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "collect" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(4, (item, index) => {
              return vue.createElementVNode("view", {
                class: "collect-item mb-10px",
                key: index
              }, [
                vue.createVNode(homeArticleItem, {
                  class: "",
                  type: 1,
                  isGzUser: true
                }),
                vue.createVNode(infoAction, {
                  info: item.article
                }, null, 8, ["info"])
              ]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ]);
      };
    }
  });
  const collect = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/content/components/collect.vue"]]);
  const __default__$5 = { name: "comment" };
  const _sfc_main$n = /* @__PURE__ */ vue.defineComponent({
    ...__default__$5,
    setup(__props) {
      let list = vue.ref([]);
      vue.ref(0);
      vue.ref("https://img01.yzcdn.cn/vant/cat.jpeg");
      vue.reactive({
        pageNum: 1,
        pageSize: 10
      });
      vue.onMounted(() => {
      });
      const goToUser = (id) => {
        formatAppLog("log", "at pages/mine/content/components/comment.vue:67", "id", id);
      };
      const goToArticle = (id) => {
        formatAppLog("log", "at pages/mine/content/components/comment.vue:71", "id", id);
        router.push(`/pages/article/info?articleId=${id}`);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "comment" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(4, (item, index) => {
              return vue.createElementVNode("view", {
                class: "item-avatar-one",
                key: index
              }, [
                vue.createElementVNode("view", { class: "top" }, [
                  vue.createElementVNode("image", {
                    class: "w-36px h-36px overflow-hidden rounded-full",
                    "lazy-load": "",
                    src: "https://img01.yzcdn.cn/vant/cat.jpeg",
                    mode: "aspectFill",
                    onClick: _cache[0] || (_cache[0] = ($event) => goToUser(1))
                  }),
                  vue.createElementVNode("view", { class: "author" }, [
                    vue.createElementVNode("a", {
                      onClick: _cache[1] || (_cache[1] = ($event) => goToUser(1))
                    }, "你的Maya"),
                    vue.createElementVNode("text", { selectable: "" }, "3分钟前")
                  ])
                ]),
                vue.createElementVNode("view", { class: "comment" }, "经不经典我不管，我只喜欢这一款。"),
                vue.createElementVNode("view", { class: "centre" }, [
                  vue.createElementVNode("view", { class: "left" }, [
                    vue.createElementVNode("view", {
                      class: "author",
                      onClick: _cache[2] || (_cache[2] = ($event) => goToUser(1))
                    }, [
                      vue.createElementVNode("image", {
                        class: "w-30px h-30px overflow-hidden rounded-full",
                        "lazy-load": "",
                        src: "https://img01.yzcdn.cn/vant/cat.jpeg",
                        mode: "aspectFill"
                      }),
                      vue.createElementVNode("a", null, "你的Maya")
                    ]),
                    vue.createElementVNode("h1", {
                      onClick: _cache[3] || (_cache[3] = ($event) => goToArticle(1))
                    }, " 经不经典我不管，我只喜欢这一款。 ")
                  ]),
                  vue.createElementVNode("view", {
                    class: "right",
                    onClick: _cache[4] || (_cache[4] = ($event) => goToArticle(1))
                  }, [
                    vue.createElementVNode("image", {
                      class: "w-120px h-90px",
                      src: "https://img01.yzcdn.cn/vant/cat.jpeg",
                      mode: "scaleToFill"
                    })
                  ])
                ]),
                vue.createElementVNode("view", { class: "bottom" }, [
                  vue.createCommentVNode(' <info-action @onAction="onActionTap" :info="item" /> ')
                ])
              ]);
            }),
            64
            /* STABLE_FRAGMENT */
          )),
          !vue.unref(list).length ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, "暂无评论内容")) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  });
  const comment = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-ba2f5cae"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/content/components/comment.vue"]]);
  const __default__$4 = { name: "like" };
  const _sfc_main$m = /* @__PURE__ */ vue.defineComponent({
    ...__default__$4,
    setup(__props) {
      vue.ref([]);
      vue.reactive({
        pageNum: 1,
        pageSize: 10,
        total: 0
      });
      vue.onMounted(() => {
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "like" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(4, (item, index) => {
              return vue.createElementVNode("view", {
                class: "mb-10px",
                key: index
              }, [
                vue.createVNode(homeArticleItem, {
                  info: item.article
                }, null, 8, ["info"]),
                vue.createVNode(infoAction, {
                  info: item.article
                }, null, 8, ["info"])
              ]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ]);
      };
    }
  });
  const like = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/content/components/like.vue"]]);
  const __default__$3 = { name: "history" };
  const _sfc_main$l = /* @__PURE__ */ vue.defineComponent({
    ...__default__$3,
    setup(__props) {
      vue.ref([]);
      vue.reactive({
        pageNum: 1,
        pageSize: 10,
        total: 0
      });
      vue.onMounted(() => {
      });
      return (_ctx, _cache) => {
        const _component_info_action = vue.resolveComponent("info-action");
        return vue.openBlock(), vue.createElementBlock("view", { class: "history" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(4, (item, index) => {
              return vue.createElementVNode("view", {
                class: "mb-10px",
                key: index
              }, [
                vue.createVNode(homeArticleItem, {
                  info: item.article
                }, null, 8, ["info"]),
                vue.createVNode(_component_info_action, {
                  info: item.article
                }, null, 8, ["info"])
              ]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ]);
      };
    }
  });
  const history = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/content/components/history.vue"]]);
  const _sfc_main$k = /* @__PURE__ */ vue.defineComponent({
    __name: "report",
    setup(__props) {
      let list = vue.ref([
        {
          article: {
            title: "title"
          },
          status: 1,
          type: 1,
          remark: "remark",
          createTime: "createTime"
        }
      ]);
      vue.reactive({
        pageNum: 1,
        pageSize: 10,
        total: 0
      });
      const typeDict = (val) => {
        const map = {
          0: "其他问题",
          1: "标题夸张",
          2: "低俗色情",
          3: "错别字多",
          4: "旧闻重复",
          5: "广告软文",
          6: "内容不实",
          7: "涉嫌违法犯罪",
          8: "侵权"
        };
        return map[val] || "未知";
      };
      const statusDict = (val) => {
        const map = {
          0: "审核失败",
          1: "审核中",
          2: "审核完成,内容未违规",
          3: "审核完成,内容违规已删除该文章"
        };
        return map[val] || "未知";
      };
      vue.onMounted(() => {
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "my-report" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(vue.unref(list), (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "my-report-item",
                key: index
              }, [
                vue.createElementVNode("view", { class: "title" }, [
                  vue.createElementVNode(
                    "h1",
                    null,
                    vue.toDisplayString(item.article.title),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", null, [
                  vue.createElementVNode("text", null, "处理进度："),
                  vue.createElementVNode(
                    "text",
                    { class: "active" },
                    vue.toDisplayString(statusDict(item.status)),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", null, [
                  vue.createElementVNode("text", null, "举报理由："),
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(item.remark),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", null, [
                  vue.createElementVNode("text", null, "举报时间："),
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(item.createTime),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", null, [
                  vue.createElementVNode("text", null, "举报类型："),
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(typeDict(item.type)),
                    1
                    /* TEXT */
                  )
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]);
      };
    }
  });
  const report = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-6d0a3e75"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/content/components/report.vue"]]);
  const _sfc_main$j = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      onLoad((query) => {
        if (query.type)
          type.value = query.type;
      });
      let type = vue.ref("");
      let tabsList = vue.reactive([{ name: "收藏" }, { name: "评论" }, { name: "历史" }, { name: "点赞" }, { name: "举报" }, { name: "推送" }, { name: "预约" }]);
      const clickTabs = (item) => {
        if (item.name == "收藏") {
          type.value = "collect";
        } else if (item.name == "评论") {
          type.value = "comment";
        } else if (item.name == "历史") {
          type.value = "history";
        } else if (item.name == "点赞") {
          type.value = "like";
        } else if (item.name == "举报") {
          type.value = "report";
        } else if (item.name == "推送") {
          prompt$1.msg("推送 功能未开发");
        } else if (item.name == "预约") {
          prompt$1.msg("预约 功能未开发");
        }
      };
      const search = () => {
        formatAppLog("log", "at pages/mine/content/index.vue:62", "点击搜索");
        router.push("/pages/search/index");
      };
      return (_ctx, _cache) => {
        const _component_my_nav_bar = resolveEasycom(vue.resolveDynamicComponent("my-nav-bar"), __easycom_0$4);
        return vue.openBlock(), vue.createElementBlock("div", { class: "user-content" }, [
          vue.createVNode(_component_my_nav_bar, {
            title: "我的内容",
            onClickLeft: _cache[0] || (_cache[0] = ($event) => vue.unref(router).back()),
            leftWidth: "30px",
            rightWidth: "50px",
            fixed: "",
            border: ""
          }, {
            right: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "flex flex-items-center gap-x-5px" }, [
                vue.createElementVNode("text", {
                  class: "iconfont icon-sousuo text-black text-14px",
                  onClick: search
                }),
                vue.createElementVNode("text", { class: "text-14px" }, vue.toDisplayString("管理"))
              ])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "tabs" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(vue.unref(tabsList), (item) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "tab-item",
                  key: item.name,
                  onClick: ($event) => clickTabs(item)
                }, vue.toDisplayString(item.name), 9, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          vue.createElementVNode("view", { class: "Panel" }, [
            vue.unref(type) === "collect" ? (vue.openBlock(), vue.createBlock(collect, { key: 0 })) : vue.unref(type) === "comment" ? (vue.openBlock(), vue.createBlock(comment, { key: 1 })) : vue.unref(type) === "history" ? (vue.openBlock(), vue.createBlock(history, { key: 2 })) : vue.unref(type) === "like" ? (vue.openBlock(), vue.createBlock(like, { key: 3 })) : vue.unref(type) === "report" ? (vue.openBlock(), vue.createBlock(report, { key: 4 })) : (vue.openBlock(), vue.createElementBlock("view", {
              key: 5,
              class: ""
            }, "暂未开发"))
          ])
        ]);
      };
    }
  });
  const PagesMineContentIndex = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-2f37139f"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/content/index.vue"]]);
  const _sfc_main$i = {};
  function _sfc_render$3(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", null, " mine ");
  }
  const PagesMineMine = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$3], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/mine/mine.vue"]]);
  const getUserSearchHistoryList = (query) => {
    return request({
      url: "/article/search/getUserSearchHistory",
      method: "GET",
      params: query
    });
  };
  const destroyUserOneSearchHistory = (ids) => {
    return request({
      url: "/article/search/destroyUserOneSearchHistory",
      method: "POST",
      data: {
        ids
      }
    });
  };
  const destroyUserAllSearchHistory = () => {
    return request({
      url: "/article/search/destroyUserAllSearchHistory",
      method: "POST"
    });
  };
  const getAdvicelist = (msg) => {
    return request({
      url: "/article/search/getAdvicelist",
      method: "GET",
      params: {
        msg
      }
    });
  };
  const getArticleList = (query) => {
    return request({
      url: "/article",
      method: "GET",
      params: query
    });
  };
  const __default__$2 = { name: "search-hot" };
  const _sfc_main$h = /* @__PURE__ */ vue.defineComponent({
    ...__default__$2,
    props: {
      list: {
        type: Array,
        required: true,
        default: () => []
      }
    },
    emits: ["onClick"],
    setup(__props, { emit: __emit }) {
      const emit = __emit;
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "hot-search" }, [
          vue.createElementVNode("view", { class: "title-box" }, [
            vue.createElementVNode("view", { class: "name" }, "热门搜索"),
            vue.createElementVNode("text", { class: "iconfont icon-huo text-red text-18px" })
          ]),
          vue.createElementVNode("view", { class: "list" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(__props.list, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "item ellipsis1",
                  key: index,
                  onClick: ($event) => emit("onClick", item)
                }, [
                  vue.createElementVNode("text", { class: "iconfont icon-huo text-red text-14px" }),
                  vue.createElementVNode(
                    "text",
                    { class: "keyword" },
                    vue.toDisplayString(item.keywords),
                    1
                    /* TEXT */
                  )
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]);
      };
    }
  });
  const searchHot = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-42fcbe26"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/search/components/search-hot.vue"]]);
  const _sfc_main$g = /* @__PURE__ */ vue.defineComponent({
    __name: "search-advice",
    props: {
      list: {
        type: Array,
        required: true,
        default: () => []
      },
      keyword: {
        type: String,
        default: ""
      }
    },
    emits: ["onClick"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const highlight = (str) => {
        const highlightStr = `<text style="color:red;">${props.keyword}</text>`;
        str = str.replace(new RegExp(props.keyword, "gi"), highlightStr);
        return str;
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "advice" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(__props.list, (advice, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "item ellipsis1",
                key: index,
                onClick: ($event) => emit("onClick", advice)
              }, [
                vue.createElementVNode("text", { class: "iconfont icon-sousuo text-_a_999" }),
                vue.createElementVNode("view", {
                  innerHTML: highlight(advice)
                }, null, 8, ["innerHTML"])
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]);
      };
    }
  });
  const searchAdvice = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-f40c3399"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/search/components/search-advice.vue"]]);
  const __default__$1 = { name: "search-history" };
  const _sfc_main$f = /* @__PURE__ */ vue.defineComponent({
    ...__default__$1,
    props: {
      list: {
        type: Array,
        required: true,
        default: () => []
      }
    },
    emits: ["onClick", "onRefresh"],
    setup(__props, { emit: __emit }) {
      const isDel = vue.ref(false);
      const emit = __emit;
      const delAll = async () => {
        await destroyUserAllSearchHistory();
        emit("onRefresh");
        isDel.value = false;
      };
      const delItem = async (row) => {
        await destroyUserOneSearchHistory(row.id);
        emit("onRefresh");
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "history" }, [
          vue.createElementVNode("view", { class: "handle" }, [
            vue.createElementVNode("view", { class: "name" }, "搜索历史"),
            vue.createElementVNode("view", null, [
              isDel.value ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                [
                  vue.createElementVNode("text", {
                    class: "text-14px",
                    onClick: delAll
                  }, "全部删除"),
                  vue.createElementVNode("text", {
                    class: "text-14px",
                    style: { "margin-left": "12px" },
                    onClick: _cache[0] || (_cache[0] = ($event) => isDel.value = false)
                  }, "完成")
                ],
                64
                /* STABLE_FRAGMENT */
              )) : (vue.openBlock(), vue.createElementBlock("text", {
                key: 1,
                class: "iconfont icon-shanchu2 text-_a_999 text-16px",
                onClick: _cache[1] || (_cache[1] = ($event) => isDel.value = true)
              }))
            ])
          ]),
          vue.createElementVNode("view", { class: "list" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(__props.list, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "item",
                  key: index
                }, [
                  vue.createElementVNode("view", {
                    class: "flex flex-items-center ellipsis1",
                    onClick: ($event) => emit("onClick", item)
                  }, [
                    vue.createElementVNode("text", { class: "iconfont icon-lishi text-_a_999 text-14px mr5px" }),
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString(item.keywords),
                      1
                      /* TEXT */
                    )
                  ], 8, ["onClick"]),
                  vue.createElementVNode("view", { class: "cha" }, [
                    vue.withDirectives(vue.createElementVNode("text", {
                      class: "iconfont icon-cha text-_a_999 text-10px ml5px",
                      onClick: ($event) => delItem(item)
                    }, null, 8, ["onClick"]), [
                      [vue.vShow, isDel.value]
                    ])
                  ])
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]);
      };
    }
  });
  const searchHistory = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-6e7c64aa"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/search/components/search-history.vue"]]);
  const _sfc_main$e = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      vue.ref("");
      const searchHotList = vue.ref([]);
      const searchHistoryList = vue.ref([]);
      const searchAdviceList = vue.ref([]);
      const handleBack = () => {
        router.back();
      };
      const clickHotSearch = (row) => {
        searchArticleQuery.keywords = row.keywords;
        loadArticleList();
      };
      const tapAdvice = (keyword) => {
        searchAdviceList.value = [];
        searchArticleQuery.keywords = keyword;
        loadArticleList();
      };
      const searchArticleQuery = vue.reactive({
        keywords: "",
        pageNum: 1,
        pageSize: 10,
        total: 0,
        Loading: true
      });
      const searchArticleList = vue.ref([]);
      const loadArticleList = async (pageNum = 1) => {
        const result = await getArticleList(searchArticleQuery);
        searchArticleList.value = pageNum > 1 ? searchArticleList.value.concat(result.data.list) : result.data.list;
        searchArticleQuery.pageNum = result.data.pagination;
        searchArticleQuery.pageSize = result.data.pageSize;
        searchArticleQuery.total = result.data.total;
        loadUserSearchHistoryList();
      };
      const loadUserSearchHistoryList = () => {
        getUserSearchHistoryList({ pageSize: 12 }).then((res) => {
          searchHistoryList.value = res.data.list;
        });
      };
      const loadsearchAdviceList = async () => {
        searchAdviceList.value = [];
        const result = await getAdvicelist(searchArticleQuery.keywords);
        searchAdviceList.value = result.data;
      };
      vue.onMounted(() => {
      });
      vue.watch(() => searchArticleQuery.keywords, (n, o) => {
        searchArticleList.value = [];
        searchAdviceList.value = [];
        loadsearchAdviceList();
      });
      const showHistory = vue.computed(() => {
        if (!searchArticleQuery.keywords && searchHistoryList.value.length) {
          return true;
        } else {
          return false;
        }
      });
      const showHot = vue.computed(() => {
        if (!searchArticleQuery.keywords && searchHotList.value.length) {
          return true;
        } else {
          return false;
        }
      });
      const showAdvice = vue.computed(() => {
        if (searchArticleQuery.keywords && searchAdviceList.value.length && !searchArticleList.value.length) {
          return true;
        } else {
          return false;
        }
      });
      vue.computed(() => {
        if (searchArticleQuery.keywords && searchArticleList.value.length) {
          return true;
        } else {
          return false;
        }
      });
      const clearIcon = () => {
        searchArticleQuery.keywords = "";
      };
      return (_ctx, _cache) => {
        const _component_my_nav_bar = resolveEasycom(vue.resolveDynamicComponent("my-nav-bar"), __easycom_0$4);
        return vue.openBlock(), vue.createElementBlock("view", { class: "search-page" }, [
          (vue.openBlock(), vue.createBlock(_component_my_nav_bar, {
            key: 0,
            rightText: "搜索",
            clickLeft: handleBack,
            onClickRight: loadArticleList,
            leftWidth: "23px",
            rightWidth: "35px",
            fixed: ""
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "input-view" }, [
                vue.createCommentVNode(' <uni-icons type="search" size="18" color="#999" /> '),
                vue.createElementVNode("text", { class: "iconfont icon-sousuo" }),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    class: "nav-bar-input",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchArticleQuery.keywords = $event),
                    focus: "",
                    placeholder: "输入关键词搜索",
                    onConfirm: loadArticleList,
                    "confirm-type": "search"
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ), [
                  [
                    vue.vModelText,
                    searchArticleQuery.keywords,
                    void 0,
                    { trim: true }
                  ]
                ]),
                vue.withDirectives(vue.createElementVNode(
                  "text",
                  {
                    class: "iconfont icon-cha",
                    onClick: clearIcon
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, searchArticleQuery.keywords]
                ])
              ])
            ]),
            _: 1
            /* STABLE */
          })),
          vue.createElementVNode("view", { class: "content" }, [
            vue.createCommentVNode(" 联想建议 "),
            vue.withDirectives(vue.createVNode(searchAdvice, {
              keyword: searchArticleQuery.keywords,
              list: searchAdviceList.value,
              onOnClick: tapAdvice
            }, null, 8, ["keyword", "list"]), [
              [vue.vShow, showAdvice.value]
            ]),
            vue.createCommentVNode(" history "),
            vue.withDirectives(vue.createVNode(searchHistory, {
              list: searchHistoryList.value,
              onOnClick: clickHotSearch,
              onOnRefresh: loadUserSearchHistoryList
            }, null, 8, ["list"]), [
              [vue.vShow, showHistory.value]
            ]),
            vue.createCommentVNode(" 热门搜索 "),
            vue.withDirectives(vue.createVNode(searchHot, {
              list: searchHotList.value,
              onOnClick: clickHotSearch
            }, null, 8, ["list"]), [
              [vue.vShow, showHot.value]
            ]),
            vue.createCommentVNode(" 搜索结果 "),
            vue.createCommentVNode(' <view v-show="showResult" class="search-result">\r\n				<view class="item" v-for="(item,index) in searchArticleList" :key="index">\r\n					{{item.title}}\r\n				</view>\r\n			</view> '),
            vue.createCommentVNode(' <view v-show="showEmpty" class="">\r\n				showEmpty 搜索无结果\r\n			</view> ')
          ])
        ]);
      };
    }
  });
  const PagesSearchIndex = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-2dab939d"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/search/index.vue"]]);
  const _imports_0$1 = "/static/images/login.png";
  const login = {
    background: "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABLAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0NSA3OS4xNjM0OTksIDIwMTgvMDgvMTMtMTY6NDA6MjIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5Mjg2NkQyRTdBMEMxMUVBQTlFRTg5MEZFMkE3MEZBQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5Mjg2NkQyRjdBMEMxMUVBQTlFRTg5MEZFMkE3MEZBQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjkyODY2RDJDN0EwQzExRUFBOUVFODkwRkUyQTcwRkFCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjkyODY2RDJEN0EwQzExRUFBOUVFODkwRkUyQTcwRkFCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+IMWElDQ19QUk9GSUxFAAEBAAAMSExpbm8CEAAAbW50clJH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U222221OSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSYpJJJJJJOZMmSAbISSSSSSSSSSSSSSSSSSSSSTC222220SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSTJJJJJJJIFk2SBbASSSSSSSSSSSSSSSSSSSSSSIW22222ySSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSQtJJJJJJJEkyQDZCSSSSSSSSSSSSSSSSSSSSSSTW22221eSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSDJJJJJJJJSSQLYCSSSSSSSSSSSSSSSSSSSSSSSW22222iSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSQpJJJJJJJIGAbISSSSSSSSSSSSSSSSSSSSSSSSSW2222lySSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSRVJJJJJJJJBBbASSSSSSSSSSSSSSSSSSSSSSSSQK22220SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSNJJJJJJJJLDZCSSSSSSSSSSSSSSSSSSSSSSSSSC22220eSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSUpJJJJJJJJJMCSSSSSSSSSSSSSSSSSSSSSSSSSQW2222uSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSTJJJJJJJJJJaSSSSSSSSSSSSSSSSSSSSSSSSSSTq22226SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSQBJJJJJJJJJI6SSSSSSSSSSSSSSSSSSSSSSSSSSS22220SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSTJJJJJJJJJJQySSSSSSSSSSSSSSSSSSSSSSSSSc22222SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSJJJJJJJJJJJWSSSSSSSSSSSSSSSSSSSSSSSSST22223SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSST5JJJJJJJJJJLeSSSSSSSSSSSSSSSSSSSSSSSSTW2222mSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSEJJJJJJJJJJJSySSSSUySSSSSSSSSSSSSSSSSQK22222SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSST1JJJJJJJJJJL+SSSGUmSSSSSSSSSSSSSSSSSSS2222iSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSMVJJJJJJJJJJC+SaUkmSSSSSSSSSSSSSSSSSSG2222iSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSNJJJJJJJJJJJBxEkkmSSSSSSSSSSSSSSSSSSG2222kSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSAZJJJJJJJJKOxEkkmSSSSSSSSSSSSSSSSSSRW2220ySSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSW9JJJJJJYoyQakkmSSSSSSSSSSSSSSSSSSS22221SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSnPJIyzySSSQdUmSSSSSSSSSSSSSSSSSST22220SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSQvySSSSSSSHKSSSSSSSSSSSSSSSSSSQW2222ySSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSRW2221ySSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSR22221ySSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSR22221ySSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSTW2222ySSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSQW2220ySSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSR22223SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSTW2222ySSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSK22223ySSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSK22226SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSO2222uSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSW2222+SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSR22222qSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSR22220qSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSDW2221ySSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSa22222ySSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSW2222nySSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSTW2222+SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSDW2222qSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS22220SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSRW22220SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSfW2222gSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSQW222226SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSB222221ySSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSQO22222hySSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSa2222222SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSQi222221ySSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSVW222227ySSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSF2222221WSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSeG2222223SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSEC2222222mSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSQSSSSSSSQ+222222222ySSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSQ2EPiDnea222222220iSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS2222222222222222pSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS2222222222222220GSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS222222222222222gSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS222222222222225SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS2222222222222jCSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS222222222222kOSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS22222222222qOSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS22222222220qSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS222222227HySSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSQWO5Cha55ySSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS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kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk4MAkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkJMDkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkF2jkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkgijkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkjrnkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkiPXkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkhxXkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkiBXEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkklO/Ekkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkka/Ekkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkj0LEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkh1LEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkJgMkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkn+kckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkqUckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk1c8kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkp48kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk2q8kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkGK4kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkJn4kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkVX4kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkLRYkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkmhYkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkZMAkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkd8DkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkF2jkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkginkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkjLnkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkmXXkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkklxXEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkmFXEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkklu/Ekkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkq7Ekkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkki0LEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkhlLEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkJgckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkj+kckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkIUckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkVc8kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkJ48kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkWq8kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkGK4kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkJn4kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkTX4kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkqRYkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkmpYkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkRMAkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkd8jkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkklyjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkmqnkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkklLHkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkmXXkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkklxXEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkmE3Ekkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkknu/EkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkhaLEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkki0LEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkknBKEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkJgckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkg+kckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkMUckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkdc8kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkB68kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkeK8kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkSK4kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkJn4kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkzX4kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk6hYkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOpYkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkBMAkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk/0jkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkklSjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkmKnkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkklfHkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkmVXkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkklxXEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkmE/Ekkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkjq/EkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkhaLEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkm0LEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkknBgEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkhJgckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkgu0ckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkEUckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkdc8kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkR68kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOK8kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkQK4kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkp34kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkzX4kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkehYkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOpYkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkhMDkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk/0jkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkklSjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkmrnkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkklPHkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkm1XkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkhxXEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkgM/Ekkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkiq/EkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkhaLEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk0LEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkjJgEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkhvgckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkgu0ckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkEU8kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkdc8kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkky68kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkuK4kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkwq4kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkt34kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkklXYkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkehYkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkMpYkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkhMDkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkf0jkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkklCjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkirnkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkhPHkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkki1XkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkgxXEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkhM/Ekkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkki6/EkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkklSLEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk1LEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkjJgEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkjvkckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkuUckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkklU8kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk5Y8kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkky68kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkuK4kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkwm4kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkt34kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkLRYkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkWhYkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk4JQkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkhMDkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkH0jkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkmyjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkj0nkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkmyjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkd0Lkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk8ICkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkVXakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkSK4kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk6U8kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkjqI0kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk/tXEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkgVonkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkj264kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkgup48kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk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"
  };
  const isMobile$1 = (str) => {
    return /^1[3-9]\d{9}$/.test(str);
  };
  const isEmail$1 = (str) => {
    return /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/.test(str);
  };
  const getVerifyCode$1 = (data) => {
    return request({
      url: "/verifyCode/createVerifyCode",
      method: "POST",
      data
    });
  };
  const _sfc_main$d = /* @__PURE__ */ vue.defineComponent({
    __name: "login",
    setup(__props) {
      const appStore = useAppStore();
      const userStore = useUserStore();
      let tips = vue.ref("获取验证码");
      let type = vue.ref(1);
      let loading = vue.ref(false);
      let codeLoading = vue.ref(false);
      let time = vue.ref(1e3 * 60);
      let form = vue.reactive({
        account: null,
        password: null,
        code: null
      });
      const handlePrivacy = () => {
        let site = appStore.agreements[0];
        router.push(`/pages/common/webview/index?title=${site.title}&url=${site.url}`);
      };
      const handleUserAgrement = () => {
        let site = appStore.agreements[1];
        router.push(`/pages/common/webview/index?title=${site.title}&url=${site.url}`);
      };
      const formSubmit = (e) => {
        formatAppLog("log", "at pages/login/login.vue:141", "form发生了submit事件，携带数据为：" + JSON.stringify(e.detail.value));
        var formdata = e.detail.value;
        uni.showModal({
          content: "表单数据内容：" + JSON.stringify(formdata),
          showCancel: false
        });
      };
      const formReset = (e) => {
        formatAppLog("log", "at pages/login/login.vue:150", "清空数据", e);
      };
      let interval = vue.ref();
      let intervalFn = () => {
        if (time.value == 1e3) {
          clearInterval(interval.value);
          codeLoading.value = false;
          tips.value = `获取验证码`;
          time.value = 6e4;
          return;
        }
        time.value = time.value - 1e3;
        tips.value = `${time.value / 1e3}s 后再获取`;
      };
      const getCode = () => {
        if (!isMobile$1(form.account) && !isEmail$1(form.account))
          return prompt$1.msg("请输入有效的账号");
        prompt$1.loading("正在获取验证码");
        codeLoading.value = true;
        getVerifyCode$1({ account: form.account }).then((res) => {
          formatAppLog("log", "at pages/login/login.vue:172", "res", res);
          prompt$1.msg("验证码已发送");
          interval.value = setInterval(() => {
            intervalFn();
          }, 1e3);
        }).catch((e) => {
          codeLoading.value = false;
        }).finally(() => {
          prompt$1.hideLoading();
        });
      };
      const oauths = vue.ref([]);
      const initProvider = async () => {
        uni.getProvider({
          service: "oauth",
          success(res) {
            formatAppLog("log", "at pages/login/login.vue:195", "providers", res.providers.length);
            if (!res.providers.length)
              return formatAppLog("error", "at pages/login/login.vue:196", "没有获取到服务供应商");
            if (res.errMsg !== "getProvider:ok")
              return formatAppLog("error", "at pages/login/login.vue:197", res.errMsg);
            oauths.value = res.providers.map((item) => {
              if (item.id === "univerify")
                appUniverifyLogin();
              return providerinfo(item);
            });
            formatAppLog("log", "at pages/login/login.vue:203", "oauths", oauths.value.length);
          },
          fail: (fail) => {
            formatAppLog("error", "at pages/login/login.vue:206", "getProvider-fail", fail);
          }
        });
        function providerinfo(item) {
          let platform = "";
          platform = "APP-PLUS";
          let info = {
            provider: item.id,
            description: item.description,
            platform,
            icon: "",
            color: ""
          };
          if (item.id === "univerify") {
            info.icon = "icon-shouji";
            info.color = "#000";
          }
          if (item.id === "weixin") {
            info.icon = "icon-weixin";
            info.color = "rgb(74, 221, 51)";
          }
          if (item.id === "qq") {
            info.icon = "icon-qq";
            info.color = "rgb(87, 139, 222)";
          }
          if (item.id === "sinaweibo") {
            info.icon = "icon-xinlangweibo";
            info.color = "rgb(244, 94, 75)";
          }
          if (item.id === "google") {
            info.icon = "icon-guge";
            info.color = "rgb(244, 94, 75)";
          }
          if (item.id === "facebook") {
            info.icon = "icon-facebook";
            info.color = "rgb(244, 94, 75)";
          }
          if (item.id === "apple") {
            info.icon = "icon-xinlangweibo";
            info.color = "#000";
          }
          if (item.id === "github") {
            info.icon = "icon-github";
            info.color = "rgb(10, 24, 54)";
          }
          return info;
        }
      };
      const oauthLogin = (row) => {
        if (row.platform === "WEB") {
          if (row.provider === "github") {
            window.location.href = `https://github.com/login/oauth/authorize?client_id=88f028142403410abfef&redirect_uri=http://127.0.0.1:1024/pages/login/login`;
          }
          if (row.provider === "weixin") {
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxea473f283d5e6785&redirect_uri=http://127.0.0.1:1024/pages/login/login&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
          }
        }
        if (row.platform === "MP-WEIXIN") {
          mpWeixinLogin(row.provider);
        }
        if (row.platform === "APP-PLUS") {
          if (row.provider === "univerify") {
            appUniverifyLogin();
          } else {
            appLogin(row.provider);
          }
        }
      };
      const appLogin = (provider) => {
        uni.login({
          provider,
          success(res) {
            formatAppLog("log", "at pages/login/login.vue:332", `${provider}-login-res`, res);
            uni.getUserInfo({
              provider,
              success(info) {
                formatAppLog("log", "at pages/login/login.vue:337", `${provider}-getUserInfo-res`, info);
              },
              fail(fail) {
                formatAppLog("log", "at pages/login/login.vue:341", `${provider}-getUserInfo-fail`, fail);
                if (fail.errMsg.includes("尚未获取oauth授权"))
                  formatAppLog("log", "at pages/login/login.vue:342", "尚未获取oauth授权");
              }
            });
          },
          fail(fail) {
            formatAppLog("log", "at pages/login/login.vue:347", `${provider}-login-fail`, fail);
            if (fail.errMsg.includes("用户取消") || fail.errMsg === "login:fail 用户取消")
              formatAppLog("log", "at pages/login/login.vue:348", "用户取消登录");
            if (fail.errMsg === "login:fail Authentication failed")
              formatAppLog("log", "at pages/login/login.vue:349", "用户拒绝登录");
            uni.showToast({
              title: "登录失败！",
              icon: "none"
            });
          }
        });
      };
      const appUniverifyLogin = () => {
        uni.preLogin({
          provider: "univerify",
          success(res) {
            uni.login({
              provider: "univerify",
              univerifyStyle: {
                fullScreen: true,
                // 是否全屏显示，默认值： false
                backgroundColor: "#ffffff",
                // 授权页面背景颜色，默认值：#ffffff
                // backgroundImage: 'static/images/login/login-bg.jpg', // 全屏显示的背景图片，默认值："" （仅支持本地图片，只有全屏显示时支持）
                icon: {
                  path: "static/images/login.png",
                  // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo
                  width: "180px",
                  //图标宽度 默认值：60px
                  height: "70px"
                  //图标高度 默认值：60px
                },
                closeIcon: {
                  path: "static/xxx.png"
                  // 自定义关闭按钮，仅支持本地图片。 HBuilderX3.3.7+版本支持
                },
                phoneNum: {
                  color: "#202020"
                  // 手机号文字颜色 默认值：#202020
                },
                slogan: {
                  color: "#BBBBBB"
                  //  slogan 字体颜色 默认值：#BBBBBB
                },
                authButton: {
                  normalColor: "#3479f5",
                  // 授权按钮正常状态背景颜色 默认值：#3479f5
                  highlightColor: "#2861c5",
                  // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）
                  disabledColor: "#73aaf5",
                  // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）
                  textColor: "#ffffff",
                  // 授权按钮文字颜色 默认值：#ffffff
                  title: "本机号码一键登录",
                  // 授权按钮文案 默认值：“本机号码一键登录”
                  borderRadius: "24px"
                  // 授权按钮圆角 默认值："24px" （按钮高度的一半）
                },
                otherLoginButton: {
                  visible: true,
                  // 是否显示其他登录按钮，默认值：true
                  normalColor: "",
                  // 其他登录按钮正常状态背景颜色 默认值：透明
                  highlightColor: "",
                  // 其他登录按钮按下状态背景颜色 默认值：透明
                  textColor: "#656565",
                  // 其他登录按钮文字颜色 默认值：#656565
                  title: "其他登录方式",
                  // 其他登录方式按钮文字 默认值：“其他登录方式”
                  borderColor: "",
                  //边框颜色 默认值：透明（仅iOS支持）
                  borderRadius: "0px"
                  // 其他登录按钮圆角 默认值："24px" （按钮高度的一半）
                },
                privacyTerms: {
                  defaultCheckBoxState: true,
                  // 条款勾选框初始状态 默认值： true
                  isCenterHint: false,
                  //未勾选服务条款时点击登录按钮的提示是否居中显示 默认值: false (3.7.13+ 版本支持)
                  uncheckedImage: "",
                  // 可选 条款勾选框未选中状态图片（仅支持本地图片 建议尺寸 24x24px）(3.2.0+ 版本支持)
                  checkedImage: "",
                  // 可选 条款勾选框选中状态图片（仅支持本地图片 建议尺寸24x24px）(3.2.0+ 版本支持)
                  checkBoxSize: 12,
                  // 可选 条款勾选框大小
                  textColor: "#BBBBBB",
                  // 文字颜色 默认值：#BBBBBB
                  termsColor: "#5496E3",
                  //  协议文字颜色 默认值： #5496E3
                  prefix: "我已阅读并同意",
                  // 条款前的文案 默认值：“我已阅读并同意”
                  suffix: "并使用本机号码登录",
                  // 条款后的文案 默认值：“并使用本机号码登录”
                  privacyItems: [
                    // 自定义协议条款，最大支持2个，需要同时设置url和title. 否则不生效
                    {
                      url: "https://",
                      // 点击跳转的协议详情页面
                      title: "用户服务协议"
                      // 协议名称
                    }
                  ]
                }
                // buttons: {
                // 	// 自定义页面下方按钮仅全屏模式生效（3.1.14+ 版本支持）
                // 	iconWidth: '45px', // 图标宽度（高度等比例缩放） 默认值：45px
                // 	list: [
                // 		{
                // 			provider: 'apple',
                // 			iconPath: '/static/logo.png' // 图标路径仅支持本地图片
                // 		},
                // 		{
                // 			provider: 'weixin',
                // 			iconPath: '/static/logo.png' // 图标路径仅支持本地图片
                // 		},
                // 		{
                // 			provider: 'qq',
                // 			iconPath: '/static/logo.png' // 图标路径仅支持本地图片
                // 		}
                // 	]
                // }
              },
              success(res2) {
                formatAppLog("log", "at pages/login/login.vue:440", "login - res", res2);
                formatAppLog("log", "at pages/login/login.vue:441", res2.authResult);
                uni.closeAuthView();
              },
              fail(fail) {
                formatAppLog("log", "at pages/login/login.vue:447", "login fail", fail);
                if (fail.code === 30002)
                  formatAppLog("log", "at pages/login/login.vue:448", "用户点击了其他登录方式");
                if (fail.code === 30003)
                  formatAppLog("log", "at pages/login/login.vue:449", "用户关闭验证界面");
                if (fail.code === "30008") {
                  return formatAppLog("log", "at pages/login/login.vue:453", "用户点击了自定义按钮", fail.code, fail.provider);
                }
              }
            });
          },
          fail(fail) {
            formatAppLog("log", "at pages/login/login.vue:483", "preLogin fail", fail);
            let errMsg = "预登录失败,设备不支持/未开启数据流量/其他原因!";
            if (fail.code === 30005) {
              if (fail.errMsg.includes("无SIM卡"))
                errMsg = "预登录失败,无SIM卡!";
              uni.showToast({
                title: errMsg,
                icon: "none",
                duration: "1500"
              });
            }
          }
        });
      };
      const mpWeixinLogin = (provider) => {
        uni.login({
          provider,
          success({ code }) {
            formatAppLog("log", "at pages/login/login.vue:501", `${provider}-login-res.code`, code);
          },
          fail(fail) {
            formatAppLog("log", "at pages/login/login.vue:505", `${provider}-login-fail`, fail);
            uni.showToast({
              title: "登录失败！",
              icon: "none"
            });
          }
        });
      };
      onLoad((params) => {
        initProvider();
        formatAppLog("log", "at pages/login/login.vue:518", "params", params);
      });
      const submit = (type2) => {
        if (type2 == 1)
          localLogin2();
        if (type2 == 2)
          smsLogin2();
        if (type2 == 3)
          resetPassword();
      };
      const localLogin2 = () => {
        if (!isMobile$1(form.account) && !isEmail$1(form.account))
          return prompt$1.msg("请输入有效的账号");
        if (!form.password)
          return prompt$1.msg("请输入新密码");
        loading.value = true;
        userStore.localLogin(form).then(() => {
          userStore.getUserInfo().then(() => {
            router.back();
          });
        }).finally(() => {
          loading.value = false;
        });
      };
      const smsLogin2 = () => {
        if (!isMobile$1(form.account) && !isEmail$1(form.account))
          return prompt$1.msg("请输入有效的账号");
        if (!form.code)
          return prompt$1.msg("请输入验证码");
        loading.value = true;
        userStore.smsLogin(form).then(() => {
          userStore.getUserInfo().then(() => {
            router.back();
          });
        }).finally(() => {
          loading.value = false;
        });
      };
      const resetPassword = () => {
        if (!isMobile$1(form.account) && !isEmail$1(form.account))
          return prompt$1.msg("请输入有效的账号");
        if (!form.code)
          return prompt$1.msg("请输入验证码");
        if (!form.password)
          return prompt$1.msg("请输入新密码");
        loading.value = true;
        userStore.smsUpdatePassword(form).then(() => {
          prompt$1.msg("重置密码成功,正在为您登录中...");
          setTimeout(() => {
            userStore.getUserInfo().then(() => {
              type.value = 1;
              router.back();
            });
          }, 1500);
        }).finally(() => {
          loading.value = false;
        });
      };
      return (_ctx, _cache) => {
        const _component_my_nav_bar = resolveEasycom(vue.resolveDynamicComponent("my-nav-bar"), __easycom_0$4);
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "container flex flex-col justify-between",
            style: vue.normalizeStyle({ "background-image": `url(${vue.unref(login).background})` })
          },
          [
            vue.createVNode(_component_my_nav_bar, {
              bgColor: "transparent",
              leftIcon: "icon-cha",
              onClickLeft: _cache[0] || (_cache[0] = ($event) => vue.unref(router).back())
            }),
            vue.createElementVNode("view", { class: "text-center" }, [
              vue.createElementVNode("image", {
                class: "logo w-210px",
                src: _imports_0$1,
                mode: "widthFix"
              })
            ]),
            vue.createElementVNode("view", null, [
              vue.createCommentVNode(" 登录类型 "),
              vue.createElementVNode("view", { class: "type-item" }, [
                vue.unref(type) == 1 ? (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 0 },
                  [
                    vue.createElementVNode("view", null, "账号密码登录"),
                    vue.createElementVNode("view", {
                      onClick: _cache[1] || (_cache[1] = ($event) => vue.isRef(type) ? type.value = 2 : type = 2)
                    }, [
                      vue.createElementVNode("text", { class: "right" }, "验证码快捷登录"),
                      vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-_a_328bf9" })
                    ])
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : vue.createCommentVNode("v-if", true),
                vue.unref(type) == 2 ? (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 1 },
                  [
                    vue.createElementVNode("view", null, "验证码快捷登录"),
                    vue.createElementVNode("view", {
                      onClick: _cache[2] || (_cache[2] = ($event) => vue.isRef(type) ? type.value = 1 : type = 1)
                    }, [
                      vue.createElementVNode("text", { class: "right" }, "账户密码登录"),
                      vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-_a_328bf9" })
                    ])
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : vue.createCommentVNode("v-if", true),
                vue.unref(type) == 3 ? (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 2 },
                  [
                    vue.createElementVNode("view", null, "手机/邮箱重设密码"),
                    vue.createElementVNode("view", {
                      onClick: _cache[3] || (_cache[3] = ($event) => vue.isRef(type) ? type.value = 1 : type = 1)
                    }, [
                      vue.createElementVNode("text", { class: "right" }, "账户密码登录"),
                      vue.createElementVNode("text", { class: "iconfont icon-xiangyoujiantou text-_a_328bf9" })
                    ])
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : vue.createCommentVNode("v-if", true)
              ]),
              vue.createElementVNode(
                "form",
                {
                  class: "login-form",
                  onSubmit: formSubmit,
                  onReset: formReset
                },
                [
                  vue.createCommentVNode(" 账号密码登录 "),
                  vue.unref(type) == 1 ? (vue.openBlock(), vue.createElementBlock(
                    vue.Fragment,
                    { key: 0 },
                    [
                      vue.createElementVNode("view", { class: "form-item" }, [
                        vue.withDirectives(vue.createElementVNode(
                          "input",
                          {
                            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => vue.unref(form).account = $event),
                            placeholder: "手机号 / 邮箱"
                          },
                          null,
                          512
                          /* NEED_PATCH */
                        ), [
                          [
                            vue.vModelText,
                            vue.unref(form).account,
                            void 0,
                            { trim: true }
                          ]
                        ])
                      ]),
                      vue.createElementVNode("view", { class: "form-item" }, [
                        vue.withDirectives(vue.createElementVNode(
                          "input",
                          {
                            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => vue.unref(form).password = $event),
                            placeholder: "密码",
                            type: "password"
                          },
                          null,
                          512
                          /* NEED_PATCH */
                        ), [
                          [
                            vue.vModelText,
                            vue.unref(form).password,
                            void 0,
                            { trim: true }
                          ]
                        ])
                      ])
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  )) : vue.createCommentVNode("v-if", true),
                  vue.createCommentVNode(" 验证码快捷登录 "),
                  vue.unref(type) == 2 ? (vue.openBlock(), vue.createElementBlock(
                    vue.Fragment,
                    { key: 1 },
                    [
                      vue.createElementVNode("view", { class: "form-item" }, [
                        vue.withDirectives(vue.createElementVNode(
                          "input",
                          {
                            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => vue.unref(form).account = $event),
                            placeholder: "手机号 / 邮箱"
                          },
                          null,
                          512
                          /* NEED_PATCH */
                        ), [
                          [
                            vue.vModelText,
                            vue.unref(form).account,
                            void 0,
                            { trim: true }
                          ]
                        ])
                      ]),
                      vue.createElementVNode("view", { class: "form-item" }, [
                        vue.withDirectives(vue.createElementVNode(
                          "input",
                          {
                            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => vue.unref(form).code = $event),
                            placeholder: "验证码",
                            type: "number"
                          },
                          null,
                          512
                          /* NEED_PATCH */
                        ), [
                          [
                            vue.vModelText,
                            vue.unref(form).code,
                            void 0,
                            { trim: true }
                          ]
                        ]),
                        vue.createElementVNode(
                          "view",
                          {
                            class: vue.normalizeClass(["button get-code-button", { button__disabled: vue.unref(codeLoading) }]),
                            "hover-class": "button__hover",
                            "hover-stay-time": "100",
                            onClick: getCode
                          },
                          vue.toDisplayString(vue.unref(tips)),
                          3
                          /* TEXT, CLASS */
                        )
                      ])
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  )) : vue.createCommentVNode("v-if", true),
                  vue.createCommentVNode(" 通过手机/邮箱重设密码 "),
                  vue.unref(type) == 3 ? (vue.openBlock(), vue.createElementBlock(
                    vue.Fragment,
                    { key: 2 },
                    [
                      vue.createElementVNode("view", { class: "form-item" }, [
                        vue.withDirectives(vue.createElementVNode(
                          "input",
                          {
                            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => vue.unref(form).account = $event),
                            placeholder: "手机号 / 邮箱"
                          },
                          null,
                          512
                          /* NEED_PATCH */
                        ), [
                          [
                            vue.vModelText,
                            vue.unref(form).account,
                            void 0,
                            { trim: true }
                          ]
                        ])
                      ]),
                      vue.createElementVNode("view", { class: "form-item" }, [
                        vue.withDirectives(vue.createElementVNode(
                          "input",
                          {
                            "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => vue.unref(form).code = $event),
                            placeholder: "验证码",
                            type: "number"
                          },
                          null,
                          512
                          /* NEED_PATCH */
                        ), [
                          [
                            vue.vModelText,
                            vue.unref(form).code,
                            void 0,
                            { trim: true }
                          ]
                        ]),
                        vue.createElementVNode(
                          "view",
                          {
                            class: vue.normalizeClass(["button get-code-button", { button__disabled: vue.unref(codeLoading) }]),
                            "hover-class": "button__hover",
                            "hover-stay-time": "100",
                            onClick: getCode
                          },
                          vue.toDisplayString(vue.unref(tips)),
                          3
                          /* TEXT, CLASS */
                        )
                      ]),
                      vue.createElementVNode("view", { class: "form-item" }, [
                        vue.withDirectives(vue.createElementVNode(
                          "input",
                          {
                            "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => vue.unref(form).password = $event),
                            placeholder: "新密码",
                            type: "password"
                          },
                          null,
                          512
                          /* NEED_PATCH */
                        ), [
                          [
                            vue.vModelText,
                            vue.unref(form).password,
                            void 0,
                            { trim: true }
                          ]
                        ])
                      ])
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  )) : vue.createCommentVNode("v-if", true)
                ],
                32
                /* NEED_HYDRATION */
              ),
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["button mx-12px", { button__disabled: vue.unref(loading) }]),
                  "hover-class": "button__hover",
                  "hover-stay-time": "100",
                  onClick: _cache[11] || (_cache[11] = ($event) => submit(vue.unref(type)))
                },
                [
                  vue.unref(type) != 3 ? (vue.openBlock(), vue.createElementBlock(
                    "text",
                    { key: 0 },
                    vue.toDisplayString(!vue.unref(loading) ? "登 录" : "登录中..."),
                    1
                    /* TEXT */
                  )) : vue.createCommentVNode("v-if", true),
                  vue.unref(type) == 3 ? (vue.openBlock(), vue.createElementBlock(
                    "text",
                    { key: 1 },
                    vue.toDisplayString(!vue.unref(loading) ? "重设密码" : "重设密码中..."),
                    1
                    /* TEXT */
                  )) : vue.createCommentVNode("v-if", true)
                ],
                2
                /* CLASS */
              ),
              vue.createElementVNode("view", { class: "tips-item" }, [
                vue.unref(type) != 3 ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  onClick: _cache[12] || (_cache[12] = ($event) => vue.isRef(type) ? type.value = 3 : type = 3)
                }, "忘记密码？")) : vue.createCommentVNode("v-if", true),
                vue.unref(type) == 3 ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 1,
                  onClick: _cache[13] || (_cache[13] = ($event) => vue.isRef(type) ? type.value = 1 : type = 1)
                }, "想起密码？")) : vue.createCommentVNode("v-if", true),
                vue.unref(type) != 3 ? (vue.openBlock(), vue.createElementBlock("text", {
                  key: 2,
                  class: "tips"
                }, "未注册的账号通过验证后将自动注册")) : vue.createCommentVNode("v-if", true)
              ])
            ]),
            vue.createElementVNode("view", null, [
              vue.unref(type) != 3 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "other-item"
              }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(vue.unref(oauths), (item) => {
                    return vue.openBlock(), vue.createElementBlock("text", {
                      key: item.icon,
                      class: vue.normalizeClass(["iconfont", item.icon, "text-20px"]),
                      style: vue.normalizeStyle({ color: item.color, borderColor: item.color }),
                      onClick: ($event) => oauthLogin(item)
                    }, null, 14, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true),
              vue.unref(type) != 3 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "reading-item"
              }, [
                vue.createTextVNode(" 登录注册即代表同意xx "),
                vue.createElementVNode("text", { onClick: handleUserAgrement }, "《用户服务协议》"),
                vue.createTextVNode(" 和 "),
                vue.createElementVNode("text", { onClick: handlePrivacy }, "《隐私政策》")
              ])) : vue.createCommentVNode("v-if", true)
            ])
          ],
          4
          /* STYLE */
        );
      };
    }
  });
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-e4e4508d"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/login/login.vue"]]);
  const _imports_0 = "/static/macbook.png";
  const _sfc_main$c = /* @__PURE__ */ vue.defineComponent({
    __name: "confirmLogin",
    setup(__props) {
      const { appName } = useAppStore();
      let loading = vue.ref(false);
      let status = vue.ref(0);
      let loginText = vue.computed(() => {
        return loading.value ? "授权登录中...." : "授权登录";
      });
      let qrCode = storage.get("qrCode");
      let login2 = () => {
        if (loading.value)
          return;
        loading.value = true;
        qrConfirmLogin({ qrcodeId: qrCode.qrcodeId }).then((res) => {
          formatAppLog("log", "at pages/login/confirmLogin.vue:33", res);
          status.value = res.data.status;
        }).finally(() => {
          loading.value = false;
        });
      };
      let cancel = () => {
        if (status.value === 3)
          return;
        qrCancelLogin({ qrcodeId: qrCode.qrcodeId }).then((res) => {
          formatAppLog("log", "at pages/login/confirmLogin.vue:47", res);
        }).finally(() => {
        });
      };
      onUnload(() => {
        cancel();
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "container text-center" }, [
          vue.createElementVNode("image", {
            class: "img w-230px mt-15",
            src: _imports_0,
            mode: "scaleToFill"
          }),
          vue.createElementVNode(
            "view",
            { class: "tips mb-10 mx-12px" },
            "当前账号正在尝试登录" + vue.toDisplayString(vue.unref(appName)) + "网页端，请确认信息及登录行为",
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "button-group" }, [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["button button__primary", { button__loading: vue.unref(loading) }]),
                onClick: _cache[0] || (_cache[0] = //@ts-ignore
                (...args) => vue.unref(login2) && vue.unref(login2)(...args))
              },
              [
                vue.unref(loading) ? (vue.openBlock(), vue.createElementBlock("text", {
                  key: 0,
                  class: "loading iconfont"
                })) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode(
                  "text",
                  { class: "button__text" },
                  vue.toDisplayString(vue.unref(loginText)),
                  1
                  /* TEXT */
                )
              ],
              2
              /* CLASS */
            ),
            vue.createElementVNode("view", {
              class: "button button__default",
              onClick: _cache[1] || (_cache[1] = //@ts-ignore
              (...args) => vue.unref(cancel) && vue.unref(cancel)(...args))
            }, [
              vue.createElementVNode("text", { class: "button__text" }, "取消")
            ])
          ])
        ]);
      };
    }
  });
  const PagesLoginConfirmLogin = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-7aef36b4"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/login/confirmLogin.vue"]]);
  const _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const editStatus = vue.ref(false);
      const myChannel = vue.ref([
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
      vue.ref([
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
        const _component_my_nav_bar = resolveEasycom(vue.resolveDynamicComponent("my-nav-bar"), __easycom_0$4);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createVNode(_component_my_nav_bar, {
              fixed: "",
              leftIcon: "icon-cha"
            }),
            vue.createElementVNode("view", { class: "channel" }, [
              vue.createElementVNode("view", { class: "my-channel" }, [
                vue.createElementVNode("view", { class: "section" }, [
                  vue.createElementVNode("view", { class: "section-left" }, [
                    vue.createElementVNode("view", { class: "title" }, "我的频道"),
                    vue.createElementVNode(
                      "view",
                      { class: "sub-title" },
                      vue.toDisplayString(vue.unref(editStatus) ? "点击删除频道" : "点击进入频道"),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", {
                    class: "section-right",
                    onClick: _cache[0] || (_cache[0] = ($event) => editStatus.value = !vue.unref(editStatus))
                  }, [
                    vue.createElementVNode(
                      "text",
                      { class: "edit" },
                      vue.toDisplayString(vue.unref(editStatus) ? "完成" : "编辑"),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                vue.createElementVNode("view", { class: "channel-list" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(vue.unref(myChannel), (item, index) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: vue.normalizeClass(["channel-item rd-4px bg-_a_f8f8f8", { "shake-bottom": vue.unref(editStatus) }]),
                        key: index,
                        onClick: ($event) => tapMyChannel()
                      }, [
                        vue.createElementVNode(
                          "text",
                          {
                            class: vue.normalizeClass(["item-text", { "active": item.title === "推荐" }])
                          },
                          vue.toDisplayString(item.title),
                          3
                          /* TEXT, CLASS */
                        ),
                        vue.withDirectives(vue.createElementVNode(
                          "text",
                          { class: "iconfont icon-cha" },
                          null,
                          512
                          /* NEED_PATCH */
                        ), [
                          [vue.vShow, vue.unref(editStatus)]
                        ])
                      ], 10, ["onClick"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ]),
              vue.createElementVNode("view", { class: "tj-channel mt-60px" }, [
                vue.createElementVNode("view", { class: "section" }, [
                  vue.createElementVNode("view", { class: "section-left" }, [
                    vue.createElementVNode("view", { class: "title" }, "为你推荐"),
                    vue.createElementVNode("view", { class: "sub-title" }, "点击添加频道")
                  ])
                ]),
                vue.createElementVNode("view", { class: "channel-list" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(vue.unref(myChannel), (item, index) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: "channel-item rd-4px bg-_a_f8f8f8",
                        key: index,
                        onClick: ($event) => tapMyChannel()
                      }, [
                        vue.createElementVNode("text", { class: "iconfont icon-jiahao" }),
                        vue.createElementVNode(
                          "text",
                          { class: "item-text" },
                          vue.toDisplayString(item.name) + "fdasfhjkladsfhg",
                          1
                          /* TEXT */
                        )
                      ], 8, ["onClick"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ])
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  });
  const PagesChannelIndex = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-09f7f959"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/channel/index.vue"]]);
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
    __name: "info-article-item",
    setup(__props) {
      const isPic = vue.ref(true);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 文章详情页item "),
            vue.createElementVNode("view", { class: "item-box" }, [
              vue.createElementVNode("view", { class: "item-content" }, [
                vue.createElementVNode("view", { class: "left-box" }, [
                  vue.createElementVNode("text", { class: "left-text ellipsis2" }, " 公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找网页的开源项目 再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。 "),
                  vue.createElementVNode("view", { class: "left-bottom" }, [
                    vue.createElementVNode("view", { class: "bottom-left" }, [
                      vue.createElementVNode("view", { class: "item" }, [
                        vue.createElementVNode("text", { class: "iconfont icon-touxiang" }),
                        vue.createCommentVNode(" 查看 "),
                        vue.createElementVNode("text", { class: "text" }, "你的Maya")
                      ]),
                      vue.createElementVNode("view", { class: "item" }, [
                        vue.createElementVNode("text", { class: "iconfont icon-dianzan" }),
                        vue.createCommentVNode(" 赞 "),
                        vue.createElementVNode("text", { class: "text" }, "111")
                      ]),
                      vue.createElementVNode("view", { class: "item" }, [
                        vue.createElementVNode("text", { class: "iconfont icon-pinglun" }),
                        vue.createCommentVNode(" 评论 "),
                        vue.createElementVNode("text", { class: "text" }, "111")
                      ])
                    ])
                  ])
                ]),
                vue.unref(isPic) ? (vue.openBlock(), vue.createElementBlock("image", {
                  key: 0,
                  class: "right-image",
                  src: "https://img.yzcdn.cn/vant/cat.jpeg",
                  mode: "scaleToFill"
                })) : vue.createCommentVNode("v-if", true)
              ])
            ])
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        );
      };
    }
  });
  const infoArticleItem = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-c45bd66a"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/article/components/info-article-item.vue"]]);
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation({
        ...options
      });
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type}(${args + unit}) `;
      } else {
        styles.styles[type] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, {
          styles,
          ...config
        }, (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config
        } = obj;
        this._animateRun(styles, config).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config = {}) {
      this.animation.step(config);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
    MPAnimation.prototype[type] = function(...args) {
      this.animation[type](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$9 = {
    name: "uniTransition",
    emits: ["click", "change"],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modeClass: {
        type: [Array, String],
        default() {
          return "fade";
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styles: {
        type: Object,
        default() {
          return {};
        }
      },
      customClass: {
        type: String,
        default: ""
      },
      onceRender: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      // 生成样式数据
      stylesObject() {
        let styles = {
          ...this.styles,
          "transition-duration": this.duration / 1e3 + "s"
        };
        let transform = "";
        for (let i in styles) {
          let line = this.toLine(i);
          transform += line + ":" + styles[i] + ";";
        }
        return transform;
      },
      // 初始化动画条件
      transformStyles() {
        return "transform:" + this.transform + ";opacity:" + this.opacity + ";" + this.stylesObject;
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: "ease",
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      /**
       *  ref 触发 初始化动画
       */
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      /**
       * 点击组件触发回调
       */
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      /**
       * ref 触发 动画分组
       * @param {Object} obj
       */
      step(obj, config = {}) {
        if (!this.animation)
          return;
        for (let i in obj) {
          try {
            if (typeof obj[i] === "object") {
              this.animation[i](...obj[i]);
            } else {
              this.animation[i](obj[i]);
            }
          } catch (e) {
            formatAppLog("error", "at node_modules/.pnpm/@dcloudio+uni-ui@1.5.2/node_modules/@dcloudio/uni-ui/lib/uni-transition/uni-transition.vue:148", `方法 ${i} 不存在`);
          }
        }
        this.animation.step(config);
        return this;
      },
      /**
       *  ref 触发 执行动画
       */
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      // 开始过度动画
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run();
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      // 关闭过度动画
      close(type) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      // 处理动画开始前的默认样式
      styleInit(type) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type2, mode) => {
          if (mode === "fade") {
            styles.opacity = this.animationType(type2)[mode];
          } else {
            styles.transform += this.animationType(type2)[mode] + " ";
          }
        };
        if (typeof this.modeClass === "string") {
          buildStyle(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildStyle(type, mode);
          });
        }
        return styles;
      },
      // 处理内置组合动画
      tranfromInit(type) {
        let buildTranfrom = (type2, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type2 ? 0 : 1;
          } else {
            aniNum = type2 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type2 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type2 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type2 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type2 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.modeClass === "string") {
          buildTranfrom(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildTranfrom(type, mode);
          });
        }
        return this.animation;
      },
      animationType(type) {
        return {
          fade: type ? 1 : 0,
          "slide-top": `translateY(${type ? "0" : "-100%"})`,
          "slide-right": `translateX(${type ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type ? "0" : "100%"})`,
          "slide-left": `translateX(${type ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
        };
      },
      // 内置动画类型与实际动画对应字典
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      // 驼峰转中横线
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])), [
      [vue.vShow, $data.isShow]
    ]);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$2], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/node_modules/.pnpm/@dcloudio+uni-ui@1.5.2/node_modules/@dcloudio/uni-ui/lib/uni-transition/uni-transition.vue"]]);
  const _sfc_main$8 = {
    name: "uniPopup",
    components: {},
    emits: ["change", "maskClick"],
    props: {
      // 开启动画
      animation: {
        type: Boolean,
        default: true
      },
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      type: {
        type: String,
        default: "center"
      },
      // maskClick
      isMaskClick: {
        type: Boolean,
        default: null
      },
      // TODO 2 个版本后废弃属性 ，使用 isMaskClick
      maskClick: {
        type: Boolean,
        default: null
      },
      backgroundColor: {
        type: String,
        default: "none"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      maskBackgroundColor: {
        type: String,
        default: "rgba(0, 0, 0, 0.4)"
      }
    },
    watch: {
      /**
       * 监听type类型
       */
      type: {
        handler: function(type) {
          if (!this.config[type])
            return;
          this[this.config[type]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.type]](true);
        },
        immediate: true
      },
      /**
       * 监听遮罩是否可点击
       * @param {Object} val
       */
      maskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      isMaskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      // H5 下禁止底部滚动
      showPopup(show) {
      }
    },
    data() {
      return {
        duration: 300,
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        maskClass: {
          position: "fixed",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        },
        transClass: {
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupstyle: "top"
      };
    },
    computed: {
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.backgroundColor === "" || this.backgroundColor === "none") {
          return "transparent";
        }
        return this.backgroundColor;
      }
    },
    mounted() {
      const fixSize = () => {
        const {
          windowWidth,
          windowHeight,
          windowTop,
          safeArea,
          screenHeight,
          safeAreaInsets
        } = uni.getSystemInfoSync();
        this.popupWidth = windowWidth;
        this.popupHeight = windowHeight + (windowTop || 0);
        if (safeArea && this.safeArea) {
          this.safeAreaInsets = safeAreaInsets.bottom;
        } else {
          this.safeAreaInsets = 0;
        }
      };
      fixSize();
    },
    // TODO vue3
    unmounted() {
      this.setH5Visible();
    },
    created() {
      if (this.isMaskClick === null && this.maskClick === null) {
        this.mkclick = true;
      } else {
        this.mkclick = this.isMaskClick !== null ? this.isMaskClick : this.maskClick;
      }
      if (this.animation) {
        this.duration = 300;
      } else {
        this.duration = 0;
      }
      this.messageChild = null;
      this.clearPropagation = false;
      this.maskClass.backgroundColor = this.maskBackgroundColor;
    },
    methods: {
      setH5Visible() {
      },
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      /**
       * 公用方法，遮罩层禁止点击
       */
      disableMask() {
        this.mkclick = false;
      },
      // TODO nvue 取消冒泡
      clear(e) {
        e.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          return;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.type;
        }
        if (!this.config[direction]) {
          formatAppLog("error", "at node_modules/.pnpm/@dcloudio+uni-ui@1.5.2/node_modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue:279", "缺少类型：", direction);
          return;
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.type
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.mkclick)
          return;
        this.close();
      },
      /**
       * 顶部弹出样式处理
       */
      top(type) {
        this.popupstyle = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          backgroundColor: this.bg
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          if (this.messageChild && this.type === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      /**
       * 底部弹出样式处理
       */
      bottom(type) {
        this.popupstyle = "bottom";
        this.ani = ["slide-bottom"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: this.safeAreaInsets + "px",
          backgroundColor: this.bg
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      /**
       * 中间弹出样式处理
       */
      center(type) {
        this.popupstyle = "center";
        this.ani = ["zoom-out", "fade"];
        this.transClass = {
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      left(type) {
        this.popupstyle = "left";
        this.ani = ["slide-left"];
        this.transClass = {
          position: "fixed",
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      right(type) {
        this.popupstyle = "right";
        this.ani = ["slide-right"];
        this.transClass = {
          position: "fixed",
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0$1);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
            $data.maskShow ? (vue.openBlock(), vue.createBlock(_component_uni_transition, {
              key: "1",
              name: "mask",
              "mode-class": "fade",
              styles: $data.maskClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, null, 8, ["styles", "duration", "show", "onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_uni_transition, {
              key: "2",
              "mode-class": $data.ani,
              name: "content",
              styles: $data.transClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
                    style: vue.normalizeStyle({ backgroundColor: $options.bg }),
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode-class", "styles", "duration", "show", "onClick"])
          ],
          32
          /* NEED_HYDRATION */
        )
      ],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$1], ["__scopeId", "data-v-b85870fc"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/node_modules/.pnpm/@dcloudio+uni-ui@1.5.2/node_modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue"]]);
  const __default__ = { name: "article-comment" };
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
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
      vue.useCssVars((_ctx) => ({
        "a61c81ed-safeAreaInsetsBottomHeight": vue.unref(safeAreaInsetsBottomHeight),
        "a61c81ed-keyboardheight": vue.unref(keyboardheight),
        "a61c81ed-placeholderheight": vue.unref(placeholderheight)
      }));
      const placeholderheight = vue.ref("0px");
      const safeAreaInsetsBottomHeight = vue.ref("0px");
      vue.ref("10px");
      let systemInfo = {};
      const init = () => {
        var _a;
        systemInfo = uni.getSystemInfoSync();
        placeholderheight.value = systemInfo.statusBarHeight + "px";
        safeAreaInsetsBottomHeight.value = (((_a = systemInfo.safeAreaInsets) == null ? void 0 : _a.bottom) || 0) + "px";
        formatAppLog("log", "at pages/article/components/article-comment.vue:139", "safeAreaInsetsBottomHeight", safeAreaInsetsBottomHeight.value);
      };
      const emit = __emit;
      const isFullScreen = vue.ref(false);
      const popupRef = vue.ref();
      const popupChange = (e) => {
        emit("onChange", e.show);
        if (!e.show) {
          emit("onClose");
        } else {
          emit("onOpen");
        }
      };
      const popupOpen = () => {
        formatAppLog("log", "at pages/article/components/article-comment.vue:166", "onOpen");
        emit("onOpen");
        popupRef.value.open();
        init();
      };
      const popupClose = () => {
        emit("onClose");
        popupRef.value.close();
      };
      let showSendComment = vue.ref(false);
      let showActionComment = vue.ref(true);
      let commentContent = vue.ref("");
      let commentPlaceholder = vue.ref("美好的一天从评论开始~");
      vue.reactive({
        pageNum: 1,
        // 分页页码
        pageSize: 50
        // 页面数据条数
      });
      vue.reactive([]);
      vue.ref(0);
      const ontapHuifu = (item) => {
        uni.$emit("ontapHuifu", item);
      };
      const keyboardheight = vue.ref("0px");
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
        formatAppLog("log", "at pages/article/components/article-comment.vue:238", 11);
      };
      vue.onMounted(() => {
      });
      __expose({
        popupOpen,
        popupClose
      });
      return (_ctx, _cache) => {
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0);
        return vue.openBlock(), vue.createBlock(
          _component_uni_popup,
          {
            ref_key: "popupRef",
            ref: popupRef,
            type: "bottom",
            onChange: popupChange,
            "safe-area": false
          },
          {
            default: vue.withCtx(() => [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["article-comment", { "is-fullScreen": vue.unref(isFullScreen) }]),
                  ref: "comment"
                },
                [
                  vue.createCommentVNode(" 状态栏高度 小程序menu高度 "),
                  vue.unref(isFullScreen) ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "placeholder"
                  })) : vue.createCommentVNode("v-if", true),
                  vue.createCommentVNode(" 头 "),
                  vue.createElementVNode("view", { class: "popup-header" }, [
                    vue.createElementVNode("view", { class: "popup-header-wrapper" }, [
                      vue.createElementVNode("view", { class: "header-left" }, " 0条评论 "),
                      vue.createElementVNode("view", { class: "header-right" }, [
                        vue.createElementVNode("view", {
                          class: "icon-button",
                          onClick: _cache[0] || (_cache[0] = ($event) => isFullScreen.value = !vue.unref(isFullScreen))
                        }, [
                          vue.createElementVNode(
                            "text",
                            {
                              class: vue.normalizeClass(["iconfont text-10px text-_a_868686", [vue.unref(isFullScreen) ? "icon-xiala" : "icon-xiangshang"]])
                            },
                            null,
                            2
                            /* CLASS */
                          )
                        ]),
                        vue.createElementVNode("view", {
                          class: "icon-button",
                          onClick: popupClose
                        }, [
                          vue.createElementVNode("text", { class: "iconfont icon-cha text-8px text-_a_868686" })
                        ])
                      ])
                    ])
                  ]),
                  vue.createCommentVNode(" 评论 "),
                  (vue.openBlock(), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(1, (item, index) => {
                      return vue.createElementVNode("view", {
                        class: "comment-item",
                        key: item
                      }, [
                        vue.createElementVNode("view", { class: "comment-left" }, [
                          vue.createElementVNode("image", {
                            class: "w-36px h-36px rd-full",
                            src: "https://img.yzcdn.cn/vant/cat.jpeg",
                            mode: "scaleToFill"
                          })
                        ]),
                        vue.createElementVNode("view", { class: "comment-right" }, [
                          vue.createElementVNode("view", { class: "header" }, [
                            vue.createElementVNode("text", { class: "text-13px font-500" }, "你的Maya")
                          ]),
                          vue.createElementVNode("view", {
                            class: "comment",
                            onClick: ($event) => ontapHuifu(item)
                          }, [
                            vue.createElementVNode("text", { class: "text-13px" }, "你的英雄难过美人关,你的英雄难过美人关,你的英雄难过美人关,你的英雄难过美人关,你的英雄难过美人关")
                          ], 8, ["onClick"]),
                          vue.createElementVNode("view", { class: "footer" }, [
                            vue.createElementVNode("view", { class: "left-action" }, [
                              vue.createElementVNode("text", { class: "text-12px text-_a_999" }, "30分钟前 · 广州"),
                              vue.createElementVNode("text", {
                                class: "action-reply text-12px text-_a_999",
                                onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("onShowPost"))
                              }, "回复")
                            ]),
                            vue.createElementVNode("view", {
                              class: "right-action",
                              onClick: ($event) => ontapLike()
                            }, [
                              vue.createElementVNode("text", { class: "iconfont icon-dianzan text-14px" }),
                              vue.createElementVNode("text", { class: "m-l-5px text-12px font-500" }, "44")
                            ], 8, ["onClick"])
                          ]),
                          vue.createCommentVNode(" 回复列表 "),
                          (vue.openBlock(), vue.createElementBlock(
                            vue.Fragment,
                            { key: 0 },
                            vue.renderList(1, (i) => {
                              return vue.createElementVNode("view", {
                                class: "reply",
                                key: i
                              }, [
                                vue.createElementVNode("view", { class: "comment-left" }, [
                                  vue.createElementVNode("image", {
                                    class: "w-26px h-26px rd-full",
                                    src: "https://img.yzcdn.cn/vant/cat.jpeg",
                                    mode: "scaleToFill"
                                  })
                                ]),
                                vue.createElementVNode("view", { class: "comment-right" }, [
                                  vue.createElementVNode("view", { class: "header" }, [
                                    vue.createElementVNode("text", { class: "text-13px font-500" }, "你的Maya")
                                  ]),
                                  vue.createElementVNode("view", {
                                    class: "comment",
                                    onClick: ($event) => ontapHuifu(item)
                                  }, [
                                    vue.createElementVNode("text", { class: "text-13px" }, "你的英雄难过美人关,你的英雄难过美人关,你的英雄难过美人关,你的英雄难过美人关,你的英雄难过美人关")
                                  ], 8, ["onClick"]),
                                  vue.createElementVNode("view", { class: "footer" }, [
                                    vue.createElementVNode("view", { class: "left-action" }, [
                                      vue.createElementVNode("text", { class: "text-12px text-_a_999" }, "30分钟前 · 广州"),
                                      vue.createElementVNode("text", {
                                        class: "action-reply text-12px text-_a_999",
                                        onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("onShowPost"))
                                      }, "回复")
                                    ]),
                                    vue.createElementVNode("view", {
                                      class: "right-action",
                                      onClick: ($event) => ontapLike()
                                    }, [
                                      vue.createElementVNode("text", { class: "iconfont icon-dianzan text-14px" }),
                                      vue.createElementVNode("text", { class: "m-l-5px text-12px font-500" }, "44")
                                    ], 8, ["onClick"])
                                  ])
                                ])
                              ]);
                            }),
                            64
                            /* STABLE_FRAGMENT */
                          )),
                          vue.createCommentVNode(" 展开回复评论 "),
                          vue.createElementVNode("view", { class: "more" }, [
                            vue.createCommentVNode(" 该条评论下有评论有显示：展开xx条回复 "),
                            vue.createCommentVNode(" 展开回复后加载前3条回复内容数据后有一下情况：\r\n							1，展示的数据小于3条 => 收起\r\n							2, 展示的数据大于3条 => 展开更多回复 -，展开更多后 暂时完数据后显示 => 收起, 没展示完数据则显示=> 展开更多回复  收起"),
                            vue.createElementVNode("view", {
                              class: "more-icon more-text",
                              onClick: ($event) => ontapLike()
                            }, [
                              vue.createElementVNode("text", { class: "iconfont icon-xiala text-14px" }),
                              vue.createElementVNode("text", { class: "m-l-5px text-12px font-500" }, "展开3条回复")
                            ], 8, ["onClick"]),
                            vue.createElementVNode("view", {
                              class: "more-icon more-text",
                              onClick: ($event) => ontapLike()
                            }, [
                              vue.createElementVNode("text", { class: "iconfont icon-xiala text-14px" }),
                              vue.createElementVNode("text", { class: "m-l-5px text-12px font-500" }, "展开更多回复")
                            ], 8, ["onClick"]),
                            vue.createElementVNode("view", {
                              class: "more-icon",
                              onClick: ($event) => ontapLike()
                            }, [
                              vue.createElementVNode("text", { class: "iconfont icon-xiangshang text-14px" }),
                              vue.createElementVNode("text", { class: "m-l-5px text-12px font-500" }, "收起")
                            ], 8, ["onClick"])
                          ])
                        ])
                      ]);
                    }),
                    64
                    /* STABLE_FRAGMENT */
                  )),
                  vue.createCommentVNode(" 发布评论 "),
                  vue.unref(showSendComment) ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "send-comment"
                  }, [
                    vue.createElementVNode("view", { class: "textarea-box" }, [
                      vue.withDirectives(vue.createElementVNode("textarea", {
                        class: vue.normalizeClass(["textarea", { "is-text": vue.unref(commentContent) }]),
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => vue.isRef(commentContent) ? commentContent.value = $event : commentContent = $event),
                        placeholder: vue.unref(commentPlaceholder),
                        "auto-focus": "",
                        fixed: "",
                        "auto-blur": "",
                        "adjust-position": false,
                        onFocus: onSendKeyboard,
                        onBlur: onSendKeyboard,
                        "confirm-type": "send"
                      }, null, 42, ["placeholder"]), [
                        [vue.vModelText, vue.unref(commentContent)]
                      ])
                    ]),
                    vue.withDirectives(vue.createElementVNode(
                      "view",
                      { class: "text-center py-5px px-8px rd-full bg-_a_007aff text-13px text-white box-border ml-10px w-60px" },
                      "发送 ",
                      512
                      /* NEED_PATCH */
                    ), [
                      [vue.vShow, vue.unref(commentContent)]
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createCommentVNode(" 评论底部操作栏 "),
                  vue.withDirectives(vue.createElementVNode(
                    "view",
                    {
                      class: "comment-action",
                      onClick: _cache[4] || (_cache[4] = ($event) => vue.isRef(showSendComment) ? showSendComment.value = !vue.unref(showSendComment) : showSendComment = !vue.unref(showSendComment))
                    },
                    [
                      vue.createElementVNode("view", { class: "radius-box" }, [
                        vue.createElementVNode("view", { class: "radius-box-edit" }, [
                          vue.createElementVNode("text", { class: "iconfont icon-chuangzuo text-16px text-_a_000 mr-5px" }),
                          vue.createElementVNode(
                            "text",
                            { class: "text-12px" },
                            vue.toDisplayString(vue.unref(commentContent) ? vue.unref(commentContent) : vue.unref(commentPlaceholder)),
                            1
                            /* TEXT */
                          )
                        ]),
                        vue.createElementVNode("text", { class: "iconfont icon-weixiao text-24px text-_a_000" })
                      ]),
                      vue.unref(commentContent) ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "send-btn py-4px px-8px rd-full ml-10px shrink text-13px text-white box-border bg-_a_007aff"
                      }, "发送")) : vue.createCommentVNode("v-if", true)
                    ],
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vShow, vue.unref(showActionComment)]
                  ]),
                  vue.createCommentVNode(" 是否为iPhoneX留出底部安全距离 "),
                  __props.safeAreaInsetBottom ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 2,
                    class: "safeArea-inset-bottom-height"
                  })) : vue.createCommentVNode("v-if", true)
                ],
                2
                /* CLASS */
              )
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        );
      };
    }
  });
  const articleComment = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-a61c81ed"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/article/components/article-comment.vue"]]);
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
    __name: "info",
    setup(__props) {
      vue.useCssVars((_ctx) => ({
        "e8340613-navBarheight": vue.unref(navBarheight),
        "e8340613-navBarPaddingTopheight": vue.unref(navBarPaddingTopheight),
        "e8340613-safeAreaBottomHeight": vue.unref(safeAreaBottomHeight)
      }));
      const pageTitle = vue.ref("文章详情页");
      const showNavBarAuthor = vue.ref(false);
      const articleCommentRef = vue.ref();
      const navBarheight = vue.ref("0px");
      const navBarPaddingTopheight = vue.ref("0px");
      vue.ref("0px");
      const safeAreaBottomHeight = vue.ref("0px");
      const getPlaceholder = () => {
        var _a;
        const systemInfo = uni.getSystemInfoSync();
        safeAreaBottomHeight.value = (((_a = systemInfo.safeAreaInsets) == null ? void 0 : _a.bottom) || 0) + 15 + "px";
        navBarheight.value = systemInfo.safeArea.top + 44 + "px";
        navBarPaddingTopheight.value = systemInfo.safeArea.top + "px";
      };
      const onClickComment = () => {
        articleCommentRef.value.popupOpen();
      };
      const back = () => {
        uni.navigateBack();
      };
      onLoad(() => {
        getPlaceholder();
        uni.setNavigationBarTitle({
          title: pageTitle.value
        });
      });
      const scroll = (e) => {
        const query = uni.createSelectorQuery();
        query.select(".article-user").boundingClientRect((data) => {
          if (!data)
            return formatAppLog("error", "at pages/article/info.vue:150", "data is null");
          if (Number(data.top) - 44 <= 0) {
            showNavBarAuthor.value = true;
          } else {
            showNavBarAuthor.value = false;
          }
        }).exec();
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.createElementVNode("view", {
            class: vue.normalizeClass(["nav-bar"])
          }, [
            vue.createElementVNode("view", { class: "nav-bar-left" }, [
              vue.createElementVNode("view", {
                class: "btn-item",
                onClick: back
              }, [
                vue.createElementVNode("text", { class: "iconfont icon-xiangzuojiantou" })
              ])
            ]),
            vue.createElementVNode("view", { class: "nav-bar-center" }, [
              !vue.unref(showNavBarAuthor) ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 0,
                  class: "nav-title ellipsis1"
                },
                vue.toDisplayString(vue.unref(pageTitle)) + "你的Maya你的Maya你的Maya你的Maya",
                1
                /* TEXT */
              )) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "nav-user"
              }, [
                vue.createElementVNode("view", { class: "user-left" }, [
                  vue.createElementVNode("image", {
                    class: "user-avatar",
                    src: "https://img.yzcdn.cn/vant/cat.jpeg",
                    mode: "scaleToFill"
                  }),
                  vue.createElementVNode("text", { class: "user-name ellipsis1" }, "你的Maya你的Maya你的Maya你的Maya你的Maya")
                ]),
                vue.createElementVNode("view", { class: "user-right" }, [
                  (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "gz nav-bar-btn"
                  }, [
                    vue.createElementVNode("text", { class: "iconfont icon-jiahao" }),
                    vue.createElementVNode("text", { class: "text" }, "关注")
                  ]))
                ])
              ]))
            ]),
            vue.createElementVNode("view", { class: "nav-bar-right" }, [
              vue.createElementVNode("view", { class: "btn-item" }, [
                vue.createElementVNode("text", { class: "iconfont icon-sousuo" })
              ]),
              vue.createElementVNode("view", { class: "btn-item ml-2" }, [
                vue.createElementVNode("text", { class: "iconfont icon-gengduo1" })
              ])
            ])
          ]),
          vue.createElementVNode(
            "scroll-view",
            {
              class: "scroll-view",
              "scroll-y": "",
              onScroll: scroll
            },
            [
              vue.createCommentVNode(" 文章内容 "),
              (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 0,
                  class: "article-container",
                  ref: "articleContent"
                },
                [
                  vue.createElementVNode("h1", { class: "ellipsis2" }, " 公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找 网页的开源项目 再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。 "),
                  vue.createCommentVNode(" 文章作者 "),
                  vue.createElementVNode("view", { class: "article-user" }, [
                    vue.createElementVNode("view", { class: "user-left" }, [
                      vue.createElementVNode("image", {
                        class: "user-avatar",
                        src: "https://img.yzcdn.cn/vant/cat.jpeg",
                        mode: "scaleToFill"
                      }),
                      vue.createCommentVNode(' <text class="user-name ellipsis1">你的Maya</text> '),
                      vue.createElementVNode("view", { class: "flex flex-col gap-4px" }, [
                        vue.createElementVNode("text", { class: "user-name ellipsis1" }, "你的Maya"),
                        vue.createElementVNode("text", { class: "push-time" }, "2024-10-24 22:50")
                      ])
                    ]),
                    vue.createElementVNode("view", { class: "user-right" }, [
                      (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "gz btn"
                      }, [
                        vue.createElementVNode("text", { class: "iconfont icon-jiahao" }),
                        vue.createElementVNode("text", { class: "text" }, "关注")
                      ]))
                    ])
                  ]),
                  vue.createCommentVNode(" 文章描述 "),
                  vue.createElementVNode(
                    "rich-text",
                    {
                      class: "article-content",
                      nodes: "公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找 网页的开源项目 再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找 网页的开源项目 再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找 网页的开源项目 再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找 网页的开源项目 再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找 网页的开源项目 再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找 网页的开源项目 再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找 网页的开源项目 再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找 网页的开源项目 再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找 网页的开源项目 再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找 网页的开源项目 再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。11",
                      ref: "content"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  )
                ],
                512
                /* NEED_PATCH */
              )),
              vue.createCommentVNode(" 相关推荐 "),
              vue.createElementVNode("view", { class: "related-recommend" }, [
                vue.createElementVNode("view", { class: "title" }, "相关推荐"),
                vue.createVNode(infoArticleItem),
                vue.createVNode(infoArticleItem),
                vue.createVNode(infoArticleItem),
                vue.createVNode(infoArticleItem)
              ]),
              vue.createCommentVNode(" 评论组件 "),
              vue.createVNode(
                articleComment,
                {
                  ref_key: "articleCommentRef",
                  ref: articleCommentRef,
                  articleId: 1
                },
                null,
                512
                /* NEED_PATCH */
              ),
              vue.createCommentVNode(" 底部区域 "),
              vue.createVNode(infoAction, {
                class: "info-action",
                id: 1,
                info: { commentCount: 0, collectCount: 0, likeCount: 0 },
                onOnClickComment: onClickComment,
                fixed: "",
                border: ""
              }),
              vue.createCommentVNode(' <view class="safeAreaBottomHeight"></view> ')
            ],
            32
            /* NEED_HYDRATION */
          )
        ]);
      };
    }
  });
  const PagesArticleInfo = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-e8340613"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/article/info.vue"]]);
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
    __name: "articleItem",
    setup(__props) {
      const type = vue.ref(1);
      const isGzUser = vue.ref(false);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "h" }, [
          vue.createVNode(homeArticleItem, {
            class: "mb-2_a_5",
            type: vue.unref(type),
            isGzUser: vue.unref(isGzUser)
          }, null, 8, ["type", "isGzUser"]),
          vue.createVNode(homeArticleItem, {
            class: "mb-2_a_5",
            type: vue.unref(type),
            isGzUser: vue.unref(isGzUser)
          }, null, 8, ["type", "isGzUser"]),
          vue.createElementVNode("view", {
            onClick: _cache[0] || (_cache[0] = ($event) => isGzUser.value = !vue.unref(isGzUser))
          }, "显示关注用户"),
          vue.createElementVNode("view", {
            onClick: _cache[1] || (_cache[1] = ($event) => type.value = 0)
          }, "无图"),
          vue.createElementVNode("view", {
            onClick: _cache[2] || (_cache[2] = ($event) => type.value = 1)
          }, "右侧一张小图"),
          vue.createElementVNode("view", {
            onClick: _cache[3] || (_cache[3] = ($event) => type.value = 2)
          }, "一张大图"),
          vue.createElementVNode("view", {
            onClick: _cache[4] || (_cache[4] = ($event) => type.value = 3)
          }, "三张小图")
        ]);
      };
    }
  });
  const PagesTestArticleItem = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-21a0f76c"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/test/articleItem.vue"]]);
  const _sfc_main$4 = {
    name: "UniBadge",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: "error"
      },
      inverted: {
        type: Boolean,
        default: false
      },
      isDot: {
        type: Boolean,
        default: false
      },
      maxNum: {
        type: Number,
        default: 99
      },
      absolute: {
        type: String,
        default: ""
      },
      offset: {
        type: Array,
        default() {
          return [0, 0];
        }
      },
      text: {
        type: [String, Number],
        default: ""
      },
      size: {
        type: String,
        default: "small"
      },
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {};
    },
    computed: {
      width() {
        return String(this.text).length * 8 + 12;
      },
      classNames() {
        const {
          inverted,
          type,
          size,
          absolute
        } = this;
        return [
          inverted ? "uni-badge--" + type + "-inverted" : "",
          "uni-badge--" + type,
          "uni-badge--" + size,
          absolute ? "uni-badge--absolute" : ""
        ].join(" ");
      },
      positionStyle() {
        if (!this.absolute)
          return {};
        let w = this.width / 2, h = 10;
        if (this.isDot) {
          w = 5;
          h = 5;
        }
        const x = `${-w + this.offset[0]}px`;
        const y = `${-h + this.offset[1]}px`;
        const whiteList = {
          rightTop: {
            right: x,
            top: y
          },
          rightBottom: {
            right: x,
            bottom: y
          },
          leftBottom: {
            left: x,
            bottom: y
          },
          leftTop: {
            left: x,
            top: y
          }
        };
        const match = whiteList[this.absolute];
        return match ? match : whiteList["rightTop"];
      },
      dotStyle() {
        if (!this.isDot)
          return {};
        return {
          width: "10px",
          minWidth: "0",
          height: "10px",
          padding: "0",
          borderRadius: "10px"
        };
      },
      displayValue() {
        const {
          isDot,
          text,
          maxNum
        } = this;
        return isDot ? "" : Number(text) > maxNum ? `${maxNum}+` : text;
      }
    },
    methods: {
      onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-badge--x" }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
      $props.text ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 0,
          class: vue.normalizeClass([$options.classNames, "uni-badge"]),
          style: vue.normalizeStyle([$options.positionStyle, $props.customStyle, $options.dotStyle]),
          onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick())
        },
        vue.toDisplayString($options.displayValue),
        7
        /* TEXT, CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render], ["__scopeId", "data-v-29833375"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/node_modules/.pnpm/@dcloudio+uni-ui@1.5.2/node_modules/@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue"]]);
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    __name: "nav-search-bar",
    setup(__props) {
      const statusBarHeight = vue.ref(0);
      vue.reactive({});
      const searchBarHeight = vue.ref(44);
      const searchBarRight = vue.ref(0);
      vue.onMounted(() => {
        statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight;
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "",
            style: vue.normalizeStyle({ height: vue.unref(statusBarHeight) + vue.unref(searchBarHeight) + "px" })
          },
          [
            vue.createElementVNode("view", { class: "fixed top-0 left-0 right-0" }, [
              vue.createElementVNode(
                "view",
                {
                  class: "w-full bg-blue-400",
                  style: vue.normalizeStyle({ height: vue.unref(statusBarHeight) + "px" })
                },
                null,
                4
                /* STYLE */
              ),
              vue.createElementVNode(
                "view",
                {
                  class: "flex flex-items-center bg-blue-400 py-2px px-13px box-border",
                  style: vue.normalizeStyle({ height: vue.unref(searchBarHeight) + "px" })
                },
                [
                  vue.createElementVNode("view", { class: "flex flex-items-center rounded-full flex-1 bg-gray-100 h-30px py-1px px-12px uni-weixin:h-25px!" }, [
                    vue.createElementVNode("view", { class: "iconfont icon-sousuo text-_a_999 text-15px uni-weixin:text-14px!" }),
                    vue.createElementVNode("text", { class: "text-14px ml-6px text-neutral-400 uni-weixin:text-13_a_5px!" }, "你想搜索点什么")
                  ]),
                  vue.createElementVNode(
                    "view",
                    {
                      class: "flex flex-items-center text-center h-34px ml-8px",
                      style: vue.normalizeStyle({ marginRight: vue.unref(searchBarRight) + "px", marginLeft: vue.unref(searchBarRight) ? "10px" : "" })
                    },
                    [
                      vue.createElementVNode("view", { class: "iconfont icon-jiahao text-white text-15px uni-weixin:text-14px!" }),
                      vue.createElementVNode("text", { class: "ml-1px text-white text-13_a_5px uni-weixin:text-13px!" }, "发布")
                    ],
                    4
                    /* STYLE */
                  )
                ],
                4
                /* STYLE */
              )
            ])
          ],
          4
          /* STYLE */
        );
      };
    }
  });
  const navSearchBar = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/home/components/nav-search-bar.vue"]]);
  const getArticleCtegoryList = (query) => {
    return request({
      url: "/article/ctegory",
      method: "GET",
      params: query
    });
  };
  const useArticleCtegoryStore = defineStore("articleCtegoryStore", {
    unistorage: {
      key: "articleCtegoryStore",
      // paths: ['appName', 'version'], 
      serializer: {
        serialize(v) {
          return JSON.stringify(v);
        },
        deserialize(v) {
          return JSON.parse(v);
        }
      }
    },
    state: () => ({
      ctegorId: 1,
      ctegoryList: [],
      myCtegoryList: [],
      tjCtegoryList: []
    }),
    getters: {
      list() {
        return this.ctegoryList.length ? this.ctegoryList : [];
      }
      // myCtegoryList(){
      // },
      // tjCtegoryList(){
      // }
    },
    actions: {
      loadArticleCtegoryList() {
        return new Promise((resolve, reject) => {
          if (this.ctegoryList.length)
            return resolve(this.ctegoryList);
          getArticleCtegoryList({ pageSize: 100 }).then((res) => {
            this.ctegoryList = res.data.list;
            this.tjCtegoryList = res.data.list;
            resolve(res);
          }).catch(() => {
            reject();
          });
        });
      },
      addMyCtegory(obj, index) {
        if (!this.tjCtegoryList.length)
          return;
        this.tjCtegoryList.splice(index, 1);
        if (!this.myCtegoryList.length)
          return this.myCtegoryList.push(obj);
        const exist = this.myCtegoryList.find((item) => item.id === obj.id);
        if (exist)
          return formatAppLog("log", "at store/articleCtegory.ts:51", "exist");
        this.myCtegoryList.push(obj);
      },
      delMyCtegory(obj, index) {
        if (!this.myCtegoryList.length)
          return;
        this.myCtegoryList.splice(index, 1);
        if (!this.tjCtegoryList.length)
          return this.tjCtegoryList.push(obj);
        const exist = this.tjCtegoryList.find((item) => item.id === obj.id);
        if (exist)
          return formatAppLog("log", "at store/articleCtegory.ts:59", "exist");
        this.tjCtegoryList.push(obj);
      }
    }
  });
  /*!
    * @intlify/shared v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const inBrowser = typeof window !== "undefined";
  let mark;
  let measure;
  {
    const perf2 = inBrowser && window.performance;
    if (perf2 && perf2.mark && perf2.measure && perf2.clearMarks && perf2.clearMeasures) {
      mark = (tag) => perf2.mark(tag);
      measure = (name, startTag, endTag) => {
        perf2.measure(name, startTag, endTag);
        perf2.clearMarks(startTag);
        perf2.clearMarks(endTag);
      };
    }
  }
  const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
  function format(message2, ...args) {
    if (args.length === 1 && isObject$2(args[0])) {
      args = args[0];
    }
    if (!args || !args.hasOwnProperty) {
      args = {};
    }
    return message2.replace(RE_ARGS, (match, identifier) => {
      return args.hasOwnProperty(identifier) ? args[identifier] : "";
    });
  }
  const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
  const makeSymbol = (name) => hasSymbol ? Symbol(name) : name;
  const generateFormatCacheKey = (locale2, key, source) => friendlyJSONstringify({ l: locale2, k: key, s: source });
  const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
  const isNumber = (val) => typeof val === "number" && isFinite(val);
  const isDate = (val) => toTypeString(val) === "[object Date]";
  const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
  const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
  function warn(msg, err) {
    if (typeof console !== "undefined") {
      console.warn(`[intlify] ` + msg);
      if (err) {
        console.warn(err.stack);
      }
    }
  }
  const assign = Object.assign;
  let _globalThis;
  const getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
  };
  function escapeHtml(rawText) {
    return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }
  const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  function hasOwn$1(obj, key) {
    return hasOwnProperty$1.call(obj, key);
  }
  const isArray = Array.isArray;
  const isFunction = (val) => typeof val === "function";
  const isString = (val) => typeof val === "string";
  const isBoolean = (val) => typeof val === "boolean";
  const isObject$2 = (val) => (
    // eslint-disable-line
    val !== null && typeof val === "object"
  );
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const isPlainObject = (val) => toTypeString(val) === "[object Object]";
  const toDisplayString = (val) => {
    return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
  };
  const RANGE = 2;
  function generateCodeFrame(source, start = 0, end = source.length) {
    const lines = source.split(/\r?\n/);
    let count = 0;
    const res = [];
    for (let i = 0; i < lines.length; i++) {
      count += lines[i].length + 1;
      if (count >= start) {
        for (let j = i - RANGE; j <= i + RANGE || end > count; j++) {
          if (j < 0 || j >= lines.length)
            continue;
          const line = j + 1;
          res.push(`${line}${" ".repeat(3 - String(line).length)}|  ${lines[j]}`);
          const lineLength = lines[j].length;
          if (j === i) {
            const pad = start - (count - lineLength) + 1;
            const length = Math.max(1, end > count ? lineLength - pad : end - start);
            res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
          } else if (j > i) {
            if (end > count) {
              const length = Math.max(Math.min(end - count, lineLength), 1);
              res.push(`   |  ` + "^".repeat(length));
            }
            count += lineLength + 1;
          }
        }
        break;
      }
    }
    return res.join("\n");
  }
  function createEmitter() {
    const events = /* @__PURE__ */ new Map();
    const emitter = {
      events,
      on(event, handler) {
        const handlers = events.get(event);
        const added = handlers && handlers.push(handler);
        if (!added) {
          events.set(event, [handler]);
        }
      },
      off(event, handler) {
        const handlers = events.get(event);
        if (handlers) {
          handlers.splice(handlers.indexOf(handler) >>> 0, 1);
        }
      },
      emit(event, payload) {
        (events.get(event) || []).slice().map((handler) => handler(payload));
        (events.get("*") || []).slice().map((handler) => handler(event, payload));
      }
    };
    return emitter;
  }
  /*!
    * @intlify/message-resolver v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  }
  const isObject$1 = (val) => (
    // eslint-disable-line
    val !== null && typeof val === "object"
  );
  const pathStateMachine = [];
  pathStateMachine[
    0
    /* BEFORE_PATH */
  ] = {
    [
      "w"
      /* WORKSPACE */
    ]: [
      0
      /* BEFORE_PATH */
    ],
    [
      "i"
      /* IDENT */
    ]: [
      3,
      0
      /* APPEND */
    ],
    [
      "["
      /* LEFT_BRACKET */
    ]: [
      4
      /* IN_SUB_PATH */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: [
      7
      /* AFTER_PATH */
    ]
  };
  pathStateMachine[
    1
    /* IN_PATH */
  ] = {
    [
      "w"
      /* WORKSPACE */
    ]: [
      1
      /* IN_PATH */
    ],
    [
      "."
      /* DOT */
    ]: [
      2
      /* BEFORE_IDENT */
    ],
    [
      "["
      /* LEFT_BRACKET */
    ]: [
      4
      /* IN_SUB_PATH */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: [
      7
      /* AFTER_PATH */
    ]
  };
  pathStateMachine[
    2
    /* BEFORE_IDENT */
  ] = {
    [
      "w"
      /* WORKSPACE */
    ]: [
      2
      /* BEFORE_IDENT */
    ],
    [
      "i"
      /* IDENT */
    ]: [
      3,
      0
      /* APPEND */
    ],
    [
      "0"
      /* ZERO */
    ]: [
      3,
      0
      /* APPEND */
    ]
  };
  pathStateMachine[
    3
    /* IN_IDENT */
  ] = {
    [
      "i"
      /* IDENT */
    ]: [
      3,
      0
      /* APPEND */
    ],
    [
      "0"
      /* ZERO */
    ]: [
      3,
      0
      /* APPEND */
    ],
    [
      "w"
      /* WORKSPACE */
    ]: [
      1,
      1
      /* PUSH */
    ],
    [
      "."
      /* DOT */
    ]: [
      2,
      1
      /* PUSH */
    ],
    [
      "["
      /* LEFT_BRACKET */
    ]: [
      4,
      1
      /* PUSH */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: [
      7,
      1
      /* PUSH */
    ]
  };
  pathStateMachine[
    4
    /* IN_SUB_PATH */
  ] = {
    [
      "'"
      /* SINGLE_QUOTE */
    ]: [
      5,
      0
      /* APPEND */
    ],
    [
      '"'
      /* DOUBLE_QUOTE */
    ]: [
      6,
      0
      /* APPEND */
    ],
    [
      "["
      /* LEFT_BRACKET */
    ]: [
      4,
      2
      /* INC_SUB_PATH_DEPTH */
    ],
    [
      "]"
      /* RIGHT_BRACKET */
    ]: [
      1,
      3
      /* PUSH_SUB_PATH */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: 8,
    [
      "l"
      /* ELSE */
    ]: [
      4,
      0
      /* APPEND */
    ]
  };
  pathStateMachine[
    5
    /* IN_SINGLE_QUOTE */
  ] = {
    [
      "'"
      /* SINGLE_QUOTE */
    ]: [
      4,
      0
      /* APPEND */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: 8,
    [
      "l"
      /* ELSE */
    ]: [
      5,
      0
      /* APPEND */
    ]
  };
  pathStateMachine[
    6
    /* IN_DOUBLE_QUOTE */
  ] = {
    [
      '"'
      /* DOUBLE_QUOTE */
    ]: [
      4,
      0
      /* APPEND */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: 8,
    [
      "l"
      /* ELSE */
    ]: [
      6,
      0
      /* APPEND */
    ]
  };
  const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
  function isLiteral(exp) {
    return literalValueRE.test(exp);
  }
  function stripQuotes(str) {
    const a = str.charCodeAt(0);
    const b = str.charCodeAt(str.length - 1);
    return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
  }
  function getPathCharType(ch) {
    if (ch === void 0 || ch === null) {
      return "o";
    }
    const code = ch.charCodeAt(0);
    switch (code) {
      case 91:
      case 93:
      case 46:
      case 34:
      case 39:
        return ch;
      case 95:
      case 36:
      case 45:
        return "i";
      case 9:
      case 10:
      case 13:
      case 160:
      case 65279:
      case 8232:
      case 8233:
        return "w";
    }
    return "i";
  }
  function formatSubPath(path) {
    const trimmed = path.trim();
    if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
      return false;
    }
    return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
  }
  function parse(path) {
    const keys = [];
    let index = -1;
    let mode = 0;
    let subPathDepth = 0;
    let c;
    let key;
    let newChar;
    let type;
    let transition;
    let action;
    let typeMap;
    const actions = [];
    actions[
      0
      /* APPEND */
    ] = () => {
      if (key === void 0) {
        key = newChar;
      } else {
        key += newChar;
      }
    };
    actions[
      1
      /* PUSH */
    ] = () => {
      if (key !== void 0) {
        keys.push(key);
        key = void 0;
      }
    };
    actions[
      2
      /* INC_SUB_PATH_DEPTH */
    ] = () => {
      actions[
        0
        /* APPEND */
      ]();
      subPathDepth++;
    };
    actions[
      3
      /* PUSH_SUB_PATH */
    ] = () => {
      if (subPathDepth > 0) {
        subPathDepth--;
        mode = 4;
        actions[
          0
          /* APPEND */
        ]();
      } else {
        subPathDepth = 0;
        if (key === void 0) {
          return false;
        }
        key = formatSubPath(key);
        if (key === false) {
          return false;
        } else {
          actions[
            1
            /* PUSH */
          ]();
        }
      }
    };
    function maybeUnescapeQuote() {
      const nextChar = path[index + 1];
      if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
        index++;
        newChar = "\\" + nextChar;
        actions[
          0
          /* APPEND */
        ]();
        return true;
      }
    }
    while (mode !== null) {
      index++;
      c = path[index];
      if (c === "\\" && maybeUnescapeQuote()) {
        continue;
      }
      type = getPathCharType(c);
      typeMap = pathStateMachine[mode];
      transition = typeMap[type] || typeMap[
        "l"
        /* ELSE */
      ] || 8;
      if (transition === 8) {
        return;
      }
      mode = transition[0];
      if (transition[1] !== void 0) {
        action = actions[transition[1]];
        if (action) {
          newChar = c;
          if (action() === false) {
            return;
          }
        }
      }
      if (mode === 7) {
        return keys;
      }
    }
  }
  const cache = /* @__PURE__ */ new Map();
  function resolveValue(obj, path) {
    if (!isObject$1(obj)) {
      return null;
    }
    let hit = cache.get(path);
    if (!hit) {
      hit = parse(path);
      if (hit) {
        cache.set(path, hit);
      }
    }
    if (!hit) {
      return null;
    }
    const len = hit.length;
    let last = obj;
    let i = 0;
    while (i < len) {
      const val = last[hit[i]];
      if (val === void 0) {
        return null;
      }
      last = val;
      i++;
    }
    return last;
  }
  function handleFlatJson(obj) {
    if (!isObject$1(obj)) {
      return obj;
    }
    for (const key in obj) {
      if (!hasOwn(obj, key)) {
        continue;
      }
      if (!key.includes(
        "."
        /* DOT */
      )) {
        if (isObject$1(obj[key])) {
          handleFlatJson(obj[key]);
        }
      } else {
        const subKeys = key.split(
          "."
          /* DOT */
        );
        const lastIndex = subKeys.length - 1;
        let currentObj = obj;
        for (let i = 0; i < lastIndex; i++) {
          if (!(subKeys[i] in currentObj)) {
            currentObj[subKeys[i]] = {};
          }
          currentObj = currentObj[subKeys[i]];
        }
        currentObj[subKeys[lastIndex]] = obj[key];
        delete obj[key];
        if (isObject$1(currentObj[subKeys[lastIndex]])) {
          handleFlatJson(currentObj[subKeys[lastIndex]]);
        }
      }
    }
    return obj;
  }
  /*!
    * @intlify/runtime v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const DEFAULT_MODIFIER = (str) => str;
  const DEFAULT_MESSAGE = (ctx) => "";
  const DEFAULT_MESSAGE_DATA_TYPE = "text";
  const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : values.join("");
  const DEFAULT_INTERPOLATE = toDisplayString;
  function pluralDefault(choice, choicesLength) {
    choice = Math.abs(choice);
    if (choicesLength === 2) {
      return choice ? choice > 1 ? 1 : 0 : 1;
    }
    return choice ? Math.min(choice, 2) : 0;
  }
  function getPluralIndex(options) {
    const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
    return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index : index;
  }
  function normalizeNamed(pluralIndex, props) {
    if (!props.count) {
      props.count = pluralIndex;
    }
    if (!props.n) {
      props.n = pluralIndex;
    }
  }
  function createMessageContext(options = {}) {
    const locale2 = options.locale;
    const pluralIndex = getPluralIndex(options);
    const pluralRule = isObject$2(options.pluralRules) && isString(locale2) && isFunction(options.pluralRules[locale2]) ? options.pluralRules[locale2] : pluralDefault;
    const orgPluralRule = isObject$2(options.pluralRules) && isString(locale2) && isFunction(options.pluralRules[locale2]) ? pluralDefault : void 0;
    const plural = (messages) => messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
    const _list = options.list || [];
    const list = (index) => _list[index];
    const _named = options.named || {};
    isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
    const named = (key) => _named[key];
    function message2(key) {
      const msg = isFunction(options.messages) ? options.messages(key) : isObject$2(options.messages) ? options.messages[key] : false;
      return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
    }
    const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
    const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
    const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
    const type = isPlainObject(options.processor) && isString(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
    const ctx = {
      [
        "list"
        /* LIST */
      ]: list,
      [
        "named"
        /* NAMED */
      ]: named,
      [
        "plural"
        /* PLURAL */
      ]: plural,
      [
        "linked"
        /* LINKED */
      ]: (key, modifier) => {
        const msg = message2(key)(ctx);
        return isString(modifier) ? _modifier(modifier)(msg) : msg;
      },
      [
        "message"
        /* MESSAGE */
      ]: message2,
      [
        "type"
        /* TYPE */
      ]: type,
      [
        "interpolate"
        /* INTERPOLATE */
      ]: interpolate,
      [
        "normalize"
        /* NORMALIZE */
      ]: normalize
    };
    return ctx;
  }
  /*!
    * @intlify/message-compiler v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const errorMessages$2 = {
    // tokenizer error messages
    [
      0
      /* EXPECTED_TOKEN */
    ]: `Expected token: '{0}'`,
    [
      1
      /* INVALID_TOKEN_IN_PLACEHOLDER */
    ]: `Invalid token in placeholder: '{0}'`,
    [
      2
      /* UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER */
    ]: `Unterminated single quote in placeholder`,
    [
      3
      /* UNKNOWN_ESCAPE_SEQUENCE */
    ]: `Unknown escape sequence: \\{0}`,
    [
      4
      /* INVALID_UNICODE_ESCAPE_SEQUENCE */
    ]: `Invalid unicode escape sequence: {0}`,
    [
      5
      /* UNBALANCED_CLOSING_BRACE */
    ]: `Unbalanced closing brace`,
    [
      6
      /* UNTERMINATED_CLOSING_BRACE */
    ]: `Unterminated closing brace`,
    [
      7
      /* EMPTY_PLACEHOLDER */
    ]: `Empty placeholder`,
    [
      8
      /* NOT_ALLOW_NEST_PLACEHOLDER */
    ]: `Not allowed nest placeholder`,
    [
      9
      /* INVALID_LINKED_FORMAT */
    ]: `Invalid linked format`,
    // parser error messages
    [
      10
      /* MUST_HAVE_MESSAGES_IN_PLURAL */
    ]: `Plural must have messages`,
    [
      11
      /* UNEXPECTED_EMPTY_LINKED_MODIFIER */
    ]: `Unexpected empty linked modifier`,
    [
      12
      /* UNEXPECTED_EMPTY_LINKED_KEY */
    ]: `Unexpected empty linked key`,
    [
      13
      /* UNEXPECTED_LEXICAL_ANALYSIS */
    ]: `Unexpected lexical analysis in token: '{0}'`
  };
  function createCompileError(code, loc, options = {}) {
    const { domain, messages, args } = options;
    const msg = format((messages || errorMessages$2)[code] || "", ...args || []);
    const error = new SyntaxError(String(msg));
    error.code = code;
    if (loc) {
      error.location = loc;
    }
    error.domain = domain;
    return error;
  }
  /*!
    * @intlify/devtools-if v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const IntlifyDevToolsHooks = {
    I18nInit: "i18n:init",
    FunctionTranslate: "function:translate"
  };
  /*!
    * @intlify/core-base v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  let devtools = null;
  function setDevToolsHook(hook) {
    devtools = hook;
  }
  function initI18nDevTools(i18n2, version, meta) {
    devtools && devtools.emit(IntlifyDevToolsHooks.I18nInit, {
      timestamp: Date.now(),
      i18n: i18n2,
      version,
      meta
    });
  }
  const translateDevTools = /* @__PURE__ */ createDevToolsHook(IntlifyDevToolsHooks.FunctionTranslate);
  function createDevToolsHook(hook) {
    return (payloads) => devtools && devtools.emit(hook, payloads);
  }
  const warnMessages$1 = {
    [
      0
      /* NOT_FOUND_KEY */
    ]: `Not found '{key}' key in '{locale}' locale messages.`,
    [
      1
      /* FALLBACK_TO_TRANSLATE */
    ]: `Fall back to translate '{key}' key with '{target}' locale.`,
    [
      2
      /* CANNOT_FORMAT_NUMBER */
    ]: `Cannot format a number value due to not supported Intl.NumberFormat.`,
    [
      3
      /* FALLBACK_TO_NUMBER_FORMAT */
    ]: `Fall back to number format '{key}' key with '{target}' locale.`,
    [
      4
      /* CANNOT_FORMAT_DATE */
    ]: `Cannot format a date value due to not supported Intl.DateTimeFormat.`,
    [
      5
      /* FALLBACK_TO_DATE_FORMAT */
    ]: `Fall back to datetime format '{key}' key with '{target}' locale.`
  };
  function getWarnMessage$1(code, ...args) {
    return format(warnMessages$1[code], ...args);
  }
  const VERSION$1 = "9.1.9";
  const NOT_REOSLVED = -1;
  const MISSING_RESOLVE_VALUE = "";
  function getDefaultLinkedModifiers() {
    return {
      upper: (val) => isString(val) ? val.toUpperCase() : val,
      lower: (val) => isString(val) ? val.toLowerCase() : val,
      // prettier-ignore
      capitalize: (val) => isString(val) ? `${val.charAt(0).toLocaleUpperCase()}${val.substr(1)}` : val
    };
  }
  let _compiler;
  let _additionalMeta = null;
  const setAdditionalMeta = (meta) => {
    _additionalMeta = meta;
  };
  const getAdditionalMeta = () => _additionalMeta;
  let _cid = 0;
  function createCoreContext(options = {}) {
    const version = isString(options.version) ? options.version : VERSION$1;
    const locale2 = isString(options.locale) ? options.locale : "en-US";
    const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale2;
    const messages = isPlainObject(options.messages) ? options.messages : { [locale2]: {} };
    const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [locale2]: {} };
    const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : { [locale2]: {} };
    const modifiers = assign({}, options.modifiers || {}, getDefaultLinkedModifiers());
    const pluralRules = options.pluralRules || {};
    const missing = isFunction(options.missing) ? options.missing : null;
    const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
    const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
    const fallbackFormat = !!options.fallbackFormat;
    const unresolving = !!options.unresolving;
    const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
    const processor = isPlainObject(options.processor) ? options.processor : null;
    const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
    const escapeParameter = !!options.escapeParameter;
    const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
    const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
    const internalOptions = options;
    const __datetimeFormatters = isObject$2(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
    const __numberFormatters = isObject$2(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
    const __meta = isObject$2(internalOptions.__meta) ? internalOptions.__meta : {};
    _cid++;
    const context = {
      version,
      cid: _cid,
      locale: locale2,
      fallbackLocale,
      messages,
      datetimeFormats,
      numberFormats,
      modifiers,
      pluralRules,
      missing,
      missingWarn,
      fallbackWarn,
      fallbackFormat,
      unresolving,
      postTranslation,
      processor,
      warnHtmlMessage,
      escapeParameter,
      messageCompiler,
      onWarn,
      __datetimeFormatters,
      __numberFormatters,
      __meta
    };
    {
      context.__v_emitter = internalOptions.__v_emitter != null ? internalOptions.__v_emitter : void 0;
    }
    {
      initI18nDevTools(context, version, __meta);
    }
    return context;
  }
  function isTranslateFallbackWarn(fallback, key) {
    return fallback instanceof RegExp ? fallback.test(key) : fallback;
  }
  function isTranslateMissingWarn(missing, key) {
    return missing instanceof RegExp ? missing.test(key) : missing;
  }
  function handleMissing(context, key, locale2, missingWarn, type) {
    const { missing, onWarn } = context;
    {
      const emitter = context.__v_emitter;
      if (emitter) {
        emitter.emit("missing", {
          locale: locale2,
          key,
          type,
          groupId: `${type}:${key}`
        });
      }
    }
    if (missing !== null) {
      const ret = missing(context, locale2, key, type);
      return isString(ret) ? ret : key;
    } else {
      if (isTranslateMissingWarn(missingWarn, key)) {
        onWarn(getWarnMessage$1(0, { key, locale: locale2 }));
      }
      return key;
    }
  }
  function getLocaleChain(ctx, fallback, start) {
    const context = ctx;
    if (!context.__localeChainCache) {
      context.__localeChainCache = /* @__PURE__ */ new Map();
    }
    let chain = context.__localeChainCache.get(start);
    if (!chain) {
      chain = [];
      let block = [start];
      while (isArray(block)) {
        block = appendBlockToChain(chain, block, fallback);
      }
      const defaults = isArray(fallback) ? fallback : isPlainObject(fallback) ? fallback["default"] ? fallback["default"] : null : fallback;
      block = isString(defaults) ? [defaults] : defaults;
      if (isArray(block)) {
        appendBlockToChain(chain, block, false);
      }
      context.__localeChainCache.set(start, chain);
    }
    return chain;
  }
  function appendBlockToChain(chain, block, blocks) {
    let follow = true;
    for (let i = 0; i < block.length && isBoolean(follow); i++) {
      const locale2 = block[i];
      if (isString(locale2)) {
        follow = appendLocaleToChain(chain, block[i], blocks);
      }
    }
    return follow;
  }
  function appendLocaleToChain(chain, locale2, blocks) {
    let follow;
    const tokens = locale2.split("-");
    do {
      const target = tokens.join("-");
      follow = appendItemToChain(chain, target, blocks);
      tokens.splice(-1, 1);
    } while (tokens.length && follow === true);
    return follow;
  }
  function appendItemToChain(chain, target, blocks) {
    let follow = false;
    if (!chain.includes(target)) {
      follow = true;
      if (target) {
        follow = target[target.length - 1] !== "!";
        const locale2 = target.replace(/!/g, "");
        chain.push(locale2);
        if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale2]) {
          follow = blocks[locale2];
        }
      }
    }
    return follow;
  }
  function updateFallbackLocale(ctx, locale2, fallback) {
    const context = ctx;
    context.__localeChainCache = /* @__PURE__ */ new Map();
    getLocaleChain(ctx, fallback, locale2);
  }
  function createCoreError(code) {
    return createCompileError(code, null, { messages: errorMessages$1 });
  }
  const errorMessages$1 = {
    [
      14
      /* INVALID_ARGUMENT */
    ]: "Invalid arguments",
    [
      15
      /* INVALID_DATE_ARGUMENT */
    ]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
    [
      16
      /* INVALID_ISO_DATE_ARGUMENT */
    ]: "The argument provided is not a valid ISO date string"
  };
  const NOOP_MESSAGE_FUNCTION = () => "";
  const isMessageFunction = (val) => isFunction(val);
  function translate(context, ...args) {
    const { fallbackFormat, postTranslation, unresolving, fallbackLocale, messages } = context;
    const [key, options] = parseTranslateArgs(...args);
    const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
    const resolvedMessage = !!options.resolvedMessage;
    const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : key : fallbackFormat ? key : "";
    const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== "";
    const locale2 = isString(options.locale) ? options.locale : context.locale;
    escapeParameter && escapeParams(options);
    let [format2, targetLocale, message2] = !resolvedMessage ? resolveMessageFormat(context, key, locale2, fallbackLocale, fallbackWarn, missingWarn) : [
      key,
      locale2,
      messages[locale2] || {}
    ];
    let cacheBaseKey = key;
    if (!resolvedMessage && !(isString(format2) || isMessageFunction(format2))) {
      if (enableDefaultMsg) {
        format2 = defaultMsgOrKey;
        cacheBaseKey = format2;
      }
    }
    if (!resolvedMessage && (!(isString(format2) || isMessageFunction(format2)) || !isString(targetLocale))) {
      return unresolving ? NOT_REOSLVED : key;
    }
    if (isString(format2) && context.messageCompiler == null) {
      warn(`The message format compilation is not supported in this build. Because message compiler isn't included. You need to pre-compilation all message format. So translate function return '${key}'.`);
      return key;
    }
    let occurred = false;
    const errorDetector = () => {
      occurred = true;
    };
    const msg = !isMessageFunction(format2) ? compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, errorDetector) : format2;
    if (occurred) {
      return format2;
    }
    const ctxOptions = getMessageContextOptions(context, targetLocale, message2, options);
    const msgContext = createMessageContext(ctxOptions);
    const messaged = evaluateMessage(context, msg, msgContext);
    const ret = postTranslation ? postTranslation(messaged) : messaged;
    {
      const payloads = {
        timestamp: Date.now(),
        key: isString(key) ? key : isMessageFunction(format2) ? format2.key : "",
        locale: targetLocale || (isMessageFunction(format2) ? format2.locale : ""),
        format: isString(format2) ? format2 : isMessageFunction(format2) ? format2.source : "",
        message: ret
      };
      payloads.meta = assign({}, context.__meta, getAdditionalMeta() || {});
      translateDevTools(payloads);
    }
    return ret;
  }
  function escapeParams(options) {
    if (isArray(options.list)) {
      options.list = options.list.map((item) => isString(item) ? escapeHtml(item) : item);
    } else if (isObject$2(options.named)) {
      Object.keys(options.named).forEach((key) => {
        if (isString(options.named[key])) {
          options.named[key] = escapeHtml(options.named[key]);
        }
      });
    }
  }
  function resolveMessageFormat(context, key, locale2, fallbackLocale, fallbackWarn, missingWarn) {
    const { messages, onWarn } = context;
    const locales = getLocaleChain(context, fallbackLocale, locale2);
    let message2 = {};
    let targetLocale;
    let format2 = null;
    let from = locale2;
    let to = null;
    const type = "translate";
    for (let i = 0; i < locales.length; i++) {
      targetLocale = to = locales[i];
      if (locale2 !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
        onWarn(getWarnMessage$1(1, {
          key,
          target: targetLocale
        }));
      }
      if (locale2 !== targetLocale) {
        const emitter = context.__v_emitter;
        if (emitter) {
          emitter.emit("fallback", {
            type,
            key,
            from,
            to,
            groupId: `${type}:${key}`
          });
        }
      }
      message2 = messages[targetLocale] || {};
      let start = null;
      let startTag;
      let endTag;
      if (inBrowser) {
        start = window.performance.now();
        startTag = "intlify-message-resolve-start";
        endTag = "intlify-message-resolve-end";
        mark && mark(startTag);
      }
      if ((format2 = resolveValue(message2, key)) === null) {
        format2 = message2[key];
      }
      if (inBrowser) {
        const end = window.performance.now();
        const emitter = context.__v_emitter;
        if (emitter && start && format2) {
          emitter.emit("message-resolve", {
            type: "message-resolve",
            key,
            message: format2,
            time: end - start,
            groupId: `${type}:${key}`
          });
        }
        if (startTag && endTag && mark && measure) {
          mark(endTag);
          measure("intlify message resolve", startTag, endTag);
        }
      }
      if (isString(format2) || isFunction(format2))
        break;
      const missingRet = handleMissing(context, key, targetLocale, missingWarn, type);
      if (missingRet !== key) {
        format2 = missingRet;
      }
      from = to;
    }
    return [format2, targetLocale, message2];
  }
  function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, errorDetector) {
    const { messageCompiler, warnHtmlMessage } = context;
    if (isMessageFunction(format2)) {
      const msg2 = format2;
      msg2.locale = msg2.locale || targetLocale;
      msg2.key = msg2.key || key;
      return msg2;
    }
    let start = null;
    let startTag;
    let endTag;
    if (inBrowser) {
      start = window.performance.now();
      startTag = "intlify-message-compilation-start";
      endTag = "intlify-message-compilation-end";
      mark && mark(startTag);
    }
    const msg = messageCompiler(format2, getCompileOptions(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, errorDetector));
    if (inBrowser) {
      const end = window.performance.now();
      const emitter = context.__v_emitter;
      if (emitter && start) {
        emitter.emit("message-compilation", {
          type: "message-compilation",
          message: format2,
          time: end - start,
          groupId: `${"translate"}:${key}`
        });
      }
      if (startTag && endTag && mark && measure) {
        mark(endTag);
        measure("intlify message compilation", startTag, endTag);
      }
    }
    msg.locale = targetLocale;
    msg.key = key;
    msg.source = format2;
    return msg;
  }
  function evaluateMessage(context, msg, msgCtx) {
    let start = null;
    let startTag;
    let endTag;
    if (inBrowser) {
      start = window.performance.now();
      startTag = "intlify-message-evaluation-start";
      endTag = "intlify-message-evaluation-end";
      mark && mark(startTag);
    }
    const messaged = msg(msgCtx);
    if (inBrowser) {
      const end = window.performance.now();
      const emitter = context.__v_emitter;
      if (emitter && start) {
        emitter.emit("message-evaluation", {
          type: "message-evaluation",
          value: messaged,
          time: end - start,
          groupId: `${"translate"}:${msg.key}`
        });
      }
      if (startTag && endTag && mark && measure) {
        mark(endTag);
        measure("intlify message evaluation", startTag, endTag);
      }
    }
    return messaged;
  }
  function parseTranslateArgs(...args) {
    const [arg1, arg2, arg3] = args;
    const options = {};
    if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1)) {
      throw createCoreError(
        14
        /* INVALID_ARGUMENT */
      );
    }
    const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
    if (isNumber(arg2)) {
      options.plural = arg2;
    } else if (isString(arg2)) {
      options.default = arg2;
    } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
      options.named = arg2;
    } else if (isArray(arg2)) {
      options.list = arg2;
    }
    if (isNumber(arg3)) {
      options.plural = arg3;
    } else if (isString(arg3)) {
      options.default = arg3;
    } else if (isPlainObject(arg3)) {
      assign(options, arg3);
    }
    return [key, options];
  }
  function getCompileOptions(context, locale2, key, source, warnHtmlMessage, errorDetector) {
    return {
      warnHtmlMessage,
      onError: (err) => {
        errorDetector && errorDetector(err);
        {
          const message2 = `Message compilation error: ${err.message}`;
          const codeFrame = err.location && generateCodeFrame(source, err.location.start.offset, err.location.end.offset);
          const emitter = context.__v_emitter;
          if (emitter) {
            emitter.emit("compile-error", {
              message: source,
              error: err.message,
              start: err.location && err.location.start.offset,
              end: err.location && err.location.end.offset,
              groupId: `${"translate"}:${key}`
            });
          }
          console.error(codeFrame ? `${message2}
${codeFrame}` : message2);
        }
      },
      onCacheKey: (source2) => generateFormatCacheKey(locale2, key, source2)
    };
  }
  function getMessageContextOptions(context, locale2, message2, options) {
    const { modifiers, pluralRules } = context;
    const resolveMessage = (key) => {
      const val = resolveValue(message2, key);
      if (isString(val)) {
        let occurred = false;
        const errorDetector = () => {
          occurred = true;
        };
        const msg = compileMessageFormat(context, key, locale2, val, key, errorDetector);
        return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
      } else if (isMessageFunction(val)) {
        return val;
      } else {
        return NOOP_MESSAGE_FUNCTION;
      }
    };
    const ctxOptions = {
      locale: locale2,
      modifiers,
      pluralRules,
      messages: resolveMessage
    };
    if (context.processor) {
      ctxOptions.processor = context.processor;
    }
    if (options.list) {
      ctxOptions.list = options.list;
    }
    if (options.named) {
      ctxOptions.named = options.named;
    }
    if (isNumber(options.plural)) {
      ctxOptions.pluralIndex = options.plural;
    }
    return ctxOptions;
  }
  const intlDefined = typeof Intl !== "undefined";
  const Availabilities = {
    dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== "undefined",
    numberFormat: intlDefined && typeof Intl.NumberFormat !== "undefined"
  };
  function datetime(context, ...args) {
    const { datetimeFormats, unresolving, fallbackLocale, onWarn } = context;
    const { __datetimeFormatters } = context;
    if (!Availabilities.dateTimeFormat) {
      onWarn(getWarnMessage$1(
        4
        /* CANNOT_FORMAT_DATE */
      ));
      return MISSING_RESOLVE_VALUE;
    }
    const [key, value, options, overrides] = parseDateTimeArgs(...args);
    const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const part = !!options.part;
    const locale2 = isString(options.locale) ? options.locale : context.locale;
    const locales = getLocaleChain(context, fallbackLocale, locale2);
    if (!isString(key) || key === "") {
      return new Intl.DateTimeFormat(locale2).format(value);
    }
    let datetimeFormat = {};
    let targetLocale;
    let format2 = null;
    let from = locale2;
    let to = null;
    const type = "datetime format";
    for (let i = 0; i < locales.length; i++) {
      targetLocale = to = locales[i];
      if (locale2 !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
        onWarn(getWarnMessage$1(5, {
          key,
          target: targetLocale
        }));
      }
      if (locale2 !== targetLocale) {
        const emitter = context.__v_emitter;
        if (emitter) {
          emitter.emit("fallback", {
            type,
            key,
            from,
            to,
            groupId: `${type}:${key}`
          });
        }
      }
      datetimeFormat = datetimeFormats[targetLocale] || {};
      format2 = datetimeFormat[key];
      if (isPlainObject(format2))
        break;
      handleMissing(context, key, targetLocale, missingWarn, type);
      from = to;
    }
    if (!isPlainObject(format2) || !isString(targetLocale)) {
      return unresolving ? NOT_REOSLVED : key;
    }
    let id = `${targetLocale}__${key}`;
    if (!isEmptyObject(overrides)) {
      id = `${id}__${JSON.stringify(overrides)}`;
    }
    let formatter = __datetimeFormatters.get(id);
    if (!formatter) {
      formatter = new Intl.DateTimeFormat(targetLocale, assign({}, format2, overrides));
      __datetimeFormatters.set(id, formatter);
    }
    return !part ? formatter.format(value) : formatter.formatToParts(value);
  }
  function parseDateTimeArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    let options = {};
    let overrides = {};
    let value;
    if (isString(arg1)) {
      if (!/\d{4}-\d{2}-\d{2}(T.*)?/.test(arg1)) {
        throw createCoreError(
          16
          /* INVALID_ISO_DATE_ARGUMENT */
        );
      }
      value = new Date(arg1);
      try {
        value.toISOString();
      } catch (e) {
        throw createCoreError(
          16
          /* INVALID_ISO_DATE_ARGUMENT */
        );
      }
    } else if (isDate(arg1)) {
      if (isNaN(arg1.getTime())) {
        throw createCoreError(
          15
          /* INVALID_DATE_ARGUMENT */
        );
      }
      value = arg1;
    } else if (isNumber(arg1)) {
      value = arg1;
    } else {
      throw createCoreError(
        14
        /* INVALID_ARGUMENT */
      );
    }
    if (isString(arg2)) {
      options.key = arg2;
    } else if (isPlainObject(arg2)) {
      options = arg2;
    }
    if (isString(arg3)) {
      options.locale = arg3;
    } else if (isPlainObject(arg3)) {
      overrides = arg3;
    }
    if (isPlainObject(arg4)) {
      overrides = arg4;
    }
    return [options.key || "", value, options, overrides];
  }
  function clearDateTimeFormat(ctx, locale2, format2) {
    const context = ctx;
    for (const key in format2) {
      const id = `${locale2}__${key}`;
      if (!context.__datetimeFormatters.has(id)) {
        continue;
      }
      context.__datetimeFormatters.delete(id);
    }
  }
  function number(context, ...args) {
    const { numberFormats, unresolving, fallbackLocale, onWarn } = context;
    const { __numberFormatters } = context;
    if (!Availabilities.numberFormat) {
      onWarn(getWarnMessage$1(
        2
        /* CANNOT_FORMAT_NUMBER */
      ));
      return MISSING_RESOLVE_VALUE;
    }
    const [key, value, options, overrides] = parseNumberArgs(...args);
    const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const part = !!options.part;
    const locale2 = isString(options.locale) ? options.locale : context.locale;
    const locales = getLocaleChain(context, fallbackLocale, locale2);
    if (!isString(key) || key === "") {
      return new Intl.NumberFormat(locale2).format(value);
    }
    let numberFormat = {};
    let targetLocale;
    let format2 = null;
    let from = locale2;
    let to = null;
    const type = "number format";
    for (let i = 0; i < locales.length; i++) {
      targetLocale = to = locales[i];
      if (locale2 !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
        onWarn(getWarnMessage$1(3, {
          key,
          target: targetLocale
        }));
      }
      if (locale2 !== targetLocale) {
        const emitter = context.__v_emitter;
        if (emitter) {
          emitter.emit("fallback", {
            type,
            key,
            from,
            to,
            groupId: `${type}:${key}`
          });
        }
      }
      numberFormat = numberFormats[targetLocale] || {};
      format2 = numberFormat[key];
      if (isPlainObject(format2))
        break;
      handleMissing(context, key, targetLocale, missingWarn, type);
      from = to;
    }
    if (!isPlainObject(format2) || !isString(targetLocale)) {
      return unresolving ? NOT_REOSLVED : key;
    }
    let id = `${targetLocale}__${key}`;
    if (!isEmptyObject(overrides)) {
      id = `${id}__${JSON.stringify(overrides)}`;
    }
    let formatter = __numberFormatters.get(id);
    if (!formatter) {
      formatter = new Intl.NumberFormat(targetLocale, assign({}, format2, overrides));
      __numberFormatters.set(id, formatter);
    }
    return !part ? formatter.format(value) : formatter.formatToParts(value);
  }
  function parseNumberArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    let options = {};
    let overrides = {};
    if (!isNumber(arg1)) {
      throw createCoreError(
        14
        /* INVALID_ARGUMENT */
      );
    }
    const value = arg1;
    if (isString(arg2)) {
      options.key = arg2;
    } else if (isPlainObject(arg2)) {
      options = arg2;
    }
    if (isString(arg3)) {
      options.locale = arg3;
    } else if (isPlainObject(arg3)) {
      overrides = arg3;
    }
    if (isPlainObject(arg4)) {
      overrides = arg4;
    }
    return [options.key || "", value, options, overrides];
  }
  function clearNumberFormat(ctx, locale2, format2) {
    const context = ctx;
    for (const key in format2) {
      const id = `${locale2}__${key}`;
      if (!context.__numberFormatters.has(id)) {
        continue;
      }
      context.__numberFormatters.delete(id);
    }
  }
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = { ...defaultSettings };
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        }
      };
      hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value);
        }
      });
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && pluginDescriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(pluginDescriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
    * @intlify/vue-devtools v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const VueDevToolsLabels = {
    [
      "vue-devtools-plugin-vue-i18n"
      /* PLUGIN */
    ]: "Vue I18n devtools",
    [
      "vue-i18n-resource-inspector"
      /* CUSTOM_INSPECTOR */
    ]: "I18n Resources",
    [
      "vue-i18n-timeline"
      /* TIMELINE */
    ]: "Vue I18n"
  };
  const VueDevToolsPlaceholders = {
    [
      "vue-i18n-resource-inspector"
      /* CUSTOM_INSPECTOR */
    ]: "Search for scopes ..."
  };
  const VueDevToolsTimelineColors = {
    [
      "vue-i18n-timeline"
      /* TIMELINE */
    ]: 16764185
  };
  /*!
    * vue-i18n v9.1.9
    * (c) 2022 kazuya kawaguchi
    * Released under the MIT License.
    */
  const VERSION = "9.1.9";
  function initFeatureFlags() {
    let needWarn = false;
    {
      needWarn = true;
    }
    if (needWarn) {
      console.warn(`You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.`);
    }
  }
  const warnMessages = {
    [
      6
      /* FALLBACK_TO_ROOT */
    ]: `Fall back to {type} '{key}' with root locale.`,
    [
      7
      /* NOT_SUPPORTED_PRESERVE */
    ]: `Not supported 'preserve'.`,
    [
      8
      /* NOT_SUPPORTED_FORMATTER */
    ]: `Not supported 'formatter'.`,
    [
      9
      /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
    ]: `Not supported 'preserveDirectiveContent'.`,
    [
      10
      /* NOT_SUPPORTED_GET_CHOICE_INDEX */
    ]: `Not supported 'getChoiceIndex'.`,
    [
      11
      /* COMPONENT_NAME_LEGACY_COMPATIBLE */
    ]: `Component name legacy compatible: '{name}' -> 'i18n'`,
    [
      12
      /* NOT_FOUND_PARENT_SCOPE */
    ]: `Not found parent scope. use the global scope.`
  };
  function getWarnMessage(code, ...args) {
    return format(warnMessages[code], ...args);
  }
  function createI18nError(code, ...args) {
    return createCompileError(code, null, { messages: errorMessages, args });
  }
  const errorMessages = {
    [
      14
      /* UNEXPECTED_RETURN_TYPE */
    ]: "Unexpected return type in composer",
    [
      15
      /* INVALID_ARGUMENT */
    ]: "Invalid argument",
    [
      16
      /* MUST_BE_CALL_SETUP_TOP */
    ]: "Must be called at the top of a `setup` function",
    [
      17
      /* NOT_INSLALLED */
    ]: "Need to install with `app.use` function",
    [
      22
      /* UNEXPECTED_ERROR */
    ]: "Unexpected error",
    [
      18
      /* NOT_AVAILABLE_IN_LEGACY_MODE */
    ]: "Not available in legacy mode",
    [
      19
      /* REQUIRED_VALUE */
    ]: `Required in value: {0}`,
    [
      20
      /* INVALID_VALUE */
    ]: `Invalid value`,
    [
      21
      /* CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN */
    ]: `Cannot setup vue-devtools plugin`
  };
  const DEVTOOLS_META = "__INTLIFY_META__";
  const TransrateVNodeSymbol = makeSymbol("__transrateVNode");
  const DatetimePartsSymbol = makeSymbol("__datetimeParts");
  const NumberPartsSymbol = makeSymbol("__numberParts");
  const EnableEmitter = makeSymbol("__enableEmitter");
  const DisableEmitter = makeSymbol("__disableEmitter");
  const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
  const InejctWithOption = makeSymbol("__injectWithOption");
  let composerID = 0;
  function defineCoreMissingHandler(missing) {
    return (ctx, locale2, key, type) => {
      return missing(locale2, key, vue.getCurrentInstance() || void 0, type);
    };
  }
  function getLocaleMessages(locale2, options) {
    const { messages, __i18n } = options;
    const ret = isPlainObject(messages) ? messages : isArray(__i18n) ? {} : { [locale2]: {} };
    if (isArray(__i18n)) {
      __i18n.forEach(({ locale: locale22, resource }) => {
        if (locale22) {
          ret[locale22] = ret[locale22] || {};
          deepCopy(resource, ret[locale22]);
        } else {
          deepCopy(resource, ret);
        }
      });
    }
    if (options.flatJson) {
      for (const key in ret) {
        if (hasOwn$1(ret, key)) {
          handleFlatJson(ret[key]);
        }
      }
    }
    return ret;
  }
  const isNotObjectOrIsArray = (val) => !isObject$2(val) || isArray(val);
  function deepCopy(src, des) {
    if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
      throw createI18nError(
        20
        /* INVALID_VALUE */
      );
    }
    for (const key in src) {
      if (hasOwn$1(src, key)) {
        if (isNotObjectOrIsArray(src[key]) || isNotObjectOrIsArray(des[key])) {
          des[key] = src[key];
        } else {
          deepCopy(src[key], des[key]);
        }
      }
    }
  }
  const getMetaInfo = () => {
    const instance = vue.getCurrentInstance();
    return instance && instance.type[DEVTOOLS_META] ? { [DEVTOOLS_META]: instance.type[DEVTOOLS_META] } : null;
  };
  function createComposer(options = {}) {
    const { __root } = options;
    const _isGlobal = __root === void 0;
    let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
    const _locale = vue.ref(
      // prettier-ignore
      __root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : "en-US"
    );
    const _fallbackLocale = vue.ref(
      // prettier-ignore
      __root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
    );
    const _messages = vue.ref(getLocaleMessages(_locale.value, options));
    const _datetimeFormats = vue.ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
    const _numberFormats = vue.ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
    let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
    let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
    let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
    let _fallbackFormat = !!options.fallbackFormat;
    let _missing = isFunction(options.missing) ? options.missing : null;
    let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
    let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
    let _warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
    let _escapeParameter = !!options.escapeParameter;
    const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
    let _pluralRules = options.pluralRules || __root && __root.pluralRules;
    let _context;
    function getCoreContext() {
      return createCoreContext({
        version: VERSION,
        locale: _locale.value,
        fallbackLocale: _fallbackLocale.value,
        messages: _messages.value,
        messageCompiler: function compileToFunction(source) {
          return (ctx) => {
            return ctx.normalize([source]);
          };
        },
        datetimeFormats: _datetimeFormats.value,
        numberFormats: _numberFormats.value,
        modifiers: _modifiers,
        pluralRules: _pluralRules,
        missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
        missingWarn: _missingWarn,
        fallbackWarn: _fallbackWarn,
        fallbackFormat: _fallbackFormat,
        unresolving: true,
        postTranslation: _postTranslation === null ? void 0 : _postTranslation,
        warnHtmlMessage: _warnHtmlMessage,
        escapeParameter: _escapeParameter,
        __datetimeFormatters: isPlainObject(_context) ? _context.__datetimeFormatters : void 0,
        __numberFormatters: isPlainObject(_context) ? _context.__numberFormatters : void 0,
        __v_emitter: isPlainObject(_context) ? _context.__v_emitter : void 0,
        __meta: { framework: "vue" }
      });
    }
    _context = getCoreContext();
    updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
    function trackReactivityValues() {
      return [
        _locale.value,
        _fallbackLocale.value,
        _messages.value,
        _datetimeFormats.value,
        _numberFormats.value
      ];
    }
    const locale2 = vue.computed({
      get: () => _locale.value,
      set: (val) => {
        _locale.value = val;
        _context.locale = _locale.value;
      }
    });
    const fallbackLocale = vue.computed({
      get: () => _fallbackLocale.value,
      set: (val) => {
        _fallbackLocale.value = val;
        _context.fallbackLocale = _fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, val);
      }
    });
    const messages = vue.computed(() => _messages.value);
    const datetimeFormats = vue.computed(() => _datetimeFormats.value);
    const numberFormats = vue.computed(() => _numberFormats.value);
    function getPostTranslationHandler() {
      return isFunction(_postTranslation) ? _postTranslation : null;
    }
    function setPostTranslationHandler(handler) {
      _postTranslation = handler;
      _context.postTranslation = handler;
    }
    function getMissingHandler() {
      return _missing;
    }
    function setMissingHandler(handler) {
      if (handler !== null) {
        _runtimeMissing = defineCoreMissingHandler(handler);
      }
      _missing = handler;
      _context.missing = _runtimeMissing;
    }
    function isResolvedTranslateMessage(type, arg) {
      return type !== "translate" || !!arg.resolvedMessage === false;
    }
    function wrapWithDeps(fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) {
      trackReactivityValues();
      let ret;
      {
        try {
          setAdditionalMeta(getMetaInfo());
          ret = fn(_context);
        } finally {
          setAdditionalMeta(null);
        }
      }
      if (isNumber(ret) && ret === NOT_REOSLVED) {
        const [key, arg2] = argumentParser();
        if (__root && isString(key) && isResolvedTranslateMessage(warnType, arg2)) {
          if (_fallbackRoot && (isTranslateFallbackWarn(_fallbackWarn, key) || isTranslateMissingWarn(_missingWarn, key))) {
            warn(getWarnMessage(6, {
              key,
              type: warnType
            }));
          }
          {
            const { __v_emitter: emitter } = _context;
            if (emitter && _fallbackRoot) {
              emitter.emit("fallback", {
                type: warnType,
                key,
                to: "global",
                groupId: `${warnType}:${key}`
              });
            }
          }
        }
        return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
      } else if (successCondition(ret)) {
        return ret;
      } else {
        throw createI18nError(
          14
          /* UNEXPECTED_RETURN_TYPE */
        );
      }
    }
    function t2(...args) {
      return wrapWithDeps((context) => translate(context, ...args), () => parseTranslateArgs(...args), "translate", (root) => root.t(...args), (key) => key, (val) => isString(val));
    }
    function rt(...args) {
      const [arg1, arg2, arg3] = args;
      if (arg3 && !isObject$2(arg3)) {
        throw createI18nError(
          15
          /* INVALID_ARGUMENT */
        );
      }
      return t2(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})]);
    }
    function d(...args) {
      return wrapWithDeps((context) => datetime(context, ...args), () => parseDateTimeArgs(...args), "datetime format", (root) => root.d(...args), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
    }
    function n(...args) {
      return wrapWithDeps((context) => number(context, ...args), () => parseNumberArgs(...args), "number format", (root) => root.n(...args), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
    }
    function normalize(values) {
      return values.map((val) => isString(val) ? vue.createVNode(vue.Text, null, val, 0) : val);
    }
    const interpolate = (val) => val;
    const processor = {
      normalize,
      interpolate,
      type: "vnode"
    };
    function transrateVNode(...args) {
      return wrapWithDeps(
        (context) => {
          let ret;
          const _context2 = context;
          try {
            _context2.processor = processor;
            ret = translate(_context2, ...args);
          } finally {
            _context2.processor = null;
          }
          return ret;
        },
        () => parseTranslateArgs(...args),
        "translate",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (root) => root[TransrateVNodeSymbol](...args),
        (key) => [vue.createVNode(vue.Text, null, key, 0)],
        (val) => isArray(val)
      );
    }
    function numberParts(...args) {
      return wrapWithDeps(
        (context) => number(context, ...args),
        () => parseNumberArgs(...args),
        "number format",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (root) => root[NumberPartsSymbol](...args),
        () => [],
        (val) => isString(val) || isArray(val)
      );
    }
    function datetimeParts(...args) {
      return wrapWithDeps(
        (context) => datetime(context, ...args),
        () => parseDateTimeArgs(...args),
        "datetime format",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (root) => root[DatetimePartsSymbol](...args),
        () => [],
        (val) => isString(val) || isArray(val)
      );
    }
    function setPluralRules(rules) {
      _pluralRules = rules;
      _context.pluralRules = _pluralRules;
    }
    function te(key, locale22) {
      const targetLocale = isString(locale22) ? locale22 : _locale.value;
      const message2 = getLocaleMessage(targetLocale);
      return resolveValue(message2, key) !== null;
    }
    function resolveMessages(key) {
      let messages2 = null;
      const locales = getLocaleChain(_context, _fallbackLocale.value, _locale.value);
      for (let i = 0; i < locales.length; i++) {
        const targetLocaleMessages = _messages.value[locales[i]] || {};
        const messageValue = resolveValue(targetLocaleMessages, key);
        if (messageValue != null) {
          messages2 = messageValue;
          break;
        }
      }
      return messages2;
    }
    function tm(key) {
      const messages2 = resolveMessages(key);
      return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
    }
    function getLocaleMessage(locale22) {
      return _messages.value[locale22] || {};
    }
    function setLocaleMessage(locale22, message2) {
      _messages.value[locale22] = message2;
      _context.messages = _messages.value;
    }
    function mergeLocaleMessage(locale22, message2) {
      _messages.value[locale22] = _messages.value[locale22] || {};
      deepCopy(message2, _messages.value[locale22]);
      _context.messages = _messages.value;
    }
    function getDateTimeFormat(locale22) {
      return _datetimeFormats.value[locale22] || {};
    }
    function setDateTimeFormat(locale22, format2) {
      _datetimeFormats.value[locale22] = format2;
      _context.datetimeFormats = _datetimeFormats.value;
      clearDateTimeFormat(_context, locale22, format2);
    }
    function mergeDateTimeFormat(locale22, format2) {
      _datetimeFormats.value[locale22] = assign(_datetimeFormats.value[locale22] || {}, format2);
      _context.datetimeFormats = _datetimeFormats.value;
      clearDateTimeFormat(_context, locale22, format2);
    }
    function getNumberFormat(locale22) {
      return _numberFormats.value[locale22] || {};
    }
    function setNumberFormat(locale22, format2) {
      _numberFormats.value[locale22] = format2;
      _context.numberFormats = _numberFormats.value;
      clearNumberFormat(_context, locale22, format2);
    }
    function mergeNumberFormat(locale22, format2) {
      _numberFormats.value[locale22] = assign(_numberFormats.value[locale22] || {}, format2);
      _context.numberFormats = _numberFormats.value;
      clearNumberFormat(_context, locale22, format2);
    }
    composerID++;
    if (__root) {
      vue.watch(__root.locale, (val) => {
        if (_inheritLocale) {
          _locale.value = val;
          _context.locale = val;
          updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        }
      });
      vue.watch(__root.fallbackLocale, (val) => {
        if (_inheritLocale) {
          _fallbackLocale.value = val;
          _context.fallbackLocale = val;
          updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        }
      });
    }
    const composer = {
      id: composerID,
      locale: locale2,
      fallbackLocale,
      get inheritLocale() {
        return _inheritLocale;
      },
      set inheritLocale(val) {
        _inheritLocale = val;
        if (val && __root) {
          _locale.value = __root.locale.value;
          _fallbackLocale.value = __root.fallbackLocale.value;
          updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        }
      },
      get availableLocales() {
        return Object.keys(_messages.value).sort();
      },
      messages,
      datetimeFormats,
      numberFormats,
      get modifiers() {
        return _modifiers;
      },
      get pluralRules() {
        return _pluralRules || {};
      },
      get isGlobal() {
        return _isGlobal;
      },
      get missingWarn() {
        return _missingWarn;
      },
      set missingWarn(val) {
        _missingWarn = val;
        _context.missingWarn = _missingWarn;
      },
      get fallbackWarn() {
        return _fallbackWarn;
      },
      set fallbackWarn(val) {
        _fallbackWarn = val;
        _context.fallbackWarn = _fallbackWarn;
      },
      get fallbackRoot() {
        return _fallbackRoot;
      },
      set fallbackRoot(val) {
        _fallbackRoot = val;
      },
      get fallbackFormat() {
        return _fallbackFormat;
      },
      set fallbackFormat(val) {
        _fallbackFormat = val;
        _context.fallbackFormat = _fallbackFormat;
      },
      get warnHtmlMessage() {
        return _warnHtmlMessage;
      },
      set warnHtmlMessage(val) {
        _warnHtmlMessage = val;
        _context.warnHtmlMessage = val;
      },
      get escapeParameter() {
        return _escapeParameter;
      },
      set escapeParameter(val) {
        _escapeParameter = val;
        _context.escapeParameter = val;
      },
      t: t2,
      rt,
      d,
      n,
      te,
      tm,
      getLocaleMessage,
      setLocaleMessage,
      mergeLocaleMessage,
      getDateTimeFormat,
      setDateTimeFormat,
      mergeDateTimeFormat,
      getNumberFormat,
      setNumberFormat,
      mergeNumberFormat,
      getPostTranslationHandler,
      setPostTranslationHandler,
      getMissingHandler,
      setMissingHandler,
      [TransrateVNodeSymbol]: transrateVNode,
      [NumberPartsSymbol]: numberParts,
      [DatetimePartsSymbol]: datetimeParts,
      [SetPluralRulesSymbol]: setPluralRules,
      [InejctWithOption]: options.__injectWithOption
      // eslint-disable-line @typescript-eslint/no-explicit-any
    };
    {
      composer[EnableEmitter] = (emitter) => {
        _context.__v_emitter = emitter;
      };
      composer[DisableEmitter] = () => {
        _context.__v_emitter = void 0;
      };
    }
    return composer;
  }
  function convertComposerOptions(options) {
    const locale2 = isString(options.locale) ? options.locale : "en-US";
    const fallbackLocale = isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale2;
    const missing = isFunction(options.missing) ? options.missing : void 0;
    const missingWarn = isBoolean(options.silentTranslationWarn) || isRegExp(options.silentTranslationWarn) ? !options.silentTranslationWarn : true;
    const fallbackWarn = isBoolean(options.silentFallbackWarn) || isRegExp(options.silentFallbackWarn) ? !options.silentFallbackWarn : true;
    const fallbackRoot = isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
    const fallbackFormat = !!options.formatFallbackMessages;
    const modifiers = isPlainObject(options.modifiers) ? options.modifiers : {};
    const pluralizationRules = options.pluralizationRules;
    const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : void 0;
    const warnHtmlMessage = isString(options.warnHtmlInMessage) ? options.warnHtmlInMessage !== "off" : true;
    const escapeParameter = !!options.escapeParameterHtml;
    const inheritLocale = isBoolean(options.sync) ? options.sync : true;
    if (options.formatter) {
      warn(getWarnMessage(
        8
        /* NOT_SUPPORTED_FORMATTER */
      ));
    }
    if (options.preserveDirectiveContent) {
      warn(getWarnMessage(
        9
        /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
      ));
    }
    let messages = options.messages;
    if (isPlainObject(options.sharedMessages)) {
      const sharedMessages = options.sharedMessages;
      const locales = Object.keys(sharedMessages);
      messages = locales.reduce((messages2, locale22) => {
        const message2 = messages2[locale22] || (messages2[locale22] = {});
        assign(message2, sharedMessages[locale22]);
        return messages2;
      }, messages || {});
    }
    const { __i18n, __root, __injectWithOption } = options;
    const datetimeFormats = options.datetimeFormats;
    const numberFormats = options.numberFormats;
    const flatJson = options.flatJson;
    return {
      locale: locale2,
      fallbackLocale,
      messages,
      flatJson,
      datetimeFormats,
      numberFormats,
      missing,
      missingWarn,
      fallbackWarn,
      fallbackRoot,
      fallbackFormat,
      modifiers,
      pluralRules: pluralizationRules,
      postTranslation,
      warnHtmlMessage,
      escapeParameter,
      inheritLocale,
      __i18n,
      __root,
      __injectWithOption
    };
  }
  function createVueI18n(options = {}) {
    const composer = createComposer(convertComposerOptions(options));
    const vueI18n = {
      // id
      id: composer.id,
      // locale
      get locale() {
        return composer.locale.value;
      },
      set locale(val) {
        composer.locale.value = val;
      },
      // fallbackLocale
      get fallbackLocale() {
        return composer.fallbackLocale.value;
      },
      set fallbackLocale(val) {
        composer.fallbackLocale.value = val;
      },
      // messages
      get messages() {
        return composer.messages.value;
      },
      // datetimeFormats
      get datetimeFormats() {
        return composer.datetimeFormats.value;
      },
      // numberFormats
      get numberFormats() {
        return composer.numberFormats.value;
      },
      // availableLocales
      get availableLocales() {
        return composer.availableLocales;
      },
      // formatter
      get formatter() {
        warn(getWarnMessage(
          8
          /* NOT_SUPPORTED_FORMATTER */
        ));
        return {
          interpolate() {
            return [];
          }
        };
      },
      set formatter(val) {
        warn(getWarnMessage(
          8
          /* NOT_SUPPORTED_FORMATTER */
        ));
      },
      // missing
      get missing() {
        return composer.getMissingHandler();
      },
      set missing(handler) {
        composer.setMissingHandler(handler);
      },
      // silentTranslationWarn
      get silentTranslationWarn() {
        return isBoolean(composer.missingWarn) ? !composer.missingWarn : composer.missingWarn;
      },
      set silentTranslationWarn(val) {
        composer.missingWarn = isBoolean(val) ? !val : val;
      },
      // silentFallbackWarn
      get silentFallbackWarn() {
        return isBoolean(composer.fallbackWarn) ? !composer.fallbackWarn : composer.fallbackWarn;
      },
      set silentFallbackWarn(val) {
        composer.fallbackWarn = isBoolean(val) ? !val : val;
      },
      // modifiers
      get modifiers() {
        return composer.modifiers;
      },
      // formatFallbackMessages
      get formatFallbackMessages() {
        return composer.fallbackFormat;
      },
      set formatFallbackMessages(val) {
        composer.fallbackFormat = val;
      },
      // postTranslation
      get postTranslation() {
        return composer.getPostTranslationHandler();
      },
      set postTranslation(handler) {
        composer.setPostTranslationHandler(handler);
      },
      // sync
      get sync() {
        return composer.inheritLocale;
      },
      set sync(val) {
        composer.inheritLocale = val;
      },
      // warnInHtmlMessage
      get warnHtmlInMessage() {
        return composer.warnHtmlMessage ? "warn" : "off";
      },
      set warnHtmlInMessage(val) {
        composer.warnHtmlMessage = val !== "off";
      },
      // escapeParameterHtml
      get escapeParameterHtml() {
        return composer.escapeParameter;
      },
      set escapeParameterHtml(val) {
        composer.escapeParameter = val;
      },
      // preserveDirectiveContent
      get preserveDirectiveContent() {
        warn(getWarnMessage(
          9
          /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
        ));
        return true;
      },
      set preserveDirectiveContent(val) {
        warn(getWarnMessage(
          9
          /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
        ));
      },
      // pluralizationRules
      get pluralizationRules() {
        return composer.pluralRules || {};
      },
      // for internal
      __composer: composer,
      // t
      t(...args) {
        const [arg1, arg2, arg3] = args;
        const options2 = {};
        let list = null;
        let named = null;
        if (!isString(arg1)) {
          throw createI18nError(
            15
            /* INVALID_ARGUMENT */
          );
        }
        const key = arg1;
        if (isString(arg2)) {
          options2.locale = arg2;
        } else if (isArray(arg2)) {
          list = arg2;
        } else if (isPlainObject(arg2)) {
          named = arg2;
        }
        if (isArray(arg3)) {
          list = arg3;
        } else if (isPlainObject(arg3)) {
          named = arg3;
        }
        return composer.t(key, list || named || {}, options2);
      },
      rt(...args) {
        return composer.rt(...args);
      },
      // tc
      tc(...args) {
        const [arg1, arg2, arg3] = args;
        const options2 = { plural: 1 };
        let list = null;
        let named = null;
        if (!isString(arg1)) {
          throw createI18nError(
            15
            /* INVALID_ARGUMENT */
          );
        }
        const key = arg1;
        if (isString(arg2)) {
          options2.locale = arg2;
        } else if (isNumber(arg2)) {
          options2.plural = arg2;
        } else if (isArray(arg2)) {
          list = arg2;
        } else if (isPlainObject(arg2)) {
          named = arg2;
        }
        if (isString(arg3)) {
          options2.locale = arg3;
        } else if (isArray(arg3)) {
          list = arg3;
        } else if (isPlainObject(arg3)) {
          named = arg3;
        }
        return composer.t(key, list || named || {}, options2);
      },
      // te
      te(key, locale2) {
        return composer.te(key, locale2);
      },
      // tm
      tm(key) {
        return composer.tm(key);
      },
      // getLocaleMessage
      getLocaleMessage(locale2) {
        return composer.getLocaleMessage(locale2);
      },
      // setLocaleMessage
      setLocaleMessage(locale2, message2) {
        composer.setLocaleMessage(locale2, message2);
      },
      // mergeLocaleMessage
      mergeLocaleMessage(locale2, message2) {
        composer.mergeLocaleMessage(locale2, message2);
      },
      // d
      d(...args) {
        return composer.d(...args);
      },
      // getDateTimeFormat
      getDateTimeFormat(locale2) {
        return composer.getDateTimeFormat(locale2);
      },
      // setDateTimeFormat
      setDateTimeFormat(locale2, format2) {
        composer.setDateTimeFormat(locale2, format2);
      },
      // mergeDateTimeFormat
      mergeDateTimeFormat(locale2, format2) {
        composer.mergeDateTimeFormat(locale2, format2);
      },
      // n
      n(...args) {
        return composer.n(...args);
      },
      // getNumberFormat
      getNumberFormat(locale2) {
        return composer.getNumberFormat(locale2);
      },
      // setNumberFormat
      setNumberFormat(locale2, format2) {
        composer.setNumberFormat(locale2, format2);
      },
      // mergeNumberFormat
      mergeNumberFormat(locale2, format2) {
        composer.mergeNumberFormat(locale2, format2);
      },
      // getChoiceIndex
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getChoiceIndex(choice, choicesLength) {
        warn(getWarnMessage(
          10
          /* NOT_SUPPORTED_GET_CHOICE_INDEX */
        ));
        return -1;
      },
      // for internal
      __onComponentInstanceCreated(target) {
        const { componentInstanceCreatedListener } = options;
        if (componentInstanceCreatedListener) {
          componentInstanceCreatedListener(target, vueI18n);
        }
      }
    };
    {
      vueI18n.__enableEmitter = (emitter) => {
        const __composer = composer;
        __composer[EnableEmitter] && __composer[EnableEmitter](emitter);
      };
      vueI18n.__disableEmitter = () => {
        const __composer = composer;
        __composer[DisableEmitter] && __composer[DisableEmitter]();
      };
    }
    return vueI18n;
  }
  const baseFormatProps = {
    tag: {
      type: [String, Object]
    },
    locale: {
      type: String
    },
    scope: {
      type: String,
      validator: (val) => val === "parent" || val === "global",
      default: "parent"
    },
    i18n: {
      type: Object
    }
  };
  const Translation = {
    /* eslint-disable */
    name: "i18n-t",
    props: assign({
      keypath: {
        type: String,
        required: true
      },
      plural: {
        type: [Number, String],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validator: (val) => isNumber(val) || !isNaN(val)
      }
    }, baseFormatProps),
    /* eslint-enable */
    setup(props, context) {
      const { slots, attrs } = context;
      const i18n2 = props.i18n || useI18n({
        useScope: props.scope,
        __useComponent: true
      });
      const keys = Object.keys(slots).filter((key) => key !== "_");
      return () => {
        const options = {};
        if (props.locale) {
          options.locale = props.locale;
        }
        if (props.plural !== void 0) {
          options.plural = isString(props.plural) ? +props.plural : props.plural;
        }
        const arg = getInterpolateArg(context, keys);
        const children = i18n2[TransrateVNodeSymbol](props.keypath, arg, options);
        const assignedAttrs = assign({}, attrs);
        return isString(props.tag) ? vue.h(props.tag, assignedAttrs, children) : isObject$2(props.tag) ? vue.h(props.tag, assignedAttrs, children) : vue.h(vue.Fragment, assignedAttrs, children);
      };
    }
  };
  function getInterpolateArg({ slots }, keys) {
    if (keys.length === 1 && keys[0] === "default") {
      return slots.default ? slots.default() : [];
    } else {
      return keys.reduce((arg, key) => {
        const slot = slots[key];
        if (slot) {
          arg[key] = slot();
        }
        return arg;
      }, {});
    }
  }
  function renderFormatter(props, context, slotKeys, partFormatter) {
    const { slots, attrs } = context;
    return () => {
      const options = { part: true };
      let overrides = {};
      if (props.locale) {
        options.locale = props.locale;
      }
      if (isString(props.format)) {
        options.key = props.format;
      } else if (isObject$2(props.format)) {
        if (isString(props.format.key)) {
          options.key = props.format.key;
        }
        overrides = Object.keys(props.format).reduce((options2, prop) => {
          return slotKeys.includes(prop) ? assign({}, options2, { [prop]: props.format[prop] }) : options2;
        }, {});
      }
      const parts = partFormatter(...[props.value, options, overrides]);
      let children = [options.key];
      if (isArray(parts)) {
        children = parts.map((part, index) => {
          const slot = slots[part.type];
          return slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
        });
      } else if (isString(parts)) {
        children = [parts];
      }
      const assignedAttrs = assign({}, attrs);
      return isString(props.tag) ? vue.h(props.tag, assignedAttrs, children) : isObject$2(props.tag) ? vue.h(props.tag, assignedAttrs, children) : vue.h(vue.Fragment, assignedAttrs, children);
    };
  }
  const NUMBER_FORMAT_KEYS = [
    "localeMatcher",
    "style",
    "unit",
    "unitDisplay",
    "currency",
    "currencyDisplay",
    "useGrouping",
    "numberingSystem",
    "minimumIntegerDigits",
    "minimumFractionDigits",
    "maximumFractionDigits",
    "minimumSignificantDigits",
    "maximumSignificantDigits",
    "notation",
    "formatMatcher"
  ];
  const NumberFormat = {
    /* eslint-disable */
    name: "i18n-n",
    props: assign({
      value: {
        type: Number,
        required: true
      },
      format: {
        type: [String, Object]
      }
    }, baseFormatProps),
    /* eslint-enable */
    setup(props, context) {
      const i18n2 = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
      return renderFormatter(props, context, NUMBER_FORMAT_KEYS, (...args) => (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        i18n2[NumberPartsSymbol](...args)
      ));
    }
  };
  const DATETIME_FORMAT_KEYS = [
    "dateStyle",
    "timeStyle",
    "fractionalSecondDigits",
    "calendar",
    "dayPeriod",
    "numberingSystem",
    "localeMatcher",
    "timeZone",
    "hour12",
    "hourCycle",
    "formatMatcher",
    "weekday",
    "era",
    "year",
    "month",
    "day",
    "hour",
    "minute",
    "second",
    "timeZoneName"
  ];
  const DatetimeFormat = {
    /* eslint-disable */
    name: "i18n-d",
    props: assign({
      value: {
        type: [Number, Date],
        required: true
      },
      format: {
        type: [String, Object]
      }
    }, baseFormatProps),
    /* eslint-enable */
    setup(props, context) {
      const i18n2 = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
      return renderFormatter(props, context, DATETIME_FORMAT_KEYS, (...args) => (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        i18n2[DatetimePartsSymbol](...args)
      ));
    }
  };
  function getComposer$2(i18n2, instance) {
    const i18nInternal = i18n2;
    if (i18n2.mode === "composition") {
      return i18nInternal.__getInstance(instance) || i18n2.global;
    } else {
      const vueI18n = i18nInternal.__getInstance(instance);
      return vueI18n != null ? vueI18n.__composer : i18n2.global.__composer;
    }
  }
  function vTDirective(i18n2) {
    const bind = (el, { instance, value, modifiers }) => {
      if (!instance || !instance.$) {
        throw createI18nError(
          22
          /* UNEXPECTED_ERROR */
        );
      }
      const composer = getComposer$2(i18n2, instance.$);
      if (modifiers.preserve) {
        warn(getWarnMessage(
          7
          /* NOT_SUPPORTED_PRESERVE */
        ));
      }
      const parsedValue = parseValue(value);
      el.textContent = composer.t(...makeParams(parsedValue));
    };
    return {
      beforeMount: bind,
      beforeUpdate: bind
    };
  }
  function parseValue(value) {
    if (isString(value)) {
      return { path: value };
    } else if (isPlainObject(value)) {
      if (!("path" in value)) {
        throw createI18nError(19, "path");
      }
      return value;
    } else {
      throw createI18nError(
        20
        /* INVALID_VALUE */
      );
    }
  }
  function makeParams(value) {
    const { path, locale: locale2, args, choice, plural } = value;
    const options = {};
    const named = args || {};
    if (isString(locale2)) {
      options.locale = locale2;
    }
    if (isNumber(choice)) {
      options.plural = choice;
    }
    if (isNumber(plural)) {
      options.plural = plural;
    }
    return [path, named, options];
  }
  function apply(app, i18n2, ...options) {
    const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
    const useI18nComponentName = !!pluginOptions.useI18nComponentName;
    const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
    if (globalInstall && useI18nComponentName) {
      warn(getWarnMessage(11, {
        name: Translation.name
      }));
    }
    if (globalInstall) {
      app.component(!useI18nComponentName ? Translation.name : "i18n", Translation);
      app.component(NumberFormat.name, NumberFormat);
      app.component(DatetimeFormat.name, DatetimeFormat);
    }
    app.directive("t", vTDirective(i18n2));
  }
  const VUE_I18N_COMPONENT_TYPES = "vue-i18n: composer properties";
  let devtoolsApi;
  async function enableDevTools(app, i18n2) {
    return new Promise((resolve, reject) => {
      try {
        setupDevtoolsPlugin({
          id: "vue-devtools-plugin-vue-i18n",
          label: VueDevToolsLabels[
            "vue-devtools-plugin-vue-i18n"
            /* PLUGIN */
          ],
          packageName: "vue-i18n",
          homepage: "https://vue-i18n.intlify.dev",
          logo: "https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png",
          componentStateTypes: [VUE_I18N_COMPONENT_TYPES],
          app
        }, (api) => {
          devtoolsApi = api;
          api.on.visitComponentTree(({ componentInstance, treeNode }) => {
            updateComponentTreeTags(componentInstance, treeNode, i18n2);
          });
          api.on.inspectComponent(({ componentInstance, instanceData }) => {
            if (componentInstance.vnode.el.__VUE_I18N__ && instanceData) {
              if (i18n2.mode === "legacy") {
                if (componentInstance.vnode.el.__VUE_I18N__ !== i18n2.global.__composer) {
                  inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
                }
              } else {
                inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
              }
            }
          });
          api.addInspector({
            id: "vue-i18n-resource-inspector",
            label: VueDevToolsLabels[
              "vue-i18n-resource-inspector"
              /* CUSTOM_INSPECTOR */
            ],
            icon: "language",
            treeFilterPlaceholder: VueDevToolsPlaceholders[
              "vue-i18n-resource-inspector"
              /* CUSTOM_INSPECTOR */
            ]
          });
          api.on.getInspectorTree((payload) => {
            if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
              registerScope(payload, i18n2);
            }
          });
          api.on.getInspectorState((payload) => {
            if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
              inspectScope(payload, i18n2);
            }
          });
          api.on.editInspectorState((payload) => {
            if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
              editScope(payload, i18n2);
            }
          });
          api.addTimelineLayer({
            id: "vue-i18n-timeline",
            label: VueDevToolsLabels[
              "vue-i18n-timeline"
              /* TIMELINE */
            ],
            color: VueDevToolsTimelineColors[
              "vue-i18n-timeline"
              /* TIMELINE */
            ]
          });
          resolve(true);
        });
      } catch (e) {
        console.error(e);
        reject(false);
      }
    });
  }
  function updateComponentTreeTags(instance, treeNode, i18n2) {
    const global2 = i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
    if (instance && instance.vnode.el.__VUE_I18N__) {
      if (instance.vnode.el.__VUE_I18N__ !== global2) {
        const label = instance.type.name || instance.type.displayName || instance.type.__file;
        const tag = {
          label: `i18n (${label} Scope)`,
          textColor: 0,
          backgroundColor: 16764185
        };
        treeNode.tags.push(tag);
      }
    }
  }
  function inspectComposer(instanceData, composer) {
    const type = VUE_I18N_COMPONENT_TYPES;
    instanceData.state.push({
      type,
      key: "locale",
      editable: true,
      value: composer.locale.value
    });
    instanceData.state.push({
      type,
      key: "availableLocales",
      editable: false,
      value: composer.availableLocales
    });
    instanceData.state.push({
      type,
      key: "fallbackLocale",
      editable: true,
      value: composer.fallbackLocale.value
    });
    instanceData.state.push({
      type,
      key: "inheritLocale",
      editable: true,
      value: composer.inheritLocale
    });
    instanceData.state.push({
      type,
      key: "messages",
      editable: false,
      value: getLocaleMessageValue(composer.messages.value)
    });
    instanceData.state.push({
      type,
      key: "datetimeFormats",
      editable: false,
      value: composer.datetimeFormats.value
    });
    instanceData.state.push({
      type,
      key: "numberFormats",
      editable: false,
      value: composer.numberFormats.value
    });
  }
  function getLocaleMessageValue(messages) {
    const value = {};
    Object.keys(messages).forEach((key) => {
      const v = messages[key];
      if (isFunction(v) && "source" in v) {
        value[key] = getMessageFunctionDetails(v);
      } else if (isObject$2(v)) {
        value[key] = getLocaleMessageValue(v);
      } else {
        value[key] = v;
      }
    });
    return value;
  }
  const ESC = {
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "&": "&amp;"
  };
  function escape(s) {
    return s.replace(/[<>"&]/g, escapeChar);
  }
  function escapeChar(a) {
    return ESC[a] || a;
  }
  function getMessageFunctionDetails(func) {
    const argString = func.source ? `("${escape(func.source)}")` : `(?)`;
    return {
      _custom: {
        type: "function",
        display: `<span>ƒ</span> ${argString}`
      }
    };
  }
  function registerScope(payload, i18n2) {
    payload.rootNodes.push({
      id: "global",
      label: "Global Scope"
    });
    const global2 = i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
    for (const [keyInstance, instance] of i18n2.__instances) {
      const composer = i18n2.mode === "composition" ? instance : instance.__composer;
      if (global2 === composer) {
        continue;
      }
      const label = keyInstance.type.name || keyInstance.type.displayName || keyInstance.type.__file;
      payload.rootNodes.push({
        id: composer.id.toString(),
        label: `${label} Scope`
      });
    }
  }
  function getComposer$1(nodeId, i18n2) {
    if (nodeId === "global") {
      return i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
    } else {
      const instance = Array.from(i18n2.__instances.values()).find((item) => item.id.toString() === nodeId);
      if (instance) {
        return i18n2.mode === "composition" ? instance : instance.__composer;
      } else {
        return null;
      }
    }
  }
  function inspectScope(payload, i18n2) {
    const composer = getComposer$1(payload.nodeId, i18n2);
    if (composer) {
      payload.state = makeScopeInspectState(composer);
    }
  }
  function makeScopeInspectState(composer) {
    const state = {};
    const localeType = "Locale related info";
    const localeStates = [
      {
        type: localeType,
        key: "locale",
        editable: true,
        value: composer.locale.value
      },
      {
        type: localeType,
        key: "fallbackLocale",
        editable: true,
        value: composer.fallbackLocale.value
      },
      {
        type: localeType,
        key: "availableLocales",
        editable: false,
        value: composer.availableLocales
      },
      {
        type: localeType,
        key: "inheritLocale",
        editable: true,
        value: composer.inheritLocale
      }
    ];
    state[localeType] = localeStates;
    const localeMessagesType = "Locale messages info";
    const localeMessagesStates = [
      {
        type: localeMessagesType,
        key: "messages",
        editable: false,
        value: getLocaleMessageValue(composer.messages.value)
      }
    ];
    state[localeMessagesType] = localeMessagesStates;
    const datetimeFormatsType = "Datetime formats info";
    const datetimeFormatsStates = [
      {
        type: datetimeFormatsType,
        key: "datetimeFormats",
        editable: false,
        value: composer.datetimeFormats.value
      }
    ];
    state[datetimeFormatsType] = datetimeFormatsStates;
    const numberFormatsType = "Datetime formats info";
    const numberFormatsStates = [
      {
        type: numberFormatsType,
        key: "numberFormats",
        editable: false,
        value: composer.numberFormats.value
      }
    ];
    state[numberFormatsType] = numberFormatsStates;
    return state;
  }
  function addTimelineEvent(event, payload) {
    if (devtoolsApi) {
      let groupId;
      if (payload && "groupId" in payload) {
        groupId = payload.groupId;
        delete payload.groupId;
      }
      devtoolsApi.addTimelineEvent({
        layerId: "vue-i18n-timeline",
        event: {
          title: event,
          groupId,
          time: Date.now(),
          meta: {},
          data: payload || {},
          logType: event === "compile-error" ? "error" : event === "fallback" || event === "missing" ? "warning" : "default"
        }
      });
    }
  }
  function editScope(payload, i18n2) {
    const composer = getComposer$1(payload.nodeId, i18n2);
    if (composer) {
      const [field] = payload.path;
      if (field === "locale" && isString(payload.state.value)) {
        composer.locale.value = payload.state.value;
      } else if (field === "fallbackLocale" && (isString(payload.state.value) || isArray(payload.state.value) || isObject$2(payload.state.value))) {
        composer.fallbackLocale.value = payload.state.value;
      } else if (field === "inheritLocale" && isBoolean(payload.state.value)) {
        composer.inheritLocale = payload.state.value;
      }
    }
  }
  function defineMixin(vuei18n, composer, i18n2) {
    return {
      beforeCreate() {
        const instance = vue.getCurrentInstance();
        if (!instance) {
          throw createI18nError(
            22
            /* UNEXPECTED_ERROR */
          );
        }
        const options = this.$options;
        if (options.i18n) {
          const optionsI18n = options.i18n;
          if (options.__i18n) {
            optionsI18n.__i18n = options.__i18n;
          }
          optionsI18n.__root = composer;
          if (this === this.$root) {
            this.$i18n = mergeToRoot(vuei18n, optionsI18n);
          } else {
            optionsI18n.__injectWithOption = true;
            this.$i18n = createVueI18n(optionsI18n);
          }
        } else if (options.__i18n) {
          if (this === this.$root) {
            this.$i18n = mergeToRoot(vuei18n, options);
          } else {
            this.$i18n = createVueI18n({
              __i18n: options.__i18n,
              __injectWithOption: true,
              __root: composer
            });
          }
        } else {
          this.$i18n = vuei18n;
        }
        vuei18n.__onComponentInstanceCreated(this.$i18n);
        i18n2.__setInstance(instance, this.$i18n);
        this.$t = (...args) => this.$i18n.t(...args);
        this.$rt = (...args) => this.$i18n.rt(...args);
        this.$tc = (...args) => this.$i18n.tc(...args);
        this.$te = (key, locale2) => this.$i18n.te(key, locale2);
        this.$d = (...args) => this.$i18n.d(...args);
        this.$n = (...args) => this.$i18n.n(...args);
        this.$tm = (key) => this.$i18n.tm(key);
      },
      mounted() {
        {
          this.$el.__VUE_I18N__ = this.$i18n.__composer;
          const emitter = this.__v_emitter = createEmitter();
          const _vueI18n = this.$i18n;
          _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter);
          emitter.on("*", addTimelineEvent);
        }
      },
      beforeUnmount() {
        const instance = vue.getCurrentInstance();
        if (!instance) {
          throw createI18nError(
            22
            /* UNEXPECTED_ERROR */
          );
        }
        {
          if (this.__v_emitter) {
            this.__v_emitter.off("*", addTimelineEvent);
            delete this.__v_emitter;
          }
          const _vueI18n = this.$i18n;
          _vueI18n.__disableEmitter && _vueI18n.__disableEmitter();
          delete this.$el.__VUE_I18N__;
        }
        delete this.$t;
        delete this.$rt;
        delete this.$tc;
        delete this.$te;
        delete this.$d;
        delete this.$n;
        delete this.$tm;
        i18n2.__deleteInstance(instance);
        delete this.$i18n;
      }
    };
  }
  function mergeToRoot(root, options) {
    root.locale = options.locale || root.locale;
    root.fallbackLocale = options.fallbackLocale || root.fallbackLocale;
    root.missing = options.missing || root.missing;
    root.silentTranslationWarn = options.silentTranslationWarn || root.silentFallbackWarn;
    root.silentFallbackWarn = options.silentFallbackWarn || root.silentFallbackWarn;
    root.formatFallbackMessages = options.formatFallbackMessages || root.formatFallbackMessages;
    root.postTranslation = options.postTranslation || root.postTranslation;
    root.warnHtmlInMessage = options.warnHtmlInMessage || root.warnHtmlInMessage;
    root.escapeParameterHtml = options.escapeParameterHtml || root.escapeParameterHtml;
    root.sync = options.sync || root.sync;
    root.__composer[SetPluralRulesSymbol](options.pluralizationRules || root.pluralizationRules);
    const messages = getLocaleMessages(root.locale, {
      messages: options.messages,
      __i18n: options.__i18n
    });
    Object.keys(messages).forEach((locale2) => root.mergeLocaleMessage(locale2, messages[locale2]));
    if (options.datetimeFormats) {
      Object.keys(options.datetimeFormats).forEach((locale2) => root.mergeDateTimeFormat(locale2, options.datetimeFormats[locale2]));
    }
    if (options.numberFormats) {
      Object.keys(options.numberFormats).forEach((locale2) => root.mergeNumberFormat(locale2, options.numberFormats[locale2]));
    }
    return root;
  }
  function createI18n(options = {}) {
    const __legacyMode = isBoolean(options.legacy) ? options.legacy : true;
    const __globalInjection = !!options.globalInjection;
    const __instances = /* @__PURE__ */ new Map();
    const __global = __legacyMode ? createVueI18n(options) : createComposer(options);
    const symbol = makeSymbol("vue-i18n");
    const i18n2 = {
      // mode
      get mode() {
        return __legacyMode ? "legacy" : "composition";
      },
      // install plugin
      async install(app, ...options2) {
        {
          app.__VUE_I18N__ = i18n2;
        }
        app.__VUE_I18N_SYMBOL__ = symbol;
        app.provide(app.__VUE_I18N_SYMBOL__, i18n2);
        if (!__legacyMode && __globalInjection) {
          injectGlobalFields(app, i18n2.global);
        }
        {
          apply(app, i18n2, ...options2);
        }
        if (__legacyMode) {
          app.mixin(defineMixin(__global, __global.__composer, i18n2));
        }
        {
          const ret = await enableDevTools(app, i18n2);
          if (!ret) {
            throw createI18nError(
              21
              /* CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN */
            );
          }
          const emitter = createEmitter();
          if (__legacyMode) {
            const _vueI18n = __global;
            _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter);
          } else {
            const _composer = __global;
            _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
          }
          emitter.on("*", addTimelineEvent);
        }
      },
      // global accessor
      get global() {
        return __global;
      },
      // @internal
      __instances,
      // @internal
      __getInstance(component) {
        return __instances.get(component) || null;
      },
      // @internal
      __setInstance(component, instance) {
        __instances.set(component, instance);
      },
      // @internal
      __deleteInstance(component) {
        __instances.delete(component);
      }
    };
    return i18n2;
  }
  function useI18n(options = {}) {
    const instance = vue.getCurrentInstance();
    if (instance == null) {
      throw createI18nError(
        16
        /* MUST_BE_CALL_SETUP_TOP */
      );
    }
    if (!instance.appContext.app.__VUE_I18N_SYMBOL__) {
      throw createI18nError(
        17
        /* NOT_INSLALLED */
      );
    }
    const i18n2 = vue.inject(instance.appContext.app.__VUE_I18N_SYMBOL__);
    if (!i18n2) {
      throw createI18nError(
        22
        /* UNEXPECTED_ERROR */
      );
    }
    const global2 = i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
    const scope = isEmptyObject(options) ? "__i18n" in instance.type ? "local" : "global" : !options.useScope ? "local" : options.useScope;
    if (scope === "global") {
      let messages = isObject$2(options.messages) ? options.messages : {};
      if ("__i18nGlobal" in instance.type) {
        messages = getLocaleMessages(global2.locale.value, {
          messages,
          __i18n: instance.type.__i18nGlobal
        });
      }
      const locales = Object.keys(messages);
      if (locales.length) {
        locales.forEach((locale2) => {
          global2.mergeLocaleMessage(locale2, messages[locale2]);
        });
      }
      if (isObject$2(options.datetimeFormats)) {
        const locales2 = Object.keys(options.datetimeFormats);
        if (locales2.length) {
          locales2.forEach((locale2) => {
            global2.mergeDateTimeFormat(locale2, options.datetimeFormats[locale2]);
          });
        }
      }
      if (isObject$2(options.numberFormats)) {
        const locales2 = Object.keys(options.numberFormats);
        if (locales2.length) {
          locales2.forEach((locale2) => {
            global2.mergeNumberFormat(locale2, options.numberFormats[locale2]);
          });
        }
      }
      return global2;
    }
    if (scope === "parent") {
      let composer2 = getComposer(i18n2, instance, options.__useComponent);
      if (composer2 == null) {
        {
          warn(getWarnMessage(
            12
            /* NOT_FOUND_PARENT_SCOPE */
          ));
        }
        composer2 = global2;
      }
      return composer2;
    }
    if (i18n2.mode === "legacy") {
      throw createI18nError(
        18
        /* NOT_AVAILABLE_IN_LEGACY_MODE */
      );
    }
    const i18nInternal = i18n2;
    let composer = i18nInternal.__getInstance(instance);
    if (composer == null) {
      const type = instance.type;
      const composerOptions = assign({}, options);
      if (type.__i18n) {
        composerOptions.__i18n = type.__i18n;
      }
      if (global2) {
        composerOptions.__root = global2;
      }
      composer = createComposer(composerOptions);
      setupLifeCycle(i18nInternal, instance, composer);
      i18nInternal.__setInstance(instance, composer);
    }
    return composer;
  }
  function getComposer(i18n2, target, useComponent = false) {
    let composer = null;
    const root = target.root;
    let current = target.parent;
    while (current != null) {
      const i18nInternal = i18n2;
      if (i18n2.mode === "composition") {
        composer = i18nInternal.__getInstance(current);
      } else {
        const vueI18n = i18nInternal.__getInstance(current);
        if (vueI18n != null) {
          composer = vueI18n.__composer;
        }
        if (useComponent && composer && !composer[InejctWithOption]) {
          composer = null;
        }
      }
      if (composer != null) {
        break;
      }
      if (root === current) {
        break;
      }
      current = current.parent;
    }
    return composer;
  }
  function setupLifeCycle(i18n2, target, composer) {
    let emitter = null;
    vue.onMounted(() => {
      if (target.vnode.el) {
        target.vnode.el.__VUE_I18N__ = composer;
        emitter = createEmitter();
        const _composer = composer;
        _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
        emitter.on("*", addTimelineEvent);
      }
    }, target);
    vue.onUnmounted(() => {
      if (target.vnode.el && target.vnode.el.__VUE_I18N__) {
        emitter && emitter.off("*", addTimelineEvent);
        const _composer = composer;
        _composer[DisableEmitter] && _composer[DisableEmitter]();
        delete target.vnode.el.__VUE_I18N__;
      }
      i18n2.__deleteInstance(target);
    }, target);
  }
  const globalExportProps = [
    "locale",
    "fallbackLocale",
    "availableLocales"
  ];
  const globalExportMethods = ["t", "rt", "d", "n", "tm"];
  function injectGlobalFields(app, composer) {
    const i18n2 = /* @__PURE__ */ Object.create(null);
    globalExportProps.forEach((prop) => {
      const desc = Object.getOwnPropertyDescriptor(composer, prop);
      if (!desc) {
        throw createI18nError(
          22
          /* UNEXPECTED_ERROR */
        );
      }
      const wrap = vue.isRef(desc.value) ? {
        get() {
          return desc.value.value;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set(val) {
          desc.value.value = val;
        }
      } : {
        get() {
          return desc.get && desc.get();
        }
      };
      Object.defineProperty(i18n2, prop, wrap);
    });
    app.config.globalProperties.$i18n = i18n2;
    globalExportMethods.forEach((method) => {
      const desc = Object.getOwnPropertyDescriptor(composer, method);
      if (!desc || !desc.value) {
        throw createI18nError(
          22
          /* UNEXPECTED_ERROR */
        );
      }
      Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
    });
  }
  {
    initFeatureFlags();
  }
  {
    const target = getGlobalThis();
    target.__INTLIFY__ = true;
    setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
  }
  const message$1 = {
    hello: "{msg} world"
  };
  const en = {
    "tabbar.home": "home",
    "tabbar.qa": "qa",
    "tabbar.mine": "mine",
    "pages.home": "home",
    "pages.mine": "mine",
    "locale.auto": "System",
    "locale.en": "English",
    "locale.zh-hans": "简体中文",
    "locale.zh-hant": "繁体中文",
    "locale.ja": "日语",
    "index.scene": "Scene",
    "index.company": "Company Profile",
    "index.package": "Package",
    "index.details": "Details",
    "index.title": "Hello i18n",
    "index.home": "Home",
    "index.component": "Component",
    "index.api": "API",
    "index.schema": "Schema",
    "index.demo": "uni-app globalization",
    "index.demo-description": "Include uni-framework, manifest.json, pages.json, tabbar, Page, Component, API, Schema",
    "index.detail": "Detail",
    "index.language": "Language",
    "index.language-info": "Settings",
    "index.system-language": "System language",
    "index.application-language": "Application language",
    "index.language-change-confirm": "Applying this setting will restart the app",
    "word.whole": "whole",
    "word.download": "Download Records",
    "word.preservation": "Transfer to my mobile phone",
    "word.forward": "Forward to friends",
    "me.WeChat": "WeChat name",
    "me.message": "Message feedback",
    "me.myDownloads": "My Downloads",
    "me.contact": "contact us",
    "me.logout": "Log out",
    "api.message": "Message",
    "schema.name": "Name",
    "schema.add": "Add",
    "schema.add-success": "Add success",
    message: message$1
  };
  const message = {
    hello: "{msg} 我的"
  };
  const zhHans = {
    "tabbar.home": "首页",
    "tabbar.qa": "问答",
    "tabbar.mine": "我的",
    "pages.home": "首页",
    "pages.mine": "我的",
    "locale.auto": "系统",
    "locale.en": "English",
    "locale.zh-hans": "简体中文",
    "index.scene": "场景",
    "index.company": "公司介绍",
    "index.package": "产品包",
    "index.details": "详情",
    "word.whole": "全部",
    "word.download": "下载记录",
    "word.preservation": "转存到我的手机",
    "word.forward": "转发给朋友",
    "me.WeChat": "微信名",
    "me.message": "留言反馈",
    "me.myDownloads": "我的下载",
    "me.contact": "联系我们",
    "me.logout": "退出登录",
    message
  };
  const i18nConfig = {
    locale: uni.getLocale(),
    // 获取已设置的语言
    messages: {
      en,
      //英文
      "zh-Hans": zhHans
      //简体中文
      // 'zh-Hant': zhHant //繁体中文
    }
  };
  const i18n = createI18n(i18nConfig);
  const t = i18n.global.t;
  const locale = i18n.global.locale;
  const setLocale = (lang) => {
    uni.setLocale(lang);
    i18n.global.locale = lang;
  };
  const getLocale = () => {
    return i18n.global.locale;
  };
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "home",
    setup(__props) {
      const articleCtegoryStore = useArticleCtegoryStore();
      let query = vue.reactive({
        articleCategoryId: null
      });
      onLoad(() => {
        articleCtegoryStore.loadArticleCtegoryList();
      });
      onShow(async () => {
        if (query.articleCategoryId !== articleCtegoryStore.ctegorId) {
          query.articleCategoryId = articleCtegoryStore.ctegorId;
        }
      });
      const handleClickArticleCtegory = (item, index) => {
        if (query.articleCategoryId === item.id)
          return;
        query.articleCategoryId = articleCtegoryStore.ctegorId = item.id;
      };
      const handleClickHamburger = () => {
        uni.navigateTo({
          url: "/channel"
        });
      };
      const name = vue.ref(t("locale.auto"));
      let lang = vue.ref("");
      vue.onMounted(() => {
        formatAppLog("log", "at pages/home/home.vue:75", "当前语言为：", getLocale());
        lang.value = getLocale();
        formatAppLog("log", "at pages/home/home.vue:77", "name", name.value);
        formatAppLog("log", "at pages/home/home.vue:78", "tt", t("message.hello", { msg: "hello" }));
        formatAppLog("log", "at pages/home/home.vue:79", "locale", locale);
      });
      return (_ctx, _cache) => {
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$3);
        const _component_uni_badge = resolveEasycom(vue.resolveDynamicComponent("uni-badge"), __easycom_1);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(' <uni-nav-bar shadow statusBar fixed title="导航栏组件"></uni-nav-bar> '),
            vue.createVNode(navSearchBar),
            vue.createElementVNode("view", { class: "channel relative h-35px" }, [
              vue.createElementVNode("view", { class: "channel-wrapper fixed left-0 right-40px flex items-center flex-nowrap overflow-x-scroll h-35px z-1 text-15px bg-white" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(vue.unref(articleCtegoryStore).myCtegoryList, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: vue.normalizeClass(["channel-item flex items-center px-10px h-full text-_a_0e0e0e", { "activeCtegory": item.id === vue.unref(articleCtegoryStore).ctegorId }]),
                      key: item.id,
                      onClick: ($event) => handleClickArticleCtegory(item)
                    }, vue.toDisplayString(item.name), 11, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                vue.createElementVNode("view", {
                  class: "hamburger fixed right-0 flex items-center justify-center h-35px w-40px bg-white",
                  onClick: handleClickHamburger
                }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "bars",
                    size: "18",
                    color: "#999"
                  })
                ])
              ])
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("view", { class: "text-_a_000" }, "bbbbb"),
              vue.createElementVNode("image", {
                class: "w-30px h-30px overflow-hidden rounded-full",
                "lazy-load": "",
                src: "https://img01.yzcdn.cn/vant/cat.jpeg",
                mode: "aspectFill"
              }, null, 8, ["src"]),
              vue.createCommentVNode(" home  ")
            ]),
            vue.createVNode(_component_uni_badge, { text: "1" }),
            vue.createVNode(_component_uni_badge, {
              text: "2",
              type: "success",
              onClick: _ctx.bindClick
            }, null, 8, ["onClick"]),
            vue.createVNode(_component_uni_badge, {
              text: "3",
              type: "primary",
              inverted: true
            }),
            vue.createElementVNode("view", null, [
              vue.createTextVNode(
                vue.toDisplayString(_ctx.$t("locale.auto")) + " ",
                1
                /* TEXT */
              ),
              vue.createElementVNode("button", {
                onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(setLocale)("en"))
              }, "设置英文语言"),
              vue.createElementVNode("button", {
                onClick: _cache[1] || (_cache[1] = ($event) => vue.unref(setLocale)("zh-Hans"))
              }, "设置中文语言")
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode(
                "p",
                null,
                vue.toDisplayString(_ctx.$t("message.hello", { msg: "hello" })),
                1
                /* TEXT */
              )
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  });
  const PagesHomeHome = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-07e72d3c"], ["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/home/home.vue"]]);
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "pay",
    setup(__props) {
      const wechatPay = () => {
        formatAppLog("log", "at pages/pay/pay.vue:9", "pay");
        uni.login({
          provider: "weixin",
          success({ code }) {
            uni.request({
              url: "http://192.168.0.107:7001/api/weChatMp/login",
              method: "POST",
              data: { code },
              success(lres) {
                const openId = lres.data.data.openId;
                formatAppLog("log", "at pages/pay/pay.vue:19", "lres - openId", openId);
                uni.request({
                  url: "http://192.168.0.107:7001/api/weChatMp/order",
                  method: "POST",
                  data: { openId },
                  success(ores) {
                    formatAppLog("log", "at pages/pay/pay.vue:25", "ores", ores.data);
                    uni.requestPayment({
                      provider: "wxpay",
                      orderInfo: ores.data,
                      timeStamp: ores.data.timeStamp,
                      nonceStr: ores.data.nonceStr,
                      package: ores.data.package,
                      signType: ores.data.signType,
                      paySign: ores.data.paySign,
                      success(payres) {
                        formatAppLog("log", "at pages/pay/pay.vue:35", "payres", payres);
                        uni.showModal({
                          title: "支付成功",
                          content: "支付成功",
                          showCancel: false,
                          success() {
                            uni.navigateBack();
                          }
                        });
                      },
                      fail(parerr) {
                        formatAppLog("log", "at pages/pay/pay.vue:46", "parerr", parerr, JSON.stringify(parerr));
                      }
                    });
                  },
                  fail(oerr) {
                    formatAppLog("log", "at pages/pay/pay.vue:51", "lerr", oerr);
                  }
                });
              },
              fail(lerr) {
                formatAppLog("log", "at pages/pay/pay.vue:56", "lerr", lerr);
              }
            });
          },
          fail(loginErr) {
            formatAppLog("log", "at pages/pay/pay.vue:61", "loginErr", loginErr);
          }
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createElementVNode("button", { onClick: wechatPay }, "微信支付")
        ]);
      };
    }
  });
  const PagesPayPay = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "/Users/quanda/Desktop/news_project/news-uniapp/pages/pay/pay.vue"]]);
  __definePage("pages/mine/index", PagesMineIndex);
  __definePage("pages/common/guide/index", PagesCommonGuideIndex);
  __definePage("pages/mine/allService", PagesMineAllService);
  __definePage("pages/mine/download/index", PagesMineDownloadIndex);
  __definePage("pages/mine/message/index", PagesMineMessageIndex);
  __definePage("pages/mine/setting/index", PagesMineSettingIndex);
  __definePage("pages/mine/setting/message/index", PagesMineSettingMessageIndex);
  __definePage("pages/mine/setting/privacy/index", PagesMineSettingPrivacyIndex);
  __definePage("pages/mine/setting/profile/index", PagesMineSettingProfileIndex);
  __definePage("pages/mine/setting/profile/edit", PagesMineSettingProfileEdit);
  __definePage("pages/mine/setting/account/index", PagesMineSettingAccountIndex);
  __definePage("pages/mine/setting/account/replace", PagesMineSettingAccountReplace);
  __definePage("pages/mine/setting/account/delAccount", PagesMineSettingAccountDelAccount);
  __definePage("pages/mine/setting/account/device/login-device", PagesMineSettingAccountDeviceLoginDevice);
  __definePage("pages/mine/setting/account/device/device-info", PagesMineSettingAccountDeviceDeviceInfo);
  __definePage("pages/mine/setting/account/security/index", PagesMineSettingAccountSecurityIndex);
  __definePage("pages/mine/setting/account/security/security-lock", PagesMineSettingAccountSecuritySecurityLock);
  __definePage("pages/mine/content/index", PagesMineContentIndex);
  __definePage("pages/mine/mine", PagesMineMine);
  __definePage("pages/search/index", PagesSearchIndex);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/login/confirmLogin", PagesLoginConfirmLogin);
  __definePage("pages/channel/index", PagesChannelIndex);
  __definePage("pages/article/info", PagesArticleInfo);
  __definePage("pages/test/articleItem", PagesTestArticleItem);
  __definePage("pages/home/home", PagesHomeHome);
  __definePage("pages/pay/pay", PagesPayPay);
  function initPushNotification() {
    if (typeof plus !== "undefined" && plus.push) {
      plus.globalEvent.addEventListener("newPath", ({ path }) => {
        if (!path) {
          return;
        }
        const pages = getCurrentPages();
        const currentPage = pages[pages.length - 1];
        if (currentPage && currentPage.$page && currentPage.$page.fullPath === path) {
          return;
        }
        uni.navigateTo({
          url: path,
          fail(res) {
            if (res.errMsg.indexOf("tabbar") > -1) {
              uni.switchTab({
                url: path,
                fail(res2) {
                  console.error(res2.errMsg);
                }
              });
            } else {
              console.error(res.errMsg);
            }
          }
        });
      });
    }
  }
  uni.invokePushCallback({
    type: "enabled",
    offline: true
  });
  Promise.resolve().then(() => {
    initPushNotification();
    plus.push.setAutoNotification && plus.push.setAutoNotification(false);
  });
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    setup(__props) {
      const appStore = useAppStore();
      onLaunch(() => {
        formatAppLog("log", "at App.vue:6", "App Launch");
        setTimeout(() => {
          plus.navigator.closeSplashscreen();
          appStore.loadExecution();
        }, 2e3);
        const clientInfo = plus.push.getClientInfo();
        clientInfo.clientid;
        uni.setStorageSync("clientInfo", clientInfo);
        formatAppLog("log", "at App.vue:22", "客户端推送标识:", clientInfo);
        uni.onPushMessage((res) => {
          const { type, data } = res;
          if (type == "click") {
            formatAppLog("log", "at App.vue:30", '"click"-从系统推送服务点击消息启动应用事件；', res);
            setTimeout(() => {
              uni.navigateTo({
                url: data.payload.url
              });
            }, 1e3);
          }
          if (type == "receive") {
            formatAppLog("log", "at App.vue:53", '"receive"-应用从推送服务器接收到推送消息事件', res);
          }
        });
      });
      return () => {
      };
    }
  });
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/quanda/Desktop/news_project/news-uniapp/App.vue"]]);
  function get(state, path) {
    return path.reduce((obj, p) => {
      return obj == null ? void 0 : obj[p];
    }, state);
  }
  function set(state, path, val) {
    return path.slice(0, -1).reduce((obj, p) => {
      if (!/^(__proto__)$/.test(p))
        return obj[p] = obj[p] || {};
      else
        return {};
    }, state)[path[path.length - 1]] = val, state;
  }
  function pick(baseState, paths) {
    return paths.reduce((substate, path) => {
      const pathArray = path.split(".");
      return set(
        substate,
        pathArray,
        get(baseState, pathArray)
      );
    }, {});
  }
  const isObject = (v) => typeof v === "object" && v !== null;
  const normalizeOptions = (options, globalOptions) => {
    options = isObject(options) ? options : /* @__PURE__ */ Object.create(null);
    return new Proxy(options, {
      get(t2, p, r) {
        return Reflect.get(t2, p, r) || Reflect.get(globalOptions, p, r);
      }
    });
  };
  function passage(key) {
    return key;
  }
  function createUnistorage(globalOptions = {}) {
    const { key: normalizeKey = passage } = globalOptions || {};
    if (globalOptions == null ? void 0 : globalOptions.key) {
      delete globalOptions.key;
    }
    return function(ctx) {
      {
        const { store, options } = ctx;
        let { unistorage } = options || {};
        if (!unistorage)
          return;
        const {
          paths = null,
          afterRestore,
          beforeRestore,
          serializer = {
            serialize: JSON.stringify,
            deserialize: JSON.parse
          },
          key = store.$id
        } = normalizeOptions(unistorage, globalOptions);
        beforeRestore == null ? void 0 : beforeRestore(ctx);
        const normalizedKey = normalizeKey(key);
        try {
          const fromStorage = uni.getStorageSync(normalizedKey);
          if (fromStorage) {
            store.$patch(serializer.deserialize(fromStorage));
          }
        } catch (_error) {
        }
        afterRestore == null ? void 0 : afterRestore(ctx);
        store.$subscribe(
          (_, state) => {
            try {
              const toStore = Array.isArray(paths) ? pick(state, paths) : state;
              uni.setStorageSync(
                normalizedKey,
                serializer.serialize(toStore)
              );
            } catch (_error) {
            }
          },
          { detached: true }
        );
      }
    };
  }
  const pinia = createPinia();
  pinia.use(createUnistorage());
  const initPlugins = (app) => {
    app.use(pinia);
    app.use(i18n);
  };
  function createApp() {
    const app = vue.createVueApp(App);
    initPlugins(app);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
