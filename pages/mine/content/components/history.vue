<template>
	<view class="history">
		<view class="mb-10px" v-for="(item, index) in 4" :key="index">
			<homeArticleItem :info="item.article" />
			<info-action :info="item.article" />
		</view>
	</view>
</template>
<script lang="ts">
export default { name: 'history' }
</script>
<script setup lang="ts">
// import infoAction from '@/pages/article/components/info-action.vue';
import homeArticleItem from '@/pages/article/components/home-article-item.vue'
import { getUserViewHistoryList } from '@/api/articleView';

const list = ref<any[]>([])
let query = reactive({
	pageNum: 1,
	pageSize: 10,
	total: 0
})
const loadUserViewHistoryList = async (pageNum = 1) => {
	const result: any = await getUserViewHistoryList(query)
	list.value = pageNum > 1 ? list.value.concat(result.data.list) : result.data.list
	query.pageNum = result.data.pagination
	query.pageSize = result.data.pageSize
	query.total = result.data.total
}
onMounted(() => {
	// loadUserViewHistoryList()
});
</script>
