<template>
  <view>
		11
   <button @click="pay">支付</button> 
  </view>
</template>

<script setup lang="ts">
	const pay = ()=>{
		console.log('pay');
		uni.login({
			provider: "weixin",
			onlyAuthorize: true, // 微信登录仅请求授权认证
			success({code}){
				console.log('code',code);
				uni.request({
					url:'http://127.0.0.1:7002/api/weChatMp/login',
					method:'POST',
					data: { code },
					success(lres){
						console.log('lres',lres.data);
						
						wx.requestPayment({
							timeStamp: res.data.timeStamp,
							nonceStr: res.data.nonceStr,
							package: res.data.packageValue,
							signType: res.data.signType,
							paySign: res.data.paySign,
						})
					},
					fail(lerr) {
						console.log('lerr',lerr);
					}
				})
			},
			fail (err) {
				console.log('err',err);
		        // 登录授权失败
		        // err.code是错误码
		    }
		})
	}

</script>
