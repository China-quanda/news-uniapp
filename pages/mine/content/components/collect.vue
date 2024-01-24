<template>
	<view class="collect">
		<view v-for="(item,index) in list" :key="index">
			<article-item :info="item.article"/>
			<info-action :info="item.article"/>
		</view>
	</view>
</template>
<script lang="ts">
	export default { name: 'collect' }
</script>
<script setup lang="ts">
	import { reactive, ref, onMounted } from 'vue';
	import infoAction from '@/pages/article/components/info-action.vue';
	import articleItem from '@/pages/article/components/article-item.vue';
	import { getUserCollectList } from '@/api/articleCollect';

	const list = ref([])
	let query = reactive({
		pageNum: 1,
		pageSize: 10,
		total: 0
	})
	const loadUserCollectList = async (pageNum = 1) => {
		const result = await getUserCollectList(query)
		list.value = pageNum > 1 ? list.value.concat(result.data.list) : result.data.list
		query.pageNum = result.data.pagination
		query.pageSize = result.data.pageSize
		query.total = result.data.total
	}
	onMounted(() => {
		loadUserCollectList()
	});
</script>
