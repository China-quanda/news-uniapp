<template>
	<view class="my-scan" @tap="tapScan">
		<uni-icons type="scan" :size="size" :color="color" />
	</view>
</template>

<script setup lang="ts">
	import prompt from '@/utils/prompt';
	import router from '@/utils/router';
	import storage from '@/utils/storage';
	import {qrScannedLogin} from '@/api/user'
	const props = defineProps({
		size:{
			type:[String, Number],
			default:16
		},
		color:{
			type:String,
			default:'#999'
		}
	})
	const tapScan = ()=>{
		console.log('tapScan');
		// #ifdef H5
			return prompt.msg('H5 暂不支持扫码！')
		// #endif
		if(!storage.get('token')) return prompt.msg('请登录后再扫码！')
		uni.scanCode({
			success: (res)=> {
				console.log('条码类型：' + res.scanType);
				console.log('条码内容：' + res.result);
				let result = JSON.parse(res.result)
				if(result.type == 'login'){
					qrScannedLogin({qrcodeId:result.qrcodeId}).then(res=>{
						console.log(res);
						storage.set('qrCode',{...result,...res})
						router.push({url:'/pages/login/confirmLogin'})
					}).catch((err) => {
					  console.log(err);
					})
				}
			}
		});
	}
</script >
