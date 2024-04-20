<template>
	<view class="container flex flex-col justify-between" :style="{ 'background-image': `url(${loginPic.background})` }">
		<my-nav-bar bgColor="transparent" leftIcon="icon-cha" @click-left="router.back()" />
		<view class="text-center">
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
						<view class="button get-code-button" hover-class="button__hover" hover-stay-time="100" :class="{ button__disabled: codeLoading }" @click="getCode">{{ tips }}</view>
					</view>
				</template>

				<!-- 通过手机/邮箱重设密码 -->
				<template v-if="type == 3">
					<view class="form-item">
						<input v-model.trim="form.account" placeholder="手机号 / 邮箱" />
					</view>
					<view class="form-item">
						<input v-model.trim="form.code" placeholder="验证码" type="number" />
						<view class="button get-code-button" hover-class="button__hover" hover-stay-time="100" :class="{ button__disabled: codeLoading }" @click="getCode">{{ tips }}</view>
					</view>
					<view class="form-item">
						<input v-model.trim="form.password" placeholder="新密码" type="password" />
					</view>
				</template>
			</form>

			<view class="button mx-12px" hover-class="button__hover" hover-stay-time="100" :class="{ button__disabled: loading }" @click="submit(type)">
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
				<text
					v-for="item in oauths"
					:key="item.icon"
					:class="['iconfont', item.icon, 'text-20px']"
					:style="{ color: item.color, borderColor: item.color }"
					@click="oauthLogin(item)"
				/>
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
import { login as loginPic } from '@/static/images/base64Pic.js';
import { isMobile, isEmail, isweChat } from '@/utils/validate';
import { getVerifyCode } from '@/api/verifyCode';
import { useUserStore } from '@/store/user';
import { useAppStore } from '@/store/app';
import router from '@/utils/router';
import prompt from '@/utils/prompt';
const appStore = useAppStore();
const userStore = useUserStore();
// X秒重新获取
let tips = ref<string>('获取验证码');
let type = ref<number>(1);
let loading = ref<boolean>(false);
let codeLoading = ref<boolean>(false);
let time = ref<number>(1000 * 60);

let form = reactive({
	account: null,
	password: null,
	code: null
});

// 隐私协议
const handlePrivacy = () => {
	let site = appStore.agreements[0];
	router.push(`/pages/common/webview/index?title=${site.title}&url=${site.url}`);
};
// 用户协议
const handleUserAgrement = () => {
	let site = appStore.agreements[1];
	router.push(`/pages/common/webview/index?title=${site.title}&url=${site.url}`);
};

const formSubmit = (e) => {
	console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value));
	var formdata = e.detail.value;
	uni.showModal({
		content: '表单数据内容：' + JSON.stringify(formdata),
		showCancel: false
	});
};

const formReset = (e) => {
	console.log('清空数据', e);
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
		.then((res) => {
			console.log('res', res);
			prompt.msg('验证码已发送');
			// 通知验证码组件内部开始倒计时
			interval.value = setInterval(() => {
				intervalFn();
			}, 1000);
		})
		.catch((e) => {
			codeLoading.value = false;
		})
		.finally(() => {
			prompt.hideLoading();
		});
};

// 支持的第三方登录平台
const oauths = ref([]);
// 初始化 oauth 数据
const initProvider = async () => {
	// #ifndef WEB
	uni.getProvider({
		service: 'oauth',
		success(res: any) {
			console.log('providers', res.providers.length);
			if (!res.providers.length) return console.error('没有获取到服务供应商');
			if (res.errMsg !== 'getProvider:ok') return console.error(res.errMsg);
			oauths.value = res.providers.map((item) => {
				// 如果有一键登录的话 调用一键登录
				if (item.id === 'univerify') appUniverifyLogin();
				return providerinfo(item);
			});
			console.log('oauths', oauths.value.length);
		},
		fail: (fail) => {
			console.error('getProvider-fail', fail);
		}
	});
	// #endif

	// 初始化 WEB 平台专有
	// #ifdef WEB
	oauths.value.push(
		providerinfo({
			id: 'github',
			description: 'github'
		})
	);
	// 是否在微信浏览器
	if (isweChat()) {
		oauths.value.push(
			providerinfo({
				id: 'weixin',
				description: 'weixin'
			})
		);
	}
	// #endif

	function providerinfo(item) {
		let platform = '';

		// #ifdef APP-PLUS
		platform = 'APP-PLUS';
		// #endif

		// #ifdef MP-WEIXIN
		platform = 'MP-WEIXIN';
		// #endif

		// #ifdef WEB
		platform = 'WEB';
		// #endif

		let info = {
			provider: item.id,
			description: item.description,
			platform,
			icon: '',
			color: ''
		};

		if (item.id === 'univerify') {
			info.icon = 'icon-shouji';
			info.color = '#000';
		}
		if (item.id === 'weixin') {
			info.icon = 'icon-weixin';
			info.color = 'rgb(74, 221, 51)';
		}
		if (item.id === 'qq') {
			info.icon = 'icon-qq';
			info.color = 'rgb(87, 139, 222)';
		}
		if (item.id === 'sinaweibo') {
			info.icon = 'icon-xinlangweibo';
			info.color = 'rgb(244, 94, 75)';
		}
		if (item.id === 'google') {
			info.icon = 'icon-guge';
			info.color = 'rgb(244, 94, 75)';
		}
		if (item.id === 'facebook') {
			info.icon = 'icon-facebook';
			info.color = 'rgb(244, 94, 75)';
		}
		if (item.id === 'apple') {
			info.icon = 'icon-xinlangweibo';
			info.color = '#000';
		}
		if (item.id === 'github') {
			info.icon = 'icon-github';
			info.color = 'rgb(10, 24, 54)';
		}

		return info;
	}
};
// 点击第三方oauth登录
const oauthLogin = (row) => {
	if (row.platform === 'WEB') {
		if (row.provider === 'github') {
			window.location.href = `https://github.com/login/oauth/authorize?client_id=88f028142403410abfef&redirect_uri=http://127.0.0.1:1024/pages/login/login`;
		}
		if (row.provider === 'weixin') {
			window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxea473f283d5e6785&redirect_uri=http://127.0.0.1:1024/pages/login/login&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
		}
	}
	if (row.platform === 'MP-WEIXIN') {
		mpWeixinLogin(row.provider);
	}
	if (row.platform === 'APP-PLUS') {
		if (row.provider === 'univerify') {
			appUniverifyLogin();
		} else {
			appLogin(row.provider);
		}
	}
};
// 微信登录
const webWeChatLogin = () => {
	// const weChatCode = window.location.href.split('?code=')[1].split('&');
	// console.log('weChatCode', weChatCode);
	// const res = await weChatLogin({ code: weChatCode[0] })
	// console.log(res)
	// prompt.msg('WeChat登录成功')
};
// web github登录
const webGithubLogin = () => {
	// const str = window.location.href.substr(window.location.href.indexOf('code=') + 5);
	// const code = str.substr();
	// console.log('code', code);
	// const res = await gitHubLogin({ code })
	// console.log(res)
	// prompt.msg('gitHub登录成功')
};
// app端 微信、QQ、新浪微博、Facebook、apple、google 登录
const appLogin = (provider) => {
	uni.login({
		provider,
		success(res) {
			console.log(`${provider}-login-res`, res);
			// 登录成功
			uni.getUserInfo({
				provider,
				success(info) {
					console.log(`${provider}-getUserInfo-res`, info);
					// 获取用户信息成功, info.authResult保存用户信息
				},
				fail(fail) {
					console.log(`${provider}-getUserInfo-fail`, fail);
					if (fail.errMsg.includes('尚未获取oauth授权')) console.log('尚未获取oauth授权');
				}
			});
		},
		fail(fail) {
			console.log(`${provider}-login-fail`, fail);
			if (fail.errMsg.includes('用户取消') || fail.errMsg === 'login:fail 用户取消') console.log('用户取消登录');
			if (fail.errMsg === 'login:fail Authentication failed') console.log('用户拒绝登录');
			uni.showToast({
				title: '登录失败！',
				icon: 'none'
			});
		}
	});
};
// app端一键登录
const appUniverifyLogin = () => {
	// 预登录;
	uni.preLogin({
		provider: 'univerify',
		success(res) {
			//预登录成功 显示一键登录选项
			uni.login({
				provider: 'univerify',
				univerifyStyle: {
					fullScreen: true, // 是否全屏显示，默认值： false
					backgroundColor: '#ffffff', // 授权页面背景颜色，默认值：#ffffff
					// backgroundImage: 'static/images/login/login-bg.jpg', // 全屏显示的背景图片，默认值："" （仅支持本地图片，只有全屏显示时支持）
					icon: {
						path: 'static/images/login.png', // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo
						width: '180px', //图标宽度 默认值：60px
						height: '70px' //图标高度 默认值：60px
					},
					closeIcon: {
						path: 'static/xxx.png' // 自定义关闭按钮，仅支持本地图片。 HBuilderX3.3.7+版本支持
					},
					phoneNum: {
						color: '#202020' // 手机号文字颜色 默认值：#202020
					},
					slogan: {
						color: '#BBBBBB' //  slogan 字体颜色 默认值：#BBBBBB
					},
					authButton: {
						normalColor: '#3479f5', // 授权按钮正常状态背景颜色 默认值：#3479f5
						highlightColor: '#2861c5', // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）
						disabledColor: '#73aaf5', // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）
						textColor: '#ffffff', // 授权按钮文字颜色 默认值：#ffffff
						title: '本机号码一键登录', // 授权按钮文案 默认值：“本机号码一键登录”
						borderRadius: '24px' // 授权按钮圆角 默认值："24px" （按钮高度的一半）
					},
					otherLoginButton: {
						visible: true, // 是否显示其他登录按钮，默认值：true
						normalColor: '', // 其他登录按钮正常状态背景颜色 默认值：透明
						highlightColor: '', // 其他登录按钮按下状态背景颜色 默认值：透明
						textColor: '#656565', // 其他登录按钮文字颜色 默认值：#656565
						title: '其他登录方式', // 其他登录方式按钮文字 默认值：“其他登录方式”
						borderColor: '', //边框颜色 默认值：透明（仅iOS支持）
						borderRadius: '0px' // 其他登录按钮圆角 默认值："24px" （按钮高度的一半）
					},
					privacyTerms: {
						defaultCheckBoxState: true, // 条款勾选框初始状态 默认值： true
						isCenterHint: false, //未勾选服务条款时点击登录按钮的提示是否居中显示 默认值: false (3.7.13+ 版本支持)
						uncheckedImage: '', // 可选 条款勾选框未选中状态图片（仅支持本地图片 建议尺寸 24x24px）(3.2.0+ 版本支持)
						checkedImage: '', // 可选 条款勾选框选中状态图片（仅支持本地图片 建议尺寸24x24px）(3.2.0+ 版本支持)
						checkBoxSize: 12, // 可选 条款勾选框大小
						textColor: '#BBBBBB', // 文字颜色 默认值：#BBBBBB
						termsColor: '#5496E3', //  协议文字颜色 默认值： #5496E3
						prefix: '我已阅读并同意', // 条款前的文案 默认值：“我已阅读并同意”
						suffix: '并使用本机号码登录', // 条款后的文案 默认值：“并使用本机号码登录”
						privacyItems: [
							// 自定义协议条款，最大支持2个，需要同时设置url和title. 否则不生效
							{
								url: 'https://', // 点击跳转的协议详情页面
								title: '用户服务协议' // 协议名称
							}
						]
					}
					// buttons: {
					// 	// 自定义页面下方按钮仅全屏模式生效（3.1.14+ 版本支持）
					// 	iconWidth: '45px', // 图标宽度（高度等比例缩放） 默认值：45px
					// 	list: [
					// 		{
					// 			provider: 'apple',
					// 			iconPath: '/static/logo.png' // 图标路径仅支持本地图片
					// 		},
					// 		{
					// 			provider: 'weixin',
					// 			iconPath: '/static/logo.png' // 图标路径仅支持本地图片
					// 		},
					// 		{
					// 			provider: 'qq',
					// 			iconPath: '/static/logo.png' // 图标路径仅支持本地图片
					// 		}
					// 	]
					// }
				},
				success(res) {
					// 一键登录 登录成功
					console.log('login - res', res);
					console.log(res.authResult); // {openid:'登录授权唯一标识',access_token:'接口返回的 token'}
					// 客户端关闭一键登录授权界面
					uni.closeAuthView();
				},
				fail(fail) {
					// 登录失败
					console.log('login fail', fail);
					if (fail.code === 30002) console.log('用户点击了其他登录方式');
					if (fail.code === 30003) console.log('用户关闭验证界面');
					// 用户点击了自定义按钮
					if (fail.code === '30008') {
						// 获取用户是否选中了勾选框
						return console.log('用户点击了自定义按钮', fail.code, fail.provider);
						uni.getCheckBoxState({
							success(res) {
								if (!res.state) {
									uni.showToast({
										title: '请阅读并同意该协议后再登录！',
										icon: 'none',
										duration: 1500
									});
									return;
								}
							}
						});
						if (fail.provider === 'apple') {
							console.log('apple');
						}
						if (fail.provider === 'weixin') {
							console.log('weixin');
						}
						if (fail.provider === 'qq') {
							console.log('qq');
						}
					}
				}
			});
		},
		fail(fail) {
			// 预登录失败
			// 不显示一键登录选项（或置灰）
			// 根据错误信息判断失败原因，如有需要可将错误提交给统计服务器
			console.log('preLogin fail', fail);
			let errMsg = '预登录失败,设备不支持/未开启数据流量/其他原因!';
			if (fail.code === 30005) {
				if (fail.errMsg.includes('无SIM卡')) errMsg = '预登录失败,无SIM卡!';
				uni.showToast({
					title: errMsg,
					icon: 'none',
					duration: '1500'
				});
			}
		}
	});
};
// 微信mp小程序端微信登录
const mpWeixinLogin = (provider) => {
	uni.login({
		provider,
		success({ code }) {
			console.log(`${provider}-login-res.code`, code);
			// 获取到code进行下一步
		},
		fail(fail) {
			console.log(`${provider}-login-fail`, fail);
			uni.showToast({
				title: '登录失败！',
				icon: 'none'
			});
		}
	});
};

onLoad((params) => {
	// if (oauthLoginType === 'github') webGithubLogin();
	// if (oauthLoginType === 'weixin') webWeChatLogin();
	initProvider();
	console.log('params', params);
});
// 本地登录提交
const submit = (type) => {
	if (type == 1) localLogin();
	if (type == 2) smsLogin();
	if (type == 3) resetPassword();
};
// 账号密码登录
const localLogin = () => {
	if (!isMobile(form.account) && !isEmail(form.account)) return prompt.msg('请输入有效的账号');
	if (!form.password) return prompt.msg('请输入新密码');
	loading.value = true;
	userStore
		.localLogin(form)
		.then(() => {
			userStore.getUserInfo().then(() => {
				router.back(); // 登录成功，跳转回原来的页面
			});
		})
		.finally(() => {
			loading.value = false;
		});
};
// 验证码快捷登录 或注册
const smsLogin = () => {
	if (!isMobile(form.account) && !isEmail(form.account)) return prompt.msg('请输入有效的账号');
	if (!form.code) return prompt.msg('请输入验证码');
	loading.value = true;
	userStore
		.smsLogin(form)
		.then(() => {
			userStore.getUserInfo().then(() => {
				router.back(); // 登录成功，跳转回原来的页面
			});
		})
		.finally(() => {
			loading.value = false;
		});
};
// 验证码快捷修改密码
const resetPassword = () => {
	if (!isMobile(form.account) && !isEmail(form.account)) return prompt.msg('请输入有效的账号');
	if (!form.code) return prompt.msg('请输入验证码');
	if (!form.password) return prompt.msg('请输入新密码');
	loading.value = true;
	userStore
		.smsUpdatePassword(form)
		.then(() => {
			prompt.msg('重置密码成功,正在为您登录中...');
			setTimeout(() => {
				userStore.getUserInfo().then(() => {
					type.value = 1;
					router.back(); // 登录成功，跳转回原来的页面
				});
			}, 1500);
		})
		.finally(() => {
			loading.value = false;
		});
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
	color: rgba(255, 255, 255, 0.6);
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
