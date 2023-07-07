<template>
	<view class="hot">
		<view class="handle">
			<view class="name">热门搜索</view>
			<view><uni-icons type="fire-filled" size="18" color="#999" /></view>
		</view>
		<view class="item" v-for="(item, index) in list" :key="index">
			<view class="left" @tap="tapItem(item)">
				<uni-icons class="iconfont" type="eye" size="18" color="#999" />
				<text>{{ item.keywords }}</text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
	list: {
		type: Array,
		required: true,
		default: () => {
			return [];
		}
	}
});

const tapItem = row => {
	console.log('tapItem', row);
};
</script>

<style lang="scss" scoped>
.hot {
	.handle {
		margin: 0px 12px;
		.name {
			color: $uni-text-color;
		}
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: $uni-text-color-grey;
	}
	.item {
		.iconfont {
			margin-right: 10px;
		}
		.left {
			flex: 1;
		}
		margin-left: 12px;
		font-size: 16px;
		height: 35px;
		line-height: 1;
		// border-bottom: 0.5px solid #ccc;
		display: flex;
		align-items: center;
	}
}
</style>
