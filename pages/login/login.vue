<template>
	<view class="container">
		<view class="back" @tap="router.back()"><uni-icons type="closeempty" size="24" color="#fff" /></view>

		<view class="logo">
			<image src="@/static/images/login.png" mode="widthFix"></image>
		</view>

		<!-- 登录类型 -->
		<view class="type-item">
			<block v-if="type == 1">
				<view>账号密码登录</view>
				<view @tap="type = 2">
					<text class="right">验证码快捷登录</text>
					<uni-icons type="forward" size="16" color="#328BF9" />
				</view>
			</block>

			<block v-if="type == 2">
				<view>验证码快捷登录</view>
				<view @tap="type = 1">
					<text class="right">账户密码登录</text>
					<uni-icons type="forward" size="16" color="#328BF9" />
				</view>
			</block>

			<block v-if="type == 3">
				<view>通过手机/邮箱重设密码</view>
				<view @tap="type = 1">
					<text class="right">账户密码登录</text>
					<uni-icons type="forward" size="16" color="#328BF9" />
				</view>
			</block>
		</view>

		<!-- 账号密码登录 -->
		<view v-if="type == 1">
			<uni-forms class="form-uni" :modelValue="form">
				<uni-forms-item><uni-easyinput type="text" v-model="form.account" placeholder="手机号 / 邮箱"
						trim /></uni-forms-item>
				<uni-forms-item><uni-easyinput type="password" v-model="form.password" placeholder="密码" trim /></uni-forms-item>
			</uni-forms>
		</view>

		<!-- 验证码快捷登录 -->
		<view v-if="type == 2">
			<uni-forms class="form-uni" :modelValue="form">
				<uni-forms-item><uni-easyinput type="text" v-model="form.account" placeholder="手机号 / 邮箱"
						trim /></uni-forms-item>
				<uni-forms-item>
					<view class="" style="display: flex;justify-content: space-between; align-items: center;">
						<uni-easyinput type="number" v-model="form.code" placeholder="验证码" trim />
						<button class="btn-item btn-mini" type="primary" :disabled="codeLoading" size="mini"
							@tap="getCode">{{ tips }}</button>
					</view>
				</uni-forms-item>
			</uni-forms>
		</view>

		<!-- 通过手机/邮箱重设密码 -->
		<view v-if="type == 3">
			<uni-forms class="form-uni" :modelValue="form">
				<uni-forms-item><uni-easyinput type="text" v-model="form.account" placeholder="手机号 / 邮箱"
						trim /></uni-forms-item>
				<uni-forms-item>
					<view class="" style="display: flex;justify-content: space-between; align-items: center;">
						<uni-easyinput type="number" v-model="form.code" placeholder="验证码" trim />
						<button class="btn-item btn-mini" type="primary" :disabled="codeLoading" size="mini"
							@tap="getCode">{{ tips }}</button>
					</view>
				</uni-forms-item>
				<uni-forms-item><uni-easyinput type="password" v-model="form.password" placeholder="新密码"
						trim /></uni-forms-item>
			</uni-forms>
		</view>

		<button class="btn-item" type="primary" :disabled="loading" @tap="submit(type)">
			<text v-if="type != 3">{{ !loading ? '登 录' : '登录中...' }}</text>
			<text v-if="type == 3">{{ !loading ? '重设密码' : '重设密码中...' }}</text>
		</button>

		<view class="tips-item">
			<view v-if="type != 3" @tap="type = 3">忘记密码？</view>
			<view v-if="type == 3" @tap="type = 1">想起密码？</view>
			<text v-if="type != 3" class="tips">未注册的账号通过验证后将自动注册</text>
		</view>
		<view v-if="type != 3" class="other-item">
			<my-icon v-for="item in otherLoginData" class="my-icon" :icon="item.icon" :color="item.color" :size="20"
				@tap="otherLogin(item)" />
		</view>
		<view v-if="type != 3" class="reading-item">
			登录注册即代表同意xx
			<text @click="handleUserAgrement">《用户服务协议》</text>
			和
			<text @click="handlePrivacy">《隐私政策》</text>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive } from 'vue';
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
	let type = ref<number>(2);
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
	.container {
		position: relative;
		height: 100vh;
		background: url('@/static/images/login/login-bg.jpg') no-repeat center center;
		background-size: cover;
	}

	.back {
		z-index: 1;
		position: absolute;
		top: 20px;
		/* #ifdef APP-PLUS */
		top: var(--status-bar-height);
		/* #endif */
		right: 20px;
		padding: 5px;
	}

	.logo {
		display: flex;
		justify-content: center;
		padding: 140px 80px 80px 80px;
		/* #ifdef APP-PLUS */
		padding: calc(var(--status-bar-height) + 145px) 80px 80px 80px;
		/* #endif */
	}

	.type-item {
		display: flex;
		justify-content: space-between;
		height: 20px;
		line-height: 20px;
		margin: 0px 15px 10px 0px;
		font-size: 16px;

		view:nth-child(1) {
			font-size: 18px;
			font-weight: 500;
			border-left: 3px solid #328bf9;
			padding-left: 15px;
		}

		.right {
			color: #328bf9;
		}
	}

	.form-uni {
		padding: 10px 15px 0px 15px;

		::v-deep.is-input-border {
			border: 0.5px solid #328bf9 !important;
			// box-shadow: 0.5px 1px 5px 0.5px rgba(24, 56, 180, 0.06);
			border-radius: 20px;
		}

		::v-deep.uni-forms-item {
			margin-bottom: 12px;
		}
	}

	.btn-item {
		margin: 0px 15px;
		border-radius: 25px;
	}

	.btn-mini {
		margin-right: 0px;
	}

	.tips-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 15px;
		font-size: 14px;
		color: #666363;

		.tips {
			// margin: 15px;
			font-size: $uni-font-size-sm;
			color: $uni-text-color-grey;
		}
	}

	.other-item {
		width: 100%;
		display: flex;
		justify-content: space-evenly;
		position: absolute;
		bottom: 40px;
		margin-bottom: 20px;

		.my-icon {
			width: 25px;
			height: 25px;
			line-height: 25px;
			padding: 5px;
			text-align: center;
			border-radius: 50%;
			overflow: hidden;
			border: 1px solid #ccc;
		}
	}

	.reading-item {
		position: absolute;
		width: 100%;
		bottom: 20px;
		font-size: 12px;
		text-align: center;

		text {
			color: #328bf9;
		}
	}
</style>