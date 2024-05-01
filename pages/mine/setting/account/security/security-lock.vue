<template>
	<view class='security'>

		<view class="dev-info">
			<view class="Panel-con">
				<text :class="['iconfont', type === 'lock' ? 'icon-jiesuo' : 'icon-suoding']"></text>
				<view class="Panel-title">{{ type === 'lock' ? '开启锁定保护' : '解除锁定保护' }}</view>
			</view>
			<view class="Panel-list" v-if="type === 'lock'">
				<view class="Panel-row">
					<text class="d">·</text><text class="text-#626262">遇到帐号被盗等紧急情况，可以通过锁定保护来防止坏人窃取隐私，盗取资金、发送垃圾短信等</text>
				</view>
				<view class="Panel-row">
					<text class="d">·</text><text class="text-#626262">帐号锁定成功后，已经登录的所有设备会被强制退出登录，锁定期间所有登录方式都不允许登录</text>
				</view>
				<view class="Panel-row">
					<text class="d">·</text><text class="text-#626262">只有锁定保护解除后才能正常登录帐号</text>
				</view>
			</view>

			<view class="Panel-list" v-if="type === 'unlock'">
				<view class="Panel-row">
					<text class="d">·</text><text class="text-#626262">如果锁定前您的帐号存在可疑绑定或疑似盗号等问题，解除锁定保护成功后，帐号的绑定关系将会还原</text>
				</view>
				<view class="Panel-row">
					<text class="d">·</text><text class="text-#626262">解除锁定保护帐号可以正常登录</text>
				</view>
			</view>
			<view class="button">{{ type === 'lock' ? '开启锁定保护' : '解除锁定保护' }}</view>
		</view>


	</view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
let title = ref('')
let type = ref('')
onLoad((o) => {
	type.value = o.type
	title.value = o.title
	uni.setNavigationBarTitle({
		title: title.value
	});
})
</script>
<style lang="scss" scoped>
.security {
	background-color: #fff;
}

.dev-info {
	transform: translateY(10vh);

	.Panel-con {
		display: flex;
		flex-direction: column;
		align-items: center;

		.Panel-title {
			margin-top: 20px;
		}

		.iconfont {
			font-size: 110px;
		}
	}

	.Panel-list {
		padding: 0px 15px;
		font-size: 14px;
		color: #626262;
	}

	.Panel-row {
		padding: 10px 0px;
		display: flex;
		@apply gap-x-5px text-#7f8083 text-14px;

		.d {
			@apply text-30px mt--11px;
		}
	}

	.button {
		@apply flex flex-items-center justify-center py-10px bg-red-500 rd-4px text-white text-13px px-10px mx-12px mt-15px;
	}
}
</style>
