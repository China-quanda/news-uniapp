<template>
	<my-list refresherEnabled  showBackTop 
	:list="list" :pageInfo="pageInfo" 
	:loadData="getDataList"
	:loading="loading">
		<view v-for="(item, index) in list" 
		class="scroll-view-item uni-bg-blue">{{ item.title }}</view>
	</my-list>
</template>

<script lang="ts" setup>
	import { getArticleList } from '@/api/article';
	import {usePageList} from '@/maya-ui/components/my-list/hook';
	const {
		list,
		pageInfo,
    loading,
    getDataList } =usePageList({
		requestApi:getArticleList,
		queryParams:{
			articleCategoryId:2,
			pageSize:20
		}
	})
	// const articleList = ref([])
	// let query = reactive({
	// 	pageNum: 1,
	// 	pageSize: 10,
	// 	total: 0,
	// })
	// const loadArticleList = (pageNum = 1) => {
	// 	console.log('loadArticleList', pageNum);
	// 	return new Promise((resolve, reject) => {
	// 		getArticleList(query).then(result => {
	// 			articleList.value = pageNum > 1 ? articleList.value.concat(result.data.list) : result.data.list
	// 			query.pageNum = result.data.pagination.pageNum
	// 			query.pageSize = result.data.pagination.pageSize
	// 			query.total = result.data.pagination.total
	// 			resolve(result)
	// 		}).catch((e) => {
	// 			reject(e)
	// 		})
	// 	})
	// }

</script>

<style lang="scss" scoped>
.scroll-view-item {
	height: 60px;
	border-bottom: 1px solid #f7f7f7;
}
</style>
