<template>
	<view class='container'>
		<!-- <my-nav-bar title="设置" :clickLeft="router.back" /> -->
		<view class="setting user-setting"></view>
		<my-cell title="编辑资料" url="/pages/mine/setting/profile/index" />
		<my-cell title="账号安全" url="/pages/mine/setting/account/index" />
		<my-cell title="隐私设置" url="/pages/mine/setting/privacy/index" />

		<view class="setting basic-setting"></view>
		<my-cell title="夜间模式" :isLink="false" :clickable="false">
			<block v-slot:value> <my-switch v-model:value="promptStatus" /></block>
		</my-cell>
		<my-cell title="大字设置" />
		<my-cell title="字体大小" value="小" />
		<!-- <my-cell title="蓝牙连接" 
		:value="Bluetooth.connection ? Bluetooth.BLEInformation.name : '未连接'" 
		@tap="toConnectionBluetooth"
		/> -->

		<view class="setting"></view>
		<my-cell title="清除缓存" value="0B" />
		<my-cell title="播放与网络设置" />
		<my-cell title="推送通知设置" />
		<my-cell title="安全浏览设置" />
		<my-cell title="提示音开关" :isLink="false" :clickable="false">
			<block v-slot:value> <my-switch v-model:value="switchoverStatus" /></block>
		</my-cell>

		<view class="setting"></view>
		<my-cell title="隐私政策及简明版" />
		<my-cell title="个人信息收集清单" />
		<my-cell title="第三方信息共享清单" />
		<my-cell title="安全浏览设置" />

		<view class="setting"></view>
		<my-cell title="检查版本" :value="appStore.systemInfo.appVersion" />
		<my-cell title="关于头条" />
		<my-cell title="用户反馈" />

		<view class="login-out" v-if="userStore.token">
			<my-button hairline @click="onExit()">退出登录</my-button>
		</view>

	</view>
</template>

<script lang="ts" setup>
	// import { mapActions, mapGetters } from 'vuex'
	// ...mapActions('user', ['logout']),
	import { useUserStore } from '@/store/user'
	import { useAppStore } from '@/store/app'
	const userStore = useUserStore()
	const appStore = useAppStore()
	import { ref } from 'vue';
	import { onShow } from '@dcloudio/uni-app';
	import router from '@/utils/router';
	import prompt from '@/utils/prompt';
	import { storeToRefs } from 'pinia'
	import { useBluetoothStore } from '@/store/bluetooth'
	const bluetoothStore = useBluetoothStore()
	const { BLEInformation, connection } = storeToRefs(bluetoothStore)
	const { onBLEConnectionState, connectionBLE } = bluetoothStore
	let promptStatus = ref(false)
	let switchoverStatus = ref(false)

	onShow(() => {
		onBLEConnectionState()
		if (!connection && BLEInformation.deviceId) {
			connectionBLE()
		}
	})
	const onExit = () => {
		userStore.logout()
		prompt.msg('退出成功')
		setTimeout(() => {
			router.reLaunch(appStore.homeUrl)
		}, 1500)
		// this.$router.back()
	}

	const toConnectionBluetooth = () => {
		if (this.Bluetooth.connection) return uni.showToast({ title: '已连接打印机', icon: 'none' });
		uni.navigateTo({ url: '/pages/index/bluetoothConnect' })
	}
</script>
<style lang="scss" scoped>
	.container {
		background-color: rgb(240, 240, 240);
		padding-bottom: 20rpx;
	}

	.setting {
		margin-top: 8px;
		background-color: #fff;
	}

	.user-setting {
		// margin-top: 95px;
	}

	.login-out {
		margin-top: 15px;
		background-color: #fff;
		color: #218eff;
	}
</style>