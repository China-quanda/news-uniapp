import { defineStore } from 'pinia'
	import {getAppVersion} from '@/api/app'
export const useAppStore = defineStore('appStore', {
	// unistorage: true, // 是否持久化
	unistorage: { // true
			key: 'appStore', // 缓存的键，默认为该 store 的 id，这里是 appStore,
			paths: ['appName', 'version'], // 需要缓存的路径，这里设置 appName 和 version 下的 data 会被缓存
			// 初始化恢复前触发
			// beforeRestore(ctx) {},
			// 初始化恢复后触发
			// afterRestore(ctx) {},
			serializer: {
				// 序列化，默认为 JSON.stringify
				serialize(v) {
					return JSON.stringify(v)
				},
				// 反序列化，默认为 JSON.parse
				deserialize(v) {
					return JSON.parse(v)
				}
			}
		},
    state: () => ({
			systemInfo:uni.getSystemInfoSync(),
			appName:'mayaApp',// 应用名称
			version:'1.0.0', // 应用版本
			logo: "/static/logo.png",// 应用logo
			site_url: "http://hnsilian.cn",// 官方网站
			homeUrl:'/pages/index/index', //首页地址
			request:{
				timeout:10000,
				dataType:'json',
				baseUrl:'',// 请求基本地址
			},
			// 政策协议
			agreements: [{
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
			checkUpdate(){
				getAppVersion(this.systemInfo.appVersion).then(result=>{
					console.log(result);
					if(!result.data.update) return
					uni.showModal({
						title: "新版本发布",
						content: "检查到当前有新版本,需要更新吗？",
						confirmText: "立即更新",
						success: (res)=> {
							if (res.confirm) {
								uni.showLoading({
									title: '正在下载'
								})
								uni.downloadFile({
									url: result.data.url,
									success: (downloadResult) => {
										if (downloadResult.statusCode === 200) {
											uni.showLoading({
												title: '安装中..'
											})
											plus.runtime.install(downloadResult.tempFilePath, {
												force: true
											}, function() {
												console.log('install success...');
												uni.setStorageSync('version',result.data.version)
												uni.hideLoading()
												plus.runtime.restart();
											}, function(e) {
												console.log('e：'+JSON.stringify(e));
												uni.hideLoading()
												uni.showToast({
													title: '安装失败:'+JSON.stringify(e),
													duration: 1500
												});
											});
										}
									}
								});
							} else if (res.cancel) {
								// 退出APP
								this.handleAppOut()
							}
						}
					})
				})
			},
			 // 退出APP
			handleAppOut(){
				// 判断为安卓的手机
				if (this.systemInfo.platform == 'android') {
					// 安卓退出app     
					plus.runtime.quit();
				} else {
					// 判断为ios的手机，退出App   
					plus.ios.import("UIApplication").sharedApplication().performSelector("exit");
				}
			}
			
		}
})
