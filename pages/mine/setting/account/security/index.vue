<template>
	<view class="security-index">
		<view class="gap"></view>
		<view class="cell-group">
			<view class="cell is-border" @click="router.push('security-lock?type=lock&title=账号锁定')">
				<view class="cell-left">
					<text class="title">账号锁定</text>
				</view>
				<view class="cell-right">
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="cell" @click="router.push('security-lock?type=unlock&title=解除锁定')">
				<view class="cell-left">
					<text class="title">解除锁定</text>
				</view>
				<view class="cell-right">
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import router from '@/utils/router';
</script>

<style lang="scss" scoped>
.security-index,
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

}
</style>