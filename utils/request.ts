	import storage from '@/utils/storage';
	import {request as requestConfig} from '@/utils/config';
	const request = config => {
		// 是否隐藏加载
		if (config.data && config.data.Loading) {
			uni.showLoading({ title: '加载中' });
			let time = 0
			var myInterval = setInterval(()=>{
				time = time + 1000
				if(time >= 6000) uni.showLoading({title: '当前网络较慢'});
			},1000)	
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: config.baseUrl || requestConfig.baseUrl + config.url,
				method: config.method || 'get',
				timeout: config.timeout || requestConfig.timeout,
				data: config.data,
				header: {
					'Authorization': storage.get('token') || null,
					...config.header
				},
				dataType: requestConfig.dataType,
				success: res => {
					// 请求失败
					if (res.errMsg != 'request:ok') {
						reject('请求失败')
						return uni.showToast({ title: res.errMsg, icon: 'none', duration: 2000 });
					}
					if (res.data.code == 200 || res.data.code == 0) {
						resolve(res.data);
					} else if (res.data.code == 400) {
						reject('400')
						return uni.showToast({ icon: 'none', title: res.data.msg });
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
						uni.showToast({ title: res.data.msg, icon: 'none', duration: 2000 });
					}
				},
				fail: error => {
					reject(error)
					uni.showToast({ title: '请求失败,请稍后再试', icon: 'none', duration: 2000 });
				},
				complete: res => {
					// 是否隐藏加载
					if (config.data && config.data.Loading) {
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