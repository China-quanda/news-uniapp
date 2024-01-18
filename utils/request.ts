	import storage from '@/utils/storage';
	import {tansParams} from '@/utils/mixin';

	const request = (config:any) => {
		// 是否隐藏加载
		if (config.data && config.data.Loading  || config.params && config.params?.Loading) {
			uni.showLoading({ title: '加载中' });
			let time = 0
			var myInterval = setInterval(()=>{
				time = time + 1000
				if(time >= 6000) uni.showLoading({title: '当前网络较慢'});
			},1000)	
		}
		// get请求映射params参数
		if (config.params) {
			let url = config.url + '?' + tansParams(config.params)
			url = url.slice(0, -1)
			config.url = url
		}
		const token = storage.get('userStore') ? storage.get('userStore').token : null
		return new Promise((resolve, reject) => {
			uni.request({
				url: config.baseUrl || 'http://127.0.0.1:7001/api/app' + config.url,
				method: config.method || 'get',
				timeout: config.timeout || 10000,
				data: config.data,
				header: {
					Authorization: `Bearer ${token}` ,
					...config.header
				},
				dataType: 'json',
				success: res => {
					// 请求失败
					if (res.errMsg != 'request:ok') {
						reject('请求失败')
						return uni.showToast({ title: res.errMsg, icon: 'none', duration: 2000 });
					}
					if (res.data.code == 200 || res.data.code == 0) {
						resolve(res.data);
					} else if (res.data.code == 400) {
						console.log(res);
						reject('400')
						return uni.showToast({ icon: 'none', title: res.data.message });
					} else if (res.data.code == 401) {
						reject('401')
						uni.showToast({ icon: 'none', title: '认证失败,请重新登录' });
						setTimeout(() => {
							uni.reLaunch({ url: '/pages/index/login' });
						}, 1500)
					} else if (res.data.code == 403) {
						reject('403')
						return uni.showToast({ icon: 'none', title: '无权限操作' });
					} else {
						reject(res.data)
						uni.showToast({ title: res.data.message, icon: 'none', duration: 2000 });
					}
				},
				fail: error => {
					console.log('error',error);
					// let { message } = error
					// if (message === 'Network Error') {
					//   message = '后端接口连接异常'
					// } else if (message.includes('timeout')) {
					//   message = '系统接口请求超时'
					// } else if (message.includes('Request failed with status code')) {
					//   message = '系统接口' + message.substr(message.length - 3) + '异常'
					// }else{
					// 	 message = '请求失败,请稍后再试'
					// }
					uni.showToast({ title:'请求失败,请稍后再试', icon: 'none', duration: 2000 });
					reject(error)
				},
				complete: res => {
					// 是否隐藏加载
					if (config.data && config.data.Loading || config.params && config.params?.Loading) {
						uni.hideLoading();
						clearInterval(myInterval)
					}
					if (res.statusCode == '500') {
						reject('服务器开小差了,请稍后再试')
						uni.showToast({
							title: '服务器开小差了,请稍后再试',
							icon: 'none',
							duration: 2000
						});
					}
				}
			});
		});
	}
	export default request
	
	
	// import store from '@/store'
	// import config from '@/config'
	// import { getToken } from '@/utils/auth'
	// import errorCode from '@/utils/errorCode'
	// import { toast, showConfirm, tansParams } from '@/utils/common'
	
	// let timeout = 10000
	// const baseUrl = config.baseUrl
	
	// const request = config => {
	// 	// 是否隐藏加载
	// 	if(config.data && config.data?.Loading || config.params && config.params?.Loading) {
	// 		uni.showLoading({ title: '加载中' });
	// 		let time = 0
	// 		var myInterval = setInterval(()=>{
	// 			time = time + 1000
	// 			if(time >= 6000) uni.showLoading({title: '当前网络较慢'});
	// 		},1000)	
	// 	}
		
	//   // 是否需要设置 token
	//   const isToken = (config.headers || {}).isToken === false
	//   config.header = config.header || {}
	//   if (getToken() && !isToken) {
	//     config.header['Authorization'] = 'Bearer ' + getToken()
	//   }
	//   // get请求映射params参数
	//   if (config.params) {
	//     let url = config.url + '?' + tansParams(config.params)
	//     url = url.slice(0, -1)
	//     config.url = url
	//   }
	//   return new Promise((resolve, reject) => {
	//     uni.request({
	//         method: config.method || 'get',
	//         timeout: config.timeout ||  timeout,
	//         url: config.baseUrl || baseUrl + config.url,
	//         data: config.data,
	//         header: config.header,
	//         dataType: 'json'
	//       }).then(response => {
	//         let [error, res] = response
	//         if (error) {
	//           toast('后端接口连接异常')
	//           reject('后端接口连接异常')
	//           return
	//         }
	//         const code = res.data.code || 200
	//         const msg = errorCode[code] || res.data.msg || errorCode['default']
	//         if (code === 401) {
	//           showConfirm('登录状态已过期，您可以继续留在该页面，或者重新登录?').then(res => {
	//             if (res.confirm) {
	//               store.dispatch('LogOut').then(res => {
	//                 uni.reLaunch({ url: '/pages/login' })
	//               })
	//             }
	//           })
	//           reject('无效的会话，或者会话已过期，请重新登录。')
	//         } else if (code === 500) {
	//           toast(msg)
	//           reject('500')
	//         } else if (code !== 200) {
	//           toast(msg)
	//           reject(code)
	//         }
	//         resolve(res.data)
	//       })
	//       .catch(error => {
	// 				console.log('error',error);
	//         let { message } = error
	//         if (message === 'Network Error') {
	//           message = '后端接口连接异常'
	//         } else if (message.includes('timeout')) {
	//           message = '系统接口请求超时'
	//         } else if (message.includes('Request failed with status code')) {
	//           message = '系统接口' + message.substr(message.length - 3) + '异常'
	//         }
	//         toast(message)
	//         reject(error)
	//       }).finally(()=>{
	// 				if(config.data && config.data?.Loading || config.params && config.params?.Loading) {
	// 					uni.hideLoading();
	// 					clearInterval(myInterval)
	// 				}
	// 			})
	//   })
	// }
	
	// export default request
	