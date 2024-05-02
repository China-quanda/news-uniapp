<template>
	<view class="collect">
		<view class="collect-item mb-10px" v-for="(item, index) in 4" :key="index">
			<homeArticleItem class="" :type="1" :isGzUser="true" />
			<info-action :info="item.article" />
		</view>
	</view>
</template>
<script lang="ts">
export default { name: 'collect' }
</script>
<script setup lang="ts">
import homeArticleItem from '@/pages/article/components/home-article-item.vue'
import infoAction from '@/pages/article/components/info-action.vue';
import { getUserCollectList } from '@/api/articleCollect';

const list = ref<any>([])
let query = reactive({
	pageNum: 1,
	pageSize: 10,
	total: 0
})
const loadUserCollectList = async (pageNum = 1) => {
	const result: any = await getUserCollectList(query)
	list.value = pageNum > 1 ? list.value.concat(result.data.list) : result.data.list
	query.pageNum = result.data.pagination
	query.pageSize = result.data.pageSize
	query.total = result.data.total
}
onMounted(() => {
	loadUserCollectList()
});
</script>
