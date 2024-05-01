<template>
	<view class='device-info'>
		<view class="gap"></view>
		<view class="cell-group">
			<view class="cell is-border">
				<view class="cell-left">
					<text class="title">登录设备</text>
				</view>
				<view class="cell-right">
					<text class="desc">iPhone X</text>
				</view>
			</view>
			<view class="cell is-border">
				<view class="cell-left">
					<text class="title">最近活跃时间</text>
				</view>
				<view class="cell-right">
					<text class="desc">2021-02-06 15:53</text>
				</view>
			</view>
			<view class="cell is-border">
				<view class="cell-left">
					<text class="title">登录地点</text>
				</view>
				<view class="cell-right">
					<text class="desc">湖南省 郴州市</text>
				</view>
			</view>
			<view class="cell is-border">
				<view class="cell-left">
					<text class="title">登录方式</text>
				</view>
				<view class="cell-right">
					<text class="desc">手机APP</text>
				</view>
			</view>
			<view class="cell">
				<view class="cell-left">
					<text class="title">登录应用</text>
				</view>
				<view class="cell-right">
					<text class="desc">今日头条</text>
				</view>
			</view>
		</view>
		<view class="gap"></view>
		<view class="login-out">退出登录</view>

	</view>
</template>

<script setup lang="ts">
</script>
<style lang="scss" scoped>
page,
.device-info {
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

.login-out {
	@apply flex flex-items-center justify-center py-10px mt5px bg-white text-#218eff;
	border: 1px solid #ebecec
}
</style>
