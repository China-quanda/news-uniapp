<template>
	<view class='delAccount'>
		<!-- <u-navbar placeholder :title="title" :autoBack="true" border/> -->

		<view class="Panel">
			<view class="" v-if="status == 1">
				<view class="my-20px">为保证你的账号安全，在你提交的注销申请生效前，需同时满足以下条件：</view>

				<view class="Panel-item">
					<view></view>
					<view class="Panel-title">1.账号财产已结清</view>
					<view class="Panel-con">
						<text class="Panel-desc">没有资产、欠款、未结清的资金和虚拟权益本账号及通过本账号接入的第三方中没有未完成或存在争议的服务</text>
					</view>
				</view>
				<view class="Panel-item">
					<view class="Panel-title">2.账号处于安全状态</view>
					<view class="Panel-con">
						<text class="Panel-desc">账号处于正常使用状态，无被盗风险</text>
					</view>
				</view>
				<view class="Panel-item">
					<view class="Panel-title">3.账号权限解除</view>
					<view class="Panel-con">
						<text class="Panel-desc">账号已解除与其他产品的授权登录或绑定关系</text>
					</view>
				</view>
				<view class="Panel-item on-border">
					<view class="Panel-title">4.账号无任何纠纷，包括投诉举报</view>
				</view>

				<view class="xieyi">
					<!-- <u-radio-group v-model="value"> -->
					<!-- <u-radio shape="circle" label="我已阅读并同意"></u-radio><span>“注销协议”</span> -->
					<!-- </u-radio-group> -->

				</view>
				<view class="button" @click="toCode">下一步</view>
			</view>

			<view class="Panel-row" v-else-if="status == 2">
				<view class="h1">请输入验证码</view>
				<view class="row-input" style="display: flex; align-items: center;">
					<uni-easyinput type="number" v-model="form.code" placeholder="请输入验证码" trim />
					<view class="button ml-10px" :disabled="codeLoading" @click="getCode">{{ tips }}</view>
				</view>
				<view class="button" @click="verifyCode">下一步</view>
			</view>

		</view>
	</view>
</template>

<script setup lang="ts">
// import { mapGetters } from 'vuex'
// import { getVerifyCode } from '@/api/verifyCode'
// import { validMobile, validEmail } from '@/utils/validate.js'
import { ref, reactive } from 'vue';
// import { onLoad } from '@dcloudio/uni-app';
let tips = ref<string>('获取验证码');
let time = ref(60000);
let title = ref('');
let status = ref(1);
let codeLoading = ref(false);
let userInfo = reactive({});
let form = reactive({
	account: null,
	code: null
});
const toCode = () => {
	status.value = 2;
};
let interval = ref(null);
let intervalFn = () => {
	if (time.value == 1000) {
		clearInterval(interval.value);
		codeLoading.value = false;
		tips.value = `获取验证码`;
		time.value = 60000;
		return;
	}
	time.value = time.value - 1000;
	tips.value = `${time.value / 1000}s 后再获取`;
};
// 获取验证码
const getCode = () => {
	if (!isMobile(form.account) && !isEmail(form.account)) return prompt.msg('请输入有效的账号');
	prompt.loading('正在获取验证码');
	codeLoading.value = true;
	getVerifyCode({ account: form.account })
		.then(res => {
			console.log('res', res);
			prompt.msg('验证码已发送');
			status.value = 2;
			// 通知验证码组件内部开始倒计时
			interval.value = setInterval(() => {
				intervalFn();
			}, 1000);
		})
		.catch(e => {
			codeLoading.value = false;
		})
		.finally(() => {
			prompt.hideLoading();
		});
};
const verifyCode = () => {
	status.value = 3;
};
</script>
<style lang="scss" scoped>
.button {
	@apply flex flex-items-center justify-center py-10px bg-#3c9cff rd-4px text-white text-13px px-10px;
}

.Panel-row {
	transform: translateY(10vh);

	.h1 {
		font-weight: 400;
		margin-bottom: 100px;
		font-size: 26px;
		color: #2e3232;
	}

	.row-input {
		margin: 40px 0px;
	}

}

.Panel {
	padding: 0 15px;
}


.Panel-item {
	padding: 10px 0px;
	border-bottom: 0.5px solid #ccc;

	.Panel-title {
		font-size: 14px;
		font-weight: 500;
		margin-bottom: 10px;
	}

	.Panel-desc {
		font-size: 13px;
		color: #6d6666;
	}
}

.on-border {
	border-bottom: 0;
}

.xieyi {
	margin: 30px 0px 20px 0px;
	font-size: 14px;

	span {
		color: #3c9cff;
	}
}
</style>
