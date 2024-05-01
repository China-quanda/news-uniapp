<template>
	<view class="account">
		<view class="gap"></view>
		<view class="cell-group">
			<view class="cell is-border" @click="tapPhone">
				<view class="cell-left">
					<text class="title">手机号码</text>
				</view>
				<view class="cell-right">
					<text class="desc">186****8151</text>
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="cell is-border" @click="tapEmail">
				<view class="cell-left">
					<text class="title">邮箱</text>
				</view>
				<view class="cell-right is-switch">
					<text class="desc">{{ userInfo?.email ? userInfo?.email : '去绑定' }}</text>
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="cell is-border" @click="tapPassword">
				<view class="cell-left">
					<text class="title">修改密码</text>
				</view>
				<view class="cell-right is-switch">
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="describe">社交平台账号绑定</view>
			<view class="cell is-border">
				<view class="cell-left">
					<text class="title">微信</text>
				</view>
				<view class="cell-right is-switch">
					<!-- 微信小程序显示绿色 -->
					<switch :checked="weixinStatus" />
				</view>
			</view>
			<view class="cell is-border">
				<view class="cell-left">
					<text class="title">QQ</text>
				</view>
				<view class="cell-right is-switch">
					<!-- 微信小程序显示绿色 -->
					<switch :checked="qqStatus" />
				</view>
			</view>
			<view class="cell is-border">
				<view class="cell-left">
					<text class="title">新浪微博</text>
				</view>
				<view class="cell-right is-switch">
					<!-- 微信小程序显示绿色 -->
					<switch :checked="qqStatus" />
				</view>
			</view>
			<view class="describe">高级设置</view>
			<view class="cell is-border" @click="router.push('del-account')">
				<view class="cell-left">
					<text class="title">账号注销</text>
				</view>
				<view class="cell-right">
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="cell is-border" @click="router.push('./device/login-device')">
				<view class="cell-left">
					<text class="title">登录设备管理</text>
				</view>
				<view class="cell-right">
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="cell is-border" @click="router.push('./security/index')">
				<view class="cell-left">
					<text class="title">安全中心</text>
				</view>
				<view class="cell-right">
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import prompt from '@/utils/prompt';
import router from '@/utils/router';
// import { mapGetters } from 'vuex';

const tapPhone = () => {
	let content = '更换已绑定的手机号码 当前绑定的手机号码为：186****8151'
	prompt.confirm({
		content: content,
		confirmText: '更换',
	}).then(() => {
		router.push('replace?title=手机号')

	}).catch(() => { })
}
const tapEmail = () => {
	let content = '更换已绑定的邮箱 当前绑定的邮箱为：186****8151@qq.com'
	prompt.confirm({
		content: content,
		confirmText: '更换',
	}).then(() => {
		router.push('replace?title=邮箱')
	}).catch(() => { })
}
const tapPassword = () => {
	let content = '修改登录密码 讲给手机：186****8151发送验证码'
	prompt.confirm({
		content: content,
		confirmText: '确认',
	}).then(() => {
		router.push('replace?title=登录密码')
	}).catch(() => { })
}

let weixinStatus = ref<boolean>(false)
let qqStatus = ref<boolean>(false)
let userInfo = reactive({})
</script>
<style lang="scss" scoped>
.describe {
	display: block;
	// margin: 0px 15px;
	padding: 10px 0px;
	font-size: 13px;
	color: #ccc;
	font-family: 400;
	border-bottom: 1px solid rgb(243, 243, 243);
}

.gap {
	@apply h8px;
}

.cell-group {
	@apply bg-white px-12px;

	.cell {
		@apply flex flex-items-center py-10px;

		.cell-left {
			@apply flex flex-col flex-1 gap-y-3px;

			.title {
				@apply text-13.5px;
			}

			.subtitle {
				@apply text-12px text-blueGray;
			}
		}

		.cell-right {
			@apply flex flex-items-center gap-x-3px;

			.desc {
				@apply text-13px text-blueGray;
			}
		}
	}

	.is-border {
		@apply border-b-1px border-b-solid border-b-coolGray-100;
	}

	::v-deep .uni-switch-wrapper {
		display: inline;

		.uni-switch-input {
			width: 30px;
			height: 16px;

			&::before {
				width: 28px;
				height: 14px;
			}

			&::after {
				width: 14px;
				height: 14px;
			}
		}

		.uni-switch-input-checked:after {
			transform: translateX(14px);
		}
	}

	/* #ifdef MP-WEIXIN */
	.is-switch {
		@apply h23px;

		switch {
			transform: scale(0.7)
		}
	}

	/* #endif */
}
</style>
