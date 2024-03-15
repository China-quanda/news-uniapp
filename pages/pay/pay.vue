<template>
	<view>
		<button @click="wechatPay">微信支付</button>
	</view>
</template>

<script setup lang="ts">
const wechatPay = () => {
	console.log('pay');
	uni.login({
		provider: "weixin",
		success({ code }) {
			uni.request({
				url: 'http://192.168.0.107:7001/api/weChatMp/login',
				method: 'POST',
				data: { code },
				success(lres) {
					const openId = lres.data.data.openId
					console.log('lres - openId', openId);
					uni.request({
						url: 'http://192.168.0.107:7001/api/weChatMp/order',
						method: 'POST',
						data: { openId },
						success(ores) {
							console.log('ores', ores.data);
							uni.requestPayment({
								provider: 'wxpay',
								orderInfo: ores.data,
								timeStamp: ores.data.timeStamp,
								nonceStr: ores.data.nonceStr,
								package: ores.data.package,
								signType: ores.data.signType,
								paySign: ores.data.paySign,
								success(payres) {
									console.log('payres', payres);
									uni.showModal({
										title: '支付成功',
										content: '支付成功',
										showCancel: false,
										success() {
											uni.navigateBack();
										}
									})
								},
								fail(parerr) {
									console.log('parerr', parerr, JSON.stringify(parerr));
								}
							});
						},
						fail(oerr) {
							console.log('lerr', oerr);
						}
					})
				},
				fail(lerr) {
					console.log('lerr', lerr);
				}
			})
		},
		fail(loginErr) {
			console.log('loginErr', loginErr);
		}
	})
}
</script>