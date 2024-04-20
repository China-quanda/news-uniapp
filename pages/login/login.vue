<template>
	<view class="container flex flex-col justify-between" :style="{ 'background-image': `url(${loginPic.background})` }">
		<my-nav-bar bgColor="transparent" leftIcon="icon-cha" @click-left="router.back()" />
		<view class="text-center ">
			<image class="logo w-210px" src="@/static/images/login.png" mode="widthFix"></image>
		</view>

		<view>
			<!-- 登录类型 -->
			<view class="type-item">
				<template v-if="type == 1">
					<view>账号密码登录</view>
					<view @click="type = 2">
						<text class="right">验证码快捷登录</text>
						<text class="iconfont icon-xiangyoujiantou text-#328bf9"></text>
					</view>
				</template>

				<template v-if="type == 2">
					<view>验证码快捷登录</view>
					<view @click="type = 1">
						<text class="right">账户密码登录</text>
						<text class="iconfont icon-xiangyoujiantou text-#328bf9"></text>
					</view>
				</template>

				<template v-if="type == 3">
					<view>手机/邮箱重设密码</view>
					<view @click="type = 1">
						<text class="right">账户密码登录</text>
						<text class="iconfont icon-xiangyoujiantou text-#328bf9"></text>
					</view>
				</template>
			</view>

			<form class="login-form" @submit="formSubmit" @reset="formReset">
				<!-- 账号密码登录 -->
				<template v-if="type == 1">
					<view class="form-item">
						<input v-model.trim="form.account" placeholder="手机号 / 邮箱" />
					</view>
					<view class="form-item">
						<input v-model.trim="form.password" placeholder="密码" type="password" />
					</view>
				</template>

				<!-- 验证码快捷登录 -->
				<template v-if="type == 2">
					<view class="form-item">
						<input v-model.trim="form.account" placeholder="手机号 / 邮箱" />
					</view>
					<view class="form-item">
						<input v-model.trim="form.code" placeholder="验证码" type="number" />
						<view class="button get-code-button" hover-class="button__hover" hover-stay-time="100"
							:class="{ 'button__disabled': codeLoading }" @click="getCode">{{
		tips }}</view>
					</view>
				</template>

				<!-- 通过手机/邮箱重设密码 -->
				<template v-if="type == 3">
					<view class="form-item">
						<input v-model.trim="form.account" placeholder="手机号 / 邮箱" />
					</view>
					<view class="form-item">
						<input v-model.trim="form.code" placeholder="验证码" type="number" />
						<view class="button get-code-button" hover-class="button__hover" hover-stay-time="100"
							:class="{ 'button__disabled': codeLoading }" @click="getCode">{{
		tips }}</view>
					</view>
					<view class="form-item">
						<input v-model.trim="form.password" placeholder="新密码" type="password" />
					</view>
				</template>
			</form>

			<view class="button mx-12px" hover-class="button__hover" hover-stay-time="100"
				:class="{ 'button__disabled': loading }" @click="submit(type)">
				<text v-if="type != 3">{{ !loading ? '登 录' : '登录中...' }}</text>
				<text v-if="type == 3">{{ !loading ? '重设密码' : '重设密码中...' }}</text>
			</view>

			<view class="tips-item">
				<view v-if="type != 3" @click="type = 3">忘记密码？</view>
				<view v-if="type == 3" @click="type = 1">想起密码？</view>
				<text v-if="type != 3" class="tips">未注册的账号通过验证后将自动注册</text>
			</view>
		</view>

		<view>
			<view v-if="type != 3" class="other-item">
				<text v-for="item in otherLoginData" :key="item.icon" :class="['iconfont', item.icon, 'text-20px']"
					:style="{ color: item.color, borderColor: item.color }" @click="otherLogin(item)" />
			</view>

			<view v-if="type != 3" class="reading-item">
				登录注册即代表同意xx
				<text @click="handleUserAgrement">《用户服务协议》</text>
				和
				<text @click="handlePrivacy">《隐私政策》</text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import {
	login as loginPic
} from '@/static/images/base64Pic.js';
const formSubmit = (e) => {
	console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
	var formdata = e.detail.value
	uni.showModal({
		content: '表单数据内容：' + JSON.stringify(formdata),
		showCancel: false
	});
}

const formReset = (e) => {
	console.log('清空数据', e)
}
// import { onReady } from "@dcloudio/uni-app";
import { isMobile, isEmail } from '@/utils/validate';
import { getVerifyCode } from '@/api/verifyCode';
import { useUserStore } from '@/store/user'
import { useAppStore } from '@/store/app'
import router from '@/utils/router';
import prompt from '@/utils/prompt';
const appStore = useAppStore()
const userStore = useUserStore()
// X秒重新获取
let tips = ref<string>('获取验证码');
let githubUrl = ref<string>('https://github.com/login/oauth/authorize?client_id=88f028142403410abfef&redirect_uri=http://127.0.0.1:8888/dashboard');
let weChatUrl = ref<string>(
	'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd4a837c38b866355&redirect_uri=http://127.0.0.1:8888/dashboard&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
);
let type = ref<number>(1);
let loading = ref<boolean>(false);
let codeLoading = ref<boolean>(false);
let time = ref<number>(1000 * 60);
let formRef = ref(null);

let form = reactive({
	account: null,
	password: null,
	code: null
});
let otherLoginData = ref([
	{ name: 'weixin', icon: 'icon-weixin', color: 'rgb(74, 221, 51)' },
	{ name: 'qq', icon: 'icon-qq', color: 'rgb(87, 139, 222)' },
	{ name: 'weibo', icon: 'icon-xinlangweibo', color: 'rgb(244, 94, 75)' },
	{ name: 'zfb', icon: 'icon-shejiaotubiao-09', color: 'rgb(93, 140, 241)' },
	{ name: 'wr', icon: 'icon-weiruan', color: 'rgb(93, 140, 241)' },
	{ name: 'github', icon: 'icon-github', color: 'rgb(10, 24, 54)' }
]);
// TOOD 未实现校验功能
let rules = reactive({
	account: [
		{
			required: true,
			errorMessage: '请填写账号'
		}
	],
	password: [
		{
			required: true,
			errorMessage: '请填写密码',
			trigger: ['blur', 'change']
		},
		{
			min: 6,
			errorMessage: '密码长的不能小于6个字符'
		}
	],
	code: [
		{
			required: true,
			message: '请填写验证码',
			trigger: ['blur', 'change']
		},
		{
			min: 6,
			max: 6,
			message: '验证码应该是6位数字'
		}
	]
});
// 隐私协议
const handlePrivacy = () => {
	let site = appStore.agreements[0]
	router.push(`/pages/common/webview/index?title=${site.title}&url=${site.url}`)
}
// 用户协议
const handleUserAgrement = () => {
	let site = appStore.agreements[1]
	router.push(`/pages/common/webview/index?title=${site.title}&url=${site.url}`)
}
const otherLogin = data => {
	prompt.msg('该功能未实现');
	console.log(data);
};
const submit = type => {
	if (type == 1) {
		localLogin();
	}
	if (type == 2) {
		smsLogin();
	}
	if (type == 3) {
		resetPassword();
	}
};
let interval = ref();
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
// 微信登录
const weChatLogin = () => {
	// const weChatCode = window.location.href.split('?code=')[1].split('&')
	// const res = await weChatLogin({ code: weChatCode[0] })
	// console.log(res)
	// prompt.msg('WeChat登录成功')
};
// gitHub登录
const gitHubLogin = () => {
	// const str = window.location.href.substr(window.location.href.indexOf('code=') + 5)
	// const Code = str.substr()
	// const res = await gitHubLogin({ code: Code })
	// console.log(res)
	// prompt.msg('gitHub登录成功')
};
// 账号密码登录
const localLogin = () => {
	if (!isMobile(form.account) && !isEmail(form.account)) return prompt.msg('请输入有效的账号');
	if (!form.password) return prompt.msg('请输入新密码');
	loading.value = true;
	userStore.localLogin(form).then(() => {
		userStore.getUserInfo().then(() => {
			router.back(); // 登录成功，跳转回原来的页面
		})
	}).finally(() => {
		loading.value = false;
	})
};
// 验证码快捷登录 或注册
const smsLogin = () => {
	if (!isMobile(form.account) && !isEmail(form.account)) return prompt.msg('请输入有效的账号');
	if (!form.code) return prompt.msg('请输入验证码');
	loading.value = true;
	userStore.smsLogin(form).then(() => {
		userStore.getUserInfo().then(() => {
			router.back(); // 登录成功，跳转回原来的页面
		})
	}).finally(() => {
		loading.value = false;
	})
};
// 验证码快捷修改密码
const resetPassword = () => {
	if (!isMobile(form.account) && !isEmail(form.account)) return prompt.msg('请输入有效的账号');
	if (!form.code) return prompt.msg('请输入验证码');
	if (!form.password) return prompt.msg('请输入新密码');
	loading.value = true;
	userStore.smsUpdatePassword(form).then(() => {
		prompt.msg('重置密码成功,正在为您登录中...');
		setTimeout(() => {
			userStore.getUserInfo().then(() => {
				type.value = 1;
				router.back(); // 登录成功，跳转回原来的页面
			})
		}, 1500)
	}).finally(() => {
		loading.value = false;
	})
};
</script>

<style lang="scss" scoped>
page,
.container {
	position: relative;
	height: 100vh;
	background-repeat: no-repeat;
	background-size: cover;
}

:deep(.icon-cha) {
	@apply text-#328bf9 font-500;
}


.type-item {
	@apply flex justify-between h20px lh-20px mr-12px text-16px;

	view:nth-child(1) {
		@apply font-500 text-18px p-l-15px;
		border-left: 3px solid #328bf9;
	}

	.right {
		@apply text-#328bf9;
	}
}

.login-form {
	@apply flex flex-col mx-12px my-20px;

	.form-item {
		@apply flex flex-items-center gap-x-15px;

		&:not(:last-child) {
			@apply m-b-15px;
		}

		input {
			@apply py-10px rd-full box-border px-15px;
			/* #ifdef APP-PLUS */
			@apply pt-12px;
			/* #endif */
			height: auto !important;
			border: 0.5px solid #328bf9;
			display: block;
			width: 100%;
			font-size: 14px !important;
		}

	}

}

.button {
	cursor: pointer;
	@apply flex flex-items-center justify-center text-white bg-#328bf9 box-border min-w-100px text-14px rd-full h-40px text-center;
}

.button__hover {
	@apply bg-#0066cc;
	color: rgba(255, 255, 255, .6);
}

.button__disabled {
	background-color: rgba(0, 122, 255, 0.6);
}

.tips-item {
	@apply flex justify-between flex-items-center mx-12px my-3 text-14px text-#666363;

	.tips {
		font-size: $uni-font-size-sm;
		color: $uni-text-color-grey;
	}
}

.other-item {
	// absolute bottom-40px mb-20px
	@apply flex w-full justify-evenly;

	.iconfont {
		@apply flex flex-items-center justify-center w25px h25px p5px rd-full overflow-hidden bg-white border-1px border-solid;
	}
}


.reading-item {
	// absolute w-full bottom-20px text-3
	@apply text-center text-3 my-3 box-border;

	text {
		@apply text-#328bf9;
	}
}
</style>