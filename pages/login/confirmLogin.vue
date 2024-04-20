<template>
	<view class="container text-center">
		<image class="img w-230px mt-15" src="@/static/macbook.png" mode="scaleToFill" />
		<view class="tips mb-10 mx-12px">当前账号正在尝试登录{{ appName }}网页端，请确认信息及登录行为</view>
		<view class="button-group">
			<view class="button button__primary" :class="{ button__loading: loading }" @click="login">
				<text class="loading iconfont" v-if="loading"></text>
				<text class="button__text">{{ loginText }}</text>
			</view>
			<view class="button button__default" @click="cancel">
				<text class="button__text">取消</text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app';
const { appName } = useAppStore();
import storage from '@/utils/storage';
import { qrConfirmLogin, qrCancelLogin } from '@/api/user';
let loading = ref<boolean>(false);
let status = ref<number>(0);
let loginText = computed(() => {
	return loading.value ? '授权登录中....' : '授权登录';
});
let qrCode = storage.get('qrCode');
let login = () => {
	if (loading.value) return;
	loading.value = true;
	qrConfirmLogin({ qrcodeId: qrCode.qrcodeId })
		.then((res: any) => {
			console.log(res);
			status.value = res.data.status;
			// if (res.data.status == 5) prompt.errorMsg('二维码已过期，请重新扫码');
			// router.back();
		})
		.finally(() => {
			loading.value = false;
		});
};

let cancel = () => {
	if (status.value === 3) return;
	qrCancelLogin({ qrcodeId: qrCode.qrcodeId })
		.then((res) => {
			console.log(res);
		})
		.finally(() => {
			// router.back();
		});
};
onUnload(() => {
	cancel();
});
</script>
<style lang="scss" scoped>
.button-group {
	@apply flex flex-col w-full gap-y-10px;

	.button {
		@apply relative flex justify-center flex-items-center p8px mx-12px text-white rd-5px gap-x-5px;

		.iconfont {
			@apply text-16px;
		}

		.loading {
			@apply w-14px h-14px rd-50% p-1px;
			background: conic-gradient(#0000 10%, #ccc) content-box;
			-webkit-mask: repeating-conic-gradient(#0000 0deg, #000 1deg 20deg, #0000 21deg 36deg), radial-gradient(farthest-side, #0000 calc(100% - 2.5px), #000 calc(100% - 2.5px));
			-webkit-mask-composite: destination-in;
			mask-composite: intersect;
			animation: s4 1s infinite steps(10);

			@keyframes s4 {
				to {
					transform: rotate(1turn);
				}
			}
		}
	}

	.button__text {
		@apply text-14px;
	}

	.button__primary {
		@apply bg-#007aff;
	}

	.button__loading {
		@apply bg-#0062cc;
	}

	.button__default {
		@apply bg-#f8f8f8 text-black;

		&:after {
			content: ' ';
			width: 200%;
			height: 200%;
			position: absolute;
			top: 0;
			left: 0;
			border: 1px solid rgba(0, 0, 0, 0.2);
			transform: scale(0.5);
			transform-origin: 0 0;
			box-sizing: border-box;
			border-radius: 10px;
		}
	}
}
</style>
