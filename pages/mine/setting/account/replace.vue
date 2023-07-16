<template>
	<view class="replace">
		
		<view class="Panel">
			<view class="Panel-row" v-if="status == 1">
				<h1>请输入原{{ title }}</h1>
				<uni-easyinput class="row-input" type="text" v-model="form.account" :placeholder="`请输入原${title}`" trim />
				<my-button @tap="getCode" type="primary" shape="circle">下一步</my-button>
				<view class="bottom" style="display: flex;">
					<my-text>原{{ title }}已忘记？</my-text>
					<my-text class="tijiao" color="#3c9cff">提交反馈</my-text>
				</view>
			</view>

			<view class="Panel-row" v-else-if="status == 2">
				<h1>请输入验证码</h1>
				<view class="row-input" style="display: flex;justify-content: space-between; align-items: center;">
					<uni-easyinput type="number" v-model="form.code" placeholder="请输入验证码" trim />
					<my-button style="margin-left: 10px;" type="primary" shape="circle" :disabled="codeLoading" size="small" @tap="getCode">{{ tips }}</my-button>
				</view>
				<my-button @tap="verifyCode" type="primary" shape="circle">下一步</my-button>
			</view>

			<view class="Panel-row" v-else-if="status == 3">
				<h1>请输入新{{ title }}</h1>
				<uni-easyinput class="row-input" type="text" v-model="form.account" :placeholder="`请输入${title}`" trim />
				<my-button @tap="getCode" type="primary" shape="circle">下一步</my-button>
			</view>

			<view class="Panel-row editPwd" v-else-if="status == 4">
				<view class="row-input" style="display: flex; align-items: center;">
					<uni-easyinput type="number" v-model="form.code" placeholder="请输入验证码" trim />
					<my-button style="margin-left: 10px;" type="primary" shape="circle" :disabled="codeLoading" size="small" @tap="getCode">{{ tips }}</my-button>
				</view>
				<uni-easyinput class="row-input" type="text" v-model="form.account" :placeholder="`请输入${title}`" trim />
				<my-button @tap="verifyCode" type="primary" shape="circle">确定修改</my-button>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
// import { mapGetters } from 'vuex'
// import { getVerifyCode } from '@/api/verifyCode'
// import { isMobile, isEmail } from '@/utils/validate.js'
import { ref, reactive } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import prompt from '@/utils/prompt';
onLoad(o => {
	title.value = `${o.title}`;
	uni.setNavigationBarTitle({
		title: `更换${o.title}`
	});
});
let tips = ref<string>('获取验证码');
let time = ref(60000);
let title = ref('');
let status = ref(4);
let codeLoading = ref(false);
let userInfo = reactive({});
let form = reactive({
	account: null,
	code: null
});

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
.Panel-row {
	margin-top: 60px;
	h1 {
		font-weight: 400;
		margin-bottom: 100px;
		font-size: 26px;
		color: #2e3232;
	}
	.bottom {
		margin-top: 10px;
		.tijiao {
			color: #3c9cff;
		}
	}
	.row-input {
		margin: 40px 0px;
	}
}
.editPwd {
	margin-top: 80px;
	.row-input {
		margin: 10px 0px;
	}
}
.Panel {
	padding: 0 15px;
}
</style>
