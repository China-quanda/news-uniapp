<template>
	<view class="history">
		<view class="handle">
			<view class="name">搜索历史</view>
			<view>
				<block v-if="isDel">
					<text @tap="delAll">全部删除</text>
					<text style="margin-left: 12px;" @tap="isDel = false">完成</text>
				</block>
				<block v-else><uni-icons type="trash" size="18" color="#999" @tap="isDel = true" /></block>
			</view>
		</view>
		<view class="item" v-for="(item, index) in list" :key="index">
			<view class="left" @tap="tapItem(item)">
				<uni-icons class="iconfont" type="eye" size="18" color="#999" />
				<text>{{ item.keywords }}</text>
			</view>
			<view class="cha"><uni-icons v-show="isDel" class="iconfont" type="closeempty" size="18" color="#999" @tap="delItem(item)" /></view>
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
let isDel = ref<boolean>(false);
const delAll = () => {
	console.log('delAll');
};
const tapItem = row => {
	console.log('tapItem', row);
};
const delItem = row => {
	console.log('delItem', row);
};
</script>

<style lang="scss" scoped>
.history {
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
		justify-content: space-between;
	}
}
</style>
