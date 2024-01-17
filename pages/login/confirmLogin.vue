<template>
	<view class="container">
		<image class="img" src="@/static/macbook.png" mode="scaleToFill" />
		<view class="tips">当前账号正在尝试登录{{ appName }}网页端，请确认信息及登录行为</view>
		<button type="primary" :loading="loading" @tap="login">{{ loginText }}</button>
		<button type="default" style="margin-top: 15px;" @tap="cancel">取消</button>
	</view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { onUnload } from '@dcloudio/uni-app';
import {useAppStore} from '@/store/app'
const {appName} = useAppStore()
import router from '@/utils/router';
import prompt from '@/utils/prompt';
import storage from '@/utils/storage';
import { qrConfirmLogin, qrCancelLogin } from '@/api/user';
let loading = ref<boolean>(false);
let status = ref<number>(0);
let loginText = computed(() => {
	return loading.value ? '授权登录中....' : '授权登录';
});
let qrCode = storage.get('qrCode');
let login = () => {
	loading.value = true;
	qrConfirmLogin({ qrcodeId: qrCode.qrcodeId })
		.then(res => {
			console.log(res);
			status.value = res.data.status;
			if(res.data.status == 5) prompt.errorMsg('二维码已过期，请重新扫码')
			router.back();
		})
		.finally(() => {
			loading.value = false;
		});
};

let cancel = () => {
	if (status.value === 3) return;
	qrCancelLogin({ qrcodeId: qrCode.qrcodeId })
		.then(res => {
			console.log(res);
		})
		.finally(() => {
			router.back();
		});
};
onUnload(() => {
	cancel();
});
</script>

<style lang="scss" scoped>
.container {
	margin: 15px;
	text-align: center;
	.img {
		width: 200px;
		margin-top: 70px;
	}
	.tips {
		margin-bottom: 70px;
	}
}
</style>
