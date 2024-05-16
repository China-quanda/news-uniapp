
  ;(function(){
  let u=void 0,isReady=false,onReadyCallbacks=[],isServiceReady=false,onServiceReadyCallbacks=[];
  const __uniConfig = {"pages":[],"globalStyle":{"backgroundColor":"#F8F8F8","navigationBar":{"backgroundColor":"#F8F8F8","titleText":"uni-app","type":"default","titleColor":"#000000"},"isNVue":false},"nvue":{"compiler":"uni-app","styleCompiler":"uni-app","flex-direction":"column"},"renderer":"auto","appname":"news-app","splashscreen":{"alwaysShowBeforeRender":false,"autoclose":false},"compilerVersion":"4.14","entryPagePath":"pages/mine/index","entryPageQuery":"","realEntryPagePath":"","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000},"tabBar":{"position":"bottom","color":"#000000","selectedColor":"#000000","borderStyle":"white","blurEffect":"none","fontSize":"10px","iconWidth":"24px","spacing":"3px","height":"50px","backgroundColor":"#ffffff","list":[{"pagePath":"pages/home/home","iconPath":"/static/images/tabbar/home.png","selectedIconPath":"/static/images/tabbar/home_.png","text":"%tabbar.home%"},{"pagePath":"pages/mine/mine","iconPath":"/static/images/tabbar/mine.png","selectedIconPath":"/static/images/tabbar/mine_.png","text":"%tabbar.mine%"}],"selectedIndex":0,"shown":true},"locales":{"en":{"tabbar.home":"home","tabbar.qa":"qa","tabbar.mine":"mine","pages.home":"home","pages.mine":"mine","locale.auto":"System","locale.en":"English","locale.zh-hans":"简体中文","locale.zh-hant":"繁体中文","locale.ja":"日语","index.scene":"Scene","index.company":"Company Profile","index.package":"Package","index.details":"Details","index.title":"Hello i18n","index.home":"Home","index.component":"Component","index.api":"API","index.schema":"Schema","index.demo":"uni-app globalization","index.demo-description":"Include uni-framework, manifest.json, pages.json, tabbar, Page, Component, API, Schema","index.detail":"Detail","index.language":"Language","index.language-info":"Settings","index.system-language":"System language","index.application-language":"Application language","index.language-change-confirm":"Applying this setting will restart the app","word.whole":"whole","word.download":"Download Records","word.preservation":"Transfer to my mobile phone","word.forward":"Forward to friends","me.WeChat":"WeChat name","me.message":"Message feedback","me.myDownloads":"My Downloads","me.contact":"contact us","me.logout":"Log out","api.message":"Message","schema.name":"Name","schema.add":"Add","schema.add-success":"Add success","message":{"hello":"{msg} world"}},"zh-Hans":{"tabbar.home":"首页","tabbar.qa":"问答","tabbar.mine":"我的","pages.home":"首页","pages.mine":"我的","locale.auto":"系统","locale.en":"English","locale.zh-hans":"简体中文","index.scene":"场景","index.company":"公司介绍","index.package":"产品包","index.details":"详情","word.whole":"全部","word.download":"下载记录","word.preservation":"转存到我的手机","word.forward":"转发给朋友","me.WeChat":"微信名","me.message":"留言反馈","me.myDownloads":"我的下载","me.contact":"联系我们","me.logout":"退出登录","message":{"hello":"{msg} 我的"}}},"darkmode":false,"themeConfig":{}};
  const __uniRoutes = [{"path":"pages/mine/index","meta":{"isQuit":true,"isEntry":true,"navigationBar":{"titleText":"我的","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/common/guide/index","meta":{"navigationBar":{"titleText":"引导页","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/mine/allService","meta":{"navigationBar":{"titleText":"全部服务","type":"default"},"isNVue":false}},{"path":"pages/mine/download/index","meta":{"navigationBar":{"titleText":"下载管理","type":"default"},"isNVue":false}},{"path":"pages/mine/message/index","meta":{"navigationBar":{"titleText":"消息私信","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/mine/setting/index","meta":{"navigationBar":{"titleText":"设置","type":"default"},"isNVue":false}},{"path":"pages/mine/setting/message/index","meta":{"navigationBar":{"titleText":"消息设置","type":"default"},"isNVue":false}},{"path":"pages/mine/setting/privacy/index","meta":{"navigationBar":{"titleText":"隐私设置","type":"default"},"isNVue":false}},{"path":"pages/mine/setting/profile/index","meta":{"navigationBar":{"titleText":"编辑资料","type":"default"},"isNVue":false}},{"path":"pages/mine/setting/profile/edit","meta":{"navigationBar":{"titleText":"编辑资料","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/mine/setting/account/index","meta":{"navigationBar":{"titleText":"账号安全","type":"default"},"isNVue":false}},{"path":"pages/mine/setting/account/replace","meta":{"navigationBar":{"titleText":"更换","type":"default"},"isNVue":false}},{"path":"pages/mine/setting/account/delAccount","meta":{"navigationBar":{"titleText":"注销账号","type":"default"},"isNVue":false}},{"path":"pages/mine/setting/account/device/login-device","meta":{"navigationBar":{"titleText":"登录设备管理","type":"default"},"isNVue":false}},{"path":"pages/mine/setting/account/device/device-info","meta":{"navigationBar":{"titleText":"登录设备详情","type":"default"},"isNVue":false}},{"path":"pages/mine/setting/account/security/index","meta":{"navigationBar":{"titleText":"安全中心","type":"default"},"isNVue":false}},{"path":"pages/mine/setting/account/security/security-lock","meta":{"navigationBar":{"titleText":"安全锁定","type":"default"},"isNVue":false}},{"path":"pages/mine/content/index","meta":{"navigationBar":{"titleText":"内容","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/mine/mine","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":1,"navigationBar":{"titleText":"%pages.mine%","type":"default"},"isNVue":false}},{"path":"pages/search/index","meta":{"navigationBar":{"titleText":"搜索","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/login/login","meta":{"safearea":{"background":"#FFFFFF","bottom":{"offset":"none"}},"navigationBar":{"titleText":"登录","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/login/confirmLogin","meta":{"navigationBar":{"titleText":"扫码登录确认","type":"default"},"isNVue":false}},{"path":"pages/channel/index","meta":{"navigationBar":{"titleText":"channel","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/article/info","meta":{"navigationBar":{"titleText":"文章详情","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/test/articleItem","meta":{"navigationBar":{"titleText":"articleItem","type":"default"},"isNVue":false}},{"path":"pages/home/home","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":0,"navigationBar":{"titleText":"%pages.home%","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/pay/pay","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"pay","type":"default"},"isNVue":false}}].map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute));
  __uniConfig.styles=[];//styles
  __uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  __uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:16})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:u,window:u,document:u,frames:u,self:u,location:u,navigator:u,localStorage:u,history:u,Caches:u,screen:u,alert:u,confirm:u,prompt:u,fetch:u,XMLHttpRequest:u,WebSocket:u,webkit:u,print:u}}}}); 
  })();
  