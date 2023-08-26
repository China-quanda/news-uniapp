<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
			//#ifdef APP-PLUS
			uni.getPushClientId({
					success: (res) => {
						console.log(res.cid);
					},
					fail(err) {
						console.log(err)
					}
				})
			const clientInfo = plus.push.getClientInfo();
			let clientId = clientInfo.clientid;
			uni.setStorageSync('clientInfo', clientInfo);
			console.log('客户端推送标识:', clientInfo);
			console.log('客户端推送标识:', clientInfo.clientid);
			
			// 2 获取客户端推送标识信息 cid   必须要获取到cid后才能接收推送信息
			
			// 3 启动监听推送消息事件
			uni.onPushMessage(res => {
				const { type, data } = res;
				if (type == 'click') {
					console.log('"click"-从系统推送服务点击消息启动应用事件；', res);
					setTimeout(() => {
						uni.navigateTo({
							url: data.payload.url
						});
					}, 1000);
					// 云函数url推送
					// {
					//     "type": "click",
					//     "data": {
					//         "unipush_version": "2.0",
					//         "payload": {
					//             "url": "www.baidu.com"
					//         },
					//         "title": "消息标题test5",
					//         "content": "消息内容test5",
					//         "force_notification": true,
					//         "__UUID__": "androidPushMsg259506836",
					//         "appid": "__UNI__510C14E"
					//     }
					// }
				}
				if (type == 'receive') {
					console.log('"receive"-应用从推送服务器接收到推送消息事件', res);
					// uni.createPushMessage(data)
					// plus.runtime.setBadgeNumber(1)  // 设置角标
					// {
					//     "type": "receive",
					//     "data": {
					//         "__UUID__": "androidPushMsg193983530",
					//         "title": "uni-test-push",
					//         "content": "内容1",
					//         "payload": "内容1"
					//     }
					// }
				}
			});
			
			//#endif
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 阿里图标 */
	@import '@/static/font/iconfont.css';
</style>
