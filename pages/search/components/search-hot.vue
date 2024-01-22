<template>
	<view class="hot-search">
		<view class="title-box">
			<view class="name">热门搜索</view>
			<uni-icons type="fire-filled" size="18" color="red" />
		</view>
		<view class="list">
			<view class="item ellipsis1" v-for="(item, index) in list" :key="index" @click="emit('onClick',item)">
				<uni-icons type="fire-filled" size="18" color="red" />
				<text class="keyword">{{ item.keywords }}</text>
			</view>
		</view>
	</view>
</template>
<script lang="ts">
	export default { name: 'search-hot'}
</script>
<script setup lang="ts">
	defineProps({
		list: {
			type: Array,
			required: true,
			default: () => []
		}
	});
	const emit = defineEmits<{
		(e : 'onClick', row) : void
	}>()
</script>

<style lang="scss" scoped>
	.hot-search {
		// margin: 12px;

		.title-box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: $uni-text-color-grey;

			.name {
				color: $uni-text-color;
				font-weight: 500;
			}
		}

		.list {
			display: flex;
			flex-wrap: wrap;
			margin-top: 5px;

			.item {
				width: calc(50% - 3px);
				font-size: 15px;
				line-height: 35px;
				display: flex;
				align-items: center;

				&:nth-child(1n) {
					margin-right: 3px;
				}

				&:nth-child(2n) {
					margin-right: 0px;
					margin-left: 3px;
				}

				.iconfont {
					margin-right: 10px;
				}
			}
		}
	}
</style>