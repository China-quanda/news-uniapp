<template>
	<view class="history">
		<view class="handle">
			<view class="name">搜索历史</view>
			<view>
				<template v-if="isDel">
					<text class="text-14px" @click="delAll">全部删除</text>
					<text class="text-14px" style="margin-left: 12px;" @click="isDel = false">完成</text>
				</template>
				<template v-else>
					<text class="iconfont icon-shanchu2 text-#999 text-16px" @click="isDel = true"></text>
				</template>
			</view>
		</view>
		<view class="list">
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="flex flex-items-center ellipsis1" @click="emit('onClick', item)">
					<text class="iconfont icon-lishi text-#999 text-14px mr5px"></text>
					<text>{{ item.keywords }}</text>
				</view>
				<view class="cha">
					<text v-show="isDel" class="iconfont icon-cha text-#999 text-10px ml5px" @click="delItem(item)"></text>
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
	(e: 'onClick', row): void
	(e: 'onRefresh'): void
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
		@apply flex justify-between flex-items-center mb-8px text-#999;

		.name {
			@apply text-black font-500 text-14px;
		}
	}

	.list {
		@apply flex flex-wrap;

		.item {
			@apply flex justify-between flex-items-center box-border text-14px gap-10px py-5px;
			width: calc(50% - 3px);

			&:nth-child(1n) {
				margin-right: 3px;

				.cha {
					.iconfont {
						margin-right: 5px;
					}
				}
			}

			&:nth-child(2n) {
				margin-right: 0px;
				margin-left: 3px;
			}
		}
	}
}
</style>