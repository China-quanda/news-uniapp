<template>
	<view class="">
		<text>h5端</text>
		<button @tap="login('github')">github登录:支持中</button>
		<button @tap="open('github')">github登录</button>
		<button @tap="login">qq登录:未支持</button>
		<button @tap="login">微博登录:未支持</button>
		<button @tap="login">pc微信扫码登录:未支持</button>
		<button @tap="login">微信公众号项目h5登录:支持中</button>
	</view>

	<view class="">
		<text>app端</text>
		<button @tap="login('qq')">qq登录</button>
		<button @tap="login('sinaweibo')">新浪微博登录</button>
		<button @tap="login('weixin')">微信登录</button>
		<button @tap="login('univerify')">手机号码一键登录</button>
		<button @tap="login('google')">google登录：未测试通过</button>
		<button @tap="login('facebook')">facebook登录：未测试</button>
		<button @tap="login('apple')">apple登录ios：未测试</button>
	</view>

	<view class="">
		<text>微信小程序端</text>
		<button @tap="login('weixin')">小程序登录</button>
	</view>

	<view class="">
		<text>通用端</text>
		<button @tap="login">账户密码登录</button>
		<button @tap="login">邮箱/短信 验证码登录</button>
	</view>

	<text>当前支持的登录方式：</text>
	<view class="flex flex-items-center flex-wrap gap-10">
		<view class="" v-for="item in providerList" :key="item" @click="login(item)">
			<text>{{ item }}</text>
		</view>
	</view>
</template>

<script setup lang="ts">
const providerList = ref<string[]>([]);

const open = (tyep) => {
	if (tyep == 'github') window.location.href = githubUrl.value;
};
// const provider = ref('')
const login = (provider: string) => {
	console.log(providerList.value, provider);
	console.log('provider', provider);
	if (provider === 'weixin') {
		// #ifdef MP-WEIXIN
		mpWeixinLogin(provider);
		// #endif
		// #ifdef APP-PLUS
		appWeixinLogin(provider);
		// #endif
	}
	if (provider === 'qq') appQQLogin(provider);
	if (provider === 'univerify') univerifyLogin();
	if (provider === 'sinaweibo') appSinaweiboLogin(provider);
	if (provider === 'google') appGoogleLogin(provider);
	if (provider === 'facebook') appFacebookLogin(provider);
	if (provider === 'apple') appAppleLogin(provider);
};

/**
 * app端一键登录-客户端
 * @link 文档地址 https://uniapp.dcloud.net.cn/univerify.html
 */
const univerifyLogin = () => {
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
// app端google登录暂时未调通  // "errMsg": "login:fail 12500: ",  "code": -1002
const appGoogleLogin = (provider) => {
	console.log('providerproviderproviderprovider', provider);
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
			if (fail.errMsg.includes('用户取消') || fail.errMsg === 'login:fail 用户取消') return console.log('用户取消登录');
			if (fail.errMsg === 'login:fail Authentication failed') return console.log('用户拒绝登录');
			uni.showToast({
				title: '登录失败！',
				icon: 'none'
			});
		}
	});
};
// app端apple登录
const appAppleLogin = (provider) => {
	console.log('providerproviderproviderprovider', provider);
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
			if (fail.errMsg.includes('用户取消') || fail.errMsg === 'login:fail 用户取消') return console.log('用户取消登录');
			if (fail.errMsg === 'login:fail Authentication failed') return console.log('用户拒绝登录');
			uni.showToast({
				title: '登录失败！',
				icon: 'none'
			});
		}
	});
};
// app端Facebook登录
const appFacebookLogin = (provider) => {
	console.log('providerproviderproviderprovider', provider);
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
			if (fail.errMsg.includes('用户取消') || fail.errMsg === 'login:fail 用户取消') return console.log('用户取消登录');
			if (fail.errMsg === 'login:fail Authentication failed') return console.log('用户拒绝登录');
			uni.showToast({
				title: '登录失败！',
				icon: 'none'
			});
		}
	});
};
// app端新浪微博登录
const appSinaweiboLogin = (provider) => {
	console.log('providerproviderproviderprovider', provider);
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
			if (fail.errMsg.includes('用户取消') || fail.errMsg === 'login:fail 用户取消') return console.log('用户取消登录');
			if (fail.errMsg === 'login:fail Authentication failed') return console.log('用户拒绝登录');
			uni.showToast({
				title: '登录失败！',
				icon: 'none'
			});
		}
	});
};
// app端QQ登录
const appQQLogin = (provider) => {
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
// app端微信登录
const appWeixinLogin = (provider) => {
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

// web github登录
const webGithubLogin = () => {
	const str = window.location.href.substr(window.location.href.indexOf('code=') + 5);
	const code = str.substr();
	console.log('code', code);
	// const res = await gitHubLogin({ code: Code });
	// console.log(res);
	// prompt.msg('gitHub登录成功')
};
// web 微信登录
const webWeChatLogin = () => {
	// const weChatCode = window.location.href.split('?code=')[1].split('&')
	// const res = await weChatLogin({ code: weChatCode[0] })
	// console.log(res)
	// prompt.msg('WeChat登录成功')
};
onLoad((params) => {
	console.log('params', params);
	// webGithubLogin();
});

onShow(() => {
	webGithubLogin();
	console.log('onShow');
});

onMounted(async () => {
	console.log('onMounted');
	// 调用前先排除h5
});
</script>

<style scoped lang="scss"></style>
