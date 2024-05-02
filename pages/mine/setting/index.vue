<template>
	<view class='container'>
		<view class="gap"></view>
		<view class="cell-group">
			<view class="cell is-border" @click="router.push('/pages/mine/setting/profile/index')">
				<view class="cell-left">
					<text class="title">编辑资料</text>
				</view>
				<view class="cell-right">
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="cell is-border" @click="router.push('/pages/mine/setting/account/index')">
				<view class="cell-left">
					<text class="title">账号安全</text>
				</view>
				<view class="cell-right">
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="cell" @click="router.push('/pages/mine/setting/privacy/index')">
				<view class="cell-left">
					<text class="title">隐私设置</text>
				</view>
				<view class="cell-right">
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
		</view>
		<view class="gap"></view>
		<view class="cell-group">
			<view class="cell is-border">
				<view class="cell-left">
					<text class="title">深色模式</text>
				</view>
				<view class="cell-right">
					<text class="desc">跟随系统</text>
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="cell">
				<view class="cell-left">
					<text class="title">字体大小</text>
				</view>
				<view class="cell-right">
					<text class="desc">标准</text>
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
		</view>
		<view class="gap"></view>
		<view class="cell-group">
			<view class="cell is-border">
				<view class="cell-left">
					<text class="title">清除缓存</text>
				</view>
				<view class="cell-right">
					<text class="desc">0B</text>
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="cell is-border">
				<view class="cell-left">
					<text class="title">播放与网络设置</text>
				</view>
				<view class="cell-right">
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="cell is-border">
				<view class="cell-left">
					<text class="title">推送通知设置</text>
				</view>
				<view class="cell-right">
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="cell is-border">
				<view class="cell-left">
					<text class="title">安全浏览设置</text>
				</view>
				<view class="cell-right">
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="cell">
				<view class="cell-left">
					<text class="title">提示音开关</text>
				</view>
				<view class="cell-right is-switch">
					<!-- 微信小程序显示绿色 -->
					<switch :checked="promptToneChecked" @change="promptToneChange" />
				</view>
			</view>
		</view>
		<view class="gap"></view>
		<view class="cell-group">
			<view class="cell is-border">
				<view class="cell-left">
					<text class="title">隐私政策及简明版</text>
				</view>
				<view class="cell-right">
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="cell is-border">
				<view class="cell-left">
					<text class="title">个人信息收集清单</text>
				</view>
				<view class="cell-right">
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="cell">
				<view class="cell-left">
					<text class="title">第三方信息共享清单</text>
				</view>
				<view class="cell-right">
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
		</view>
		<view class="gap"></view>
		<view class="cell-group">
			<view class="cell is-border">
				<view class="cell-left">
					<text class="title">检查版本</text>
				</view>
				<view class="cell-right">
					<text class="desc">{{ appStore.systemInfo.appVersion }}</text>
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="cell is-border">
				<view class="cell-left">
					<text class="title">关于头条</text>
				</view>
				<view class="cell-right">
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="cell">
				<view class="cell-left">
					<text class="title">用户反馈</text>
				</view>
				<view class="cell-right">
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
		</view>
		<view class="gap"></view>
		<view class="login-out" v-if="!userStore.token" @click="onExit()">
			退出登录
		</view>
		<view class="gap"></view>

	</view>
</template>

<script lang="ts" setup>
// import { mapActions, mapGetters } from 'vuex'
// ...mapActions('user', ['logout']),
import { useUserStore } from '@/store/user'
import { useAppStore } from '@/store/app'
const userStore = useUserStore()
const appStore = useAppStore()
import router from '@/utils/router';
import prompt from '@/utils/prompt';
import { storeToRefs } from 'pinia'
import { useBluetoothStore } from '@/store/bluetooth'
import type { SwitchOnChangeEvent } from '@uni-helper/uni-app-types';
const promptToneChecked = ref(false)
// 提示音变化
const promptToneChange = (e: SwitchOnChangeEvent) => {
	promptToneChecked.value = e.detail.value
}


const onExit = () => {
	userStore.logout()
	prompt.msg('退出成功')
	setTimeout(() => {
		router.reLaunch(appStore.homeUrl)
	}, 1500)
	// this.$router.back()
}
</script>
<style lang="scss" scoped>
.container,
page {
	background-color: rgb(240, 240, 240);
}

.gap {
	@apply h8px;
}

.cell-group {
	@apply bg-white px-12px;

	.cell {
		@apply flex flex-items-center py-10px;

		.cell-left {
			@apply flex flex-col flex-1;

			.title {
				@apply text-13.5px;
			}

			.subtitle {
				@apply text-13px text-blueGray;
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

.login-out {
	@apply flex flex-items-center justify-center py-10px mt5px bg-white text-#218eff;
}
</style>