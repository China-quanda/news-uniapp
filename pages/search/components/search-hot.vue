<template>
	<view class="hot-search">
		<view class="title-box">
			<view class="name">热门搜索</view>
			<text class="iconfont icon-huo text-red text-18px"></text>
		</view>
		<view class="list">
			<view class="item ellipsis1" v-for="(item, index) in list" :key="index" @click="emit('onClick', item)">
				<text class="iconfont icon-huo text-red text-14px"></text>
				<text class="keyword">{{ item.keywords }}</text>
			</view>
		</view>
	</view>
</template>
<script lang="ts">
export default { name: 'search-hot' }
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
	(e: 'onClick', row): void
}>()
</script>

<style lang="scss" scoped>
.hot-search {
	// margin: 12px;

	.title-box {
		@apply flex justify-between flex-items-center mb-8px;

		.name {
			@apply text-black font-500 text-14px;
		}
	}

	.list {
		@apply flex flex-wrap;

		.item {
			@apply flex flex-items-center box-border text-14px gap-x-5px py-5px;
			width: calc(50% - 3px);

			&:nth-child(1n) {
				margin-right: 3px;
			}

			&:nth-child(2n) {
				margin-right: 0px;
				margin-left: 3px;
			}
		}
	}
}
</style>