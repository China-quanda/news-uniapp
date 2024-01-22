<template>
	<view class="history">
		<view class="handle">
			<view class="name">搜索历史</view>
			<view>
				<template v-if="isDel">
					<text @tap="delAll">全部删除</text>
					<text style="margin-left: 12px;" @tap="isDel = false">完成</text>
				</template>
				<template v-else>
					<uni-icons type="trash" size="18" color="#999" @tap="isDel = true" />
				</template>
			</view>
		</view>
		<view class="list">
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="ellipsis1" @click="emit('onClick',item)">
					<uni-icons class="icon" type="eye" size="18" color="#999" />
					<text>{{ item.keywords }}</text>
				</view>
				<view class="cha">
					<uni-icons v-show="isDel" type="closeempty" size="16" color="#999" @tap="delItem(item)" />
				</view>
			</view>
		</view>
	</view>
</template>
<script lang="ts">
	export default { name: 'search-history' }
</script>
<script setup lang="ts">
	import { destroyUserOneSearchHistory, destroyUserAllSearchHistory } from '@/api/search'
	import { ref } from 'vue';
	defineProps({
		list: {
			type: Array,
			required: true,
			default: () => []
		}
	});
	const isDel = ref<boolean>(false);
	const emit = defineEmits<{
		(e : 'onClick', row) : void
		(e : 'onRefresh') : void
	}>()
	const delAll = async () => {
		await destroyUserAllSearchHistory()
		emit('onRefresh')
		isDel.value = false
	};
	const delItem = async (row) => {
		await destroyUserOneSearchHistory(row.id)
		emit('onRefresh')
	};
</script>

<style lang="scss" scoped>
	.history {
		.handle {

			.name {
				color: $uni-text-color;
				font-weight: 500;
			}

			display: flex;
			justify-content: space-between;
			align-items: center;
			color: $uni-text-color-grey;
		}

		.list {
			display: flex;
			flex-wrap: wrap;
			.item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: calc(50% - 3px);
				box-sizing: border-box;
				line-height: 35px;
				font-size: 15px;
			
				&:nth-child(1n) {
					margin-right: 3px;
				}
			
				&:nth-child(2n) {
					margin-right: 0px;
					margin-left: 3px;
				}
				.icon{
					margin-right: 3px;
				}
				.cha {
					margin-left: 8px;
				}
			}
		}
	}
</style>